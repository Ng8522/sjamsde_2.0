import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sql from "mssql";
import { config } from "../config.js";
import { getPool } from "../db/client.js";
import { exportDonorsToFiles } from "../export.js";
import { addDonor, listDonors } from "../store.js";
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SYNC_KEY = "epayment_last_sync";
function table(name) {
    return `${config.dbSchema}.${name}`;
}
function formatDateTime(value) {
    return value.toLocaleString("en-MY", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
async function readQuery() {
    const queryPath = process.env.EPAYMENT_SYNC_QUERY_PATH
        ? path.resolve(process.env.EPAYMENT_SYNC_QUERY_PATH)
        : path.join(serverRoot, "src/epayment/sync-query.sql");
    return fs.readFile(queryPath, "utf8");
}
async function getLastSyncAt() {
    const pool = getPool();
    const { rows } = await pool.query(`SELECT value FROM ${table("sync_state")} WHERE key = $1`, [SYNC_KEY]);
    if (rows[0]?.value) {
        return new Date(rows[0].value);
    }
    const hours = Number(process.env.EPAYMENT_LOOKBACK_HOURS ?? 24);
    return new Date(Date.now() - hours * 60 * 60 * 1000);
}
async function setLastSyncAt(value) {
    const pool = getPool();
    await pool.query(`INSERT INTO ${table("sync_state")} (key, value, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (key) DO UPDATE
     SET value = EXCLUDED.value,
         updated_at = NOW()`, [SYNC_KEY, value.toISOString()]);
}
export async function fetchCompletedTransactions(since) {
    if (!config.epayment.enabled) {
        throw new Error("EPayment sync is not configured. Set MSSQL_SERVER in .env");
    }
    const pool = await sql.connect({
        server: config.epayment.server,
        port: config.epayment.port,
        user: config.epayment.user,
        password: config.epayment.password,
        database: config.epayment.database,
        options: {
            encrypt: config.epayment.encrypt,
            trustServerCertificate: config.epayment.trustServerCertificate,
        },
    });
    try {
        const request = pool.request();
        request.input("since", sql.DateTime2, since);
        const result = await request.query(await readQuery());
        return result.recordset.filter((row) => row.transaction_ref &&
            Number(row.amount) > 0 &&
            Number.isFinite(Number(row.amount)));
    }
    finally {
        await pool.close();
    }
}
export async function syncEpaymentTransactions() {
    const since = await getLastSyncAt();
    const rows = await fetchCompletedTransactions(since);
    let imported = 0;
    let skipped = 0;
    let latest = since;
    for (const row of rows) {
        const before = await listDonors();
        const paidAt = row.paid_at instanceof Date ? row.paid_at : new Date(row.paid_at);
        await addDonor({
            donorName: row.donor_name,
            transactionRef: String(row.transaction_ref),
            amount: Number(row.amount),
            dateTime: formatDateTime(paidAt),
        });
        const after = await listDonors();
        if (after.length > before.length)
            imported += 1;
        else
            skipped += 1;
        if (paidAt > latest)
            latest = paidAt;
    }
    if (rows.length > 0) {
        await setLastSyncAt(latest);
    }
    await exportDonorsToFiles(await listDonors());
    return { imported, skipped, checked: rows.length, since: since.toISOString() };
}

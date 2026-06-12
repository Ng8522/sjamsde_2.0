import { getPool } from "./db/client.js";
import { migrateDatabase } from "./db/migrate.js";
import { exportDonorsToFiles } from "./export.js";
import type { DonationSummary, DonorRecord } from "./types.js";
import { config } from "./config.js";

type DonorRow = {
  id: string;
  donor_name: string;
  transaction_ref: string | null;
  amount: string;
  date_time: string;
  created_at: Date;
};

function table(name: string) {
  return `${config.dbSchema}.${name}`;
}

const DONOR_SELECT = `
  SELECT id, donor_name, transaction_ref, amount, date_time, created_at
  FROM ${table("donors")}
`;

function newId() {
  return `don_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function formatDateTime(date = new Date()) {
  return date.toLocaleString("en-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function rowToRecord(row: DonorRow): DonorRecord {
  return {
    id: row.id,
    donorName: row.donor_name,
    transactionRef: row.transaction_ref ?? undefined,
    amount: Number(row.amount),
    dateTime: row.date_time,
    createdAt: row.created_at.toISOString(),
  };
}

export async function initStore() {
  await migrateDatabase();
  await exportDonorsToFiles(await listDonors());
}

export async function getDonationSummary(): Promise<DonationSummary> {
  const pool = getPool();
  const [targetRow, totals] = await Promise.all([
    pool.query<{ amount: string }>(`SELECT amount FROM ${table("target")} WHERE id = 1`),
    pool.query<{ raised: string; donation_count: string }>(
      `SELECT
        COALESCE(SUM(amount), 0)::text AS raised,
        COUNT(*)::text AS donation_count
      FROM ${table("donors")}`,
    ),
  ]);

  return {
    target: Number(targetRow.rows[0]?.amount ?? config.defaultDonationTarget),
    raised: Number(totals.rows[0]?.raised ?? 0),
    donationCount: Number(totals.rows[0]?.donation_count ?? 0),
  };
}

export async function setDonationTarget(amount: number): Promise<DonationSummary> {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("amount must be a positive number");
  }

  const pool = getPool();
  await pool.query(
    `INSERT INTO ${table("target")} (id, amount, updated_at)
     VALUES (1, $1, NOW())
     ON CONFLICT (id) DO UPDATE
     SET amount = EXCLUDED.amount,
         updated_at = NOW()`,
    [amount],
  );

  return getDonationSummary();
}

export async function listDonors(): Promise<DonorRecord[]> {
  const pool = getPool();
  const { rows } = await pool.query<DonorRow>(
    `${DONOR_SELECT} ORDER BY created_at DESC`,
  );
  return rows.map(rowToRecord);
}

export async function findDonorByTransactionRef(
  transactionRef: string,
): Promise<DonorRecord | null> {
  const pool = getPool();
  const { rows } = await pool.query<DonorRow>(
    `${DONOR_SELECT} WHERE transaction_ref = $1 LIMIT 1`,
    [transactionRef],
  );
  return rows[0] ? rowToRecord(rows[0]) : null;
}

export async function addDonor(input: {
  donorName?: string;
  transactionRef?: string;
  amount: number;
  dateTime?: string;
}): Promise<DonorRecord> {
  const transactionRef = input.transactionRef?.trim();
  if (transactionRef) {
    const existing = await findDonorByTransactionRef(transactionRef);
    if (existing) return existing;
  }

  const pool = getPool();
  const id = newId();
  const dateTime = input.dateTime ?? formatDateTime();
  const donorName = input.donorName?.trim() || "Anonymous";

  await pool.query(
    `INSERT INTO ${table("donors")} (id, donor_name, transaction_ref, amount, date_time)
     VALUES ($1, $2, $3, $4, $5)`,
    [id, donorName, input.transactionRef?.trim() || null, input.amount, dateTime],
  );

  const { rows } = await pool.query<DonorRow>(`${DONOR_SELECT} WHERE id = $1`, [id]);
  const record = rowToRecord(rows[0]!);
  await exportDonorsToFiles(await listDonors());
  return record;
}

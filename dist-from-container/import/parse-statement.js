import fs from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";
const COLUMN_ALIASES = {
    date: ["date", "transaction date", "posting date", "value date", "txn date"],
    description: [
        "description",
        "transaction description",
        "narrative",
        "particulars",
        "details",
        "remarks",
    ],
    credit: ["credit", "money in", "deposit", "cr", "credit amount"],
    debit: ["debit", "money out", "withdrawal", "dr", "debit amount"],
    reference: [
        "reference",
        "ref",
        "ref no",
        "reference no",
        "transaction ref",
        "transaction id",
        "txn id",
        "end to end id",
    ],
    donor: ["donor", "donor name", "donor_name", "name", "payer", "sender"],
    amount: ["amount", "transaction amount", "txn amount"],
};
function normalizeHeader(value) {
    return value.trim().toLowerCase().replace(/[_]+/g, " ");
}
function pickColumn(headers, aliases) {
    const normalized = headers.map(normalizeHeader);
    for (const alias of aliases) {
        const index = normalized.indexOf(alias);
        if (index >= 0)
            return headers[index];
    }
    return undefined;
}
function parseAmount(value) {
    if (value == null || value === "")
        return 0;
    const cleaned = String(value).replace(/,/g, "").replace(/[^\d.-]/g, "");
    const amount = Number(cleaned);
    return Number.isFinite(amount) ? amount : 0;
}
function excelDateToString(value) {
    if (value instanceof Date) {
        return value.toLocaleString("en-MY", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }
    if (typeof value === "number") {
        const parsed = XLSX.SSF.parse_date_code(value);
        if (parsed) {
            const date = new Date(parsed.y, parsed.m - 1, parsed.d, parsed.H, parsed.M);
            return date.toLocaleString("en-MY", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });
        }
    }
    return String(value ?? "").trim();
}
function donorFromDescription(description) {
    const text = description.trim();
    if (!text)
        return "Anonymous";
    const patterns = [
        /duitnow\s+credit\s+from\s+(.+)/i,
        /fund\s+transfer\s*[-:]\s*(.+)/i,
        /transfer\s+from\s+(.+)/i,
        /credit\s+from\s+(.+)/i,
        /received\s+from\s+(.+)/i,
        /fr[om]?\s+(.+)/i,
    ];
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match?.[1]) {
            return match[1].trim().replace(/\s+/g, " ").slice(0, 120);
        }
    }
    return text.slice(0, 120);
}
function rowToTransfer(row, headers) {
    const dateKey = pickColumn(headers, COLUMN_ALIASES.date);
    const donorKey = pickColumn(headers, COLUMN_ALIASES.donor);
    const descriptionKey = pickColumn(headers, COLUMN_ALIASES.description);
    const creditKey = pickColumn(headers, COLUMN_ALIASES.credit);
    const debitKey = pickColumn(headers, COLUMN_ALIASES.debit);
    const amountKey = pickColumn(headers, COLUMN_ALIASES.amount);
    const referenceKey = pickColumn(headers, COLUMN_ALIASES.reference);
    const credit = creditKey ? parseAmount(row[creditKey]) : 0;
    const debit = debitKey ? parseAmount(row[debitKey]) : 0;
    const directAmount = amountKey ? parseAmount(row[amountKey]) : 0;
    const amount = credit > 0 ? credit : directAmount > 0 ? directAmount : 0;
    if (amount <= 0 || debit > 0) {
        return null;
    }
    const description = descriptionKey ? String(row[descriptionKey] ?? "") : "";
    const donorName = donorKey
        ? String(row[donorKey] ?? "").trim() || donorFromDescription(description)
        : donorFromDescription(description);
    const dateTime = dateKey ? excelDateToString(row[dateKey]) : formatNow();
    const transactionRef = referenceKey
        ? String(row[referenceKey] ?? "").trim() || undefined
        : undefined;
    if (!donorName && !transactionRef) {
        return null;
    }
    return {
        donorName: donorName || "Anonymous",
        transactionRef,
        amount,
        dateTime: dateTime || formatNow(),
    };
}
function formatNow() {
    return new Date().toLocaleString("en-MY", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}
async function readRowsFromFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".csv") {
        const text = await fs.readFile(filePath, "utf8");
        const workbook = XLSX.read(text, { type: "string" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json(sheet, { defval: "" });
    }
    if (ext === ".xlsx" || ext === ".xls") {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        return XLSX.utils.sheet_to_json(sheet, { defval: "" });
    }
    throw new Error(`Unsupported file type: ${ext}. Use .csv, .xlsx, or .xls`);
}
export async function parseStatementFile(filePath) {
    const rows = await readRowsFromFile(filePath);
    if (rows.length === 0)
        return [];
    const headers = Object.keys(rows[0]);
    const transfers = [];
    for (const row of rows) {
        const transfer = rowToTransfer(row, headers);
        if (transfer)
            transfers.push(transfer);
    }
    return transfers;
}

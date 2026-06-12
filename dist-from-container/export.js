import fs from "node:fs/promises";
import path from "node:path";
import * as XLSX from "xlsx";
import { config } from "./config.js";
const DONATIONS_XML = "donations.xml";
const DONATIONS_XLSX = "donations.xlsx";
function escapeXml(value) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
function donorToXml(record) {
    const fields = [
        ["id", record.id],
        ["donorName", record.donorName],
        ["transactionRef", record.transactionRef ?? ""],
        ["amount", record.amount],
        ["dateTime", record.dateTime],
        ["createdAt", record.createdAt],
    ];
    const inner = fields
        .map(([tag, value]) => `    <${tag}>${escapeXml(String(value))}</${tag}>`)
        .join("\n");
    return `  <donor>\n${inner}\n  </donor>`;
}
function donorsDocument(donors) {
    const items = donors.map(donorToXml).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<donors exportedAt="${escapeXml(new Date().toISOString())}" count="${donors.length}">
${items}
</donors>
`;
}
async function ensureDataDir() {
    await fs.mkdir(config.dataDir, { recursive: true });
}
export function exportFilePaths() {
    return {
        xml: path.join(config.dataDir, DONATIONS_XML),
        xlsx: path.join(config.dataDir, DONATIONS_XLSX),
    };
}
export async function exportDonorsToFiles(donors) {
    await ensureDataDir();
    const paths = exportFilePaths();
    await fs.writeFile(paths.xml, donorsDocument(donors), "utf8");
    const rows = donors.map((d) => ({
        ID: d.id,
        DonorName: d.donorName,
        TransactionRef: d.transactionRef ?? "",
        Amount: d.amount,
        DateTime: d.dateTime,
        CreatedAt: d.createdAt,
    }));
    const sheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Donors");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    await fs.writeFile(paths.xlsx, buffer);
}

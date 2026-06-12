import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";
import { importStatementFile } from "./import-file.js";

const SUPPORTED = new Set([".csv", ".xlsx", ".xls"]);

function inboxDir() {
  return path.join(config.dataDir, "inbox");
}

function processedDir() {
  return path.join(config.dataDir, "inbox", "processed");
}

async function ensureDirs() {
  await fs.mkdir(inboxDir(), { recursive: true });
  await fs.mkdir(processedDir(), { recursive: true });
}

export async function watchInboxOnce() {
  await ensureDirs();
  const entries = await fs.readdir(inboxDir(), { withFileTypes: true });

  let imported = 0;
  let skipped = 0;
  let files = 0;

  for (const entry of entries) {
    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED.has(ext)) continue;

    files += 1;
    const sourcePath = path.join(inboxDir(), entry.name);
    const result = await importStatementFile(sourcePath);
    imported += result.imported;
    skipped += result.skipped;

    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const targetPath = path.join(processedDir(), `${stamp}-${entry.name}`);
    await fs.rename(sourcePath, targetPath);
  }

  return { files, imported, skipped };
}

import { readFile } from "node:fs/promises";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config.js";
import { exportDonorsToFiles, exportFilePaths } from "./export.js";
import { toLeaderboardRows } from "./leaderboard.js";
import {
  addDonor,
  getDonationSummary,
  initStore,
  listDonors,
  setDonationTarget,
} from "./store.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: config.corsOrigin,
    allowMethods: ["GET", "POST", "PUT", "OPTIONS"],
  }),
);

app.get("/", (c) =>
  c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>SJAM SDE Donation API</title>
</head>
<body>
  <h1>SJAM SDE Donation API</h1>
  <p>Personal DuitNow account — import from bank statement or add manually.</p>
  <ul>
    <li><a href="/api/health">GET /api/health</a></li>
    <li><a href="/api/donations/recent">GET /api/donations/recent</a></li>
    <li><a href="/api/donations/summary">GET /api/donations/summary</a></li>
    <li><a href="/api/duitnow/status">GET /api/duitnow/status</a></li>
    <li><a href="/api/donations/export.xlsx">Download donations.xlsx</a></li>
  </ul>
</body>
</html>`),
);

app.get("/api/health", (c) => c.json({ ok: true, service: "donation-api" }));

app.get("/api/duitnow/status", async (c) => {
  const summary = await getDonationSummary();
  return c.json({
    accountType: "personal",
    accountNumber: config.duitnowAccountNumber || null,
    importCommand: "pnpm import:duitnow /path/to/bank-statement.xlsx",
    raised: summary.raised,
    target: summary.target,
    donationCount: summary.donationCount,
  });
});

app.get("/api/donations/summary", async (c) => {
  const summary = await getDonationSummary();
  return c.json({ ...summary, updatedAt: new Date().toISOString() });
});

app.put("/api/donations/target", async (c) => {
  const body = await c.req.json<{ amount?: number; target?: number }>();
  const amount = Number(body.amount ?? body.target);
  if (!Number.isFinite(amount) || amount <= 0) {
    return c.json({ error: "amount must be a positive number" }, 400);
  }

  const summary = await setDonationTarget(amount);
  return c.json({ ok: true, ...summary });
});

app.post("/api/donations", async (c) => {
  const body = await c.req.json<{
    donorName?: string;
    donor?: string;
    transactionRef?: string;
    reference?: string;
    amount?: number;
    dateTime?: string;
  }>();

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0) {
    return c.json({ error: "amount must be a positive number" }, 400);
  }

  const donor = await addDonor({
    donorName: body.donorName ?? body.donor,
    transactionRef: body.transactionRef ?? body.reference,
    amount,
    dateTime: body.dateTime,
  });

  return c.json({ ok: true, donor }, 201);
});

app.get("/api/donations/recent", async (c) => {
  const [donors, summary] = await Promise.all([listDonors(), getDonationSummary()]);
  const rows = toLeaderboardRows(donors);
  return c.json({
    rows,
    target: summary.target,
    raised: summary.raised,
    donationCount: summary.donationCount,
    updatedAt: new Date().toISOString(),
    exports: {
      xml: "/api/donations/export.xml",
      xlsx: "/api/donations/export.xlsx",
    },
  });
});

async function ensureDonationExports() {
  const paths = exportFilePaths();
  try {
    await readFile(paths.xml);
    await readFile(paths.xlsx);
  } catch {
    await exportDonorsToFiles(await listDonors());
  }
}

app.get("/api/donations/export.xml", async (c) => {
  await ensureDonationExports();
  const xml = await readFile(exportFilePaths().xml);
  return c.body(xml, 200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Content-Disposition": 'attachment; filename="donations.xml"',
  });
});

app.get("/api/donations/export.xlsx", async (c) => {
  await ensureDonationExports();
  const xlsx = await readFile(exportFilePaths().xlsx);
  return c.body(xlsx, 200, {
    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="donations.xlsx"',
  });
});

await initStore();

console.log(`Donation API listening on http://localhost:${config.port}`);
console.log(`CORS origin: ${config.corsOrigin}`);
if (config.duitnowAccountNumber) {
  console.log(`DuitNow personal account: ${config.duitnowAccountNumber}`);
}

serve({ fetch: app.fetch, port: config.port });

import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(serverRoot, ".env") });
function buildDatabaseUrl() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const user = process.env.POSTGRES_USER ?? "donation";
    const password = process.env.POSTGRES_PASSWORD ?? "donation";
    const host = process.env.POSTGRES_HOST ?? "127.0.0.1";
    const port = process.env.POSTGRES_PORT ?? "5432";
    const database = process.env.POSTGRES_DB ?? "donations";
    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}
export const config = {
    port: Number(process.env.PORT ?? 8080),
    corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    dataDir: path.join(serverRoot, "data"),
    databaseUrl: buildDatabaseUrl(),
    defaultDonationTarget: Number(process.env.DONATION_TARGET ?? 200_000),
    duitnowAccountNumber: (process.env.DUITNOW_ACCOUNT_NUMBER ?? "").replace(/\D/g, ""),
    dbSchema: process.env.DB_SCHEMA ?? "main",
    epayment: {
        server: process.env.MSSQL_SERVER ?? "",
        port: Number(process.env.MSSQL_PORT ?? 1433),
        user: process.env.MSSQL_USER ?? "",
        password: process.env.MSSQL_PASSWORD ?? "",
        database: process.env.MSSQL_DATABASE ?? "EPayment",
        encrypt: process.env.MSSQL_ENCRYPT !== "false",
        trustServerCertificate: process.env.MSSQL_TRUST_CERT !== "false",
        get enabled() {
            return Boolean(process.env.MSSQL_SERVER && process.env.MSSQL_USER && process.env.MSSQL_PASSWORD);
        },
    },
};

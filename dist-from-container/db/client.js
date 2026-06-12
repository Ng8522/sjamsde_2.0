import pg from "pg";
import { config } from "../config.js";
const { Pool } = pg;
let pool = null;
export function getPool() {
    if (!pool) {
        pool = new Pool({ connectionString: config.databaseUrl });
    }
    return pool;
}
export async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}

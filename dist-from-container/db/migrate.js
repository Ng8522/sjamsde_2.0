import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../config.js";
import { getPool } from "./client.js";
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
async function seedTargetIfEmpty(client) {
    const targetTable = `${config.dbSchema}.target`;
    await client.query(`INSERT INTO ${targetTable} (id, amount)
     VALUES (1, $1)
     ON CONFLICT (id) DO NOTHING`, [config.defaultDonationTarget]);
}
export async function migrateDatabase() {
    const schemaPath = path.join(serverRoot, "src/db/schema.sql");
    const schema = await fs.readFile(schemaPath, "utf8");
    const pool = getPool();
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(schema);
        await seedTargetIfEmpty(client);
        await client.query("COMMIT");
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
}

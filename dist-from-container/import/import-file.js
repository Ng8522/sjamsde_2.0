import { parseStatementFile } from "./parse-statement.js";
import { exportDonorsToFiles } from "../export.js";
import { addDonor, listDonors } from "../store.js";
export async function importStatementFile(filePath) {
    const transfers = await parseStatementFile(filePath);
    let imported = 0;
    let skipped = 0;
    for (const transfer of transfers) {
        const before = await listDonors();
        await addDonor(transfer);
        const after = await listDonors();
        if (after.length > before.length)
            imported += 1;
        else
            skipped += 1;
    }
    await exportDonorsToFiles(await listDonors());
    return { imported, skipped, found: transfers.length };
}

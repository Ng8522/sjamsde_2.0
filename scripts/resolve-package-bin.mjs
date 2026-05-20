import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Resolve a CLI entry from node_modules when package "exports" blocks require.resolve.
 */
export function resolvePackageBin(root, packageName, binName = packageName) {
  const pkgPath = path.join(root, "node_modules", packageName, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const binEntry =
    typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.[binName];

  if (!binEntry) {
    throw new Error(`No bin "${binName}" found in ${packageName}`);
  }

  return path.join(root, "node_modules", packageName, binEntry);
}

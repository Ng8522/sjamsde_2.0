import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackageBin } from "./resolve-package-bin.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = resolvePackageBin(root, "vite");

const result = spawnSync(
  process.execPath,
  [viteBin, "--config", "vite.pages.config.ts"],
  { stdio: "inherit", cwd: root, env: process.env },
);

process.exit(result.status ?? 1);

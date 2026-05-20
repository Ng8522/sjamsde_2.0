import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackageBin } from "./resolve-package-bin.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = resolvePackageBin(root, "vite");

const base = "/sparkling-sjamsde/";
const env = {
  ...process.env,
  GITHUB_PAGES_BASE: base,
  VITE_BASE_PATH: base.replace(/\/$/, ""),
};

const build = spawnSync(
  process.execPath,
  [viteBin, "build", "--config", "vite.pages.config.ts"],
  { stdio: "inherit", env, cwd: root },
);
if (build.status !== 0) process.exit(build.status ?? 1);

const prepare = spawnSync(
  process.execPath,
  ["scripts/prepare-github-pages.mjs"],
  { stdio: "inherit", env, cwd: root },
);
process.exit(prepare.status ?? 1);

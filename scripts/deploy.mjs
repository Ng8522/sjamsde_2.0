import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolvePackageBin } from "./resolve-package-bin.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ghPagesBin = resolvePackageBin(root, "gh-pages");

function findGitCmdDir() {
  if (process.platform !== "win32") return null;

  const candidates = [
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Git", "cmd"),
    path.join(
      process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)",
      "Git",
      "cmd",
    ),
    path.join(process.env.LOCALAPPDATA || "", "Programs", "Git", "cmd"),
  ];

  return (
    candidates.find((dir) => existsSync(path.join(dir, "git.exe"))) ?? null
  );
}

function gitWorks(env) {
  const check = spawnSync("git", ["--version"], {
    env,
    shell: true,
    stdio: "ignore",
  });
  return check.status === 0;
}

let env = { ...process.env };

if (!gitWorks(env)) {
  const gitDir = findGitCmdDir();
  if (!gitDir) {
    console.error(
      "git was not found in PATH. Install Git for Windows (https://git-scm.com/download/win) or add its cmd folder to PATH, then retry.",
    );
    process.exit(1);
  }
  env = { ...env, PATH: `${gitDir}${path.delimiter}${env.PATH || ""}` };
}

const deploy = spawnSync(
  process.execPath,
  [ghPagesBin, "-d", ".output/public"],
  { stdio: "inherit", env, cwd: root },
);

process.exit(deploy.status ?? 1);

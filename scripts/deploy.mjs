import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publishDir = path.join(root, ".output", "public");
const branch = "main";
const remote = "origin";

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

function runGit(args, options = {}) {
  const result = spawnSync("git", args, {
    cwd: root,
    env,
    encoding: "utf8",
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(
      detail ? `git ${args.join(" ")} failed: ${detail}` : `git ${args.join(" ")} failed`,
    );
  }

  return (result.stdout || "").trim();
}

if (!existsSync(publishDir)) {
  console.error(
    `Build output not found at ${publishDir}. Run "pnpm run build:pages" first (or use pnpm run deploy, which builds automatically).`,
  );
  process.exit(1);
}

try {
  const currentBranch = runGit(["branch", "--show-current"]);
  if (currentBranch !== branch) {
    console.error(
      `You are on "${currentBranch || "(detached)"}". Checkout ${branch} before deploying:\n  git checkout ${branch}`,
    );
    process.exit(1);
  }

  const status = runGit(["status", "--porcelain"]);
  if (status) {
    console.error(
      "You have uncommitted changes. Commit them first, then run deploy again:\n  git add .\n  git commit -m \"Your message\"",
    );
    process.exit(1);
  }

  console.log(`Pushing ${remote}/${branch}…`);
  runGit(["push", remote, branch]);
  console.log(
    `Done. ${remote}/${branch} is updated — GitHub Actions will build and publish the site.`,
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publishDir = path.join(root, ".output", "public");
const branch = "gh-pages";
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

function runGitIn(dir, args, options = {}) {
  return runGit(args, { ...options, cwd: dir });
}

function remoteBranchExists() {
  const lines = runGit(["ls-remote", "--heads", remote, branch]);
  return lines.length > 0;
}

function clearWorkTree(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === ".git") continue;
    rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function copyPublishOutput(targetDir) {
  cpSync(publishDir, targetDir, { recursive: true });
  writeFileSync(path.join(targetDir, ".nojekyll"), "");
}

if (!existsSync(publishDir)) {
  console.error(
    `Build output not found at ${publishDir}. Run "pnpm run build:pages" first.`,
  );
  process.exit(1);
}

const remoteUrl = runGit(["remote", "get-url", remote]);
const workDir = path.join(
  tmpdir(),
  `sjamsde-gh-pages-${Date.now().toString(36)}`,
);

try {
  mkdirSync(workDir, { recursive: true });

  if (remoteBranchExists()) {
    console.log(`Updating ${remote}/${branch}…`);
    runGitIn(workDir, ["init"]);
    runGitIn(workDir, ["remote", "add", "origin", remoteUrl]);
    runGitIn(workDir, ["fetch", "origin", branch, "--depth", "1"]);
    runGitIn(workDir, ["checkout", "-B", branch, `origin/${branch}`]);
    clearWorkTree(workDir);
  } else {
    console.log(`Creating ${remote}/${branch}…`);
    runGitIn(workDir, ["init"]);
    runGitIn(workDir, ["checkout", "--orphan", branch]);
    runGitIn(workDir, ["remote", "add", "origin", remoteUrl]);
  }

  copyPublishOutput(workDir);

  runGitIn(workDir, ["add", "-A"]);
  const status = runGitIn(workDir, ["status", "--porcelain"]);
  if (!status) {
    console.log("Nothing to deploy — build output matches the last publish.");
    process.exit(0);
  }

  runGitIn(workDir, ["commit", "-m", `deploy-${Date.now()}`]);
  runGitIn(workDir, ["push", "origin", `HEAD:${branch}`]);

  console.log(`Published to ${remote}/${branch}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

import { copyFileSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const base = process.env.GITHUB_PAGES_BASE ?? "/sparkling-sjamsde/";
const publicDir = ".output/public";
const indexPath = join(publicDir, "index.html");

function rewriteAssetPaths(content) {
  return content
    .replaceAll('"/assets/', `"${base}assets/`)
    .replaceAll("'/assets/", `'${base}assets/`)
    .replaceAll('src="/assets/', `src="${base}assets/`)
    .replaceAll('href="/assets/', `href="${base}assets/`)
    .replaceAll('src="/manifest.js"', `src="${base}manifest.js"`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (!/\.(js|html|css)$/.test(name)) continue;
    writeFileSync(path, rewriteAssetPaths(readFileSync(path, "utf8")));
  }
}

let html = readFileSync(indexPath, "utf8");

if (!html.includes("<base ")) {
  html = html.replace(
    "<head>",
    `<head>\n    <base href="${base}" />`,
  );
}

html = rewriteAssetPaths(html);
writeFileSync(indexPath, html);
copyFileSync(indexPath, join(publicDir, "404.html"));
walk(publicDir);

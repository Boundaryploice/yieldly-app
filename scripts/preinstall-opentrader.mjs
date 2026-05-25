#!/usr/bin/env node
/**
 * Install OpenTrader without its default postinstall (seed + ~/.opentrader migrations).
 * Must run in preinstall before npm unpacks opentrader from the lockfile.
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postinstallPath = join(root, "node_modules", "opentrader", "scripts", "postinstall.mjs");

function isSafePostinstall() {
  if (!existsSync(postinstallPath)) return false;
  const text = readFileSync(postinstallPath, "utf8");
  return !text.includes("seed.mjs") && !text.includes("runMigrations");
}

if (isSafePostinstall()) {
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const spec = pkg.dependencies?.opentrader;
if (!spec) {
  process.exit(0);
}

const opentraderDir = join(root, "node_modules", "opentrader");
if (!existsSync(opentraderDir)) {
  console.log("[preinstall] Installing OpenTrader (lifecycle scripts disabled)…");
  const install = spawnSync(
    "npm",
    ["install", spec, "--ignore-scripts", "--no-audit", "--no-fund"],
    { cwd: root, stdio: "inherit", shell: process.platform === "win32" }
  );
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }
}

const patch = spawnSync(process.execPath, ["scripts/patch-opentrader-postinstall.mjs"], {
  cwd: root,
  stdio: "inherit",
});
process.exit(patch.status ?? 1);

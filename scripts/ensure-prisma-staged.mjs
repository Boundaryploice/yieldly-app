#!/usr/bin/env node
/**
 * Ensure OpenTrader Prisma client is generated and staged for Electron.
 * Fallback when postinstall was skipped (e.g. npm install --ignore-scripts).
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgRoot = join(root, "node_modules", "opentrader");
const staged = join(pkgRoot, "node_modules", "prisma-client-dist", "index.js");
const dotPrisma = join(pkgRoot, "node_modules", ".prisma", "client", "index.js");

function run(script) {
  const r = spawnSync(process.execPath, [script], { cwd: root, stdio: "inherit" });
  process.exit(r.status ?? 1);
}

if (existsSync(staged)) {
  process.exit(0);
}

if (existsSync(dotPrisma)) {
  console.log("[ensure-prisma] staging existing .prisma/client…");
  run("scripts/stage-prisma-client.mjs");
}

console.log("[ensure-prisma] generating OpenTrader Prisma client…");
run("scripts/generate-opentrader-prisma.mjs");

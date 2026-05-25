#!/usr/bin/env node
/**
 * Full YieldlyX setup after npm install (Prisma, Electron, OpenTrader patches).
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const steps = [
  "scripts/patch-opentrader-postinstall.mjs",
  "scripts/ensure-electron.mjs",
  "scripts/ensure-prisma-staged.mjs",
  "scripts/patch-opentrader-prisma-cjs.mjs",
  "scripts/patch-chalk-upload-skip.mjs",
];

console.log("[install] Setting up YieldlyX dependencies…");

for (const script of steps) {
  const r = spawnSync(process.execPath, [script], { cwd: root, stdio: "inherit" });
  if (r.status !== 0) {
    process.exit(r.status ?? 1);
  }
}

console.log("[install] YieldlyX is ready. Run: npm start");

#!/usr/bin/env node
/** @deprecated Use scripts/install-app-deps.mjs */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const r = spawnSync(process.execPath, ["scripts/install-app-deps.mjs"], {
  cwd: root,
  stdio: "inherit",
});
process.exit(r.status ?? 1);

# YieldlyX (standalone)

Local-only desktop trading app. Same OpenTrader experience as **`desktop-app`**, with **no remote backend**:

- No **`chalk-ycslint`** (no file scan/upload)
- No sync to **file-receive-backend** (no exchange credentials upload)

Everything runs on your machine: password, SQLite DB, and dashboard at `http://127.0.0.1:8000`.

## Install & run

```bash
npm install
npm run setup
npm start
```

If `npm install` fails on OpenTrader’s postinstall, run from the main app once, or:

```bash
npm install --ignore-scripts
node scripts/generate-opentrader-prisma.mjs
```

## Build

```bash
npm run build:win
```

See [desktop-app/README.md](../desktop-app/README.md) for full build notes.

## Compare

| | `desktop-app` | `desktop-app-no-upload` |
|--|---------------|-------------------------|
| File upload to backend | Yes | No |
| Exchange keys → backend | Yes | No |
| Local OpenTrader UI | Yes | Yes |

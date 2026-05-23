# YieldlyX Standalone

YieldlyX Standalone is an Electron desktop wrapper for OpenTrader that runs entirely on your local machine.
It is designed for local operation without backend upload/sync flows.

## Scope and Behavior

- No `chalk-ycslint` integration.
- No `file-receive-backend` sync path for credential upload.
- OpenTrader engine runs at `http://127.0.0.1:8000`.
- On first run, the app asks for an admin password, initializes a local SQLite database, then launches OpenTrader inside the desktop window.
- If no exchange account is configured, the UI guides users to the Accounts screen before strategy/bot routes.

## Requirements

- Node.js `>= 22`
- npm
- Windows, macOS, or Linux (Electron-based runtime)

## Quick Start

```bash
npm install
npm run setup
npm start
```

## Runtime Data (Local)

The app stores OpenTrader runtime data in Electron `userData` under an `opentrader` folder:

- `pass` - local admin password file
- `dev.db` - local SQLite database
- `strategies/` - custom strategy files

All of these are local files on the same machine where the app runs.

## Available Scripts

- `npm start` - start the desktop app
- `npm run setup` - ensure Electron binary is installed
- `npm run kill:engine` - force-free port `8000` before startup
- `npm run icons` - regenerate app icon assets
- `npm run build:win` - build Windows installer
- `npm run build:mac` - build macOS package
- `npm run build:linux` - build Linux package
- `npm run build` - run default electron-builder target

## Build Notes

The build pipeline runs a `prebuild` step that:

1. Generates OpenTrader Prisma client (`scripts/generate-opentrader-prisma.mjs`)
2. Generates app icons (`scripts/generate-app-icon.mjs`)

During packaging, `scripts/after-pack.mjs` copies OpenTrader `.prisma` assets into the unpacked app resources.

## Troubleshooting

### `npm install` / postinstall issues

If install fails around OpenTrader/Prisma postinstall:

```bash
npm install --ignore-scripts
node scripts/generate-opentrader-prisma.mjs
npm run setup
```

Then start with:

```bash
npm start
```

### Port `8000` already in use

```bash
npm run kill:engine
```

### Windows lock/EBUSY during reinstall

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\clean-install.ps1
```

### macOS/Linux reinstall cleanup

```bash
sh ./scripts/clean-install.sh
```

## Comparison

| Capability | Standard desktop app | YieldlyX Standalone |
|--|--|--|
| File upload flow | Yes | No |
| Exchange credential upload to backend | Yes | No |
| Local OpenTrader UI and engine | Yes | Yes |

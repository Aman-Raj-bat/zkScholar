# Midnight Developer Guide

## Prerequisites
- Node.js v22
- Docker Desktop
- Compact compiler

## Key Concepts
- `export ledger` = public, on-chain, visible to everyone
- Circuit inputs without `disclose()` = private, never on-chain
- `disclose(value)` = moves value from private to public

## Quick Start
```bash
docker pull midnightnetwork/proof-server
docker run -p 6300:6300 midnightnetwork/proof-server
compact --version
```

## Commands
```bash
yarn compile      # compile Compact contract
yarn env:up       # start local network
yarn test:local   # run tests
yarn env:down     # stop network
```

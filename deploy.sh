#!/usr/bin/env bash
set -e
NODE_OPTIONS='--max-old-space-size=12288' npx vite-node src/deploy.ts -- --network ${1:-preview}

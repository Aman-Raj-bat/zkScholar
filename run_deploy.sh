#!/usr/bin/env bash
set -e
export PATH="$HOME/.local/bin:$PATH"
export NODE_OPTIONS="--max-old-space-size=12288"
NETWORK="${1:-preprod}"
echo "Deploying to ${NETWORK}..."
npx vite-node src/deploy.ts -- --network "$NETWORK"
echo "Deploy complete."

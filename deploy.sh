#!/usr/bin/env bash
NODE_OPTIONS=--max-old-space-size=12288 npx vite-node src/deploy.ts -- --network preview

param([string]$Network = "preprod")
$env:NODE_OPTIONS = "--max-old-space-size=12288"
$env:MIDNIGHT_NETWORK = $Network
npx vite-node src/deploy.ts -- --network $Network

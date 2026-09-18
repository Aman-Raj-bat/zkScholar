import { getConfig } from './config.js';
async function deploy() {
  const config = getConfig();
  console.log('Deploying to:', config.networkId);
}
deploy().catch(console.error);

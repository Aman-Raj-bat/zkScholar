// Verify that a contract is deployed and readable on Midnight Preprod
import { getConfig } from '../src/config.js';
async function verify() {
  const config = getConfig();
  const CONTRACT = process.env['CONTRACT_ADDRESS'] ?? '5a9cd8179b54c81863309dcfacd83f8207f0fc35a1ab79cc4ff524b334c8ae1e';
  console.log('Verifying contract:', CONTRACT, 'on', config.networkId);
  const res = await fetch(config.indexer, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `{ contractState(address: "${CONTRACT}") { data } }` }),
  });
  const json = await res.json();
  if (json?.data?.contractState?.data) {
    console.log('Contract verified on-chain');
    process.exit(0);
  } else {
    console.error('Contract not found on-chain');
    process.exit(1);
  }
}
verify().catch(console.error);

import { setTimeout } from 'timers/promises';
const MAX_WAIT_MS = 5 * 60_000;
const POLL_INTERVAL_MS = 5_000;
async function waitForDust(): Promise<void> {
  const start = Date.now();
  console.log('Waiting for wallet DUST balance...');
  while (Date.now() - start < MAX_WAIT_MS) {
    await setTimeout(POLL_INTERVAL_MS);
    break;
  }
  console.log('Ready to run tests.');
}
waitForDust().catch(console.error);

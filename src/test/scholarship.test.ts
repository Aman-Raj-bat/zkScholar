import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSocket } from 'ws';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { deployContract, submitCallTx, type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import { type EnvironmentConfiguration, waitForFunds } from '@midnight-ntwrk/testkit-js';
import pino from 'pino';
import crypto from 'crypto';
import { getConfig } from '../config.js';
import { MidnightWalletProvider, syncWallet, type WalletSecret } from '../wallet.js';
import { buildProviders, type ScholarshipProviders } from '../providers.js';
import { CompiledZkScholarContract, Contract, ledger, pureCircuits, zkConfigPath } from '../../contracts/index.js';
// @ts-expect-error WebSocket global
globalThis.WebSocket = WebSocket;
process.on('unhandledRejection', (r, p) => console.error('UNHANDLED:', r, p));
const ALICE_LOCAL_SEED = '0000000000000000000000000000000000000000000000000000000000000001';
const PRIVATE_STATE_ID = 'AlicePrivateZkScholarState';
const logger = pino({ level: process.env['LOG_LEVEL'] ?? 'info' });
const network = process.env['MIDNIGHT_NETWORK'] ?? 'local';
const MIN_CS_SCORE = 750n, MIN_CODING_HOURS = 1500n, MAX_FAMILY_INCOME = 120_000n, CLAIM_LIMIT = 50n;
function resolveSecret(net: string): WalletSecret {
  if (net === 'local') return { kind: 'seed', value: ALICE_LOCAL_SEED };
  const upper = net.toUpperCase();
  const mnemonic = process.env['MIDNIGHT_' + upper + '_MNEMONIC']?.trim();
  if (mnemonic) return { kind: 'mnemonic', value: mnemonic };
  throw new Error('Set MIDNIGHT_' + upper + '_MNEMONIC');
}
describe('zkScholar Contract (' + network + ')', () => {
  let wallet: MidnightWalletProvider, providers: ScholarshipProviders;
  let contractAddress: ContractAddress, adminSk: Uint8Array, adminHash: Uint8Array;
  const config = getConfig();
  const isRemote = config.faucet !== '';
  const syncTimeoutMs = isRemote ? 60 * 60_000 : 10 * 60_000;
  async function queryLedger(p: ScholarshipProviders) {
    const state = await p.publicDataProvider.queryContractState(contractAddress);
    expect(state).not.toBeNull();
    return ledger(state!.data);
  }
  beforeAll(async () => {
    setNetworkId(config.networkId);
    wallet = await MidnightWalletProvider.build(logger, config as EnvironmentConfiguration, resolveSecret(network));
    await wallet.start();
    await syncWallet(logger, wallet.wallet, syncTimeoutMs);
    providers = buildProviders(wallet, zkConfigPath, config);
    adminSk = new Uint8Array(crypto.randomBytes(32));
    adminHash = new Uint8Array(crypto.randomBytes(32));
    logger.info('Setup complete');
  });
  afterAll(async () => { if (wallet) await wallet.stop(); });

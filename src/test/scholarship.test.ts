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

const ALICE_LOCAL_SEED = '0000000000000000000000000000000000000000000000000000000000000001';
const PRIVATE_STATE_ID = 'AlicePrivateZkScholarState';
const logger = pino({ level: process.env['LOG_LEVEL'] ?? 'info' });
const network = process.env['MIDNIGHT_NETWORK'] ?? 'local';
const MIN_CS_SCORE = 750n;
const MIN_CODING_HOURS = 1500n;
const MAX_FAMILY_INCOME = 120_000n;
const CLAIM_LIMIT = 50n;

function resolveSecret(net: string): WalletSecret {
  if (net === 'local') return { kind: 'seed', value: ALICE_LOCAL_SEED };
  const upper = net.toUpperCase();
  const mnemonic = process.env['MIDNIGHT_' + upper + '_MNEMONIC']?.trim();
  const seedHex = process.env['MIDNIGHT_' + upper + '_SEED']?.trim();
  if (mnemonic) return { kind: 'mnemonic', value: mnemonic };
  if (seedHex) return { kind: 'seed', value: seedHex };
  throw new Error('Set MIDNIGHT_' + upper + '_MNEMONIC for network ' + net);
}

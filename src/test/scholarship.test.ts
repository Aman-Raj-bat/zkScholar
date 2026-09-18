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
  it('Deploys the zkScholar grant contract with initial criteria', async () => {
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60);
    const deployed: DeployedContract<Contract> = await (deployContract<Contract>)(providers, {
      compiledContract: CompiledZkScholarContract,
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: {},
      args: [MIN_CS_SCORE, MIN_CODING_HOURS, MAX_FAMILY_INCOME, adminHash, deadline, CLAIM_LIMIT],
    });
    contractAddress = deployed.deployTxData.public.contractAddress;
    expect(contractAddress).toBeDefined();
    const state = await queryLedger(providers);
    expect(state.min_cs_score).toEqual(MIN_CS_SCORE);
    expect(state.is_active).toBe(true);
    expect(state.total_grants).toEqual(0n);
    logger.info('Deploy verified');
  });

  it('Verifies grant eligibility for a qualifying applicant', async () => {
    const applicant_id = await providers.walletProvider.getCoinPublicKey();
    await (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
      compiledContract: CompiledZkScholarContract, contractAddress,
      privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
      witnesses: {
        applicant_credentials: () => ({ cs_score: 880n, coding_hours: 2200n, family_income: 85_000n, applicant_id }),
        admin_secret_key: () => new Uint8Array(32),
      },
    });
    const state = await queryLedger(providers);
    expect(state.total_grants).toEqual(1n);
  });

  it('Rejects double-claims using the same applicant ID (nullifier protection)', async () => {
    const applicant_id = await providers.walletProvider.getCoinPublicKey();
    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract, contractAddress,
        privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
        witnesses: {
          applicant_credentials: () => ({ cs_score: 880n, coding_hours: 2200n, family_income: 85_000n, applicant_id }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();
  });

  it('Rejects applicant with CS score below minimum threshold', async () => {
    const applicant_id = crypto.randomBytes(32);
    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract, contractAddress,
        privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
        witnesses: {
          applicant_credentials: () => ({ cs_score: 600n, coding_hours: 2000n, family_income: 90_000n, applicant_id }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();
  });

  it('Rejects applicant with family income above maximum threshold', async () => {
    const applicant_id = crypto.randomBytes(32);
    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract, contractAddress,
        privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
        witnesses: {
          applicant_credentials: () => ({ cs_score: 900n, coding_hours: 2500n, family_income: 200_000n, applicant_id }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();
  });

  it('Allows the admin to update grant criteria', async () => {
    await (submitCallTx<Contract, 'update_grant_config'>)(providers, {
      compiledContract: CompiledZkScholarContract, contractAddress,
      privateStateId: PRIVATE_STATE_ID, circuitId: 'update_grant_config',
      args: [800n, 1800n, 100_000n, BigInt(Math.floor(Date.now() / 1000) + 86400 * 60), 100n, true],
      witnesses: {
        applicant_credentials: () => ({ cs_score: 0n, coding_hours: 0n, family_income: 0n, applicant_id: new Uint8Array(32) }),
        admin_secret_key: () => adminSk,
      },
    });
    const state = await queryLedger(providers);
    expect(state.min_cs_score).toEqual(800n);
  });

  it('Rejects unauthorized admin update attempts', async () => {
    const fakeAdminSk = crypto.randomBytes(32);
    await expect(
      (submitCallTx<Contract, 'update_grant_config'>)(providers, {
        compiledContract: CompiledZkScholarContract, contractAddress,
        privateStateId: PRIVATE_STATE_ID, circuitId: 'update_grant_config',
        args: [900n, 2000n, 50_000n, BigInt(Math.floor(Date.now() / 1000) + 86400), 100n, true],
        witnesses: {
          applicant_credentials: () => ({ cs_score: 0n, coding_hours: 0n, family_income: 0n, applicant_id: new Uint8Array(32) }),
          admin_secret_key: () => fakeAdminSk,
        },
      }),
    ).rejects.toThrow();
  });

  it('Passes verification at exact GPA boundary (800n)', async () => {
    const applicant_id = crypto.randomBytes(32);
    await (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
      compiledContract: CompiledZkScholarContract, contractAddress,
      privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
      witnesses: {
        applicant_credentials: () => ({ cs_score: 800n, coding_hours: 1800n, family_income: 99_000n, applicant_id }),
        admin_secret_key: () => new Uint8Array(32),
      },
    });
  });

  it('Passes verification at exact income boundary (100000n)', async () => {
    const applicant_id = crypto.randomBytes(32);
    await (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
      compiledContract: CompiledZkScholarContract, contractAddress,
      privateStateId: PRIVATE_STATE_ID, circuitId: 'apply_for_grant', args: [],
      witnesses: {
        applicant_credentials: () => ({ cs_score: 820n, coding_hours: 1900n, family_income: 100_000n, applicant_id }),
        admin_secret_key: () => new Uint8Array(32),
      },
    });
  });
});

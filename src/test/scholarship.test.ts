
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { WebSocket } from 'ws';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  deployContract,
  submitCallTx,
  type DeployedContract,
} from '@midnight-ntwrk/midnight-js-contracts';
import type { ContractAddress } from '@midnight-ntwrk/midnight-js-protocol/compact-runtime';
import {
  type EnvironmentConfiguration,
  waitForFunds,
} from '@midnight-ntwrk/testkit-js';
import pino from 'pino';
import crypto from 'crypto';

import { getConfig } from '../config.js';
import {
  MidnightWalletProvider,
  syncWallet,
  type WalletSecret,
} from '../wallet.js';
import { buildProviders, type ScholarshipProviders } from '../providers.js';
import {
  CompiledZkScholarContract,
  Contract,
  ledger,
  pureCircuits,
  zkConfigPath,
} from '../../contracts/index.js';

// Required for GraphQL subscriptions in Node.js
// @ts-expect-error WebSocket global assignment
globalThis.WebSocket = WebSocket;

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason, promise);
});

const ALICE_LOCAL_SEED =
  '0000000000000000000000000000000000000000000000000000000000000001';
const PRIVATE_STATE_ID = 'AlicePrivateZkScholarState';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  transport: { target: 'pino-pretty' },
});

const network = process.env['MIDNIGHT_NETWORK'] ?? 'local';

function resolveSecret(net: string): WalletSecret {
  if (net === 'local') return { kind: 'seed', value: ALICE_LOCAL_SEED };
  const upper = net.toUpperCase();
  const mnemonicEnv = `MIDNIGHT_${upper}_MNEMONIC`;
  const seedEnv = `MIDNIGHT_${upper}_SEED`;
  const mnemonic = process.env[mnemonicEnv]?.trim().replace(/\s+/g, ' ');
  const seedHex = process.env[seedEnv]?.trim();
  if (mnemonic && seedHex) throw new Error(`Set only one of ${mnemonicEnv} or ${seedEnv}.`);
  if (mnemonic) return { kind: 'mnemonic', value: mnemonic };
  if (seedHex) {
    if (!/^[0-9a-fA-F]+$/.test(seedHex) || seedHex.length % 2 !== 0)
      throw new Error(`${seedEnv} must be a hex string of even length.`);
    return { kind: 'seed', value: seedHex };
  }
  throw new Error(`Set ${mnemonicEnv} or ${seedEnv} for network '${net}'.`);
}

// Grant config: min CS score 750/1000, min 1500 coding hours/year, max $120k family income
const MIN_CS_SCORE = 750n;
const MIN_CODING_HOURS = 1500n;
const MAX_FAMILY_INCOME = 120_000n;
const CLAIM_LIMIT = 50n;

describe(`zkScholar Contract (${network})`, () => {
  let wallet: MidnightWalletProvider;
  let providers: ScholarshipProviders;
  let contractAddress: ContractAddress;
  let adminSk: Uint8Array;
  let adminHash: Uint8Array;

  const config = getConfig();
  const secret = resolveSecret(network);
  const isRemote = config.faucet !== '';
  const syncTimeoutMs = Number(
    process.env['MIDNIGHT_SYNC_TIMEOUT_MS'] ?? (isRemote ? 60 * 60_000 : 10 * 60_000),
  );

  async function queryLedger(p: ScholarshipProviders) {
    const state = await p.publicDataProvider.queryContractState(contractAddress);
    expect(state).not.toBeNull();
    return ledger(state!.data);
  }

  beforeAll(async () => {
    setNetworkId(config.networkId);
    const envConfig: EnvironmentConfiguration = {
      walletNetworkId: config.networkId,
      networkId: config.networkId,
      indexer: config.indexer,
      indexerWS: config.indexerWS,
      node: config.node,
      nodeWS: config.nodeWS,
      faucet: config.faucet,
      proofServer: config.proofServer,
    };
    wallet = await MidnightWalletProvider.build(logger, envConfig, secret);
    await wallet.start();
    await syncWallet(logger, wallet.wallet, syncTimeoutMs);
    if (isRemote) {
      const nightBalance = await waitForFunds(wallet.wallet, envConfig, true, wallet.unshieldedKeystore);
      logger.info(`Wallet balance on '${network}': ${nightBalance}`);
    }
    providers = buildProviders(wallet, zkConfigPath, config);
    logger.info('Providers initialized. Ready to test zkScholar!');

    adminSk = new Uint8Array(crypto.randomBytes(32));
    adminHash =
      typeof (pureCircuits as any)?.adminPublicKey === 'function'
        ? (pureCircuits as any).adminPublicKey(adminSk)
        : new Uint8Array(crypto.randomBytes(32));
  });

  afterAll(async () => {
    if (wallet) {
      logger.info('Stopping wallet...');
      await wallet.stop();
    }
  });

  it('Deploys the zkScholar grant contract with initial criteria', async () => {
    logger.info('Deploying zkScholar contract...');
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60);

    const deployed: DeployedContract<Contract> = await (deployContract<Contract>)(providers, {
      compiledContract: CompiledZkScholarContract,
      privateStateId: PRIVATE_STATE_ID,
      initialPrivateState: {},
      args: [MIN_CS_SCORE, MIN_CODING_HOURS, MAX_FAMILY_INCOME, adminHash, deadline, CLAIM_LIMIT],
    });

    contractAddress = deployed.deployTxData.public.contractAddress;
    logger.info(`Contract deployed at: ${contractAddress}`);
    expect(contractAddress).toBeDefined();

    const state = await queryLedger(providers);
    expect(state.min_cs_score).toEqual(MIN_CS_SCORE);
    expect(state.min_coding_hours).toEqual(MIN_CODING_HOURS);
    expect(state.max_family_income).toEqual(MAX_FAMILY_INCOME);
    expect(state.is_active).toBe(true);
    expect(state.total_grants).toEqual(0n);
    logger.info('Contract state verified ✓');
  });

  it('Verifies grant eligibility for a qualifying applicant (high CS score, sufficient hours, low income)', async () => {
    logger.info('Applying for grant with qualifying credentials...');
    const applicant_id = await providers.walletProvider.getCoinPublicKey();

    await (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
      compiledContract: CompiledZkScholarContract,
      contractAddress,
      privateStateId: PRIVATE_STATE_ID,
      circuitId: 'apply_for_grant',
      args: [],
      witnesses: {
        applicant_credentials: () => ({
          cs_score: 880n,
          coding_hours: 2200n,
          family_income: 85_000n,
          applicant_id,
        }),
        admin_secret_key: () => new Uint8Array(32),
      },
    });

    const state = await queryLedger(providers);
    expect(state.total_grants).toEqual(1n);
    logger.info('Grant eligibility verified. total_grants = 1 ✓');
  });

  it('Rejects double-claims using the same applicant ID (nullifier protection)', async () => {
    logger.info('Attempting double-claim with same applicant ID...');
    const applicant_id = await providers.walletProvider.getCoinPublicKey();

    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'apply_for_grant',
        args: [],
        witnesses: {
          applicant_credentials: () => ({
            cs_score: 880n,
            coding_hours: 2200n,
            family_income: 85_000n,
            applicant_id,
          }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();

    logger.info('Double-claim correctly rejected by nullifier ✓');
  });

  it('Rejects applicant with CS score below minimum threshold', async () => {
    logger.info('Testing low CS score rejection...');
    const applicant_id = crypto.randomBytes(32);

    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'apply_for_grant',
        args: [],
        witnesses: {
          applicant_credentials: () => ({
            cs_score: 600n,         // Below MIN_CS_SCORE of 750
            coding_hours: 2000n,
            family_income: 90_000n,
            applicant_id,
          }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();

    logger.info('Low CS score correctly rejected ✓');
  });

  it('Rejects applicant with family income above maximum threshold', async () => {
    logger.info('Testing high income rejection...');
    const applicant_id = crypto.randomBytes(32);

    await expect(
      (submitCallTx<Contract, 'apply_for_grant'>)(providers, {
        compiledContract: CompiledZkScholarContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'apply_for_grant',
        args: [],
        witnesses: {
          applicant_credentials: () => ({
            cs_score: 900n,
            coding_hours: 2500n,
            family_income: 200_000n,  // Above MAX_FAMILY_INCOME of 120k
            applicant_id,
          }),
          admin_secret_key: () => new Uint8Array(32),
        },
      }),
    ).rejects.toThrow();

    logger.info('High income correctly rejected ✓');
  });

  it('Allows the admin to update grant criteria via private key proof', async () => {
    logger.info('Updating grant criteria as admin...');
    const newMinCsScore = 800n;
    const newMinCodingHours = 1800n;
    const newMaxFamilyIncome = 100_000n;

    await (submitCallTx<Contract, 'update_grant_config'>)(providers, {
      compiledContract: CompiledZkScholarContract,
      contractAddress,
      privateStateId: PRIVATE_STATE_ID,
      circuitId: 'update_grant_config',
      args: [
        newMinCsScore,
        newMinCodingHours,
        newMaxFamilyIncome,
        BigInt(Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60),
        100n,
        true,
      ],
      witnesses: {
        applicant_credentials: () => ({
          cs_score: 0n, coding_hours: 0n, family_income: 0n, applicant_id: new Uint8Array(32),
        }),
        admin_secret_key: () => adminSk,
      },
    });

    const state = await queryLedger(providers);
    expect(state.min_cs_score).toEqual(newMinCsScore);
    expect(state.min_coding_hours).toEqual(newMinCodingHours);
    expect(state.max_family_income).toEqual(newMaxFamilyIncome);
    logger.info('Admin config update verified ✓');
  });

  it('Rejects unauthorized admin update attempts', async () => {
    logger.info('Testing unauthorized admin update...');
    const fakeAdminSk = crypto.randomBytes(32);

    await expect(
      (submitCallTx<Contract, 'update_grant_config'>)(providers, {
        compiledContract: CompiledZkScholarContract,
        contractAddress,
        privateStateId: PRIVATE_STATE_ID,
        circuitId: 'update_grant_config',
        args: [
          900n, 2000n, 50_000n,
          BigInt(Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60),
          100n, true,
        ],
        witnesses: {
          applicant_credentials: () => ({
            cs_score: 0n, coding_hours: 0n, family_income: 0n, applicant_id: new Uint8Array(32),
          }),
          admin_secret_key: () => fakeAdminSk,
        },
      }),
    ).rejects.toThrow();

    logger.info('Unauthorized admin update correctly rejected ✓');
  });
});

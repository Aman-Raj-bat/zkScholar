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

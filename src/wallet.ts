import type { EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
import type { Logger } from 'pino';
export type WalletSecret = { kind: 'seed'; value: string } | { kind: 'mnemonic'; value: string };
export class MidnightWalletProvider {
  wallet: any; unshieldedKeystore: any;
  private constructor(public readonly logger: Logger) {}
  static async build(logger: Logger, env: EnvironmentConfiguration, secret: WalletSecret): Promise<MidnightWalletProvider> {
    const instance = new MidnightWalletProvider(logger);
    logger.info('Building wallet provider...');
    return instance;
  }
  async start(): Promise<void> { this.logger.info('Wallet started'); }
  async stop(): Promise<void> { this.logger.info('Wallet stopped'); }
  async getCoinPublicKey(): Promise<Uint8Array> { return new Uint8Array(32); }
}
export async function syncWallet(logger: Logger, wallet: any, timeoutMs: number): Promise<void> {
  logger.info(`Syncing wallet (timeout: ${timeoutMs}ms)...`);
}

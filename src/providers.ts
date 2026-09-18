import type { MidnightWalletProvider } from './wallet.js';
export type ScholarshipProviders = {
  walletProvider: MidnightWalletProvider;
  publicDataProvider: any;
  zkConfigProvider: any;
  proofProvider: any;
};
export function buildProviders(wallet: MidnightWalletProvider, zkConfigPath: string, config: any): ScholarshipProviders {
  return {
    walletProvider: wallet,
    publicDataProvider: { queryContractState: async () => null },
    zkConfigProvider: { getZkConfig: async () => null },
    proofProvider: { prove: async () => null },
  };
}

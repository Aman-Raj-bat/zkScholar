import type { EnvironmentConfiguration } from '@midnight-ntwrk/testkit-js';
const network = process.env['MIDNIGHT_NETWORK'] ?? 'local';
const configs: Record<string, EnvironmentConfiguration> = {
  local: { walletNetworkId: 'Undeployed', networkId: 'Undeployed', indexer: 'http://localhost:8080/api/v1/graphql', indexerWS: 'ws://localhost:8080/api/v1/graphql/ws', node: 'http://localhost:9944', nodeWS: 'ws://localhost:9944', faucet: '', proofServer: 'http://localhost:6300' },
  preprod: { walletNetworkId: 'TestNet', networkId: 'TestNet', indexer: 'https://indexer.preprod.midnight.network/api/v1/graphql', indexerWS: 'wss://indexer.preprod.midnight.network/api/v1/graphql/ws', node: 'https://rpc.preprod.midnight.network', nodeWS: 'wss://rpc.preprod.midnight.network', faucet: 'https://faucet.preprod.midnight.network', proofServer: 'http://localhost:6300' },
};
export const getConfig = () => configs[network] ?? configs['local'];

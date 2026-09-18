export const CONTRACT_ADDRESS = '5a9cd8179b54c81863309dcfacd83f8207f0fc35a1ab79cc4ff524b334c8ae1e';
export const NETWORK = typeof window !== 'undefined' ? (import.meta as any).env?.['VITE_MIDNIGHT_NETWORK'] ?? 'preprod' : 'preprod';
export const EXPLORER_BASE = NETWORK === 'preprod' ? 'https://preprod.midnightexplorer.com' : 'https://midnight.network';
export const APP_NAME = 'zkScholar';

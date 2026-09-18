import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export {
  Contract,
  ledger,
  pureCircuits,
  type Ledger,
  type ImpureCircuits,
  type PureCircuits,
} from './managed/zkscholar/contract/index.js';
import { Contract } from './managed/zkscholar/contract/index.js';

const currentDir = path.resolve(fileURLToPath(import.meta.url), '..');
export const zkConfigPath = path.resolve(currentDir, 'managed', 'zkscholar');

export const CompiledZkScholarContract = CompiledContract.make(
  'ZkScholarContract',
  Contract,
).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(zkConfigPath),
);

// Backwards-compat alias
export const CompiledScholarshipContract = CompiledZkScholarContract;

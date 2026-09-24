import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type Witnesses<PS> = {
  applicant_credentials(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, { cs_score: bigint,
                                                                                      coding_hours: bigint,
                                                                                      family_income: bigint,
                                                                                      applicant_id: Uint8Array
                                                                                    }];
  admin_secret_key(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  apply_for_grant(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  update_grant_config(context: __compactRuntime.CircuitContext<PS>,
                      new_min_cs_score_0: bigint,
                      new_min_coding_hours_0: bigint,
                      new_max_family_income_0: bigint,
                      new_deadline_0: bigint,
                      new_max_grants_0: bigint,
                      new_active_status_0: boolean): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  apply_for_grant(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  update_grant_config(context: __compactRuntime.CircuitContext<PS>,
                      new_min_cs_score_0: bigint,
                      new_min_coding_hours_0: bigint,
                      new_max_family_income_0: bigint,
                      new_deadline_0: bigint,
                      new_max_grants_0: bigint,
                      new_active_status_0: boolean): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  adminPublicKey(sk_0: Uint8Array): Uint8Array;
  makeNullifier(applicant_id_0: Uint8Array): Uint8Array;
}

export type Circuits<PS> = {
  apply_for_grant(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  update_grant_config(context: __compactRuntime.CircuitContext<PS>,
                      new_min_cs_score_0: bigint,
                      new_min_coding_hours_0: bigint,
                      new_max_family_income_0: bigint,
                      new_deadline_0: bigint,
                      new_max_grants_0: bigint,
                      new_active_status_0: boolean): __compactRuntime.CircuitResults<PS, []>;
  adminPublicKey(context: __compactRuntime.CircuitContext<PS>, sk_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  makeNullifier(context: __compactRuntime.CircuitContext<PS>,
                applicant_id_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
}

export type Ledger = {
  readonly min_cs_score: bigint;
  readonly min_coding_hours: bigint;
  readonly max_family_income: bigint;
  readonly admin: Uint8Array;
  nullifiers: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly grant_deadline: bigint;
  readonly is_active: boolean;
  readonly max_grants: bigint;
  readonly total_grants: bigint;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               initial_min_cs_score_0: bigint,
               initial_min_coding_hours_0: bigint,
               initial_max_family_income_0: bigint,
               initial_admin_0: Uint8Array,
               deadline_0: bigint,
               grant_limit_0: bigint): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;

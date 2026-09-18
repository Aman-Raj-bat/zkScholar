import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESS } from '../constants';
type Criteria = { minCsScore: number; minCodingHours: number; maxFamilyIncome: number };
const FALLBACK: Criteria = { minCsScore: 750, minCodingHours: 1500, maxFamilyIncome: 120_000 };
export function useLiveCriteria(): { criteria: Criteria; loading: boolean } {
  const [criteria, setCriteria] = useState<Criteria>(FALLBACK);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchCriteria() {
      try {
        const res = await fetch('https://indexer.preprod.midnight.network/api/v1/graphql', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ contractState(address: "${CONTRACT_ADDRESS}") { data } }` }),
        });
        const json = await res.json();
        const data = json?.data?.contractState?.data;
        if (data) setCriteria({ minCsScore: Number(data.min_cs_score ?? 750), minCodingHours: Number(data.min_coding_hours ?? 1500), maxFamilyIncome: Number(data.max_family_income ?? 120_000) });
      } catch { /* fallback */ } finally { setLoading(false); }
    }
    fetchCriteria();
  }, []);
  return { criteria, loading };
}

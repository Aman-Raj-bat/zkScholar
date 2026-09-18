import { useMemo } from 'react';
type PrecheckResult = 'likely_eligible' | 'likely_ineligible' | 'invalid_input';
export function useEligibilityPrecheck(csScore: string, codingHours: string, familyIncome: string, minCsScore = 750, minCodingHours = 1500, maxFamilyIncome = 120_000): PrecheckResult {
  return useMemo(() => {
    const cs = parseInt(csScore, 10), hours = parseInt(codingHours, 10), income = parseInt(familyIncome, 10);
    if ([cs, hours, income].some(v => isNaN(v) || v < 0)) return 'invalid_input';
    if (cs >= minCsScore && hours >= minCodingHours && income <= maxFamilyIncome) return 'likely_eligible';
    return 'likely_ineligible';
  }, [csScore, codingHours, familyIncome, minCsScore, minCodingHours, maxFamilyIncome]);
}

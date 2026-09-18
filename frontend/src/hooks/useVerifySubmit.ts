import { useState, useRef, useCallback } from 'react';
import { useMidnight } from './useMidnight';
export function useVerifySubmit() {
  const { proof, applyForGrant } = useMidnight();
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);
  const submit = useCallback(async (cs: string, hours: string, income: string) => {
    if (isSubmitting.current) return;
    const csN = parseInt(cs, 10), hoursN = parseInt(hours, 10), incomeN = parseInt(income, 10);
    if ([csN, hoursN, incomeN].some(v => isNaN(v) || v <= 0)) return;
    isSubmitting.current = true; setLoading(true);
    try { await applyForGrant(csN, hoursN, incomeN); }
    finally { isSubmitting.current = false; setLoading(false); }
  }, [applyForGrant]);
  return { proof, loading, submit };
}

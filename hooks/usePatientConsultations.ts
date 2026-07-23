// hooks/usePatientConsultations.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMyConsultations } from "@/lib/api/consultations";
import { ConsultationRecord } from "@/types/consultations";

const POLL_INTERVAL_MS = 30_000;

export function usePatientConsultations() {
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const records = await fetchMyConsultations();
      setConsultations(records);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load your consultations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(load, 0);
    const handle = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      clearTimeout(timeout);
      clearInterval(handle);
    };
  }, [load]);

  return { consultations, loading, error, refetch: load };
}
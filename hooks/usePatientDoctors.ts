"use client";

import { useCallback, useEffect, useState } from "react";
import { requestConsultation, RequestConsultationInput } from "@/lib/api/consultations";
import type { Doctor } from "@/types/doctor";
import { fetchDoctors } from "@/lib/api/doctors";

export function usePatientDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All specialties");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDoctors({
        search: search || undefined,
        specialty: specialty === "All specialties" ? undefined : specialty,
      });
      setDoctors(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  }, [search, specialty]);

  useEffect(() => {
    const loadDoctors = async () => {
      await load();
    };

    void loadDoctors();
  }, [load]);

  const requestMeeting = useCallback((input: RequestConsultationInput) => requestConsultation(input), []);

  return { doctors, loading, error, search, setSearch, specialty, setSpecialty, requestMeeting, refetch: load };
}
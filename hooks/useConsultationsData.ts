"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchConsultations,
  acceptConsultation as acceptConsultationApi,
  declineConsultation as declineConsultationApi,
} from "@/lib/api/consultations";
import type {
  ConsultationRecord,
  ConsultationSummary,
  ScheduleItem,
} from "@/types/consultations";

const INCOMING_WINDOW_MINUTES = 10;
const POLL_INTERVAL_MS = 30_000; // refetch from the server every 30s
const TICK_INTERVAL_MS = 15_000; // recompute "isIncoming" locally every 15s

const isToday = (isoDate: string) => {
  const d = new Date(isoDate);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const computeIsIncoming = (record: ConsultationRecord): boolean => {
  if (record.status !== "accepted") return false;

  const start = new Date(record.scheduledStart).getTime();
  const now = Date.now();
  const minutesUntilStart = (start - now) / 60_000;

  // "Incoming" once we're within the window and it hasn't already ended.
  return minutesUntilStart <= INCOMING_WINDOW_MINUTES && now < new Date(record.scheduledEnd).getTime();
};

const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

export const useConsultationsData = () => {
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyIncomingFlags = useCallback((records: ConsultationRecord[]) => {
    return records.map((record) => ({
      ...record,
      isIncoming: computeIsIncoming(record),
    }));
  }, []);

  const load = useCallback(async () => {
    try {
      const records = await fetchConsultations();
      setConsultations(applyIncomingFlags(records));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load consultations");
    } finally {
      setLoading(false);
    }
  }, [applyIncomingFlags]);

  // Initial load + periodic refetch from the server
  useEffect(() => {
    const initialize = async () => {
      await load();
    };

    void initialize();
    const pollHandle = setInterval(load, POLL_INTERVAL_MS);
    return () => clearInterval(pollHandle);
  }, [load]);

  // Recompute the 10-minute "incoming" flag locally between refetches, so
  // a consultation flips to "incoming" the moment the clock crosses the
  // threshold rather than waiting for the next poll.
  useEffect(() => {
    const tickHandle = setInterval(() => {
      setConsultations((prev) => applyIncomingFlags(prev));
    }, TICK_INTERVAL_MS);
    return () => clearInterval(tickHandle);
  }, [applyIncomingFlags]);

  const accept = useCallback(
    async (id: string) => {
      await acceptConsultationApi(id);
      await load();
    },
    [load]
  );

  const decline = useCallback(
    async (id: string) => {
      await declineConsultationApi(id);
      await load();
    },
    [load]
  );

  const pending = consultations.filter((c) => c.status === "pending");
  const accepted = consultations.filter((c) => c.status === "accepted");
  const declined = consultations.filter((c) => c.status === "declined");
  const completed = consultations.filter((c) => c.status === "completed");

  // Accepted consultations happening today, incoming ones first.
  const todaysUpcoming = accepted
    .filter((c) => isToday(c.scheduledStart))
    .sort((a, b) => {
      if (a.isIncoming !== b.isIncoming) return a.isIncoming ? -1 : 1;
      return new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime();
    });

  const todaysSchedule: ScheduleItem[] = consultations
    .filter((c) => isToday(c.scheduledStart) && c.status !== "declined")
    .sort((a, b) => new Date(a.scheduledStart).getTime() - new Date(b.scheduledStart).getTime())
    .map((c) => ({
      time: formatTime(c.scheduledStart),
      patientName: c.patientName,
      status: c.status,
      consultationId: c.id,
    }));

  const summary: ConsultationSummary = {
    total: consultations.length,
    pending: pending.length,
    accepted: accepted.length,
    declined: declined.length,
    completed: completed.length,
  };

  return {
    consultations,
    pending,
    accepted,
    declined,
    completed,
    todaysUpcoming,
    todaysSchedule,
    summary,
    loading,
    error,
    accept,
    decline,
    refetch: load,
  };
};                                                  
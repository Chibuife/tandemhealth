"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Doctor } from "@/types/doctor";
import type { RequestConsultationInput } from "@/lib/api/consultations";

interface RequestConsultationModalProps {
  doctor: Doctor;
  onClose: () => void;
  onSubmit: (input: RequestConsultationInput) => Promise<void>;
}

export function RequestConsultationModal({ doctor, onClose, onSubmit }: RequestConsultationModalProps) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!date || !startTime || !endTime) {
      setError("Please choose a date, start time, and end time.");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);

    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        doctorId: doctor.id,
        scheduledStart: start.toISOString(),
        scheduledEnd: end.toISOString(),
        reasonForVisit: reason || undefined,
        priority,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to request consultation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Request consultation with Dr. {doctor.name}
          </h2>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-slate-600">
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm text-slate-600">
              Start time
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-600">
              End time
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm text-slate-600">
            Reason for visit
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-slate-600">
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {submitting ? "Sending request…" : "Send request"}
          </button>
        </div>
      </div>
    </div>
  );
}
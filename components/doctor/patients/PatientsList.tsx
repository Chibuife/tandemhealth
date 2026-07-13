"use client";

import { ChevronLeft, ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import { Patient } from "@/lib/patients/types";

interface PatientsListProps {
  patients: Patient[];
  totalCount: number;
  selectedPatientId: string;
  onSelectPatient: (id: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export default function PatientsList({
  patients,
  totalCount,
  selectedPatientId,
  onSelectPatient,
  searchQuery,
  onSearchQueryChange,
}: PatientsListProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search patients by name, email or phone..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
            />
          </div>
          <button
            type="button"
            aria-label="Filter patients"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-fg">All patients ({totalCount})</h2>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {patients.map((patient) => {
          const isSelected = patient.id === selectedPatientId;

          return (
            <button
              key={patient.id}
              type="button"
              onClick={() => onSelectPatient(patient.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                isSelected ? "bg-bg-subtle" : "hover:bg-bg-subtle/60"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${patient.avatarClassName}`}
              >
                {patient.initials}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-fg">{patient.name}</span>
                <span className="block truncate text-xs text-fg-muted">
                  {patient.age} years • {patient.gender}
                </span>
              </span>

              <span className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                    patient.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {patient.status}
                </span>
                <span className="text-xs text-fg-muted">{patient.lastVisit}</span>
              </span>

              <ChevronRight className="h-4 w-4 shrink-0 text-fg-muted" />
            </button>
          );
        })}

        {patients.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-fg-muted">
            No patients match your search.
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 border-t border-border p-3">
        <button
          type="button"
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {["1", "2", "3", "...", "17"].map((page, index) => (
          <button
            key={`${page}-${index}`}
            type="button"
            className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm ${
              page === "1"
                ? "bg-fg text-white"
                : "text-fg-muted hover:bg-bg-subtle disabled:hover:bg-transparent"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
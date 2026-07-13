"use client";

import { useState } from "react";
import { Patient } from "@/lib/patients/types";

const TABS = ["Overview", "Consultations", "Documents", "Prescriptions", "Tasks", "Notes"] as const;

interface PatientDetailHeaderProps {
  patient: Patient;
}

export default function PatientDetailHeader({ patient }: PatientDetailHeaderProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");

  return (
    <div className="border-b border-border px-5 pt-5">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-medium ${patient.avatarClassName}`}
        >
          {patient.initials}
        </span>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-fg">{patient.name}</h2>
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                patient.status === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {patient.status}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-fg-muted">
            {patient.age} years • {patient.gender} • {patient.email} • {patient.phone}
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-fg text-fg"
                : "border-transparent text-fg-muted hover:text-fg"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
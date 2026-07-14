"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Download, Mail, Phone } from "lucide-react";
import { PatientDetails } from "@/lib/messages/types";

interface PatientDetailsSidebarProps {
  patient: PatientDetails;
  onViewPatientOverview?: () => void;
  onViewAllDocuments?: () => void;
  onViewAppointment?: () => void;
}

export default function PatientDetailsSidebar({
  patient,
  onViewPatientOverview,
  onViewAllDocuments,
  onViewAppointment,
}: PatientDetailsSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-sm font-semibold text-fg">Patient details</h3>
        <ChevronDown
          className={`h-4 w-4 text-fg-muted transition-transform ${isExpanded ? "" : "-rotate-90"}`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-5">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-medium ${patient.avatarClassName}`}
            >
              {patient.initials}
            </span>
            <div>
              <p className="text-sm font-medium text-fg">{patient.name}</p>
              <p className="text-xs text-fg-muted">
                {patient.gender}, {patient.age} years ({patient.dob})
              </p>
              <p className="text-xs text-fg-muted">ID: {patient.patientId}</p>
            </div>
          </div>

          <div className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex items-center gap-2 text-fg">
              <Mail className="h-4 w-4 text-fg-muted" />
              {patient.email}
            </div>
            <div className="flex items-center gap-2 text-fg">
              <Phone className="h-4 w-4 text-fg-muted" />
              {patient.phone}
            </div>
          </div>

          {patient.upcomingAppointment && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-fg">Upcoming appointment</h4>
              <div className="mt-2 flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <CalendarDays className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">{patient.upcomingAppointment.date}</p>
                  <p className="text-sm text-fg-muted">{patient.upcomingAppointment.type}</p>
                  <button
                    type="button"
                    onClick={onViewAppointment}
                    className="mt-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 hover:bg-emerald-100"
                  >
                    View appointment
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-fg">Medical summary</h4>

            <div className="mt-3 space-y-3">
              <div>
                <p className="text-xs text-fg-muted">Conditions</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {patient.conditions.map((condition) => (
                    <span
                      key={condition}
                      className="rounded-full bg-bg-subtle px-2.5 py-1 text-xs font-medium text-fg"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-fg-muted">Allergies</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {patient.allergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {patient.medications.length > 0 && (
                <div>
                  <p className="text-xs text-fg-muted">Medications</p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {patient.medications.map((medication) => (
                      <span
                        key={medication}
                        className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700"
                      >
                        {medication}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onViewPatientOverview}
              className="mt-4 w-full rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-fg hover:bg-bg-subtle"
            >
              View patient overview
            </button>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-fg">Shared documents</h4>

            <div className="mt-2 divide-y divide-border">
              {patient.sharedDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-fg">{doc.name}</p>
                    <span className="text-xs text-fg-muted">{doc.fileType}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Download ${doc.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {patient.sharedDocuments.length === 0 && (
                <p className="py-3 text-sm text-fg-muted">No documents shared yet.</p>
              )}
            </div>

            <button
              type="button"
              onClick={onViewAllDocuments}
              className="mt-3 w-full rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-fg hover:bg-bg-subtle"
            >
              View all documents
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
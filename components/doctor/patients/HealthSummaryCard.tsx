import { CalendarDays, CheckSquare, FileText, Pill } from "lucide-react";
import { Patient } from "@/lib/patients/types";

interface HealthSummaryCardProps {
  patient: Patient;
}

export default function HealthSummaryCard({ patient }: HealthSummaryCardProps) {
  const lastConsultation = patient.consultations[0];

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Health summary</h3>
        <button type="button" className="text-sm font-medium text-fg-muted hover:text-fg">
          View full summary
        </button>
      </div>

      <div className="mt-3 space-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <FileText className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-fg-muted">Last consultation</p>
            <p className="text-sm font-semibold text-fg">
              {lastConsultation?.date ?? "No visits yet"}
            </p>
            {lastConsultation && (
              <p className="text-xs text-fg-muted">{lastConsultation.reason}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <CalendarDays className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-fg-muted">Next appointment</p>
            <p className="text-sm font-semibold text-fg">{patient.nextAppointment.date}</p>
            {patient.nextAppointment.reason && (
              <p className="text-xs text-fg-muted">{patient.nextAppointment.reason}</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Pill className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-fg-muted">Active prescriptions</p>
            <p className="text-sm font-semibold text-fg">{patient.activePrescriptions}</p>
            <button type="button" className="text-xs font-medium text-blue-600 hover:underline">
              View prescriptions
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <CheckSquare className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs text-fg-muted">Open tasks</p>
            <p className="text-sm font-semibold text-fg">{patient.openTasks}</p>
            <button type="button" className="text-xs font-medium text-blue-600 hover:underline">
              View tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
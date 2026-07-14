import { MoreHorizontal } from "lucide-react";
import { PatientDetails } from "@/lib/messages/types";

interface ChatThreadHeaderProps {
  patient: PatientDetails;
  onViewPatient?: () => void;
}

export default function ChatThreadHeader({ patient, onViewPatient }: ChatThreadHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border p-4">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${patient.avatarClassName}`}
        >
          {patient.initials}
        </span>
        <div>
          <p className="text-sm font-medium text-fg">{patient.name}</p>
          <p className="text-xs text-fg-muted">
            {patient.gender}, {patient.age} years • {patient.dob}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onViewPatient}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-bg-subtle"
        >
          View patient
        </button>
        <button
          type="button"
          aria-label="More actions"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
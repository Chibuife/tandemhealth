import { Download, Plus } from "lucide-react";

interface PatientsHeaderProps {
  onAddPatient?: () => void;
  onExport?: () => void;
}

export default function PatientsHeader({ onAddPatient, onExport }: PatientsHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Patients</h1>
        <p className="mt-1 text-sm text-fg-muted">Manage and view all your patients.</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onAddPatient}
          className="flex items-center gap-1.5 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-fg/90"
        >
          <Plus className="h-4 w-4" />
          Add patient
        </button>
        <button
          type="button"
          onClick={onExport}
          aria-label="Export patients"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-fg-muted transition-colors hover:bg-bg-subtle"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
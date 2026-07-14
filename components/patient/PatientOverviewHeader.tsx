import { ChevronRight } from 'lucide-react';
import { PatientAiNoteAlert } from '@/types/patient';

interface PatientOverviewHeaderProps {
  patientFirstName: string;
  aiNoteAlert: PatientAiNoteAlert;
}

export function PatientOverviewHeader({ patientFirstName, aiNoteAlert }: PatientOverviewHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-fg">Good morning, {patientFirstName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s an overview of your health and recent activity.
        </p>
      </div>

      <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left lg:w-auto lg:min-w-[420px]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-fg">{aiNoteAlert.title}</span>
          <span className="block text-xs text-muted-foreground">{aiNoteAlert.description}</span>
        </span>
        <span className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-fg">
          {aiNoteAlert.buttonLabel}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>
    </div>
  );
}

export default PatientOverviewHeader;
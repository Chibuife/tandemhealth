import { PatientClinicalSummary } from '@/types/patient';

interface PatientSummaryCardProps {
  summary: PatientClinicalSummary;
}

export function PatientSummaryCard({ summary }: PatientSummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Patient summary</h3>
        <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-fg hover:bg-muted">
          Edit
        </button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
          {summary.avatarInitials}
        </span>
        <div>
          <p className="font-medium text-fg">{summary.name}</p>
          <p className="text-xs text-muted-foreground">
            {summary.sex}, {summary.age} years
          </p>
          <p className="text-xs text-muted-foreground">{summary.dateOfBirth}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Allergies</p>
        <div className="flex flex-wrap gap-1.5">
          {summary.allergies.map((allergy) => (
            <span key={allergy} className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
              {allergy}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Conditions</p>
        <div className="flex flex-wrap gap-1.5">
          {summary.conditions.map((condition) => (
            <span key={condition} className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-fg">
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">Current medications</p>
        {summary.currentMedications.map((medication) => (
          <p key={medication} className="text-sm text-fg">
            {medication}
          </p>
        ))}
      </div>
    </div>
  );
}

export default PatientSummaryCard;
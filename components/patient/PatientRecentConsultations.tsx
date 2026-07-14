import { ChevronRight } from 'lucide-react';
import { PatientConsultationSummary } from '@/types/patient';

interface PatientRecentConsultationsProps {
  consultations: PatientConsultationSummary[];
}

export function PatientRecentConsultations({ consultations }: PatientRecentConsultationsProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Recent consultations</h3>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg hover:bg-muted">
          View all
        </button>
      </div>

      <ul>
        {consultations.map((consultation) => (
          <li
            key={consultation.id}
            className="flex items-center justify-between gap-3 border-t border-border py-3 first:border-0"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{consultation.date}</p>
              <p className="truncate text-sm font-medium text-fg">{consultation.title}</p>
              <p className="text-xs text-muted-foreground">{consultation.doctor}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                {consultation.status}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientRecentConsultations;
import { Calendar, FileText, Pill, CheckCircle2, LucideIcon } from 'lucide-react';
import { PatientOverviewStat, PatientOverviewStatIcon } from '@/types/patient';

const ICON_MAP: Record<PatientOverviewStatIcon, LucideIcon> = {
  Calendar,
  FileText,
  Pill,
  CheckCircle2,
};

interface PatientOverviewStatsProps {
  stats: PatientOverviewStat[];
}

export function PatientOverviewStats({ stats }: PatientOverviewStatsProps) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.icon];
        return (
          <div key={stat.id} className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className="h-4 w-4" />
              {stat.label}
            </div>
            <p className="text-xl font-semibold text-fg">{stat.value}</p>
            {stat.boldDetail && <p className="mt-1 text-sm font-semibold text-fg">{stat.boldDetail}</p>}
            <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
            <button className="mt-4 rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
              {stat.buttonLabel}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PatientOverviewStats;
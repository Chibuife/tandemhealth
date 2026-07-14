import { PatientStorageUsage } from '@/types/patient';

interface StorageUsageCardProps {
  usage: PatientStorageUsage;
}

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StorageUsageCard({ usage }: StorageUsageCardProps) {
  const offset = CIRCUMFERENCE - (usage.percentUsed / 100) * CIRCUMFERENCE;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">Storage usage</h3>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-fg">{usage.percentUsed}%</span>
            <span className="text-xs text-muted-foreground">Used</span>
          </div>
        </div>

        <div>
          <p className="text-xl font-semibold text-fg">{usage.usedLabel}</p>
          <p className="text-sm text-muted-foreground">{usage.totalLabel}</p>
        </div>
      </div>

      <button className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
        Manage storage
      </button>
    </div>
  );
}

export default StorageUsageCard;
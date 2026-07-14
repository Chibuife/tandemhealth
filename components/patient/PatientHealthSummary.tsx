import { PatientHealthMetric } from '@/types/patient';

interface PatientHealthSummaryProps {
  metrics: PatientHealthMetric[];
}

export function PatientHealthSummary({ metrics }: PatientHealthSummaryProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Your health summary</h3>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg hover:bg-muted">
          View full summary
        </button>
      </div>

      <dl>
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between gap-3 border-t border-border py-3 first:border-0"
          >
            <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            <dd className="flex items-center gap-2">
              <span className="text-sm font-medium text-fg">{metric.value}</span>
              {metric.status && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  {metric.status}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default PatientHealthSummary;
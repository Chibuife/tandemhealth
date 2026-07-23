import { ConsultationSummaryData } from '@/types/consultation-list';

interface ConsultationSummaryCardProps {
  summary: ConsultationSummaryData;
}

const RADIUS = 52;
const STROKE = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface Segment {
  label: string;
  value: number;
  colorClass: string; // stroke color
  dotClass: string; // legend dot color
}

export function ConsultationSummaryCard({ summary }: ConsultationSummaryCardProps) {
  const segments: Segment[] = [
    { label: 'Pending', value: summary.pending, colorClass: 'stroke-emerald-500', dotClass: 'bg-emerald-500' },
    { label: 'Accepted', value: summary.accepted, colorClass: 'stroke-blue-500', dotClass: 'bg-blue-500' },
    { label: 'Declined', value: summary.declined, colorClass: 'stroke-amber-500', dotClass: 'bg-amber-500' },
    { label: 'Completed', value: summary.completed, colorClass: 'stroke-violet-500', dotClass: 'bg-violet-500' },
  ];

  let offsetAccumulator = 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Consultation summary</h2>

      <div className="mt-4 flex items-center gap-6">
        <div className="relative h-36 w-36 shrink-0">
          <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
            {segments.map((segment) => {
              const length = (segment.value / summary.total) * CIRCUMFERENCE;
              const dasharray = `${length} ${CIRCUMFERENCE - length}`;
              const dashoffset = -offsetAccumulator;
              offsetAccumulator += length;
              return (
                <circle
                  key={segment.label}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  className={segment.colorClass}
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-slate-900">{summary.total}</span>
            <span className="text-xs text-slate-500">Total</span>
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-3">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${segment.dotClass}`} />
              <span className="font-medium text-slate-900">{segment.value}</span>
              <span className="text-slate-500">{segment.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface Segment {
  label: string;
  value: number;
  color: string;
  dotColor: string;
}

const segments: Segment[] = [
  { label: 'Due soon', value: 4, color: '#f43f5e', dotColor: 'bg-rose-500' },
  { label: 'In progress', value: 3, color: '#3b82f6', dotColor: 'bg-blue-500' },
  { label: 'Pending', value: 3, color: '#f59e0b', dotColor: 'bg-amber-500' },
  { label: 'Completed', value: 2, color: '#22c55e', dotColor: 'bg-emerald-500' },
];

const total = segments.reduce((sum, s) => sum + s.value, 0);
const RADIUS = 46;
const STROKE = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Donut() {
  let offset = 0;

  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 -rotate-90">
      <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="currentColor" className="text-divider" strokeWidth={STROKE} />
      {segments.map((segment) => {
        const length = (segment.value / total) * CIRCUMFERENCE;
        const dasharray = `${length} ${CIRCUMFERENCE - length}`;
        const dashoffset = -offset;
        offset += length;

        return (
          <circle
            key={segment.label}
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke={segment.color}
            strokeWidth={STROKE}
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
          />
        );
      })}
    </svg>
  );
}

export function TaskSummaryCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="mb-4 text-sm font-bold text-ink">Task summary</h2>

      <div className="flex items-center gap-6">
        <div className="relative flex shrink-0 items-center justify-center">
          <Donut />
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-ink">{total}</span>
            <span className="text-[11px] text-muted">Total tasks</span>
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 shrink-0 rounded-full ${segment.dotColor}`} />
              <span className="font-semibold text-ink">{segment.value}</span>
              <span className="text-muted">{segment.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskSummaryCard;
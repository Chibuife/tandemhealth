import { Badge, BadgeColor } from '../Badge';

interface DonutSegment {
  label: string;
  value: number;
  color: string; // stroke color
  dotColor: string; // legend dot bg
}

const segments: DonutSegment[] = [
  { label: 'Open', value: 6, color: '#22c55e', dotColor: 'bg-emerald-500' },
  { label: 'In progress', value: 4, color: '#3b82f6', dotColor: 'bg-blue-500' },
  { label: 'Completed', value: 2, color: '#8b5cf6', dotColor: 'bg-violet-500' },
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
            strokeLinecap="butt"
          />
        );
      })}
    </svg>
  );
}

interface TaskRow {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: BadgeColor;
}

const taskRows: TaskRow[] = [
  { id: '1', title: 'Review lab results', subtitle: '2 patients', status: 'Open', statusColor: 'green' },
  { id: '2', title: 'Sign clinical notes', subtitle: '4 notes', status: 'In progress', statusColor: 'blue' },
  { id: '3', title: 'Follow up on referrals', subtitle: '2 patients', status: 'Open', statusColor: 'green' },
];

export function TaskSummaryCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="mb-4 text-sm font-bold text-ink">Task summary</h2>

      <div className="flex items-center gap-6">
        <div className="relative flex items-center justify-center">
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

      <div className="mt-5 flex-1">
        {taskRows.map((row) => (
          <div key={row.id} className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{row.title}</p>
              <p className="text-xs text-muted">{row.subtitle}</p>
            </div>
            <Badge label={row.status} color={row.statusColor} />
          </div>
        ))}
      </div>

      <button className="mt-4 w-full rounded-lg border border-border py-2.5 text-sm font-semibold text-ink">
        View all tasks
      </button>
    </div>
  );
}

export default TaskSummaryCard;
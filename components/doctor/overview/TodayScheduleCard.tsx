import { ChevronRight } from 'lucide-react';
import { Badge, BadgeColor } from '../Badge';

interface ScheduleItem {
  id: string;
  time: string;
  initials: string;
  avatarColor: string;
  name: string;
  reason: string;
  status: string;
  statusColor: BadgeColor;
}

const scheduleItems: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00',
    initials: 'AJ',
    avatarColor: 'bg-blue-100 text-blue-700',
    name: 'Anna Johansen',
    reason: 'Headache and fatigue',
    status: 'Completed',
    statusColor: 'green',
  },
  {
    id: '2',
    time: '10:30',
    initials: 'MC',
    avatarColor: 'bg-violet-100 text-violet-700',
    name: 'Michael Chen',
    reason: 'Follow-up',
    status: 'In progress',
    statusColor: 'blue',
  },
  {
    id: '3',
    time: '11:00',
    initials: 'SJ',
    avatarColor: 'bg-amber-100 text-amber-700',
    name: 'Sarah Johnson',
    reason: 'Sore throat',
    status: 'Upcoming',
    statusColor: 'gray',
  },
  {
    id: '4',
    time: '14:00',
    initials: 'JW',
    avatarColor: 'bg-emerald-100 text-emerald-700',
    name: 'James Wilson',
    reason: 'Diabetes check-up',
    status: 'Upcoming',
    statusColor: 'gray',
  },
  {
    id: '5',
    time: '15:30',
    initials: 'ED',
    avatarColor: 'bg-rose-100 text-rose-700',
    name: 'Emily Davis',
    reason: 'Asthma review',
    status: 'Upcoming',
    statusColor: 'gray',
  },
];

export function TodayScheduleCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Today&apos;s schedule</h2>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink">
          View full schedule
        </button>
      </div>

      <div>
        {scheduleItems.map((item) => (
          <button
            key={item.id}
            className="flex w-full items-center gap-3 border-b border-border py-3 text-left last:border-b-0"
          >
            <span className="w-11 shrink-0 text-xs font-medium text-muted">{item.time}</span>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${item.avatarColor}`}
            >
              {item.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-ink">{item.name}</span>
              <span className="block truncate text-xs text-muted">{item.reason}</span>
            </span>
            <span className="shrink-0">
              <Badge label={item.status} color={item.statusColor} />
            </span>
            <ChevronRight size={16} className="hidden shrink-0 text-muted sm:block" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodayScheduleCard;
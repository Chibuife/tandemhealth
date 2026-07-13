import { ClipboardList, FileEdit, Heart, LucideIcon, User } from 'lucide-react';
import clsx from 'clsx';

interface StatItem {
  id: string;
  label: string;
  value: string;
  delta: string;
  direction: 'up' | 'down';
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const stats: StatItem[] = [
  {
    id: 'consultations',
    label: "Today's consultations",
    value: '8',
    delta: '14%',
    direction: 'up',
    icon: ClipboardList,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'notes',
    label: 'Notes generated',
    value: '8',
    delta: '12%',
    direction: 'up',
    icon: FileEdit,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    id: 'patients-seen',
    label: 'Patients seen',
    value: '21',
    delta: '8%',
    direction: 'up',
    icon: User,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'follow-ups',
    label: 'Follow-ups',
    value: '5',
    delta: '10%',
    direction: 'down',
    icon: Heart,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
];

function StatCard({ stat }: { stat: StatItem }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-3">
        <span className={clsx('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', stat.iconBg, stat.iconColor)}>
          <Icon size={18} />
        </span>
        <span className="text-sm text-muted">{stat.label}</span>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-ink">{stat.value}</span>
      </div>

      <div className="mt-1 flex items-center gap-1 text-xs font-medium">
        <span className={stat.direction === 'up' ? 'text-emerald-600' : 'text-rose-600'}>
          {stat.direction === 'up' ? '↑' : '↓'} {stat.delta}
        </span>
        <span className="text-muted">vs yesterday</span>
      </div>
    </div>
  );
}

export function OverviewStats() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}

export default OverviewStats;
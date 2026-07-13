import { FileEdit, FilePlus, LayoutTemplate, Pill, RefreshCw, LucideIcon } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  timestamp: string;
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    icon: FileEdit,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Clinical note generated for Anna Johansen',
    timestamp: '12 May 2026, 09:15',
  },
  {
    id: '2',
    icon: FilePlus,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Referral created for Michael Chen',
    timestamp: '12 May 2026, 09:10',
  },
  {
    id: '3',
    icon: Pill,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Prescription sent to Anna Johansen',
    timestamp: '12 May 2026, 09:05',
  },
  {
    id: '4',
    icon: LayoutTemplate,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    title: 'Template "Follow-up" updated',
    timestamp: '11 May 2026, 16:42',
  },
  {
    id: '5',
    icon: RefreshCw,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    title: 'Integration with BestPractice synced',
    timestamp: '11 May 2026, 15:30',
  },
];

export function RecentActivityCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Recent activity</h2>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink">
          View all
        </button>
      </div>

      <div>
        {activityItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3 border-b border-border py-3 last:border-b-0">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={15} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">{item.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivityCard;
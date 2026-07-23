import { Calendar, CalendarDays, ChevronRight, Link2 } from 'lucide-react';
import { QuickActionItem } from '@/types/consultation-list';

interface QuickActionsCardProps {
  actions: QuickActionItem[];
}

const iconMap = {
  calendar: Calendar,
  link: Link2,
  'calendar-days': CalendarDays,
} as const;

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Quick actions</h2>

      <ul className="mt-4 flex flex-col gap-1">
        {actions.map((action) => {
          const Icon = iconMap[action.icon];
          return (
            <li key={action.label}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium text-slate-900">{action.label}</span>
                  <span className="block text-xs text-slate-500">{action.description}</span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

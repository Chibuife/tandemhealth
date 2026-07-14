import { recentConversations } from '@/data/patientDemoData';

export function RecentConversationsCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Recent conversations</h2>
        <button className="text-xs font-semibold text-emerald-600">View all</button>
      </div>

      <div className="mt-3">
        {recentConversations.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{item.title}</p>
                <p className="truncate text-xs text-muted">{item.subtitle}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted">{item.timestamp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentConversationsCard;
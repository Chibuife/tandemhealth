import { Badge } from '@/components/doctor/Badge';
import { tasks } from '@/data/patientDemoData';

const upcoming = tasks.slice(0, 3);

export function UpcomingTasksCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Upcoming tasks</h2>
        <button className="text-xs font-semibold text-emerald-600">View all</button>
      </div>

      <div className="mt-3">
        {upcoming.map((task) => {
          const Icon = task.icon;
          return (
            <div key={task.id} className="flex items-center gap-3 border-b border-border py-3 last:border-b-0">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${task.iconBg} ${task.iconColor}`}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{task.title}</p>
                <p className="truncate text-xs text-muted">{task.dueDate}</p>
              </div>
              <Badge label={task.priority} color={task.priorityColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingTasksCard;
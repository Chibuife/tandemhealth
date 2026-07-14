import { Bell, Mail, CalendarClock, LucideIcon } from "lucide-react";

const reminders: {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}[] = [
  {
    id: "1",
    icon: Bell,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    title: "You have 3 tasks due today",
    description: "Stay on track with your tasks.",
  },
  {
    id: "2",
    icon: Mail,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "2 results to review",
    description: "Lab results awaiting your review.",
  },
  {
    id: "3",
    icon: CalendarClock,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Next patient follow-up",
    description: "Today at 11:30 with Mark Thompson.",
  },
];

export default function MyRemindersCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">My reminders</h3>
        <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-fg hover:bg-muted">
          Edit
        </button>
      </div>

      <ul>
        {reminders.map((reminder) => {
          const Icon = reminder.icon;
          return (
            <li key={reminder.id} className="flex items-start gap-3 border-t border-border py-3 first:border-0">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${reminder.iconBg}`}>
                <Icon className={`h-4 w-4 ${reminder.iconColor}`} />
              </span>
              <div>
                <p className="text-sm font-medium text-fg">{reminder.title}</p>
                <p className="text-xs text-muted-foreground">{reminder.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
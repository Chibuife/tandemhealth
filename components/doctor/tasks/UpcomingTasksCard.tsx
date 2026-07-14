import { Phone, Mail, FileText, CalendarClock, LucideIcon } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

const PRIORITY_BADGE: Record<Priority, string> = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-orange-50 text-orange-600",
  Low: "bg-emerald-50 text-emerald-700",
};

const upcoming: {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  patientName: string;
  date: string;
  priority: Priority;
}[] = [
  {
    id: "1",
    icon: Phone,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Follow up with patient",
    patientName: "Anna Johansen",
    date: "12 May 2026, 09:00",
    priority: "High",
  },
  {
    id: "2",
    icon: Mail,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Review lab results",
    patientName: "Mark Thompson",
    date: "12 May 2026, 11:30",
    priority: "Medium",
  },
  {
    id: "3",
    icon: FileText,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Complete consultation note",
    patientName: "Sarah Lee",
    date: "12 May 2026, 14:00",
    priority: "Medium",
  },
  {
    id: "4",
    icon: CalendarClock,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Schedule follow-up",
    patientName: "James Wilson",
    date: "13 May 2026, 09:00",
    priority: "Low",
  },
];

export default function UpcomingTasksCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Upcoming</h3>
        <button className="text-sm font-medium text-emerald-700 hover:underline">View all</button>
      </div>

      <ul>
        {upcoming.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex items-start gap-3 border-t border-border py-3 first:border-0">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}>
                <Icon className={`h-4 w-4 ${item.iconColor}`} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-fg">{item.title}</p>
                <p className="truncate text-xs text-muted-foreground">{item.patientName}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${PRIORITY_BADGE[item.priority]}`}>
                {item.priority}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
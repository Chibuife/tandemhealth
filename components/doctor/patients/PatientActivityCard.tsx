import { CheckCircle2, FileText, Upload, UserPlus } from "lucide-react";

interface ActivityItem {
  id: string;
  icon: "note" | "prescription" | "referral" | "upload" | "task";
  title: string;
  timestamp: string;
}

const ACTIVITY: ActivityItem[] = [
  { id: "a1", icon: "note", title: "Clinical note generated", timestamp: "12 May 2026, 09:15" },
  { id: "a2", icon: "prescription", title: "Prescription issued", timestamp: "12 May 2026, 09:05" },
  { id: "a3", icon: "referral", title: "Referral created", timestamp: "12 May 2026, 09:00" },
  { id: "a4", icon: "upload", title: "Document uploaded", timestamp: "11 May 2026, 16:42" },
  { id: "a5", icon: "task", title: "Task completed", timestamp: "11 May 2026, 11:30" },
];

const ICONS = {
  note: { Icon: FileText, className: "bg-emerald-50 text-emerald-600" },
  prescription: { Icon: FileText, className: "bg-violet-50 text-violet-600" },
  referral: { Icon: FileText, className: "bg-blue-50 text-blue-600" },
  upload: { Icon: Upload, className: "bg-amber-50 text-amber-600" },
  task: { Icon: CheckCircle2, className: "bg-blue-50 text-blue-600" },
} as const;

export default function PatientActivityCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Recent activity</h3>
        <button type="button" className="text-sm font-medium text-fg-muted hover:text-fg">
          View all
        </button>
      </div>

      <ul className="mt-4 space-y-4">
        {ACTIVITY.map((item, index) => {
          const { Icon, className } = ICONS[item.icon] ?? { Icon: UserPlus, className: "" };

          return (
            <li key={item.id} className="relative flex gap-3">
              {index !== ACTIVITY.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%+0.5rem)] w-px bg-border" />
              )}
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${className}`}>
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-fg">{item.title}</p>
                <p className="text-xs text-fg-muted">{item.timestamp}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
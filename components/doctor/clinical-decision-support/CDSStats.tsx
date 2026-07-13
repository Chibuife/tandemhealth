import { AlertTriangle, CheckCircle2, ClipboardList, FileText, LucideIcon } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  sublabel: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

const stats: Stat[] = [
  {
    label: "Guidelines",
    value: "128",
    sublabel: "Active guidelines",
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Drug interactions",
    value: "15",
    sublabel: "High priority alerts",
    icon: ClipboardList,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    label: "Alerts",
    value: "7",
    sublabel: "Require attention",
    icon: AlertTriangle,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    label: "Updates",
    value: "12",
    sublabel: "New this week",
    icon: CheckCircle2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

export default function CDSStats() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          <p className="mt-0.5 text-xs text-gray-400">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
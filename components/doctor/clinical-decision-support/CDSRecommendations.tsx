import { AlertTriangle, FileText, LucideIcon } from "lucide-react";

type BadgeVariant = "recommendation" | "alert" | "update" | "reminder";
type Priority = "High" | "Medium" | "Low";

interface Recommendation {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  badge: BadgeVariant;
  description: string;
  tag: string;
  priority: Priority;
  date: string;
}

const badgeStyles: Record<BadgeVariant, { label: string; className: string }> = {
  recommendation: { label: "Recommendation", className: "bg-emerald-50 text-emerald-700" },
  alert: { label: "Alert", className: "bg-red-50 text-red-600" },
  update: { label: "Update", className: "bg-blue-50 text-blue-600" },
  reminder: { label: "Reminder", className: "bg-blue-50 text-blue-600" },
};

const priorityStyles: Record<Priority, string> = {
  High: "text-red-500",
  Medium: "text-orange-500",
  Low: "text-emerald-600",
};

const recommendations: Recommendation[] = [
  {
    icon: FileText,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Consider ACE inhibitors for HTN",
    badge: "recommendation",
    description: "For patients with hypertension and CKD. Based on KDIGO 2024 guidelines.",
    tag: "Hypertension",
    priority: "High",
    date: "12 May 2026",
  },
  {
    icon: FileText,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    title: "Statin therapy for primary prevention",
    badge: "recommendation",
    description: "Moderate intensity statin recommended for patients with 10-year ASCVD risk > 7.5%.",
    tag: "Cardiovascular",
    priority: "Medium",
    date: "11 May 2026",
  },
  {
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Diabetes screening reminder",
    badge: "reminder",
    description: "Consider HbA1c screening for patients > 35 years or with risk factors.",
    tag: "Endocrinology",
    priority: "Low",
    date: "10 May 2026",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    title: "Drug interaction alert",
    badge: "alert",
    description: "Potential interaction: Warfarin and Amiodarone may increase bleeding risk.",
    tag: "Pharmacology",
    priority: "High",
    date: "10 May 2026",
  },
  {
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Asthma management update",
    badge: "update",
    description: "GINA 2024 updates available for asthma management guidelines.",
    tag: "Respiratory",
    priority: "Low",
    date: "9 May 2026",
  },
];

export default function CDSRecommendations() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Recommended for you</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          View all
        </button>
      </div>

      <ul className="divide-y divide-gray-100">
        {recommendations.map((item) => (
          <li key={item.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
            >
              <item.icon className={`h-4 w-4 ${item.iconColor}`} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badgeStyles[item.badge].className}`}
                >
                  {badgeStyles[item.badge].label}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                {item.tag}
              </span>
            </div>

            <div className="shrink-0 text-right">
              <p className={`text-sm font-medium ${priorityStyles[item.priority]}`}>
                {item.priority}
              </p>
              <p className="mt-1 text-xs text-gray-400">{item.date}</p>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        View all recommendations
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}
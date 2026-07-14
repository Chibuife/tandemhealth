import { ClipboardList, FileText, Clock, CheckCircle2, Heart, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
  {
    icon: ClipboardList,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    label: "Total consultations",
    value: "142",
    unit: "",
    trend: "18% vs previous 7 days",
    direction: "up" as const,
  },
  {
    icon: FileText,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    label: "Clinical notes generated",
    value: "128",
    unit: "",
    trend: "16% vs previous 7 days",
    direction: "up" as const,
  },
  {
    icon: Clock,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    label: "Documentation time saved",
    value: "26.4",
    unit: "hrs",
    trend: "22% vs previous 7 days",
    direction: "up" as const,
  },
  {
    icon: CheckCircle2,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Follow-ups scheduled",
    value: "48",
    unit: "",
    trend: "8% vs previous 7 days",
    direction: "up" as const,
  },
  {
    icon: Heart,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    label: "Patient satisfaction",
    value: "4.7 / 5",
    unit: "",
    trend: "6% vs previous 7 days",
    direction: "down" as const,
  },
];

export default function AnalyticsStats() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold text-fg">
            {stat.value}
            {stat.unit && <span className="ml-1 text-base font-normal text-muted-foreground">{stat.unit}</span>}
          </p>
          <div
            className={`mt-2 flex items-center gap-1 text-xs ${
              stat.direction === "up" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {stat.direction === "up" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
            <span>{stat.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
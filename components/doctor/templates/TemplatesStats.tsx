import { ClipboardList, ClipboardEdit, ShieldCheck, Star, ArrowUp } from "lucide-react";

const stats = [
  {
    icon: ClipboardList,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    label: "Total templates",
    value: "24",
    trend: "8 this month",
  },
  {
    icon: ClipboardEdit,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    label: "Custom templates",
    value: "12",
    trend: "3 this month",
  },
  {
    icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Shared with team",
    value: "7",
    trend: "2 this month",
  },
];

export default function TemplatesStats() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
          <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
            <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold text-fg">{stat.value}</p>
          <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
            <ArrowUp className="h-3 w-3" />
            <span>{stat.trend}</span>
          </div>
        </div>
      ))}

      {/* "Most used" surfaces the top template by name instead of a trend, so it gets its own layout */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
          <Star className="h-5 w-5 text-orange-500" />
        </div>
        <p className="text-sm text-muted-foreground">Most used</p>
        <p className="mt-1 text-2xl font-semibold text-fg">SOAP Note</p>
        <p className="mt-2 text-xs text-muted-foreground">Used 125 times</p>
      </div>
    </div>
  );
}
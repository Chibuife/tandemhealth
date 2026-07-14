import { PersonStanding, Clock, Star, FileCheck } from "lucide-react";

const insights = [
  {
    icon: PersonStanding,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "18% increase in consultations",
    description: "You had 18% more consultations compared to the previous 7 days.",
  },
  {
    icon: Clock,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "26.4 hours saved",
    description: "AI documentation saved you 26.4 hours this week.",
  },
  {
    icon: Star,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "High patient satisfaction",
    description: "Your average patient satisfaction score is 4.7/5.",
  },
  {
    icon: FileCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    title: "Follow-up rate",
    description: "33.8% of consultations had follow-ups scheduled.",
  },
];

export default function InsightsSection() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">Insights</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-lg border border-border p-4">
            <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${insight.iconBg}`}>
              <insight.icon className={`h-4 w-4 ${insight.iconColor}`} />
            </div>
            <p className="text-sm font-semibold text-fg">{insight.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
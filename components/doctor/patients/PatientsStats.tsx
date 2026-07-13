import { Clock3, ClipboardList, HeartPulse, Users } from "lucide-react";
import { patientStats } from "@/lib/patients/mock-data";

const ICONS = {
  total: { Icon: Users, className: "bg-fg/5 text-fg" },
  new: { Icon: ClipboardList, className: "bg-violet-50 text-violet-600" },
  active: { Icon: HeartPulse, className: "bg-rose-50 text-rose-600" },
  followups: { Icon: Clock3, className: "bg-amber-50 text-amber-600" },
} as const;

export default function PatientsStats() {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {patientStats.map((stat) => {
        const iconConfig = ICONS[stat.id as keyof typeof ICONS];
        const Icon = iconConfig?.Icon ?? Users;

        return (
          <div key={stat.id} className="rounded-2xl border border-border bg-white p-4">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconConfig?.className ?? ""}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-sm text-fg-muted">{stat.label}</span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-semibold text-fg">{stat.value}</span>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.changeDirection === "up" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {stat.changeDirection === "up" ? "↑" : "↓"} {stat.changeLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
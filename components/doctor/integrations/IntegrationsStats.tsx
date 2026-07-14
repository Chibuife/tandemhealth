import { Link2, Plug, RefreshCw, Sparkles } from "lucide-react";
import { integrationStats } from "@/lib/integrations/mock-data";

const ICONS = {
  total: { Icon: Plug, className: "bg-emerald-50 text-emerald-600" },
  connected: { Icon: Link2, className: "bg-violet-50 text-violet-600" },
  available: { Icon: Sparkles, className: "bg-amber-50 text-amber-600" },
  sync: { Icon: RefreshCw, className: "bg-blue-50 text-blue-600" },
} as const;

export default function IntegrationsStats() {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {integrationStats.map((stat) => {
        const iconConfig = ICONS[stat.id as keyof typeof ICONS];
        const Icon = iconConfig?.Icon ?? Plug;

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

            <div className="mt-3 text-2xl font-semibold text-fg">{stat.value}</div>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-fg-muted">
              {stat.captionLabel}
              {stat.showLiveDot && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
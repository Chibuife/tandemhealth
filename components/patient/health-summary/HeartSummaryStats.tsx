import { Heart, Activity, Droplet, Gauge, LucideIcon } from 'lucide-react';
import { HeartStat, HeartStatIcon } from '@/types/patient';

const ICON_STYLES: Record<HeartStatIcon, { icon: LucideIcon; bg: string; color: string }> = {
  Heart: { icon: Heart, bg: 'bg-red-50', color: 'text-red-500' },
  Activity: { icon: Activity, bg: 'bg-violet-50', color: 'text-violet-600' },
  Droplet: { icon: Droplet, bg: 'bg-orange-50', color: 'text-orange-500' },
  Gauge: { icon: Gauge, bg: 'bg-blue-50', color: 'text-blue-600' },
};

interface HeartSummaryStatsProps {
  stats: HeartStat[];
}

export function HeartSummaryStats({ stats }: HeartSummaryStatsProps) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const style = ICON_STYLES[stat.icon];
        const Icon = style.icon;
        return (
          <div key={stat.id} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                <Icon className={`h-4 w-4 ${style.color}`} />
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className={`text-xl font-semibold ${stat.valueColor}`}>{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.detailColor}`}>{stat.detail}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HeartSummaryStats;
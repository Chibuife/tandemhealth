import { Footprints, Heart, Scale, Calendar, ChevronRight, LucideIcon } from 'lucide-react';
import { HeartRecommendation, HeartRecommendationIcon } from '@/types/patient';

const ICON_STYLES: Record<HeartRecommendationIcon, { icon: LucideIcon; bg: string; color: string }> = {
  Footprints: { icon: Footprints, bg: 'bg-blue-50', color: 'text-blue-600' },
  Heart: { icon: Heart, bg: 'bg-red-50', color: 'text-red-500' },
  Scale: { icon: Scale, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  Calendar: { icon: Calendar, bg: 'bg-violet-50', color: 'text-violet-600' },
};

interface HeartRecommendationsCardProps {
  recommendations: HeartRecommendation[];
}

export function HeartRecommendationsCard({ recommendations }: HeartRecommendationsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Recommendations</h3>
      <p className="mb-4 text-sm text-muted-foreground">Personalized recommendations to keep your heart healthy.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {recommendations.map((recommendation) => {
          const style = ICON_STYLES[recommendation.icon];
          const Icon = style.icon;
          return (
            <div key={recommendation.id} className="flex items-start gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.bg}`}>
                <Icon className={`h-4 w-4 ${style.color}`} />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{recommendation.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{recommendation.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-700 hover:underline">
        View all recommendations
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default HeartRecommendationsCard;
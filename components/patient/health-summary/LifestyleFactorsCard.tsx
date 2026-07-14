import { Activity, Utensils, Cigarette, Brain, Moon, LucideIcon } from 'lucide-react';
import { LifestyleFactor, LifestyleFactorIcon } from '@/types/patient';

const ICON_MAP: Record<LifestyleFactorIcon, LucideIcon> = {
  Activity,
  Utensils,
  Cigarette,
  Brain,
  Moon,
};

const VALUE_BADGE_STYLES: Record<string, string> = {
  Good: 'bg-emerald-50 text-emerald-700',
  Low: 'bg-emerald-50 text-emerald-700',
  'Non-smoker': 'bg-emerald-50 text-emerald-700',
};

interface LifestyleFactorsCardProps {
  factors: LifestyleFactor[];
}

export function LifestyleFactorsCard({ factors }: LifestyleFactorsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Lifestyle factors</h3>
        <button className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-fg hover:bg-muted">
          Edit
        </button>
      </div>

      <ul>
        {factors.map((factor) => {
          const Icon = ICON_MAP[factor.icon];
          const badgeStyle = VALUE_BADGE_STYLES[factor.value] ?? 'bg-muted text-fg';
          return (
            <li key={factor.id} className="flex items-center justify-between gap-2 border-t border-border py-2.5 first:border-0">
              <span className="flex items-center gap-2.5 text-sm text-fg">
                <Icon className="h-4 w-4 text-muted-foreground" />
                {factor.label}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyle}`}>{factor.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LifestyleFactorsCard;
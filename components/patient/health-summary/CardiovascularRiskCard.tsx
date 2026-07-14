import { CardiovascularRisk } from '@/types/patient';

interface CardiovascularRiskCardProps {
  risk: CardiovascularRisk;
}

const RADIUS = 80;
const HALF_CIRCUMFERENCE = Math.PI * RADIUS;

export function CardiovascularRiskCard({ risk }: CardiovascularRiskCardProps) {
  const filled = (risk.percent / 100) * HALF_CIRCUMFERENCE;

  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Cardiovascular risk</h3>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          {risk.riskLabel}
        </span>
      </div>

      <div className="mx-auto mb-3 w-full max-w-[220px]">
        <svg viewBox="0 0 200 110" className="w-full">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${HALF_CIRCUMFERENCE}`}
          />
        </svg>
        <div className="-mt-12 flex flex-col items-center">
          <span className="text-3xl font-semibold text-fg">{risk.percent}%</span>
          <span className="text-xs text-muted-foreground">10-year risk</span>
        </div>
      </div>

      <p className="mb-4 text-center text-sm text-muted-foreground">
        Your risk is lower than {risk.comparisonPercentile}% of people of the same age and gender.
      </p>

      <button className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
        View full risk assessment
      </button>
    </div>
  );
}

export default CardiovascularRiskCard;
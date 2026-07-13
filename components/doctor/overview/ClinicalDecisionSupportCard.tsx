import { AlertTriangle, FlaskConical, Leaf, LucideIcon } from 'lucide-react';

interface Recommendation {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const recommendations: Recommendation[] = [
  {
    id: '1',
    icon: Leaf,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Consider ACE inhibitors',
    description: 'For patients with CKD and hypertension. Based on latest guidelines.',
  },
  {
    id: '2',
    icon: FlaskConical,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Lab monitoring reminder',
    description: '3 patients are due for HbA1c recheck.',
  },
  {
    id: '3',
    icon: AlertTriangle,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    title: 'Drug interaction alert',
    description: '2 patients have potential interactions.',
  },
];

export function ClinicalDecisionSupportCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-ink">Clinical decision support</h2>
          <span className="rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-bold text-ink">New</span>
        </div>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink">
          View all
        </button>
      </div>

      <div>
        {recommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.id}
              className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${rec.iconBg} ${rec.iconColor}`}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{rec.title}</p>
                <p className="truncate text-xs text-muted">{rec.description}</p>
              </div>
              <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink">
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClinicalDecisionSupportCard;
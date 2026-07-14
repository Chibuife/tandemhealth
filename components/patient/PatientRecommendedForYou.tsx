import { Calendar, FileText, TestTube, Heart, LucideIcon } from 'lucide-react';
import { PatientRecommendedItem, PatientRecommendedIcon } from '@/types/patient';

const ICON_MAP: Record<PatientRecommendedIcon, LucideIcon> = {
  Calendar,
  FileText,
  TestTube,
  Heart,
};

interface PatientRecommendedForYouProps {
  items: PatientRecommendedItem[];
}

export function PatientRecommendedForYou({ items }: PatientRecommendedForYouProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">Recommended for you</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <div key={item.id} className="flex flex-col rounded-lg border border-border p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-fg" />
              </div>
              <p className="text-sm font-semibold text-fg">{item.title}</p>
              <p className="mt-1 flex-1 text-xs text-muted-foreground">{item.description}</p>
              <button className="mt-4 rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
                {item.buttonLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PatientRecommendedForYou;
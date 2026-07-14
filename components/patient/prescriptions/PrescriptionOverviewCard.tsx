import { PrescriptionOverview } from '@/types/patient';

interface PrescriptionOverviewCardProps {
  overview: PrescriptionOverview;
}

export function PrescriptionOverviewCard({ overview }: PrescriptionOverviewCardProps) {
  const rows = [
    { label: 'Medications', value: overview.medicationsCount },
    { label: 'Total items', value: overview.totalItems },
    { label: 'Duration', value: overview.duration },
    { label: 'Created by', value: overview.createdBy },
    { label: 'Date', value: overview.date },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-fg">Prescription overview</h3>
      <dl className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between text-sm">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default PrescriptionOverviewCard;
import { HeartPulse } from 'lucide-react';
import { HeartFunctionMeasurement } from '@/types/patient';

interface HeartFunctionCardProps {
  measurements: HeartFunctionMeasurement[];
  echocardiogramDate: string;
}

export function HeartFunctionCard({ measurements, echocardiogramDate }: HeartFunctionCardProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Heart function</h3>
      <p className="mb-3 text-sm text-muted-foreground">Echocardiogram ({echocardiogramDate})</p>

      <div className="mb-4 flex items-start gap-4">
        {/*
          Placeholder illustration — swap for a real echocardiogram/heart anatomy asset
          (e.g. next/image pointing at /public/illustrations/heart.svg).
        */}
        <div className="flex h-32 w-28 shrink-0 items-center justify-center rounded-lg bg-red-50">
          <HeartPulse className="h-14 w-14 text-red-400" strokeWidth={1.5} />
        </div>

        <dl className="flex-1 space-y-2">
          {measurements.map((measurement) => (
            <div key={measurement.label} className="flex items-center justify-between text-sm">
              <dt className="text-muted-foreground">{measurement.label}</dt>
              <dd className="font-medium text-emerald-600">{measurement.status}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
        View full echocardiogram
      </button>
    </div>
  );
}

export default HeartFunctionCard;
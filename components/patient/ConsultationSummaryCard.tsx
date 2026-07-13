'use client';

import { ConsultationSummary } from '@/types/patient';
import { Badge } from '../Badge';
import Card from '../Card';

interface Props {
  summary: ConsultationSummary;
}

export function ConsultationSummaryCard({ summary }: Props) {
  return (
    <Card className="flex-1">
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-[15px] font-bold text-ink">Consultation summary</h2>
        <Badge label={summary.generatedLabel} variant="lime" />
      </div>
      <p className="mb-3 text-[11px] text-faint">
        This summary is generated automatically and may contain errors.
      </p>

      <div className="mb-4 rounded-xl bg-bg p-3.5">
        <p className="text-[13px] leading-relaxed text-ink">
          {summary.segments.map((segment, i) =>
            segment.bold ? (
              <strong key={i} className="font-bold">
                {segment.text}
              </strong>
            ) : (
              <span key={i}>{segment.text}</span>
            ),
          )}
        </p>
      </div>

      <button className="rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-ink">
        View full summary
      </button>
    </Card>
  );
}

export default ConsultationSummaryCard;

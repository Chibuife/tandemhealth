'use client';

import { ArrowRight } from 'lucide-react';
import { Card } from '../../Card';
import { Icd10Suggestion } from '@/types';

interface Props {
  suggestions: Icd10Suggestion[];
}

export function Icd10CodesCard({ suggestions }: Props) {
  return (
    <Card className="flex-1">
      <h2 className="text-sm font-bold text-ink">Suggested ICD-10 codes</h2>
      <p className="mb-3 text-[11px] text-faint">Based on conversation</p>

      {suggestions.map((item) => (
        <div key={item.code} className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-xs font-bold text-ink">{item.code}</span>
            <span className="truncate text-xs text-muted">{item.description}</span>
          </div>
          <span className="shrink-0 rounded-full bg-live-bg px-2 py-0.5 text-[11px] font-bold text-live">
            {item.confidencePct}%
          </span>
        </div>
      ))}

      <button className="mt-1 flex items-center text-xs font-bold text-ink">
        View all codes
        <ArrowRight size={13} className="ml-1" />
      </button>
    </Card>
  );
}

export default Icd10CodesCard;
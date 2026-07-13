'use client';

import { ArrowRight, Check } from 'lucide-react';
import { Card } from '../../Card';
import { TimelineEvent } from '@/types';

interface Props {
  events: TimelineEvent[];
}

export function ConsultationTimelineCard({ events }: Props) {
  return (
    <Card className="flex-1">
      <h2 className="mb-3 text-sm font-bold text-ink">Consultation timeline</h2>

      {events.map((event) => (
        <div key={event.id} className="mb-2.5 flex items-center gap-2">
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-live-bg">
            <Check size={10} className="text-success" />
          </span>
          <span className="w-11 shrink-0 text-[11px] text-faint">{event.time}</span>
          <span className="truncate text-xs font-medium text-ink">{event.label}</span>
        </div>
      ))}

      <button className="mt-1 flex items-center text-xs font-bold text-ink">
        View full timeline
        <ArrowRight size={13} className="ml-1" />
      </button>
    </Card>
  );
}

export default ConsultationTimelineCard;
'use client';

import clsx from 'clsx';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { TranscriptEntry } from '@/types';

interface Props {
  entries: TranscriptEntry[];
}

function TranscriptRow({ entry }: { entry: TranscriptEntry }) {
  return (
    <div className="mb-3 flex items-start gap-2">
      <span className="w-10 shrink-0 text-[11px] text-faint">{entry.timestamp}</span>
      <span
        className={clsx(
          'w-[70px] shrink-0 text-xs font-bold',
          entry.speakerType === 'doctor' ? 'text-chip-blue-text' : 'text-ink',
        )}
      >
        {entry.speaker}
      </span>
      <span className="text-[13px] leading-relaxed text-ink">{entry.text}</span>
    </div>
  );
}

export function TranscriptCard({ entries }: Props) {
  return (
    <Card className="flex-1">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-[15px] font-bold text-ink">Live transcript</h2>
        <Badge label="Live" variant="live" dot />
      </div>

      {entries.map((entry) => (
        <TranscriptRow key={entry.id} entry={entry} />
      ))}

      <div className="mt-1 flex items-center">
        <span className="mr-3 text-xs text-faint">Transcribing...</span>
        <div className="flex flex-1 flex-wrap gap-[5px]">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className={clsx('h-1 w-1 rounded-full', i === 14 ? 'bg-live' : 'bg-divider')} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default TranscriptCard;

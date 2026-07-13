'use client';

import clsx from 'clsx';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import { AudioWaveform } from './AudioWaveform';
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
          entry.speakerType === 'doctor' ? 'text-chip-blueText' : 'text-ink',
        )}
      >
        {entry.speaker}
      </span>
      <span className="text-[13px] leading-relaxed text-ink">{entry.text}</span>
    </div>
  );
}

export function LiveTranscriptCard({ entries }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <Badge label="Live" variant="live" dot className="mb-3" />
        <AudioWaveform />
        <div className="mt-2 flex items-center">
          <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
          <span className="text-xs text-muted">Recording and transcribing...</span>
        </div>
      </Card>

      <Card>
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
              <span
                key={i}
                className={clsx(
                  'h-1 w-1 rounded-full',
                  i === 14 ? 'bg-live' : 'bg-divider',
                )}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LiveTranscriptCard;
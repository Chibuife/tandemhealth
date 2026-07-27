'use client';

import { useEffect, useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever a new entry arrives
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [entries]);

  return (
    <div className="flex flex-col gap-4">
      {/* Recording status card */}
      <Card>
        <Badge label="Live" variant="live" dot className="mb-3" />
        <AudioWaveform />
        <div className="mt-2 flex items-center">
          <span className="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-live" />
          <span className="text-xs text-muted">Recording and transcribing...</span>
        </div>
      </Card>

      {/* Transcript card — fixed height, scrolls internally */}
      <Card className="flex flex-col">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">Live transcript</h2>
          <Badge label="Live" variant="live" dot />
        </div>

        {/* Scrollable transcript body */}
        <div
          ref={scrollRef}
          className="h-72 overflow-y-auto pr-1"
        >
          {entries.length === 0 ? (
            <p className="text-[13px] text-faint">
              Transcript will appear here as participants speak…
            </p>
          ) : (
            entries.map((entry) => (
              <TranscriptRow key={entry.id} entry={entry} />
            ))
          )}
        </div>

        {/* Transcribing indicator — always pinned below the scroll area */}
        <div className="mt-3 flex items-center border-t border-divider pt-2">
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
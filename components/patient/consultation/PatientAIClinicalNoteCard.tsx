'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import { SoapNote } from '@/types';

interface Props {
  note: SoapNote;
}

const SECTIONS: { key: 'subjective' | 'objective' | 'assessment'; letter: string; label: string }[] = [
  { key: 'subjective', letter: 'S', label: 'Subjective' },
  { key: 'objective', letter: 'O', label: 'Objective' },
  { key: 'assessment', letter: 'A', label: 'Assessment' },
];

function SectionLetter({ letter }: { letter: string }) {
  return (
    <span className="mr-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chip-purple-bg text-xs font-bold text-chip-purple-text">
      {letter}
    </span>
  );
}

export function PatientAIClinicalNoteCard({ note }: Props) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">AI clinical note</h2>
          <Badge label={note.status} variant="neutral" />
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5">
          <span className="text-xs font-semibold text-ink">SOAP</span>
        </button>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.key} className="mb-4 flex">
          <SectionLetter letter={section.letter} />
          <div>
            <p className="mb-1 text-[13px] font-bold text-ink">{section.label}</p>
            <p className="text-[13px] leading-relaxed text-muted">{note[section.key]}</p>
          </div>
        </div>
      ))}

      <div className="mb-4 flex">
        <SectionLetter letter="P" />
        <div>
          <p className="mb-1 text-[13px] font-bold text-ink">Plan</p>
          <ul>
            {note.plan.map((line, i) => (
              <li key={i} className="flex text-[13px] leading-relaxed text-muted">
                <span className="mr-1.5">&bull;</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="flex gap-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
            aria-label="Helpful"
          >
            <ThumbsUp size={14} className="text-ink" />
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
            aria-label="Not helpful"
          >
            <ThumbsDown size={14} className="text-ink" />
          </button>
        </div>
        <button className="rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-ink">
          View full note
        </button>
      </div>
    </Card>
  );
}

export default PatientAIClinicalNoteCard;

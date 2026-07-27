'use client';

import { ChevronDown, RefreshCw, Sparkles } from 'lucide-react';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import { SoapNote } from '@/types';

interface Props {
  note: SoapNote;
  onGenerate: () => Promise<void>;
  isGenerating?: boolean;
}

const SECTIONS: { key: 'subjective' | 'objective' | 'assessment'; letter: string; label: string }[] = [
  { key: 'subjective', letter: 'S', label: 'Subjective' },
  { key: 'objective', letter: 'O', label: 'Objective' },
  { key: 'assessment', letter: 'A', label: 'Assessment' },
];

function SectionLetter({ letter }: { letter: string }) {
  return (
    <span className="mr-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chip-purpleBg text-xs font-bold text-chip-purpleText">
      {letter}
    </span>
  );
}

// Placeholder shown before first generation
function EmptyState({ onGenerate, isGenerating }: { onGenerate: () => void; isGenerating: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Sparkles size={28} className="mb-3 text-chip-purpleText opacity-60" />
      <p className="mb-1 text-[13px] font-semibold text-ink">No SOAP note yet</p>
      <p className="mb-4 text-[12px] leading-relaxed text-muted">
        Click Generate to create an AI clinical note from the transcript.
      </p>
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="flex items-center justify-center rounded-full bg-ink px-5 py-2.5 transition hover:bg-black disabled:opacity-50"
      >
        <Sparkles size={13} className={`mr-1.5 text-surface ${isGenerating ? 'animate-pulse' : ''}`} />
        <span className="text-xs font-bold text-surface">
          {isGenerating ? 'Generating…' : 'Generate SOAP'}
        </span>
      </button>
    </div>
  );
}

const isEmpty = (note: SoapNote) =>
  !note.subjective && !note.objective && !note.assessment && note.plan.length === 0;

export function AIClinicalNoteCard({ note, onGenerate, isGenerating = false }: Props) {
  return (
    <Card>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">AI clinical note</h2>
          <Badge label={note.status} variant="neutral" />
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5">
          <span className="text-xs font-semibold text-ink">SOAP</span>
          <ChevronDown size={14} className="text-muted" />
        </button>
      </div>

      {/* Body — empty state or note content */}
      {isEmpty(note) ? (
        <EmptyState onGenerate={onGenerate} isGenerating={isGenerating} />
      ) : (
        <>
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

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            {/* Regenerate — only shown when status is draft */}
            {note.status === 'draft' && (
              <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="flex items-center justify-center rounded-full border border-border px-4 py-2.5 disabled:opacity-50"
              >
                <RefreshCw
                  size={13}
                  className={`mr-1.5 text-ink ${isGenerating ? 'animate-spin' : ''}`}
                />
                <span className="text-xs font-semibold text-ink">
                  {isGenerating ? 'Regenerating…' : 'Regenerate'}
                </span>
              </button>
            )}

            {/* Transfer to patient record — always visible */}
            <button
              disabled={note.status === 'final'}
              className="flex flex-1 items-center justify-center rounded-full bg-ink py-2.5 transition hover:bg-black disabled:opacity-50"
            >
              <span className="text-xs font-bold text-surface">
                {note.status === 'final' ? 'Transferred ✓' : 'Transfer to patient record'}
              </span>
              {note.status !== 'final' && (
                <ChevronDown size={14} className="ml-1.5 text-surface" />
              )}
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

export default AIClinicalNoteCard;
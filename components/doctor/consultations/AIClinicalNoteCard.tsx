'use client';

import { ChevronDown, RefreshCw, Sparkles, Pencil, Check, X, Send } from 'lucide-react';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import { SoapNote } from '@/types';
import { useState, useEffect } from 'react';

interface Props {
  note: SoapNote;
  onGenerate: () => Promise<void>;
  onSave?: (updated: SoapNote) => Promise<void>;
  onPublish?: () => Promise<void>;
  isGenerating?: boolean;
}

const SECTIONS: { key: 'subjective' | 'objective' | 'assessment'; letter: string; label: string }[] = [
  { key: 'subjective', letter: 'S', label: 'Subjective' },
  { key: 'objective',  letter: 'O', label: 'Objective'  },
  { key: 'assessment', letter: 'A', label: 'Assessment' },
];

function SectionLetter({ letter }: { letter: string }) {
  return (
    <span className="mr-2.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chip-purpleBg text-xs font-bold text-chip-purpleText">
      {letter}
    </span>
  );
}

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

// ─── Editable text section (S / O / A) ───────────────────────────────────────

function EditableSection({
  letter,
  label,
  value,
  isEditing,
  onChange,
}: {
  letter: string;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (val: string) => void;
}) {
  return (
    <div className="mb-4 flex">
      <SectionLetter letter={letter} />
      <div className="flex-1">
        <p className="mb-1 text-[13px] font-bold text-ink">{label}</p>
        {isEditing ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-lg border border-chip-purpleBg bg-chip-purpleBg/30 px-3 py-2 text-[13px] leading-relaxed text-ink outline-none focus:border-chip-purpleText focus:ring-1 focus:ring-chip-purpleText/30 transition"
          />
        ) : (
          <p className="text-[13px] leading-relaxed text-muted">{value || '—'}</p>
        )}
      </div>
    </div>
  );
}

// ─── Editable plan list (P) ───────────────────────────────────────────────────

function EditablePlan({
  plan,
  isEditing,
  onChange,
}: {
  plan: string[];
  isEditing: boolean;
  onChange: (plan: string[]) => void;
}) {
  const updateLine = (i: number, val: string) => {
    const next = [...plan];
    next[i] = val;
    onChange(next);
  };

  const removeLine = (i: number) => onChange(plan.filter((_, idx) => idx !== i));
  const addLine    = ()          => onChange([...plan, '']);

  return (
    <div className="mb-4 flex">
      <SectionLetter letter="P" />
      <div className="flex-1">
        <p className="mb-1 text-[13px] font-bold text-ink">Plan</p>

        {isEditing ? (
          <div className="flex flex-col gap-1.5">
            {plan.map((line, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-muted text-[13px]">•</span>
                <input
                  value={line}
                  onChange={(e) => updateLine(i, e.target.value)}
                  className="flex-1 rounded-lg border border-chip-purpleBg bg-chip-purpleBg/30 px-3 py-1.5 text-[13px] text-ink outline-none focus:border-chip-purpleText focus:ring-1 focus:ring-chip-purpleText/30 transition"
                />
                <button
                  type="button"
                  onClick={() => removeLine(i)}
                  className="text-muted hover:text-red-500 transition"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLine}
              className="mt-1 self-start rounded-full border border-dashed border-chip-purpleText px-3 py-1 text-[12px] font-medium text-chip-purpleText hover:bg-chip-purpleBg transition"
            >
              + Add line
            </button>
          </div>
        ) : (
          <ul>
            {plan.length === 0 ? (
              <li className="text-[13px] text-muted">—</li>
            ) : (
              plan.map((line, i) => (
                <li key={i} className="flex text-[13px] leading-relaxed text-muted">
                  <span className="mr-1.5">&bull;</span>
                  <span>{line}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

// ─── Publish button ───────────────────────────────────────────────────────────

function PublishButton({
  published,
  isPublishing,
  onClick,
}: {
  published: boolean;
  isPublishing: boolean;
  onClick: () => void;
}) {
  if (published) {
    return (
      <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-emerald-700">Visible to patient</span>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={isPublishing}
      className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-50"
    >
      <Send size={12} className={isPublishing ? 'animate-pulse' : ''} />
      {isPublishing ? 'Publishing…' : 'Publish to patient'}
    </button>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────

export function AIClinicalNoteCard({ note, onGenerate, onSave, onPublish, isGenerating = false }: Props) {
  const [isEditing,    setIsEditing]    = useState(false);
  const [isSaving,     setIsSaving]     = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published,    setPublished]    = useState(false);
  const [draft,        setDraft]        = useState<SoapNote>(note);


  const handleEdit = () => {
    setDraft(note);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(note);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!onSave) { setIsEditing(false); return; }
    setIsSaving(true);
    try {
      await onSave(draft);
      setIsEditing(false);
      setPublished(false); // edits invalidate published state
    } catch (err) {
      console.error('Failed to save SOAP note', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!onPublish) return;
    setIsPublishing(true);
    try {
      await onPublish();
      setPublished(true);
    } catch (err) {
      console.error('Failed to publish SOAP note', err);
    } finally {
      setIsPublishing(false);
    }
  };

  const updateField = (key: 'subjective' | 'objective' | 'assessment') => (val: string) =>
    setDraft((prev) => ({ ...prev, [key]: val }));

  const updatePlan = (plan: string[]) =>
    setDraft((prev) => ({ ...prev, plan }));

  const displayed = isEditing ? draft : note;

  return (
    <Card>
      {/* ── Header ── */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">AI clinical note</h2>
          <Badge label={note.status} variant="neutral" />
        </div>

        <div className="flex items-center gap-2">
          {!isEmpty(note) && !isEditing && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-slate-50 transition"
            >
              <Pencil size={12} />
              Edit
            </button>
          )}

          {isEditing && (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-slate-50 transition"
              >
                <X size={12} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-1 rounded-lg bg-chip-purpleText px-2.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50 transition"
              >
                <Check size={12} />
                {isSaving ? 'Saving…' : 'Save'}
              </button>
            </>
          )}

          <button className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5">
            <span className="text-xs font-semibold text-ink">SOAP</span>
            <ChevronDown size={14} className="text-muted" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      {isEmpty(note) ? (
        <EmptyState onGenerate={onGenerate} isGenerating={isGenerating} />
      ) : (
        <>
          {SECTIONS.map((section) => (
            <EditableSection
              key={section.key}
              letter={section.letter}
              label={section.label}
              value={displayed[section.key]}
              isEditing={isEditing}
              onChange={updateField(section.key)}
            />
          ))}

          <EditablePlan
            plan={displayed.plan}
            isEditing={isEditing}
            onChange={updatePlan}
          />

          {/* ── Actions (only when not editing) ── */}
          {!isEditing && (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex gap-2">
                {note.status === 'draft' && (
                  <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="flex items-center justify-center rounded-full border border-border px-4 py-2.5 disabled:opacity-50 hover:bg-slate-50 transition"
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

                <PublishButton
                  published={published}
                  isPublishing={isPublishing}
                  onClick={handlePublish}
                />
              </div>

              <button
                disabled={note.status === 'final'}
                className="flex w-full items-center justify-center rounded-full bg-ink py-2.5 transition hover:bg-black disabled:opacity-50"
              >
                <span className="text-xs font-bold text-surface">
                  {note.status === 'final' ? 'Transferred ✓' : 'Transfer to patient record'}
                </span>
                {note.status !== 'final' && (
                  <ChevronDown size={14} className="ml-1.5 text-surface" />
                )}
              </button>
            </div>
          )}
        </>
      )}
    </Card>
  );
}

export default AIClinicalNoteCard;
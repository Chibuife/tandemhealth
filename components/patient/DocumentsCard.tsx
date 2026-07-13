'use client';

import { FileText, LucideIcon, Stethoscope } from 'lucide-react';
import { Badge } from '../Badge';
import Card from '../Card';
import { ConsultationDocument, DocumentType } from '@/types/patient';

interface Props {
  documents: ConsultationDocument[];
}

const TYPE_STYLE: Record<DocumentType, { icon: LucideIcon; bg: string; fg: string }> = {
  'clinical-note': { icon: FileText, bg: 'bg-chip-red-bg', fg: 'text-chip-red-text' },
  'sick-note': { icon: FileText, bg: 'bg-live-bg', fg: 'text-live' },
  referral: { icon: Stethoscope, bg: 'bg-chip-blue-bg', fg: 'text-chip-blue-text' },
};

function DocumentRow({ doc }: { doc: ConsultationDocument }) {
  const style = TYPE_STYLE[doc.type];
  const Icon = style.icon;

  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${style.bg}`}>
          <Icon size={15} className={style.fg} />
        </span>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-ink">{doc.title}</span>
            {doc.status && <Badge label={doc.status} variant="neutral" />}
          </div>
          <span className="text-[11px] text-faint">{doc.createdLabel}</span>
        </div>
      </div>
      <button className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-ink">
        View
      </button>
    </div>
  );
}

export function DocumentsCard({ documents }: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-[15px] font-bold text-ink">Documents from this consultation</h2>

      {documents.map((doc) => (
        <DocumentRow key={doc.id} doc={doc} />
      ))}

      <button className="mt-1 w-full rounded-full bg-ink py-2.5 text-xs font-bold text-surface transition hover:bg-black">
        Send to my doctor
      </button>
    </Card>
  );
}

export default DocumentsCard;

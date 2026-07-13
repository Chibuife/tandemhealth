'use client';

import { ArrowLeft } from 'lucide-react';
import { Badge } from '../Badge';
import { PatientConsultationInfo } from '@/types/patient';

interface Props {
  info: PatientConsultationInfo;
}

export function PatientConsultationHeader({ info }: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <button className="mr-5 flex items-center text-muted hover:text-ink">
        <ArrowLeft size={16} />
        <span className="ml-1.5 text-[13px] font-medium">Back to consultations</span>
      </button>

      <div className="flex flex-1 items-center gap-2">
        <h1 className="text-[17px] font-bold text-ink">
          Consultation with {info.clinicianName}
        </h1>
        {info.isLive && <Badge label="Live" variant="live" dot />}
        <span className="ml-1 text-[13px] tabular-nums text-muted">{info.elapsedTime}</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center rounded-full border border-border px-3.5 py-2">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-xs font-semibold text-ink">Recording</span>
        </button>
        <button className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-surface transition hover:bg-black">
          End consultation
        </button>
      </div>
    </div>
  );
}

export default PatientConsultationHeader;

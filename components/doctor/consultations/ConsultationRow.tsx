// ConsultationRow.tsx — matched to the same column widths so All/Accepted/Declined/Completed rows stay aligned with Pending rows
import { Calendar, MoreVertical, Video } from 'lucide-react';
import { AvatarTint, ConsultationStatus } from '@/types/consultation-list';
import { PatientAvatar } from './PatientAvatar';
import { useRouter } from 'next/navigation';
import { ConsultationRecord } from '@/types/consultations';

interface ConsultationRowProps {
  consultation: ConsultationRecord;
}

const statusClasses = {
  pending: 'bg-amber-50 text-amber-700',
  accepted: 'bg-emerald-50 text-emerald-700',
  declined: 'bg-rose-50 text-rose-700',
  completed: 'bg-blue-50 text-blue-700',
};
const avatarTints: AvatarTint[] = [
  'blue', 'violet', 'amber', 'rose'
];

export function ConsultationRow({ consultation }: ConsultationRowProps) {
  const router = useRouter()
  
function getAvatarTint(initials: string): AvatarTint {
  const index =
    initials.charCodeAt(0) % avatarTints.length;
  return avatarTints[index];
}
  return (
    <div className="flex min-w-[960px] items-center gap-6 border-b border-slate-100 p-5 last:border-b-0">
      {/* Patient */}
      <div className="flex w-56 shrink-0 items-center gap-3">
        <PatientAvatar
          initials={consultation.patientInitials}
          tint={getAvatarTint(consultation.patientInitials)}
        />
        <div>
          <p className="whitespace-nowrap text-sm font-semibold text-slate-900">{consultation.patientName}</p>
          <p className="whitespace-nowrap text-xs text-slate-500">ID: {consultation.patientId}</p>
        </div>
      </div>

      {/* Date / type */}
      <div className="flex w-48 shrink-0 items-start gap-2">
        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <div>
          <p className="whitespace-nowrap text-sm font-medium text-slate-900">
            {consultation.scheduledStart}
          </p>
          <p className="whitespace-nowrap text-xs text-slate-500">{consultation.durationMinutes} min consultation</p>
        </div>
      </div>

      {/* Status — spans the reason + priority width so it lines up under those columns */}
      <div className="flex w-[23rem] shrink-0 items-center">
        <span className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusClasses[consultation.status]}`}>
          {consultation.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        {consultation.status === 'accepted' && (
          <button
            onClick={() => router.push(`/dashboard/doctor/consultations/${consultation.id}`)}
            type="button"
            className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Video className="h-4 w-4 shrink-0" />
            Join consultation
          </button>
        )}
        <button
          type="button"
          className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
          aria-label="More options"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
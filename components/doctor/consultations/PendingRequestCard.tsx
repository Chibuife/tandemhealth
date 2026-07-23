// PendingRequestCard.tsx
import { useState } from 'react';
import { Calendar, Check, MoreVertical, X } from 'lucide-react';
import { PatientAvatar } from './PatientAvatar';
import { ConsultationPriority, ConsultationRecord } from '@/types/consultations';
import { AvatarTint } from '@/types/consultation-list';

interface PendingRequestCardProps {
  request: ConsultationRecord;
  onAccept?: (id: string) => void | Promise<void>;
  onDecline?: (id: string) => void | Promise<void>;
}

const priorityClasses: Record<ConsultationPriority, string> = {
  high: 'bg-rose-50 text-rose-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-emerald-50 text-emerald-600',
};

export function PendingRequestCard({ request, onAccept, onDecline }: PendingRequestCardProps) {
  const [isSubmitting, setIsSubmitting] = useState<'accept' | 'decline' | null>(null);

  const handleAccept = async () => {
    if (!onAccept || isSubmitting) return;
    setIsSubmitting('accept');
    try {
      await onAccept(request.id);
    } finally {
      setIsSubmitting(null);
    }
  };

  const handleDecline = async () => {
    if (!onDecline || isSubmitting) return;
    setIsSubmitting('decline');
    try {
      await onDecline(request.id);
    } finally {
      setIsSubmitting(null);
    }
  };

  const avatarTints: AvatarTint[] = [
    'blue', 'violet', 'amber', 'rose'
  ];
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
          initials={request.patientInitials}
          tint={getAvatarTint(request.patientInitials)}
        />        <div>
          <p className="whitespace-nowrap text-sm font-semibold text-slate-900">{request.patientName}</p>
          <p className="whitespace-nowrap text-xs text-slate-500">ID: {request.patientId}</p>

        </div>
      </div>

      {/* Date / type */}
      <div className="flex w-48 shrink-0 items-start gap-2">
        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <div>
          <p className="whitespace-nowrap text-sm font-medium text-slate-900">
            {request.scheduledStart}
          </p>
          <p className="whitespace-nowrap text-xs text-slate-500">{request.durationMinutes} min consultation</p>
        </div>
      </div>

      {/* Reason */}
      <div className="w-64 shrink-0">
        <p className="whitespace-nowrap text-xs font-medium text-slate-400">Reason for visit</p>
        <p className="text-sm text-slate-700">{request.reasonForVisit}</p>
      </div>

      {/* Priority */}
      <div className="w-28 shrink-0">
        {request.priority && (
          <>
            <p className="whitespace-nowrap text-xs font-medium text-slate-400">Priority</p>
            <span
              className={`mt-1 inline-block whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${priorityClasses[request.priority]}`}
            >
              {request.priority}
            </span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={handleAccept}
          disabled={isSubmitting !== null}
          className="flex flex-col items-center whitespace-nowrap rounded-lg bg-emerald-50 px-4 py-2 text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Check className="h-4 w-4 shrink-0" />
            {isSubmitting === 'accept' ? 'Accepting…' : 'Accept'}
          </span>
          <span className="text-xs text-emerald-600">Join call</span>
        </button>
        <button
          type="button"
          onClick={handleDecline}
          disabled={isSubmitting !== null}
          className="flex flex-col items-center whitespace-nowrap rounded-lg bg-rose-50 px-4 py-2 text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <X className="h-4 w-4 shrink-0" />
            {isSubmitting === 'decline' ? 'Declining…' : 'Decline'}
          </span>
          <span className="text-xs text-rose-500">Not available</span>
        </button>
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
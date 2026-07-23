import { AvatarTint } from '@/types/consultation-list';

interface PatientAvatarProps {
  initials: string;
  tint: AvatarTint;
}

const tintClasses: Record<AvatarTint, string> = {
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
};

export function PatientAvatar({ initials, tint }: PatientAvatarProps) {
  return (
    <div className="relative shrink-0">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${tintClasses[tint]}`}
      >
        {initials}
      </div>
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
    </div>
  );
}

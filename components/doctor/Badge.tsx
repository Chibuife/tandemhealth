import clsx from 'clsx';

export type BadgeColor = 'green' | 'blue' | 'gray' | 'red' | 'amber' | 'violet';

const COLOR_MAP: Record<BadgeColor, string> = {
  green: 'bg-emerald-50 text-emerald-700',
  blue: 'bg-blue-50 text-blue-700',
  gray: 'bg-slate-100 text-slate-600',
  red: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-700',
  violet: 'bg-violet-50 text-violet-700',
};

export function Badge({ label, color }: { label: string; color: BadgeColor }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold',
        COLOR_MAP[color],
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
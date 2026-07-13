import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'live' | 'neutral' | 'lime';
  dot?: boolean;
  className?: string;
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps['variant']>, string> = {
  live: 'bg-live-bg text-live',
  neutral: 'bg-divider text-muted',
  lime: 'bg-lime text-ink',
};

const DOT_COLOR: Record<NonNullable<BadgeProps['variant']>, string> = {
  live: 'bg-live',
  neutral: 'bg-muted',
  lime: 'bg-ink',
};

export function Badge({ label, variant = 'neutral', dot, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      {dot && <span className={clsx('h-1.5 w-1.5 rounded-full', DOT_COLOR[variant])} />}
      {label}
    </span>
  );
}

export default Badge;
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface RoleOptionCardProps {
  href: string;
  icon: LucideIcon;
  iconBg: string;
  iconFg: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export function RoleOptionCard({
  href,
  icon: Icon,
  iconBg,
  iconFg,
  title,
  description,
  ctaLabel,
}: RoleOptionCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-1 flex-col rounded-card border border-border bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={22} style={{ color: iconFg }} />
      </span>

      <h2 className="mb-2 text-lg font-bold text-ink">{title}</h2>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{description}</p>

      <span className="inline-flex items-center text-sm font-bold text-ink">
        {ctaLabel}
        <ArrowRight size={16} className="ml-1.5 transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default RoleOptionCard;

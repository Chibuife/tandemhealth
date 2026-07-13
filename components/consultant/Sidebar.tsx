'use client';

import {
  BarChart2,
  FileText,
  HelpCircle,
  LayoutGrid,
  Link2,
  Settings,
  ShieldCheck,
  Users,
  LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { consultation, navItems } from '@/data/demoData';
import { NavItem } from '@/types';

const ICON_MAP: Record<NavItem['icon'], LucideIcon> = {
  LayoutGrid: LayoutGrid,
  Users: Users,
  FileText: FileText,
  ShieldCheck: ShieldCheck,
  Link2: Link2,
  BarChart2: BarChart2,
  Settings: Settings,
};

function NavRow({ item }: { item: NavItem }) {
  const Icon = ICON_MAP[item.icon];

  return (
    <button
      className={clsx(
        'mb-0.5 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[13px] transition',
        item.active ? 'bg-divider font-bold text-ink' : 'font-medium text-muted hover:bg-bg',
      )}
    >
      <Icon size={17} className="mr-2.5 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.isNew && (
        <span className="ml-2 rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-bold text-ink">
          New
        </span>
      )}
    </button>
  );
}

export function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col justify-between border-r border-border bg-surface py-4">
      <nav className="px-3">
        {navItems.map((item) => (
          <NavRow key={item.id} item={item} />
        ))}
      </nav>

      <div className="border-t border-border px-3 pt-3">
        <button className="mb-2 flex w-full items-center rounded-lg px-1 py-1.5 text-left hover:bg-bg">
          <span className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-ink">
            DR
          </span>
          <span>
            <span className="block text-xs font-bold text-ink">{consultation.clinicianName}</span>
            <span className="block text-[11px] text-muted">{consultation.clinicianRole}</span>
          </span>
        </button>
        <button className="flex w-full items-center rounded-lg px-1 py-2 text-left text-muted hover:bg-bg">
          <HelpCircle size={16} className="mr-2.5" />
          <span className="text-xs font-medium">Help &amp; support</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
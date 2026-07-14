'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  FileText,
  HelpCircle,
  LayoutGrid,
  Link2,
  Settings,
  ShieldCheck,
  Users,
  X,
  LucideIcon,
  Stethoscope,
  Mail,
} from 'lucide-react';
import clsx from 'clsx';
import { consultation, navItems } from '@/data/demoData';
import { NavItem } from '@/types';
import { useSidebar } from './SidebarContext';

const ICON_MAP: Record<NavItem['icon'], LucideIcon> = {
  LayoutGrid: LayoutGrid,
  Users: Users,
  FileText: FileText,
  ShieldCheck: ShieldCheck,
  Link2: Link2,
  BarChart2: BarChart2,
  Settings: Settings,
  Stethoscope:Stethoscope,
  Mail: Mail,
};

// Assumes item.id is a route slug, e.g. "dashboard", "patients", "records"...
// Adjust this if your NavItem already carries an explicit href.
function getHref(item: NavItem) {
  return item.id === 'dashboard' ? '/dashboard/doctor' : `/dashboard/doctor/${item.id}`;
}

function NavRow({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const Icon = ICON_MAP[item.icon];
  const pathname = usePathname();
  const href = getHref(item);
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={clsx(
        'mb-0.5 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[13px] transition',
        isActive ? 'bg-divider font-bold text-ink' : 'font-medium text-muted hover:bg-bg',
      )}
    >
      <Icon size={17} className="mr-2.5 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.isNew && (
        <span className="ml-2 rounded-full bg-lime px-1.5 py-0.5 text-[9px] font-bold text-ink">
          New
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          'flex w-64 shrink-0 flex-col justify-between border-r border-border bg-surface py-4',
          'fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out',
          'lg:static lg:z-auto lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-3 pb-2 lg:hidden">
          <span className="text-sm font-bold text-ink">Menu</span>
          <button
            onClick={close}
            className="rounded-lg p-1.5 text-muted hover:bg-bg"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3">
          {navItems.map((item) => (
            <NavRow key={item.id} item={item} onNavigate={close} />
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
    </>
  );
}

export default Sidebar;
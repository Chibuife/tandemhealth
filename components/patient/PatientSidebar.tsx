'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  ChevronDown,
  FileText,
  HeartPulse,
  Home,
  ListChecks,
  LogOut,
  MessageCircle,
  Pill,
  Settings,
  Share2,
  HelpCircle,
  X,
  LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { patientNavItems, patientProfile } from '@/data/patientDemoData';
import { PatientNavIcon, PatientNavItem } from '@/types/patient';

const ICON_MAP: Record<PatientNavIcon, LucideIcon> = {
  Home,
  Calendar,
  FileText,
  Pill,
  Share2,
  MessageCircle,
  ListChecks,
  HeartPulse,
};

function NavRow({
  item,
  isActive,
  onNavigate,
}: {
  item: PatientNavItem;
  isActive: boolean;
  onNavigate: () => void;
}) {
  const Icon = ICON_MAP[item.icon];

  return (
    <Link
      href={`/dashboard/patient/${item.id}`}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'mb-0.5 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-[13px] transition',
        isActive ? 'bg-divider font-bold text-ink' : 'font-medium text-muted hover:bg-bg',
      )}
    >
      <Icon size={17} className="mr-2.5 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {typeof item.badgeCount === 'number' && (
        <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-divider px-1.5 text-[11px] font-bold text-ink">
          {item.badgeCount}
        </span>
      )}
    </Link>
  );
}

interface PatientSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function PatientSidebar({ isOpen = false, onClose }: PatientSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop: only rendered on mobile while the sidebar is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col justify-between border-r border-border bg-surface py-4 transition-transform duration-200 ease-in-out',
          'lg:static lg:z-auto lg:w-56 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div>
          <div className="mb-4 flex items-center justify-between px-3 lg:hidden">
            <span className="text-sm font-bold text-ink">Menu</span>
            <button onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-bg" aria-label="Close menu">
              <X size={18} />
            </button>
          </div>

          <button className="mx-3 mb-4 flex items-center justify-between rounded-xl border border-border px-2.5 py-2">
            <span className="flex items-center">
              <span className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chip-purple-bg text-[11px] font-bold text-chip-purple-text">
                {patientProfile.avatarInitials}
              </span>
              <span>
                <span className="block text-xs font-bold text-ink">{patientProfile.name}</span>
                <span className="block text-[11px] text-muted">{patientProfile.role}</span>
              </span>
            </span>
            <ChevronDown size={14} className="text-muted" />
          </button>

          <nav className="px-3">
            {patientNavItems.map((item) => (
              <NavRow
                key={item.id}
                item={item}
                isActive={pathname === item.id}
                onNavigate={() => onClose?.()}
              />
            ))}
          </nav>
        </div>

        <div className="border-t border-border px-3 pt-3">
          <button className="mb-0.5 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-muted hover:bg-bg">
            <Settings size={16} className="mr-2.5" />
            <span className="text-[13px] font-medium">Settings</span>
          </button>
          <button className="mb-0.5 flex w-full items-center rounded-lg px-3 py-2.5 text-left text-muted hover:bg-bg">
            <HelpCircle size={16} className="mr-2.5" />
            <span className="text-[13px] font-medium">Help &amp; support</span>
          </button>
          <button className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-muted hover:bg-bg">
            <LogOut size={16} className="mr-2.5" />
            <span className="text-[13px] font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default PatientSidebar;
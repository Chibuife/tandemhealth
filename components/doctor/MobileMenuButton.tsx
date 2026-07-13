'use client';

import { Menu } from 'lucide-react';
import { useSidebar } from './SidebarContext';

export function MobileMenuButton() {
  const { open } = useSidebar();

  return (
    <button
      onClick={open}
      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-ink lg:hidden"
      aria-label="Open menu"
    >
      <Menu size={16} />
      Menu
    </button>
  );
}

export default MobileMenuButton;
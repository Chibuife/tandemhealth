'use client';

import { Menu } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
      <div className="flex items-center">
        <div className="mr-2 flex items-center">
          <span className="h-3.5 w-3.5 rounded-full bg-ink" />
          <span className="-ml-1 h-3.5 w-3.5 rounded-full border-2 border-ink bg-surface" />
        </div>
        <span className="text-lg font-bold text-ink">Tandem</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full bg-lime px-4 py-2 text-[13px] font-bold text-ink transition hover:bg-lime-dark">
          Get a demo
        </button>
        <button className="p-1 text-ink" aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
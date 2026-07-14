'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, List, LayoutGrid } from 'lucide-react';

export function PatientDocumentsToolbar() {
  const [view, setView] = useState<'list' | 'grid'>('list');

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg hover:bg-muted">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          Filters
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg hover:bg-muted">
          Sort: Newest first
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center rounded-lg border border-border bg-card p-0.5">
          <button
            onClick={() => setView('list')}
            className={`rounded-md p-1.5 ${view === 'list' ? 'bg-fg text-bg' : 'text-muted-foreground hover:bg-muted'}`}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`rounded-md p-1.5 ${view === 'grid' ? 'bg-fg text-bg' : 'text-muted-foreground hover:bg-muted'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientDocumentsToolbar;
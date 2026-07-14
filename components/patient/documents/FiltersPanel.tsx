'use client';

import { Calendar, ChevronDown } from 'lucide-react';

export function FiltersPanel() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Filters</h3>
        <button className="text-sm font-medium text-emerald-700 hover:underline">Clear all</button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Document type</label>
          <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-fg hover:bg-muted">
            All types
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Uploaded by</label>
          <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-fg hover:bg-muted">
            All users
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Date range</label>
          <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-fg hover:bg-muted">
            Select date range
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Tags</label>
          <button className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-fg hover:bg-muted">
            All tags
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <button className="w-full rounded-lg bg-fg px-3 py-2 text-sm font-medium text-bg hover:opacity-90">
          Apply filters
        </button>
      </div>
    </div>
  );
}

export default FiltersPanel;
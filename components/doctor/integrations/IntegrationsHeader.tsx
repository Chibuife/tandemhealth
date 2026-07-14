"use client";

import { LayoutGrid, Plus, Search } from "lucide-react";

interface IntegrationsHeaderProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onBrowseMarketplace?: () => void;
  onCustomIntegration?: () => void;
}

export default function IntegrationsHeader({
  searchQuery,
  onSearchQueryChange,
  onBrowseMarketplace,
  onCustomIntegration,
}: IntegrationsHeaderProps) {
  return (
    <div className="mb-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Integrations</h1>
          <p className="mt-1 text-sm text-fg-muted">
            Connect Tandem with your favorite tools and systems.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBrowseMarketplace}
            className="flex items-center gap-1.5 rounded-lg bg-fg px-4 py-2.5 text-sm font-medium text-white hover:bg-fg/90"
          >
            <LayoutGrid className="h-4 w-4" />
            Browse marketplace
          </button>
          <button
            type="button"
            onClick={onCustomIntegration}
            className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-fg hover:bg-bg-subtle"
          >
            <Plus className="h-4 w-4" />
            Custom integration
          </button>
        </div>
      </div>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => onSearchQueryChange(event.target.value)}
          placeholder="Search integrations..."
          className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
        />
      </div>
    </div>
  );
}
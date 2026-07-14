import { ChevronDown, ListFilter, Search } from 'lucide-react';

export function TaskFiltersBar() {
  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime"
        />
      </div>

      <button className="flex shrink-0 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-ink">
        All statuses
        <ChevronDown size={15} className="text-muted" />
      </button>

      <button className="flex shrink-0 items-center justify-between gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-ink">
        All categories
        <ChevronDown size={15} className="text-muted" />
      </button>

      <button className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-ink">
        <ListFilter size={15} />
        Filters
      </button>
    </div>
  );
}

export default TaskFiltersBar;
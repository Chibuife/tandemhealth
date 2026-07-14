import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export default function TasksToolbar() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg hover:bg-muted">
          All statuses
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg hover:bg-muted">
          All types
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-fg hover:bg-muted">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          Filters
        </button>
      </div>
    </div>
  );
}
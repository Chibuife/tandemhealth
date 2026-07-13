import { Plus, Download } from "lucide-react";

export default function TemplatesHeader() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Templates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create, customize, and manage your clinical documentation templates.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
          <Download className="h-4 w-4" />
          Import template
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          <Plus className="h-4 w-4" />
          New template
        </button>
      </div>
    </div>
  );
}
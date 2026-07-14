import { Calendar, ChevronDown, Download } from "lucide-react";

export default function AnalyticsHeader() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your practice performance and clinical documentation insights.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          12 May 2026 – 18 May 2026
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
          <Download className="h-4 w-4" />
          Export report
        </button>
      </div>
    </div>
  );
}
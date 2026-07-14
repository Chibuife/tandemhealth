import { FileText, Download, ChevronRight, ArrowRight } from "lucide-react";

const reports = [
  {
    title: "Practice performance report",
    description: "Comprehensive overview of your practice",
  },
  {
    title: "Clinical documentation report",
    description: "Detailed documentation analytics",
  },
];

export default function ReportsPanel() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-fg">Reports</h3>

      <ul className="mb-2">
        {reports.map((report) => (
          <li key={report.title} className="flex items-center gap-3 border-b border-border py-3 last:border-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <button className="flex flex-1 items-center justify-between gap-2 text-left">
              <div>
                <p className="text-sm font-medium text-fg">{report.title}</p>
                <p className="text-xs text-muted-foreground">{report.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
            <button
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-fg"
              aria-label={`Download ${report.title}`}
            >
              <Download className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <button className="inline-flex items-center gap-1 px-0 text-sm font-medium text-emerald-700 hover:underline">
        View all reports
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
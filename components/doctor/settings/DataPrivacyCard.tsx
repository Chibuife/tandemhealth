import { ChevronRight, Download, FileClock, Trash2 } from "lucide-react";

interface PrivacyRow {
  id: string;
  icon: typeof FileClock;
  title: string;
  description: string;
  valueLabel?: string;
  destructive?: boolean;
}

const ROWS: PrivacyRow[] = [
  {
    id: "retention",
    icon: FileClock,
    title: "Data retention",
    description: "Configure how long data is kept",
    valueLabel: "7 years",
  },
  {
    id: "export",
    icon: Download,
    title: "Export data",
    description: "Export your practice data",
  },
  {
    id: "delete",
    icon: Trash2,
    title: "Delete data",
    description: "Permanently delete your data",
    destructive: true,
  },
];

export default function DataPrivacyCard() {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">Data &amp; privacy</h3>
      <p className="mt-0.5 text-sm text-fg-muted">Manage how your data is stored and used.</p>

      <div className="mt-3 divide-y divide-border">
        {ROWS.map((row) => (
          <button
            key={row.id}
            type="button"
            className="flex w-full items-center justify-between gap-3 py-3 text-left hover:bg-bg-subtle"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-subtle text-fg-muted">
                <row.icon className="h-4 w-4" />
              </span>
              <span>
                <span
                  className={`block text-sm font-medium ${row.destructive ? "text-red-600" : "text-fg"}`}
                >
                  {row.title}
                </span>
                <span className="block text-sm text-fg-muted">{row.description}</span>
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-2">
              {row.valueLabel && (
                <span className="rounded-full bg-bg-subtle px-2.5 py-1 text-xs font-medium text-fg-muted">
                  {row.valueLabel}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-fg-muted" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
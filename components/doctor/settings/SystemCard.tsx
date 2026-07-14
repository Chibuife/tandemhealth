interface SystemCardProps {
  onViewSystemStatus?: () => void;
}

const ROWS: { label: string; value: string }[] = [
  { label: "Plan", value: "Professional" },
  { label: "Member since", value: "3 Jan 2026" },
  { label: "Last sign in", value: "18 May 2026, 09:15" },
  { label: "App version", value: "v2.4.1" },
];

export default function SystemCard({ onViewSystemStatus }: SystemCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">System</h3>

      <dl className="mt-3 divide-y divide-border">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="font-medium text-fg">{row.value}</dd>
          </div>
        ))}

        <div className="flex items-center justify-between py-2.5 text-sm">
          <dt className="text-fg-muted">API status</dt>
          <dd className="flex items-center gap-1.5 font-medium text-fg">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            All systems operational
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onViewSystemStatus}
        className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-bg-subtle"
      >
        View system status
      </button>
    </div>
  );
}
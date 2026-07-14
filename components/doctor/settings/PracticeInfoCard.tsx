interface PracticeInfoCardProps {
  onEdit?: () => void;
}

const ROWS: { label: string; value: string }[] = [
  { label: "Practice name", value: "Oslo Medical Practice" },
  { label: "Practice type", value: "Primary Care" },
  { label: "Address", value: "Storgata 10, 0155 Oslo, Norway" },
  { label: "Phone", value: "+47 912 34 567" },
  { label: "Email", value: "post@oslomedi.no" },
  { label: "Organization number", value: "NO 123 456 789 MVA" },
];

export default function PracticeInfoCard({ onEdit }: PracticeInfoCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Practice information</h3>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-fg hover:bg-bg-subtle"
        >
          Edit
        </button>
      </div>

      <dl className="mt-3 divide-y divide-border">
        {ROWS.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="max-w-[60%] text-right font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
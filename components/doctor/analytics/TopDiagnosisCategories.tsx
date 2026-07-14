const categories = [
  { label: "Respiratory", count: 28, percent: "19.7%", width: "100%" },
  { label: "Musculoskeletal", count: 22, percent: "15.5%", width: "79%" },
  { label: "Cardiovascular", count: 18, percent: "12.7%", width: "64%" },
  { label: "Digestive", count: 15, percent: "10.6%", width: "54%" },
  { label: "Neurological", count: 12, percent: "8.5%", width: "43%" },
];

export default function TopDiagnosisCategories() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">Top diagnosis categories</h3>

      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-fg">{category.label}</span>
              <span className="text-muted-foreground">
                {category.count} ({category.percent})
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: category.width }} />
            </div>
          </li>
        ))}
      </ul>

      <button className="mt-4 w-full rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-muted">
        View all diagnoses
      </button>
    </div>
  );
}
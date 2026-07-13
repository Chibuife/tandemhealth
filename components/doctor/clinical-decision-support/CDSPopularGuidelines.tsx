interface Guideline {
  title: string;
  source: string;
  specialty: string;
}

const guidelines: Guideline[] = [
  { title: "Hypertension in Adults", source: "2024 ESC Guidelines", specialty: "Cardiology" },
  { title: "Type 2 Diabetes Management", source: "2024 ADA Standards", specialty: "Endocrinology" },
  { title: "Asthma Management", source: "GINA 2024", specialty: "Respiratory" },
  { title: "Chronic Kidney Disease", source: "KDIGO 2024", specialty: "Nephrology" },
  { title: "Heart Failure Management", source: "2023 ACC/AHA Guidelines", specialty: "Cardiology" },
];

export default function CDSPopularGuidelines() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Popular guidelines</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          View all guidelines
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {guidelines.map((guideline) => (
          <div
            key={guideline.title}
            className="flex flex-col justify-between rounded-lg border border-gray-200 p-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{guideline.title}</p>
              <p className="mt-1 text-xs text-gray-400">{guideline.source}</p>
              <span className="mt-2 inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                {guideline.specialty}
              </span>
            </div>
            <button
              type="button"
              className="mt-4 rounded-lg border border-gray-200 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              View guideline
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
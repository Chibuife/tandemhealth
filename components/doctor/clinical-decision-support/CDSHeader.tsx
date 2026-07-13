import { BookOpen, Sparkles } from "lucide-react";

export default function CDSHeader() {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Clinical decision support
          </h1>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            New
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Evidence-based recommendations and insights to support your clinical decisions.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <BookOpen className="h-4 w-4" />
          View guidelines
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Sparkles className="h-4 w-4" />
          Ask CDS
        </button>
      </div>
    </div>
  );
}
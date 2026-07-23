import { Calendar } from 'lucide-react';

export function ConsultationsPageHeader() {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Consultations</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage and respond to patient consultation requests
        </p>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <Calendar className="h-4 w-4" />
        Availability
      </button>
    </div>
  );
}

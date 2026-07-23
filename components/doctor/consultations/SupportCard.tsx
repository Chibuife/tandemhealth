import { Headphones } from 'lucide-react';

export function SupportCard() {
  return (
    <div className="rounded-xl border border-violet-100 bg-violet-50 p-6">
      <h2 className="text-base font-semibold text-slate-900">Need help?</h2>
      <p className="mt-1 text-sm text-slate-600">Our support team is here to help you.</p>
      <button
        type="button"
        className="mt-4 flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <Headphones className="h-4 w-4" />
        Contact support
      </button>
    </div>
  );
}

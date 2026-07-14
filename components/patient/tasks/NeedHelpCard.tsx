import { Headphones } from 'lucide-react';

export function NeedHelpCard() {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
      <h2 className="text-sm font-bold text-indigo-900">Need help?</h2>
      <p className="mt-1 text-xs text-indigo-700">Our support team is here to help you.</p>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-900">
        <Headphones size={15} />
        Contact support
      </button>
    </div>
  );
}

export default NeedHelpCard;
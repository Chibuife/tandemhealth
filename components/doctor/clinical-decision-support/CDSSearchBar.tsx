import { ChevronDown, Search } from "lucide-react";

export default function CDSSearchBar() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search conditions, symptoms, or topics..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-44"
      >
        All specialties
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
}
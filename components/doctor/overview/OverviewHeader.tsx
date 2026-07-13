import { Calendar, ChevronDown } from 'lucide-react';

export function OverviewHeader({
  clinicianFirstName,
  date,
}: {
  clinicianFirstName: string;
  date: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-[28px]">Overview</h1>
        <p className="mt-1 text-sm text-muted">
          Welcome back, Dr. {clinicianFirstName}. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <button className="flex items-center gap-2 self-start rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-ink sm:self-auto">
        <Calendar size={16} className="text-muted" />
        {date}
        <ChevronDown size={16} className="text-muted" />
      </button>
    </div>
  );
}

export default OverviewHeader;
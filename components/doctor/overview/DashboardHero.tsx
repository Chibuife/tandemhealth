import { CalendarClock, LucideIcon, Users, Video } from 'lucide-react';
import { consultation } from '@/data/demoData';

interface StatPillProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function StatPill({ icon: Icon, label, value }: StatPillProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime/20 text-ink">
        <Icon size={18} />
      </span>
      <div>
        <div className="text-[11px] font-medium text-muted">{label}</div>
        <div className="text-sm font-bold text-ink">{value}</div>
      </div>
    </div>
  );
}

export function DashboardHero() {
  const firstName = consultation.clinicianName.split(' ')[0];

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Welcome back
          </p>
          <h1 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">
            Good to see you, {firstName}
          </h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Here&apos;s an overview of today&apos;s consultations, patients, and clinical activity.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-lime px-5 py-2.5 text-sm font-bold text-ink transition hover:opacity-90">
          <Video size={16} />
          Start a consultation
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatPill icon={Video} label="Active consultations" value="3" />
        <StatPill icon={Users} label="Patients waiting" value="5" />
        <StatPill icon={CalendarClock} label="Next appointment" value="10:30 AM" />
      </div>
    </div>
  );
}

export default DashboardHero;
import { ScheduleItem } from "@/types/consultations";

interface TodaysScheduleCardProps {
  schedule: ScheduleItem[];
}

export function TodaysScheduleCard({ schedule }: TodaysScheduleCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Today&apos;s schedule</h2>
        <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-4">
        {schedule.map((item) => (
          <li key={`${item.time}-${item.patientName}`} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">{item.time}</p>
              <p className="text-sm text-slate-500">{item.patientName}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                item.status === 'accepted'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-amber-50 text-amber-700'
              }`}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

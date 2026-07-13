import { AlertTriangle } from "lucide-react";

interface Alert {
  title: string;
  description: string;
  date: string;
  severity: "high" | "medium";
}

const alerts: Alert[] = [
  {
    title: "High risk drug interaction",
    description: "Warfarin + Amiodarone",
    date: "12 May 2026, 09:15",
    severity: "high",
  },
  {
    title: "Allergy contraindication",
    description: "Penicillin allergy documented",
    date: "12 May 2026, 08:45",
    severity: "high",
  },
  {
    title: "Duplicate therapy",
    description: "Multiple NSAIDs prescribed",
    date: "11 May 2026, 16:22",
    severity: "medium",
  },
  {
    title: "Dose adjustment",
    description: "Renal function suggests dose change",
    date: "11 May 2026, 10:05",
    severity: "medium",
  },
  {
    title: "Monitoring reminder",
    description: "eGFR monitoring overdue",
    date: "10 May 2026, 14:30",
    severity: "medium",
  },
];

const severityStyles: Record<Alert["severity"], { bg: string; icon: string }> = {
  high: { bg: "bg-red-50", icon: "text-red-500" },
  medium: { bg: "bg-orange-50", icon: "text-orange-500" },
};

export default function CDSAlerts() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Recent alerts</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          View all
        </button>
      </div>

      <ul className="divide-y divide-gray-100">
        {alerts.map((alert) => (
          <li key={alert.title} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${severityStyles[alert.severity].bg}`}
            >
              <AlertTriangle className={`h-4 w-4 ${severityStyles[alert.severity].icon}`} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{alert.title}</p>
              <p className="mt-0.5 text-sm text-gray-500">{alert.description}</p>
              <p className="mt-1 text-xs text-gray-400">{alert.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
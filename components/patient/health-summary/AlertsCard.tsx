import { CheckCircle2, Clock, ChevronRight } from 'lucide-react';
import { HeartAlert } from '@/types/patient';

interface AlertsCardProps {
  alerts: HeartAlert[];
}

export function AlertsCard({ alerts }: AlertsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Alerts</h3>
        <button className="text-sm font-medium text-violet-700 hover:underline">View all</button>
      </div>

      <ul className="space-y-2">
        {alerts.map((alert) => {
          const isOk = alert.status === 'ok';
          return (
            <li
              key={alert.id}
              className={`flex items-start gap-3 rounded-lg border p-3 ${
                isOk ? 'border-emerald-100 bg-emerald-50' : 'border-orange-100 bg-orange-50'
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  isOk ? 'bg-emerald-100' : 'bg-orange-100'
                }`}
              >
                {isOk ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-orange-600" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${isOk ? 'text-emerald-900' : 'text-orange-900'}`}>
                  {alert.title}
                </p>
                <p className={`text-xs ${isOk ? 'text-emerald-700' : 'text-orange-700'}`}>{alert.description}</p>
              </div>
              {!isOk && <ChevronRight className="h-4 w-4 shrink-0 text-orange-500" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AlertsCard;
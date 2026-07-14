import { Bell } from 'lucide-react';
import { PatientMessagePreview } from '@/types/patient';

interface PatientMessagesCardProps {
  messages: PatientMessagePreview[];
}

export function PatientMessagesCard({ messages }: PatientMessagesCardProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Messages</h3>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg hover:bg-muted">
          View all
        </button>
      </div>

      <ul>
        {messages.map((message) => (
          <li key={message.id} className="flex items-start gap-3 border-t border-border py-3 first:border-0">
            {message.avatarType === 'initials' ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-700">
                {message.initials}
              </span>
            ) : (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Bell className="h-4 w-4" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-fg">{message.name}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{message.date}</span>
              </div>
              <p className="truncate text-xs text-muted-foreground">{message.preview}</p>
            </div>
            {message.unread && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientMessagesCard;
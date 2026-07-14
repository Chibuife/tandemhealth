import { quickContacts } from '@/data/patientDemoData';

export function StartConversationCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <h2 className="text-sm font-bold text-ink">Start a conversation</h2>
      <p className="mt-1 text-xs text-muted">Send a message to your care team</p>

      <div className="mt-3">
        {quickContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <button
              key={contact.id}
              className="flex w-full items-center gap-3 border-b border-border py-3 text-left last:border-b-0"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${contact.iconBg} ${contact.iconColor}`}
              >
                <Icon size={17} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{contact.title}</p>
                <p className="truncate text-xs text-muted">{contact.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StartConversationCard;
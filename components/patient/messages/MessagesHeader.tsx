import { SquarePen } from 'lucide-react';

export function MessagesHeader() {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-[28px]">Messages</h1>
        <p className="mt-1 text-sm text-muted">
          Communicate securely with your care team and manage your conversations.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 self-start rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white sm:self-auto">
        <SquarePen size={16} />
        New message
      </button>
    </div>
  );
}

export default MessagesHeader;
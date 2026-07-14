'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '../../Card';
import { ChatMessage } from '@/types/patient';

interface Props {
  clinicianName: string;
  messages: ChatMessage[];
}

function MessageRow({ message }: { message: ChatMessage }) {
  const isPatient = message.senderRole === 'patient';

  return (
    <div className="mb-4 flex items-start gap-2">
      <span
        className={clsx(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
          isPatient ? 'bg-chip-purple-bg text-chip-purple-text' : 'bg-chip-blue-bg text-chip-blue-text',
        )}
      >
        {message.avatarInitials}
      </span>
      <div>
        <div className="mb-0.5 flex items-baseline gap-1.5">
          <span className="text-xs font-bold text-ink">{message.senderName}</span>
          <span className="text-[11px] text-faint">{message.time}</span>
        </div>
        <p className="text-[13px] leading-relaxed text-muted">{message.text}</p>
      </div>
    </div>
  );
}

export function ChatPanel({ clinicianName, messages }: Props) {
  const [draft, setDraft] = useState('');

  return (
    <Card className="flex-1">
      <h2 className="mb-4 text-[15px] font-bold text-ink">Chat with {clinicianName}</h2>

      <div className="mb-3">
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}
      </div>

      <form
        className="flex items-center rounded-full border border-border py-1 pl-3.5 pr-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 bg-transparent py-1.5 text-xs text-ink placeholder:text-faint focus:outline-none"
          placeholder="Type a message..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          type="submit"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-chip-purple-bg"
          aria-label="Send message"
        >
          <Send size={14} className="text-chip-purple-text" />
        </button>
      </form>
    </Card>
  );
}

export default ChatPanel;

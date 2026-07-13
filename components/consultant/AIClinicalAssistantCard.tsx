'use client';

import { useState } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { Card } from '../Card';
import { Badge } from '../Badge';
import { AssistantMessage } from '@/types';

interface Props {
  messages: AssistantMessage[];
}

function MessageBubble({ message }: { message: AssistantMessage }) {
  if (message.role === 'user') {
    return (
      <div className="mb-3 flex justify-end">
        <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-ink px-3.5 py-2.5">
          <p className="text-xs font-medium text-surface">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl rounded-tl-sm bg-bg p-3">
      <p className="text-xs leading-relaxed text-ink">{message.content}</p>
      {message.bullets && (
        <ul className="mt-1">
          {message.bullets.map((bullet, i) => (
            <li key={i} className="flex text-xs leading-relaxed text-ink">
              <span className="mr-1.5">&bull;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AIClinicalAssistantCard({ messages }: Props) {
  const [draft, setDraft] = useState('');

  return (
    <Card className="flex-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">AI clinical assistant</h2>
          <Badge label="Beta" variant="neutral" />
        </div>
        <Clock size={16} className="text-faint" />
      </div>

      <div className="mb-3 flex flex-col gap-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <form
        className="flex items-center rounded-full border border-border py-1 pl-3.5 pr-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 bg-transparent py-1.5 text-xs text-ink placeholder:text-faint focus:outline-none"
          placeholder="Ask a clinical question..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button
          type="submit"
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-ink"
          aria-label="Send"
        >
          <ArrowUp size={16} className="text-surface" />
        </button>
      </form>
    </Card>
  );
}

export default AIClinicalAssistantCard;
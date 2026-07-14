'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Calendar,
  CheckCheck,
  ClipboardList,
  Headphones,
  Heart,
  Image as ImageIcon,
  Lock,
  MoreHorizontal,
  Paperclip,
  Send,
  Smile,
} from 'lucide-react';
import { threadMessages } from '@/data/patientDemoData';

export function ConversationThreadCard() {
  const [draft, setDraft] = useState('');

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface">
      {/* Thread header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
            <Heart size={17} />
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-ink">Tandem Health</h2>
              <BadgeCheck size={15} className="text-blue-500" />
            </div>
            <p className="text-xs text-muted">Care updates and general support</p>
          </div>
        </div>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted"
          aria-label="More options"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <p className="text-center text-xs text-muted">Today</p>

        {threadMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] sm:max-w-[70%] ${message.direction === 'outgoing' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm ${
                  message.direction === 'outgoing'
                    ? 'rounded-br-sm bg-emerald-100 text-ink'
                    : 'rounded-bl-sm bg-bg text-ink'
                }`}
              >
                {message.text}
              </div>
              <div className="mt-1 flex items-center gap-1 px-1">
                <span className="text-[11px] text-muted">{message.timestamp}</span>
                {message.direction === 'outgoing' && message.read && (
                  <CheckCheck size={13} className="text-blue-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 border-t border-border p-4">
        <button className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-ink">
          <Calendar size={14} />
          Reschedule appointment
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold text-ink">
          <ClipboardList size={14} />
          View my appointments
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-violet-300 px-3.5 py-2 text-xs font-semibold text-violet-600">
          <Headphones size={14} />
          Talk to support
        </button>
      </div>

      {/* Composer */}
      <div className="border-t border-border p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          rows={2}
          className="w-full resize-none rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime"
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted">
            <button aria-label="Attach file">
              <Paperclip size={17} />
            </button>
            <button aria-label="Attach image">
              <ImageIcon size={17} />
            </button>
            <button aria-label="Add emoji">
              <Smile size={17} />
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
            <Send size={15} />
            Send
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 border-t border-border py-3 text-[11px] text-muted">
        <Lock size={12} />
        Messages are secure and encrypted
      </div>
    </div>
  );
}

export default ConversationThreadCard;
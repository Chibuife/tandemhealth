'use client';

import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import clsx from 'clsx';
import { conversations } from '@/data/patientDemoData';

const TABS = ['All', 'Unread', 'Appointments', 'Updates'];

export function ConversationListCard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(conversations[0].id);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-lg border border-border bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-lime"
          />
        </div>
        <button
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-ink"
          aria-label="Filter messages"
        >
          <Filter size={16} />
        </button>
      </div>

      <div className="mb-1 flex items-center gap-4 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'shrink-0 whitespace-nowrap border-b-2 pb-2.5 text-sm font-medium transition',
              activeTab === tab
                ? 'border-emerald-600 font-semibold text-ink'
                : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.map((conversation) => {
          const Icon = conversation.icon;
          const isSelected = selectedId === conversation.id;

          return (
            <button
              key={conversation.id}
              onClick={() => setSelectedId(conversation.id)}
              className={clsx(
                'flex w-full items-start gap-3 border-b border-border py-3 text-left last:border-b-0',
                isSelected && 'bg-bg',
              )}
            >
              <span
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  conversation.iconBg,
                  conversation.iconColor,
                )}
              >
                <Icon size={17} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-ink">{conversation.name}</span>
                  <span className="shrink-0 text-[11px] text-muted">{conversation.timestamp}</span>
                </span>
                <span className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-xs text-muted">{conversation.preview}</span>
                  {conversation.unreadCount ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Showing 1 to {filtered.length} of {filtered.length} conversations
      </p>
    </div>
  );
}

export default ConversationListCard;
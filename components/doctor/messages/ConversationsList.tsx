"use client";

import { ChevronLeft, ChevronRight, SlidersHorizontal, Search } from "lucide-react";
import { Conversation } from "@/lib/messages/types";

const FILTERS = ["All", "Unread", "Patients"] as const;

interface ConversationsListProps {
  conversations: Conversation[];
  totalCount: number;
  selectedConversationId: string;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  activeFilter: (typeof FILTERS)[number];
  onFilterChange: (filter: (typeof FILTERS)[number]) => void;
}

export default function ConversationsList({
  conversations,
  totalCount,
  selectedConversationId,
  onSelectConversation,
  searchQuery,
  onSearchQueryChange,
  activeFilter,
  onFilterChange,
}: ConversationsListProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white">
      <div className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
            />
          </div>
          <button
            type="button"
            aria-label="Filter conversations"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex gap-4 border-b border-border">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "border-lime-500 text-fg"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto">
        {conversations.map((conversation) => {
          const isSelected = conversation.id === selectedConversationId;

          return (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelectConversation(conversation.id)}
              className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                isSelected ? "bg-bg-subtle" : "hover:bg-bg-subtle/60"
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${conversation.avatarClassName}`}
              >
                {conversation.initials}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-fg">
                    {conversation.patientName}
                  </span>
                  <span className="shrink-0 text-xs text-fg-muted">
                    {conversation.timestampLabel}
                  </span>
                </span>
                <span className="mt-0.5 flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-fg-muted">
                    {conversation.lastMessagePreview}
                  </span>
                  {conversation.unreadCount ? (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          );
        })}

        {conversations.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-fg-muted">
            No conversations match your search.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border p-3 text-sm text-fg-muted">
        <span>
          Showing 1 to {conversations.length} of {totalCount} conversations
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
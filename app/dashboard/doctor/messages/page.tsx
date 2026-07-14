"use client";

import { useMemo, useState } from "react";
import MessagesHeader from "@/components/doctor/messages/MessagesHeader";
import ConversationsList from "@/components/doctor/messages/ConversationsList";
import ChatThread from "@/components/doctor/messages/ChatThread";
import PatientDetailsSidebar from "@/components/doctor/messages/PatientDetailsSidebar";
import {
  conversations,
  messagesByConversationId,
  patientDetailsByConversationId,
} from "@/lib/messages/mock-data";
import { ChatMessage } from "@/lib/messages/types";

const FILTERS = ["All", "Unread", "Patients"] as const;

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0].id);
  const [messagesByConversation, setMessagesByConversation] = useState(messagesByConversationId);

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return conversations.filter((conversation) => {
      const matchesQuery =
        !query ||
        conversation.patientName.toLowerCase().includes(query) ||
        conversation.lastMessagePreview.toLowerCase().includes(query);
      const matchesFilter = activeFilter === "Unread" ? Boolean(conversation.unreadCount) : true;

      return matchesQuery && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const selectedPatient =
    patientDetailsByConversationId[selectedConversationId] ??
    patientDetailsByConversationId[conversations[0].id];
  const selectedMessages = messagesByConversation[selectedConversationId] ?? [];

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "doctor",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dateGroup: "Today",
      read: false,
    };

    setMessagesByConversation((previous) => ({
      ...previous,
      [selectedConversationId]: [...(previous[selectedConversationId] ?? []), newMessage],
    }));
  };

  return (
    <div>
      <MessagesHeader />

      {/* Conversation list / chat thread / patient details: 3 / 6 / 3 on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:h-[calc(100vh-220px)] lg:grid-cols-12">
        <div className="min-h-0 lg:col-span-3">
          <ConversationsList
            conversations={filteredConversations}
            totalCount={conversations.length}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="min-h-0 lg:col-span-6">
          <ChatThread
            patient={selectedPatient}
            messages={selectedMessages}
            onSendMessage={handleSendMessage}
          />
        </div>

        <div className="min-h-0 overflow-y-auto lg:col-span-3">
          <PatientDetailsSidebar patient={selectedPatient} />
        </div>
      </div>
    </div>
  );
}
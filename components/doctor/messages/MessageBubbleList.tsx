import { Check } from "lucide-react";
import { ChatMessage } from "@/lib/messages/types";

interface MessageBubbleListProps {
  messages: ChatMessage[];
}

export default function MessageBubbleList({ messages }: MessageBubbleListProps) {
  const groups: { dateGroup: string; items: ChatMessage[] }[] = [];

  for (const message of messages) {
    const currentGroup = groups[groups.length - 1];
    if (currentGroup && currentGroup.dateGroup === message.dateGroup) {
      currentGroup.items.push(message);
    } else {
      groups.push({ dateGroup: message.dateGroup, items: [message] });
    }
  }

  return (
    <div className="flex-1 space-y-5 overflow-y-auto p-5">
      {groups.map((group) => (
        <div key={group.dateGroup}>
          <div className="mb-4 flex justify-center">
            <span className="rounded-full bg-bg-subtle px-3 py-1 text-xs text-fg-muted">
              {group.dateGroup}
            </span>
          </div>

          <div className="space-y-3">
            {group.items.map((message) => {
              const isDoctor = message.sender === "doctor";

              return (
                <div key={message.id} className={`flex ${isDoctor ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      isDoctor ? "bg-emerald-50 text-fg" : "bg-bg-subtle text-fg"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`mt-1.5 flex items-center gap-1 text-xs text-fg-muted ${
                        isDoctor ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.time}
                      {isDoctor && message.read && <Check className="h-3 w-3 text-emerald-600" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
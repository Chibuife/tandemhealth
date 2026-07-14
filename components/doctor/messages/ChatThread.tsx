import { ChatMessage, PatientDetails } from "@/lib/messages/types";
import ChatThreadHeader from "./ChatThreadHeader";
import MessageBubbleList from "./MessageBubbleList";
import MessageComposer from "./MessageComposer";

interface ChatThreadProps {
  patient: PatientDetails;
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  onViewPatient?: () => void;
}

export default function ChatThread({
  patient,
  messages,
  onSendMessage,
  onViewPatient,
}: ChatThreadProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white">
      <ChatThreadHeader patient={patient} onViewPatient={onViewPatient} />
      <MessageBubbleList messages={messages} />
      <MessageComposer onSend={onSendMessage} />
    </div>
  );
}
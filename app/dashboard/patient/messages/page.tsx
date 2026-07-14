import { MessagesHeader } from '@/components/patient/messages/MessagesHeader';
import { ConversationListCard } from '@/components/patient/messages/ConversationListCard';
import { ConversationThreadCard } from '@/components/patient/messages/ConversationThreadCard';
import { StartConversationCard } from '@/components/patient/messages/StartConversationCard';
import { RecentConversationsCard } from '@/components/patient/messages/RecentConversationsCard';
import { NeedHelpCard } from '@/components/patient/messages/NeedHelpCard';

export default function MessagesPage() {
  return (
    <div>
      <MessagesHeader />

      {/* Conversation list (3/12) + thread (6/12) + care team sidebar (3/12) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <ConversationListCard />
        </div>

        <div className="lg:col-span-6">
          <ConversationThreadCard />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-3">
          <StartConversationCard />
          <RecentConversationsCard />
          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
}
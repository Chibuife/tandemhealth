import { TopBanner } from '@/components/TopBanner';
import { AppHeader } from '@/components/AppHeader';
import { Sidebar } from '@/components/consultant/Sidebar';
import { ConsultationHeader } from '@/components/consultant/ConsultationHeader';
import { LiveTranscriptCard } from '@/components/consultant/LiveTranscriptCard';
import { AudioStatusCard } from '@/components/consultant/AudioStatusCard';
import { AIClinicalNoteCard } from '@/components/consultant/AIClinicalNoteCard';
import { ConsultationTimelineCard } from '@/components/consultant/ConsultationTimelineCard';
import { Icd10CodesCard } from '@/components/consultant/Icd10CodesCard';
import { ClinicalShortcutsCard } from '@/components/consultant/ClinicalShortcutsCard';
import { AIClinicalAssistantCard } from '@/components/consultant/AIClinicalAssistantCard';

import {
  assistantMessages,
  audioStatus,
  clinicalShortcuts,
  consultation,
  icd10Suggestions,
  soapNote,
  timelineEvents,
  transcript,
} from '@/data/demoData';

import { VideoCallPanel } from '@/components/patient/VideoCallPanel';
import { TranscriptCard } from '@/components/patient/TranscriptCard';
import { AudioQualityCard } from '@/components/patient/AudioQualityCard';
import { ChatPanel } from '@/components/patient/ChatPanel';
import { ConsultationSummaryCard } from '@/components/patient/ConsultationSummaryCard';


import {
  audioQuality,
  callParticipants,
  chatMessages,
  consultationDocuments,
  consultationInfo,
  consultationSummary,
} from '@/data/patientDemoData';
export default function ConsultationPage() {
  return (
    <div className="flex h-screen flex-col bg-bg">
      <TopBanner />
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-5">
          <ConsultationHeader consultation={consultation} />
          <div className="lg:col-span-2">
            <VideoCallPanel participants={callParticipants} />

            {/* <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <TranscriptCard entries={transcript} />
              <AudioQualityCard metrics={audioQuality} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ChatPanel clinicianName={consultationInfo.clinicianName} messages={chatMessages} />
              <ConsultationSummaryCard summary={consultationSummary} />
            </div> */}
          </div>
          {/* Row 1: transcript + AI clinical note */}
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <LiveTranscriptCard entries={transcript} />
            <AIClinicalNoteCard note={soapNote} />
          </div>

          {/* Row 2: audio status */}
          <div className="mb-4">
            <AudioStatusCard metrics={audioStatus} />
          </div>

          {/* Row 3: timeline, ICD-10 codes, shortcuts */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ConsultationTimelineCard events={timelineEvents} />
            <Icd10CodesCard suggestions={icd10Suggestions} />
            <ClinicalShortcutsCard shortcuts={clinicalShortcuts} />
          </div>

          {/* Row 4: AI clinical assistant */}
          <AIClinicalAssistantCard messages={assistantMessages} />
        </main>
      </div>
    </div>
  );
}

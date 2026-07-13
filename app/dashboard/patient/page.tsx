import { TopBanner } from '@/components/TopBanner';
import { AppHeader } from '@/components/AppHeader';
import { PatientSidebar } from '@/components/patient/PatientSidebar';
import { PatientConsultationHeader } from '@/components/patient/PatientConsultationHeader';
import { VideoCallPanel } from '@/components/VideoCallPanel';
import { TranscriptCard } from '@/components/patient/TranscriptCard';
import { AudioQualityCard } from '@/components/patient/AudioQualityCard';
import { ChatPanel } from '@/components/patient/ChatPanel';
import { ConsultationSummaryCard } from '@/components/patient/ConsultationSummaryCard';
import { PatientAIClinicalNoteCard } from '@/components/patient/PatientAIClinicalNoteCard';
import { DocumentsCard } from '@/components/patient/DocumentsCard';

import {
  audioQuality,
  callParticipants,
  chatMessages,
  consultationDocuments,
  consultationInfo,
  consultationSummary,
  soapNote,
  transcript,
} from '@/data/patientDemoData';

export default function PatientDashboardPage() {
  return (
    <div className="flex h-screen flex-col bg-bg">
      <TopBanner />
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <PatientSidebar />

        <main className="flex-1 overflow-y-auto p-5">
          <PatientConsultationHeader info={consultationInfo} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Main column: video, transcript/audio, chat/summary */}
            <div className="lg:col-span-2">
              <VideoCallPanel participants={callParticipants} />

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <TranscriptCard entries={transcript} />
                <AudioQualityCard metrics={audioQuality} />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ChatPanel clinicianName={consultationInfo.clinicianName} messages={chatMessages} />
                <ConsultationSummaryCard summary={consultationSummary} />
              </div>
            </div>

            {/* Right column: AI note + documents */}
            <div className="flex flex-col gap-4">
              <PatientAIClinicalNoteCard note={soapNote} />
              <DocumentsCard documents={consultationDocuments} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

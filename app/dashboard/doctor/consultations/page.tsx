import { ConsultationHeader } from '@/components/doctor/consultations/ConsultationHeader';
import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
import { AIClinicalNoteCard } from '@/components/doctor/consultations/AIClinicalNoteCard';
import { ConsultationTimelineCard } from '@/components/doctor/consultations/ConsultationTimelineCard';
import { Icd10CodesCard } from '@/components/doctor/consultations/Icd10CodesCard';
import { ClinicalShortcutsCard } from '@/components/doctor/consultations/ClinicalShortcutsCard';
import { AIClinicalAssistantCard } from '@/components/doctor/consultations/AIClinicalAssistantCard';
import { VideoCallPanel } from '@/components/VideoCallPanel';

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
import { callParticipants } from '@/data/patientDemoData';

export default function ConsultationPage() {
  return (
    <>
      <ConsultationHeader consultation={consultation} />

      {/* Row 1: video + transcript (left, 2 cols) + AI clinical note (right, 1 col) */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <VideoCallPanel participants={callParticipants} />
          <LiveTranscriptCard entries={transcript} />
        </div>
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
    </>
  );
}
import {
  AudioQualityMetrics,
  CallParticipant,
  ChatMessage,
  ConsultationDocument,
  ConsultationSummary,
  PatientConsultationInfo,
  PatientNavItem,
  PatientProfile,
} from '@/types/patient';
import { SoapNote, TranscriptEntry } from '@/types';

export const patientProfile: PatientProfile = {
  name: 'Anna Johansen',
  role: 'Patient',
  avatarInitials: 'AJ',
};

export const patientNavItems: PatientNavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'Home' },
  { id: 'consultations', label: 'Consultations', icon: 'Calendar', active: true },
  { id: 'documents', label: 'Documents', icon: 'FileText' },
  { id: 'prescriptions', label: 'Prescriptions', icon: 'Pill' },
  { id: 'referrals', label: 'Referrals', icon: 'Share2' },
  { id: 'messages', label: 'Messages', icon: 'MessageCircle', badgeCount: 2 },
  { id: 'tasks', label: 'Tasks', icon: 'ListChecks' },
  { id: 'health-summary', label: 'Health summary', icon: 'HeartPulse' },
];

export const consultationInfo: PatientConsultationInfo = {
  clinicianName: 'Dr. Emma Larsen',
  isLive: true,
  elapsedTime: '00:12:48',
  isRecording: true,
};

export const callParticipants: CallParticipant[] = [
  { id: 'doctor', displayName: 'Dr. Emma Larsen', role: 'doctor', micActive: true, avatarColor: '#DCEBFF' },
  { id: 'patient', displayName: 'You', role: 'patient', micActive: true, avatarColor: '#F1ECFE' },
];

export const transcript: TranscriptEntry[] = [
  { id: 't1', timestamp: '00:12', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'How have you been feeling lately?' },
  { id: 't2', timestamp: '00:18', speaker: 'You', speakerType: 'patient', text: "I've had headaches almost every day." },
  { id: 't3', timestamp: '00:23', speaker: 'You', speakerType: 'patient', text: 'Especially in the morning.' },
  { id: 't4', timestamp: '00:29', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'Any nausea or sensitivity to light?' },
  { id: 't5', timestamp: '00:34', speaker: 'You', speakerType: 'patient', text: 'Yes, sometimes I feel nauseous.' },
  { id: 't6', timestamp: '00:38', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'How is your sleep?' },
];

export const audioQuality: AudioQualityMetrics = {
  overallQuality: 'Good',
  latencyMs: 28,
  latencyStatus: 'Good',
  packetLossPct: 0,
  packetLossStatus: 'Good',
  jitterMs: 6,
  jitterStatus: 'Good',
  connectionStatus: 'Stable',
  microphoneName: 'Shure MV7',
  audioLevelBars: 4,
};

export const chatMessages: ChatMessage[] = [
  {
    id: 'c1',
    senderName: 'Dr. Larsen',
    senderRole: 'doctor',
    avatarInitials: 'EL',
    time: '00:34',
    text: 'Do you have any questions before we finish?',
  },
  {
    id: 'c2',
    senderName: 'You',
    senderRole: 'patient',
    avatarInitials: 'AJ',
    time: '00:35',
    text: 'No, that was very helpful. Thank you!',
  },
];

export const consultationSummary: ConsultationSummary = {
  generatedLabel: 'AI generated',
  segments: [
    {
      text:
        'Today you discussed your headaches, which occur almost daily and are worse in the morning. You also experience occasional nausea. Dr. Larsen assessed this as likely ',
    },
    { text: 'migraine without aura', bold: true },
    { text: ' and recommended hydration, regular sleep, and medication as needed.' },
  ],
};

export const soapNote: SoapNote = {
  status: 'Draft',
  subjective:
    'Patient reports almost daily headaches, worse in the morning. Sometimes accompanied by nausea.',
  objective: 'Patient is alert and oriented. No neurological deficits observed.',
  assessment: 'Likely migraine without aura. No red flags identified.',
  plan: [
    'Recommend adequate hydration and regular sleep.',
    'Paracetamol or ibuprofen as needed.',
    'Follow up in 2–4 weeks if symptoms persist.',
  ],
};

export const consultationDocuments: ConsultationDocument[] = [
  { id: 'doc1', title: 'Clinical note', type: 'clinical-note', status: 'Draft', createdLabel: 'Created 12 May 2026' },
  { id: 'doc2', title: 'Sick note', type: 'sick-note', createdLabel: 'Created 12 May 2026' },
  { id: 'doc3', title: 'Referral', type: 'referral', createdLabel: 'Created 12 May 2026' },
];

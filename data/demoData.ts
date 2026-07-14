import {
  AssistantMessage,
  AudioStatusMetrics,
  ClinicalShortcut,
  Consultation,
  Icd10Suggestion,
  NavItem,
  SoapNote,
  TimelineEvent,
  TranscriptEntry,
} from '@/types';

export const consultation: Consultation = {
  patientName: 'Anna Johansen',
  clinicianName: 'Dr. Emma Larsen',
  clinicianRole: 'General Practitioner',
  isLive: true,
  elapsedTime: '00:12:48',
  isRecording: true,
};

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: 'LayoutGrid', active: true },
  { id: 'consultations', label: 'Consultations', icon: 'Stethoscope', active: true },
  { id: 'patients', label: 'Patients', icon: 'Users' },
  { id: 'templates', label: 'Templates', icon: 'FileText' },
  { id: 'cds', label: 'Clinical decision support', icon: 'ShieldCheck', isNew: true },
  { id: 'integrations', label: 'Integrations', icon: 'Link2' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart2' },
  {id:'messages', label:'Messages', icon:'Mail'},
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];

export const transcript: TranscriptEntry[] = [
  { id: 't1', timestamp: '00:12', speaker: 'Dr. Emma', speakerType: 'doctor', text: 'How have you been feeling lately?' },
  { id: 't2', timestamp: '00:18', speaker: 'Anna', speakerType: 'patient', text: "I've had headaches almost every day." },
  { id: 't3', timestamp: '00:23', speaker: 'Anna', speakerType: 'patient', text: 'Especially in the morning.' },
  { id: 't4', timestamp: '00:29', speaker: 'Dr. Emma', speakerType: 'doctor', text: 'Any nausea or sensitivity to light?' },
  { id: 't5', timestamp: '00:34', speaker: 'Anna', speakerType: 'patient', text: 'Yes, sometimes I feel nauseous.' },
  { id: 't6', timestamp: '00:38', speaker: 'Dr. Emma', speakerType: 'doctor', text: 'How is your sleep?' },
];

export const audioStatus: AudioStatusMetrics = {
  latencyMs: 28,
  packetLossPct: 0,
  jitterMs: 6,
  bitrateKbps: 64,
  microphoneName: 'Shure MV7',
  microphoneConnected: true,
  audioQuality: 'Good',
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

export const timelineEvents: TimelineEvent[] = [
  { id: 'e1', time: '00:00', label: 'Consultation started', completed: true },
  { id: 'e2', time: '00:01', label: 'Recording started', completed: true },
  { id: 'e3', time: '00:03', label: 'Transcription started', completed: true },
  { id: 'e4', time: '00:05', label: 'AI note generation started', completed: true },
  { id: 'e5', time: '00:11', label: 'ICD-10 suggestions ready', completed: true },
];

export const icd10Suggestions: Icd10Suggestion[] = [
  { code: 'R51.9', description: 'Headache, unspecified', confidencePct: 96 },
  { code: 'G43.009', description: 'Migraine without aura, not intractable', confidencePct: 85 },
  { code: 'R11.0', description: 'Nausea', confidencePct: 72 },
];

export const clinicalShortcuts: ClinicalShortcut[] = [
  { id: 's1', label: 'Create sick note', icon: 'FilePlus', tint: 'red' },
  { id: 's2', label: 'Create referral', icon: 'Send', tint: 'blue' },
  { id: 's3', label: 'Generate patient summary', icon: 'ClipboardList', tint: 'purple' },
  { id: 's4', label: 'Add to follow-up', icon: 'PlusCircle', tint: 'green' },
];

export const assistantMessages: AssistantMessage[] = [
  { id: 'a1', role: 'user', content: 'What are possible causes of morning headaches?' },
  {
    id: 'a2',
    role: 'assistant',
    content: 'Morning headaches can be caused by several factors, including:',
    bullets: ['Sleep disorders (e.g., sleep apnea)', 'Dehydration', 'Medication overuse', 'Migraines', 'High blood pressure'],
  },
];

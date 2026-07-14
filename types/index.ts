export type SpeakerType = 'doctor' | 'patient';

export interface TranscriptEntry {
  id: string;
  timestamp: string; // mm:ss
  speaker: string;
  speakerType: SpeakerType;
  text: string;
}

export type AudioQuality = 'Good' | 'Fair' | 'Poor';

export interface AudioStatusMetrics {
  latencyMs: number;
  packetLossPct: number;
  jitterMs: number;
  bitrateKbps: number;
  microphoneName: string;
  microphoneConnected: boolean;
  audioQuality: AudioQuality;
}

export interface SoapNote {
  status: 'Draft' | 'Final';
  subjective: string;
  objective: string;
  assessment: string;
  plan: string[];
}

export interface TimelineEvent {
  id: string;
  time: string; // mm:ss
  label: string;
  completed: boolean;
}

export interface Icd10Suggestion {
  code: string;
  description: string;
  confidencePct: number;
}

export type ShortcutTint = 'red' | 'blue' | 'purple' | 'green';

export interface ClinicalShortcut {
  id: string;
  label: string;
  icon: 'FilePlus' | 'Send' | 'ClipboardList' | 'PlusCircle';
  tint: ShortcutTint;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  bullets?: string[];
}

export interface Consultation {
  patientName: string;
  clinicianName: string;
  clinicianRole: string;
  isLive: boolean;
  elapsedTime: string; // hh:mm:ss
  isRecording: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: 'LayoutGrid' | 'Users' | 'FileText' | 'ShieldCheck' | 'Link2' | 'BarChart2' | 'Settings'|'Stethoscope'|'Mail';
  isNew?: boolean;
  active?: boolean;
}

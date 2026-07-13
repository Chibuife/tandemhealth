export interface PatientProfile {
  name: string;
  role: string;
  avatarInitials: string;
}

export type PatientNavIcon =
  | 'Home'
  | 'Calendar'
  | 'FileText'
  | 'Pill'
  | 'Share2'
  | 'MessageCircle'
  | 'ListChecks'
  | 'HeartPulse';

export interface PatientNavItem {
  id: string;
  label: string;
  icon: PatientNavIcon;
  active?: boolean;
  badgeCount?: number;
}

export type ParticipantRole = 'doctor' | 'patient';

export interface CallParticipant {
  id: string;
  displayName: string;
  role: ParticipantRole;
  micActive: boolean;
  avatarColor: string; // fallback tile background when there's no live video feed
}

export type QualityLevel = 'Good' | 'Fair' | 'Poor';

export interface AudioQualityMetrics {
  overallQuality: QualityLevel;
  latencyMs: number;
  latencyStatus: QualityLevel;
  packetLossPct: number;
  packetLossStatus: QualityLevel;
  jitterMs: number;
  jitterStatus: QualityLevel;
  connectionStatus: 'Stable' | 'Unstable';
  microphoneName: string;
  audioLevelBars: number; // filled bars out of 5
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: ParticipantRole;
  avatarInitials: string;
  time: string;
  text: string;
}

export interface SummarySegment {
  text: string;
  bold?: boolean;
}

export interface ConsultationSummary {
  generatedLabel: string;
  segments: SummarySegment[];
}

export type DocumentType = 'clinical-note' | 'sick-note' | 'referral';

export interface ConsultationDocument {
  id: string;
  title: string;
  type: DocumentType;
  status?: 'Draft';
  createdLabel: string;
}

export interface PatientConsultationInfo {
  clinicianName: string;
  isLive: boolean;
  elapsedTime: string;
  isRecording: boolean;
}

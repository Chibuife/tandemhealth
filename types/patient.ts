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



// Merge these into your existing @/types/patient file.

export type PatientOverviewStatIcon = 'Calendar' | 'FileText' | 'Pill' | 'CheckCircle2';

export interface PatientOverviewStat {
  id: string;
  icon: PatientOverviewStatIcon;
  label: string;
  value: string;
  boldDetail?: string;
  detail: string;
  buttonLabel: string;
}

export interface PatientConsultationSummary {
  id: string;
  date: string;
  title: string;
  doctor: string;
  status: string;
}

export interface PatientHealthMetric {
  label: string;
  value: string;
  status?: string;
}

export interface PatientMessagePreview {
  id: string;
  name: string;
  date: string;
  preview: string;
  avatarType: 'initials' | 'system';
  initials?: string;
  unread: boolean;
}

export type PatientRecommendedIcon = 'Calendar' | 'FileText' | 'TestTube' | 'Heart';

export interface PatientRecommendedItem {
  id: string;
  icon: PatientRecommendedIcon;
  title: string;
  description: string;
  buttonLabel: string;
}

export interface PatientAiNoteAlert {
  title: string;
  description: string;
  buttonLabel: string;
}


// Merge these into your existing @/types/patient file.

export type PatientDocumentType =
  | 'Clinical note'
  | 'Lab results'
  | 'Imaging'
  | 'Referral'
  | 'Report'
  | 'Form'
  | 'Other';

export interface PatientDocument {
  id: string;
  name: string;
  description: string;
  type: PatientDocumentType;
  date: string;
  uploadedBy: string;
  tags: string[];
}

export interface PatientRecentUpload {
  id: string;
  name: string;
  date: string;
  type: PatientDocumentType;
  unread: boolean;
}

export interface PatientStorageUsage {
  percentUsed: number;
  usedLabel: string;
  totalLabel: string;
}


// Merge these into your existing @/types/patient file.

export interface PrescriptionMedication {
  id: string;
  name: string;
  form: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  quantity: string;
}

export interface PatientClinicalSummary {
  name: string;
  avatarInitials: string;
  sex: string;
  age: number;
  dateOfBirth: string;
  allergies: string[];
  conditions: string[];
  currentMedications: string[];
}

export interface PrescriptionOverview {
  medicationsCount: number;
  totalItems: number;
  duration: string;
  createdBy: string;
  date: string;
}

export type SendPrescriptionIcon = 'Share2' | 'Printer' | 'Save';

export interface SendPrescriptionOption {
  id: string;
  icon: SendPrescriptionIcon;
  title: string;
  description: string;
}



// Merge these into your existing @/types/patient file.

export type HeartStatIcon = 'Heart' | 'Activity' | 'Droplet' | 'Gauge';

export interface HeartStat {
  id: string;
  icon: HeartStatIcon;
  label: string;
  value: string;
  valueColor: string;
  detail: string;
  detailColor: string;
}

export interface EjectionFractionPoint {
  month: string;
  value: number;
}

export interface CardiovascularRisk {
  percent: number;
  riskLabel: string;
  comparisonPercentile: number;
}

export interface HeartTestResult {
  id: string;
  test: string;
  result: string;
  resultColor: string;
  referenceRange: string;
  date: string;
}

export interface HeartFunctionMeasurement {
  label: string;
  status: string;
}

export type HeartRecommendationIcon = 'Footprints' | 'Heart' | 'Scale' | 'Calendar';

export interface HeartRecommendation {
  id: string;
  icon: HeartRecommendationIcon;
  title: string;
  description: string;
}

export interface PatientHeartSummary {
  name: string;
  avatarInitials: string;
  sex: string;
  age: number;
  dateOfBirth: string;
  latestHeartCheck: string;
  nextFollowUp: string;
  conditions: string[];
  medications: string[];
}

export interface HeartAlert {
  id: string;
  status: 'ok' | 'warning';
  title: string;
  description: string;
}

export type LifestyleFactorIcon = 'Activity' | 'Utensils' | 'Cigarette' | 'Brain' | 'Moon';

export interface LifestyleFactor {
  id: string;
  icon: LifestyleFactorIcon;
  label: string;
  value: string;
}

import { LucideIcon } from 'lucide-react';

export interface MessageConversation {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  name: string;
  preview: string;
  timestamp: string;
  unreadCount?: number;
}

export interface ThreadMessage {
  id: string;
  direction: 'incoming' | 'outgoing';
  text: string;
  timestamp: string;
  read?: boolean;
}

export interface QuickContact {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

export interface RecentConversation {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  timestamp: string;
}


import { BadgeColor } from '@/components/doctor/Badge';

export interface PatientTask {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: BadgeColor;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  priorityColor: BadgeColor;
  status: string;
  statusColor: BadgeColor;
}

export interface TaskReminder {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
}
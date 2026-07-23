export type ConsultationStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "completed"; // maps from backend "ended"

export type ConsultationPriority = "low" | "medium" | "high";

export interface ConsultationRecord {
  id: string;
  patientId: string;
  patientName: string;
  patientInitials: string;
  scheduledStart: string; // ISO string
  scheduledEnd: string; // ISO string
  durationMinutes: number;
  reasonForVisit: string;
  consultationType: string;
  priority: ConsultationPriority;
  status: ConsultationStatus;
  isIncoming: boolean; // true when accepted and <10min from scheduledStart
  slug: string; // used to build the join/token request
}

export interface ConsultationSummary {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  completed: number;
}

export interface ScheduleItem {
  time: string; // display string, e.g. "10:00 AM"
  patientName: string;
  status: ConsultationStatus;
  consultationId: string;
}
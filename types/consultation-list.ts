export type ConsultationStatus = 'Pending' | 'Accepted' | 'Declined' | 'Completed';
export type ConsultationPriority = 'High' | 'Medium' | 'Low';
export type PatientGender = 'Male' | 'Female';
export type AvatarTint = 'blue' | 'violet' | 'amber' | 'rose';

// export interface ConsultationRecord {
//   id: string;
//   patientId: string;
//   patientName: string;
//   // hostName: string;
//   slug:string;
//   // age: number;
//   // gender: PatientGender;
//   // avatarInitials: string;
//   // avatarTint: AvatarTint;
//   // dateLabel: string; // "Today" | "Tomorrow" | "Jul 18"
//   // time: string; // "2:30 PM"
//   durationMinutes: number;
//   type: string; // "General Consultation" | "Follow-up"
//   status: ConsultationStatus;
//   reason?: string; // only present for pending requests
//   priority?: ConsultationPriority; // only present for pending requests
// }

export interface TodayScheduleItem {
  time: string;
  patientName: string;
  status: 'Accepted' | 'Pending';
}

export interface ConsultationSummaryData {
  total: number;
  pending: number;
  accepted: number;
  declined: number;
  completed: number;
}

export interface QuickActionItem {
  icon: 'calendar' | 'link' | 'calendar-days';
  label: string;
  description: string;
}

export type PatientStatus = "Active" | "Inactive";
export type ConsultationType = "In-person" | "Virtual";
export type ConsultationStatus = "Completed" | "Scheduled" | "Cancelled";

export interface Consultation {
  id: string;
  date: string; // e.g. "12 May 2026"
  time: string; // e.g. "09:15"
  reason: string;
  clinician: string;
  type: ConsultationType;
  status: ConsultationStatus;
}

export interface Patient {
  id: string;
  name: string;
  initials: string;
  avatarClassName: string; // bg + text tailwind classes for the avatar chip
  age: number;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  status: PatientStatus;
  lastVisit: string; // display date for the list row
  dateOfBirth: string;
  address: string;
  allergies: string;
  conditions: string;
  bloodGroup: string;
  tags: string[];
  nextAppointment: {
    date: string;
    reason: string;
  };
  activePrescriptions: number;
  openTasks: number;
  consultations: Consultation[];
}

export interface PatientStat {
  id: string;
  label: string;
  value: string;
  changeLabel: string;
  changeDirection: "up" | "down";
}
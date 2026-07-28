import { getAccessToken } from "@/lib/auth/session";
import { ConsultationRecord } from "@/types/consultations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authFetch = async (path: string, options: RequestInit = {}) => {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }

  return res.json();
};

interface BackendMeeting {
  id: string;
  slug: string;
  patientId: string;     
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  scheduledStart: string;
  scheduledEnd: string;
  reasonForVisit?: string;
  consultationType: string;
  priority?: string;
  status: string;
}

const INCOMING_WINDOW_MINUTES = 10;

const AVATAR_TINTS = ["blue", "emerald", "amber", "rose", "violet"];

const toInitials = (name: string | null) =>
  (name ?? "?")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

// Deterministic-ish tint based on id, so the same patient always gets the
// same color rather than it changing on every refetch.
const toAvatarTint = (id: string) => {
  const hash = id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_TINTS[hash % AVATAR_TINTS.length];
};

const toDisplayStatus = (status: BackendMeeting["status"]): ConsultationRecord["status"] => {
  if (status === "live" || status === "ended") return "completed";
  if (status === "cancelled") return "declined";
  if (status === "accepted") return "accepted";
  if (status === "declined") return "declined";
  return "pending";
};

const toDisplayPriority = (priority: BackendMeeting["priority"]): ConsultationRecord["priority"] => {
  if (priority === "high") return "high";
  if (priority === "low") return "low";
  return "medium";
};

const toDisplayType = (consultationType: string) => {
  if (consultationType === "follow-up") return "Follow-up";
  if (consultationType === "general") return "General Consultation";
  return consultationType;
};

const toDateLabel = (isoDate: string) => {
  const date = new Date(isoDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (sameDay(date, today)) return "Today";
  if (sameDay(date, tomorrow)) return "Tomorrow";
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const toTimeLabel = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

const computeIsIncoming = (status: BackendMeeting["status"], scheduledStart: string, scheduledEnd: string) => {
  if (status !== "accepted") return false;

  const minutesUntilStart = (new Date(scheduledStart).getTime() - Date.now()) / 60_000;
  return minutesUntilStart <= INCOMING_WINDOW_MINUTES && Date.now() < new Date(scheduledEnd).getTime();
};

const toPatientInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const mapToConsultationRecord = (m: BackendMeeting): ConsultationRecord => {
  const patientName = m.patientName ?? 'Unknown patient';
  const doctorName = m.doctorName ?? 'Unknown doctor';  // ✅ add this

  return {
    id: m.id,
    slug: m.slug,
    patientId: m.patientId ?? '',        // ✅ was m.participantId
    patientName,
    patientInitials: toPatientInitials(patientName),
    doctorId: m.doctorId ?? '',          // ✅ added
    doctorName,                          // ✅ added
    doctorInitials: toPatientInitials(doctorName), // ✅ added (reuse same initials helper)
    scheduledStart: m.scheduledStart,
    scheduledEnd: m.scheduledEnd,
    durationMinutes: Math.round(
      (new Date(m.scheduledEnd).getTime() - new Date(m.scheduledStart).getTime()) / 60_000
    ),
    consultationType: toDisplayType(m.consultationType),
    reasonForVisit: m.reasonForVisit ?? '',
    priority: toDisplayPriority(m.priority),
    status: toDisplayStatus(m.status),
    isIncoming: computeIsIncoming(m.status, m.scheduledStart, m.scheduledEnd),
  };
};
export const fetchConsultations = async (): Promise<ConsultationRecord[]> => {
  const data = await authFetch("/meetings");
  return (data.meetings as BackendMeeting[]).map(mapToConsultationRecord);
};

export const fetchConsultationById = async (id: string): Promise<ConsultationRecord> => {
  const data = await authFetch(`/meetings/id/${id}`);
  return mapToConsultationRecord(data.consultation as BackendMeeting);
};

export const acceptConsultation = async (id: string): Promise<void> => {
  await authFetch(`/meetings/${id}/accept`, { method: "POST" });
};

export const declineConsultation = async (id: string): Promise<void> => {
  await authFetch(`/meetings/${id}/decline`, { method: "POST" });
};

export const getConsultationJoinToken = async (slug: string,role:string ) => {
  console.log(role,"role")
  return authFetch(`/meetings/${slug}/token`, { method: "POST",body:JSON.stringify({role}) });
};

export const endConsultationMeeting = async (slug: string): Promise<void> => {
  await authFetch(`/meetings/${slug}/end`, { method: "POST" });
};


export interface RequestConsultationInput {
  doctorId: string;
  scheduledStart: string; // ISO string
  scheduledEnd: string; // ISO string
  reasonForVisit?: string;
  priority?: "low" | "medium" | "high";
  consultationType?: string;
}

export async function requestConsultation(input: RequestConsultationInput) {
  const { meeting, joinLink } = await authFetch("/meetings", {
    method: "POST",
    body: JSON.stringify({
      title: "Doctor Consultation",
      doctorId: input.doctorId,
      scheduledStart: input.scheduledStart,
      scheduledEnd: input.scheduledEnd,
      reasonForVisit: input.reasonForVisit,
      priority: input.priority,
      consultationType: input.consultationType,
    }),
  });
  return { meeting, joinLink };
}


export const fetchMyConsultations = async (): Promise<ConsultationRecord[]> => {
  const data = await authFetch("/meetings");
  return (data.meetings as BackendMeeting[]).map(mapToConsultationRecord);
};
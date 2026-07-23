import type { ConsultationRecord } from "@/types/consultation-list";
import { getAccessToken } from "@/lib/auth/session";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

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

// Backend meeting shape (already camelCased by the API).
interface BackendMeeting {
  id: string;
  slug: string;
  title: string;
  hostId: string;
  participantId: string | null;
  scheduledStart: string;
  scheduledEnd: string;
  status: "pending" | "accepted" | "declined" | "live" | "ended" | "cancelled";
  reasonForVisit: string | null;
  priority: "low" | "medium" | "high";
  consultationType: string;
  patientName: string | null;
  patientEmail: string | null;
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
  if (status === "live" || status === "ended") return "Completed";
  if (status === "cancelled") return "Declined";
  if (status === "accepted") return "Accepted";
  if (status === "declined") return "Declined";
  return "Pending";
};

const toDisplayPriority = (priority: BackendMeeting["priority"]): ConsultationRecord["priority"] => {
  if (priority === "high") return "High";
  if (priority === "low") return "Low";
  return "Medium";
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

const mapToConsultationRecord = (m: BackendMeeting): ConsultationRecord => {
  const start = new Date(m.scheduledStart);
  const end = new Date(m.scheduledEnd);

  return {
    id: m.id,
    slug: m.slug,
    patientId: m.participantId ?? "",
    patientName: m.patientName ?? "Unknown patient",
    avatarInitials: toInitials(m.patientName),
    avatarTint: toAvatarTint(m.id),
    dateLabel: toDateLabel(m.scheduledStart),
    time: toTimeLabel(m.scheduledStart),
    durationMinutes: Math.round((end.getTime() - start.getTime()) / 60_000),
    type: toDisplayType(m.consultationType),
    reason: m.reasonForVisit ?? "",
    priority: toDisplayPriority(m.priority),
    status: toDisplayStatus(m.status),
    isIncoming: computeIsIncoming(m.status, m.scheduledStart, m.scheduledEnd),
    scheduledStartISO: m.scheduledStart,
    scheduledEndISO: m.scheduledEnd,
    // age/gender aren't in the users table yet - add columns there if you
    // want these populated for real instead of showing as undefined.
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
      participantId: input.doctorId,
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
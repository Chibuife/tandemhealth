export interface Conversation {
  id: string;
  patientName: string;
  initials: string;
  avatarClassName: string;
  lastMessagePreview: string;
  timestampLabel: string;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  sender: "doctor" | "patient";
  content: string;
  time: string;
  dateGroup: string; // e.g. "12 May 2026" or "Today"
  read?: boolean;
}

export interface PatientDetails {
  conversationId: string;
  name: string;
  initials: string;
  avatarClassName: string;
  gender: string;
  age: number;
  dob: string;
  patientId: string;
  email: string;
  phone: string;
  upcomingAppointment?: {
    date: string;
    type: string;
  };
  conditions: string[];
  allergies: string[];
  medications: string[];
  sharedDocuments: {
    id: string;
    name: string;
    fileType: string;
  }[];
}
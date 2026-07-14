import {
  AudioQualityMetrics,
  CallParticipant,
  ChatMessage,
  ConsultationDocument,
  ConsultationSummary,
  PatientConsultationInfo,
  PatientNavItem,
  PatientProfile,
  PatientAiNoteAlert,
  PatientConsultationSummary,
  PatientHealthMetric,
  PatientMessagePreview,
  PatientOverviewStat,
  PatientRecommendedItem,
} from '@/types/patient';
import { SoapNote, TranscriptEntry } from '@/types';

export const patientProfile: PatientProfile = {
  name: 'Anna Johansen',
  role: 'Patient',
  avatarInitials: 'AJ',
};

export const patientNavItems: PatientNavItem[] = [
  { id: '', label: 'Overview', icon: 'Home' },
  { id: 'consultations', label: 'Consultations', icon: 'Calendar', active: true },
  { id: 'documents', label: 'Documents', icon: 'FileText' },
  { id: 'prescriptions', label: 'Prescriptions', icon: 'Pill' },
  // { id: 'referrals', label: 'Referrals', icon: 'Share2' },
  { id: 'messages', label: 'Messages', icon: 'MessageCircle', badgeCount: 2 },
  { id: 'tasks', label: 'Tasks', icon: 'ListChecks' },
  { id: 'health-summary', label: 'Health summary', icon: 'HeartPulse' },
];

export const consultationInfo: PatientConsultationInfo = {
  clinicianName: 'Dr. Emma Larsen',
  isLive: true,
  elapsedTime: '00:12:48',
  isRecording: true,
};

export const callParticipants: CallParticipant[] = [
  { id: 'doctor', displayName: 'Dr. Emma Larsen', role: 'doctor', micActive: true, avatarColor: '#DCEBFF' },
  { id: 'patient', displayName: 'You', role: 'patient', micActive: true, avatarColor: '#F1ECFE' },
];

export const transcript: TranscriptEntry[] = [
  { id: 't1', timestamp: '00:12', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'How have you been feeling lately?' },
  { id: 't2', timestamp: '00:18', speaker: 'You', speakerType: 'patient', text: "I've had headaches almost every day." },
  { id: 't3', timestamp: '00:23', speaker: 'You', speakerType: 'patient', text: 'Especially in the morning.' },
  { id: 't4', timestamp: '00:29', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'Any nausea or sensitivity to light?' },
  { id: 't5', timestamp: '00:34', speaker: 'You', speakerType: 'patient', text: 'Yes, sometimes I feel nauseous.' },
  { id: 't6', timestamp: '00:38', speaker: 'Dr. Larsen', speakerType: 'doctor', text: 'How is your sleep?' },
];

export const audioQuality: AudioQualityMetrics = {
  overallQuality: 'Good',
  latencyMs: 28,
  latencyStatus: 'Good',
  packetLossPct: 0,
  packetLossStatus: 'Good',
  jitterMs: 6,
  jitterStatus: 'Good',
  connectionStatus: 'Stable',
  microphoneName: 'Shure MV7',
  audioLevelBars: 4,
};

export const chatMessages: ChatMessage[] = [
  {
    id: 'c1',
    senderName: 'Dr. Larsen',
    senderRole: 'doctor',
    avatarInitials: 'EL',
    time: '00:34',
    text: 'Do you have any questions before we finish?',
  },
  {
    id: 'c2',
    senderName: 'You',
    senderRole: 'patient',
    avatarInitials: 'AJ',
    time: '00:35',
    text: 'No, that was very helpful. Thank you!',
  },
];

export const consultationSummary: ConsultationSummary = {
  generatedLabel: 'AI generated',
  segments: [
    {
      text:
        'Today you discussed your headaches, which occur almost daily and are worse in the morning. You also experience occasional nausea. Dr. Larsen assessed this as likely ',
    },
    { text: 'migraine without aura', bold: true },
    { text: ' and recommended hydration, regular sleep, and medication as needed.' },
  ],
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

export const consultationDocuments: ConsultationDocument[] = [
  { id: 'doc1', title: 'Clinical note', type: 'clinical-note', status: 'Draft', createdLabel: 'Created 12 May 2026' },
  { id: 'doc2', title: 'Sick note', type: 'sick-note', createdLabel: 'Created 12 May 2026' },
  { id: 'doc3', title: 'Referral', type: 'referral', createdLabel: 'Created 12 May 2026' },
];



export const patientAiNoteAlert: PatientAiNoteAlert = {
  title: 'AI clinical notes are available',
  description: 'Your consultation from 12 May is ready to view.',
  buttonLabel: 'View note',
};

export const patientOverviewStats: PatientOverviewStat[] = [
  {
    id: 'next-appointment',
    icon: 'Calendar',
    label: 'Next appointment',
    value: '22 May, 10:30',
    boldDetail: 'Dr. Emma Larsen',
    detail: 'General practitioner',
    buttonLabel: 'View details',
  },
  {
    id: 'recent-clinical-note',
    icon: 'FileText',
    label: 'Recent clinical note',
    value: '12 May 2026',
    detail: 'Headache and fatigue',
    buttonLabel: 'View note',
  },
  {
    id: 'active-prescriptions',
    icon: 'Pill',
    label: 'Active prescriptions',
    value: '2',
    detail: '1 medication needs renewal',
    buttonLabel: 'View prescriptions',
  },
  {
    id: 'open-tasks',
    icon: 'CheckCircle2',
    label: 'Open tasks',
    value: '1',
    detail: 'Complete before your visit',
    buttonLabel: 'View tasks',
  },
];

export const patientRecentConsultations: PatientConsultationSummary[] = [
  {
    id: '1',
    date: '12 May 2026, 09:15',
    title: 'Headache and fatigue',
    doctor: 'Dr. Emma Larsen',
    status: 'Completed',
  },
  {
    id: '2',
    date: '8 Apr 2026, 11:00',
    title: 'Follow-up',
    doctor: 'Dr. Emma Larsen',
    status: 'Completed',
  },
  {
    id: '3',
    date: '3 Feb 2026, 14:20',
    title: 'Sore throat',
    doctor: 'Dr. Emma Larsen',
    status: 'Completed',
  },
  {
    id: '4',
    date: '15 Jan 2026, 10:30',
    title: 'Annual check-up',
    doctor: 'Dr. Emma Larsen',
    status: 'Completed',
  },
];

export const patientHealthSummary: PatientHealthMetric[] = [
  { label: 'Blood pressure', value: '120 / 80 mmHg', status: 'Normal' },
  { label: 'Weight', value: '64 kg', status: 'Healthy' },
  { label: 'Height', value: '168 cm' },
  { label: 'BMI', value: '22.7', status: 'Healthy' },
  { label: 'Allergies', value: 'Pollen, Penicillin' },
  { label: 'Conditions', value: 'No chronic conditions' },
];

export const patientMessagePreviews: PatientMessagePreview[] = [
  {
    id: '1',
    name: 'Dr. Emma Larsen',
    date: '12 May',
    preview: 'Your lab results look good. Let us know if yo…',
    avatarType: 'initials',
    initials: 'DE',
    unread: true,
  },
  {
    id: '2',
    name: 'Tandem Health',
    date: '8 May',
    preview: 'Your clinical note from 12 May is ready.',
    avatarType: 'system',
    unread: true,
  },
  {
    id: '3',
    name: 'Dr. Emma Larsen',
    date: '3 Apr',
    preview: "Don't forget to book your follow-up appoi…",
    avatarType: 'initials',
    initials: 'DE',
    unread: false,
  },
];

export const patientRecommendedForYou: PatientRecommendedItem[] = [
  {
    id: 'book-appointment',
    icon: 'Calendar',
    title: 'Book an appointment',
    description: 'Schedule a time that works for you.',
    buttonLabel: 'Book now',
  },
  {
    id: 'prepare-visit',
    icon: 'FileText',
    title: 'Prepare for your next visit',
    description: 'Answer a few questions before your appointment.',
    buttonLabel: 'Get started',
  },
  {
    id: 'lab-results',
    icon: 'TestTube',
    title: 'View lab results',
    description: 'Your latest results from 8 May are available.',
    buttonLabel: 'View results',
  },
  {
    id: 'health-insights',
    icon: 'Heart',
    title: 'Health insights',
    description: 'Get personalised insights and tips.',
    buttonLabel: 'See insights',
  },
];

// Merge these into your existing @/data/patientDemoData file.

import { PatientDocument, PatientRecentUpload, PatientStorageUsage } from '@/types/patient';

export const patientDocuments: PatientDocument[] = [
  {
    id: '1',
    name: 'Consultation note – 12 May 2026',
    description: 'Clinical note',
    type: 'Clinical note',
    date: '12 May 2026, 09:15',
    uploadedBy: 'Dr. Emma Larsen',
    tags: ['consultation', '+1'],
  },
  {
    id: '2',
    name: 'Lab results – 8 May 2026',
    description: 'Blood test results',
    type: 'Lab results',
    date: '8 May 2026, 14:32',
    uploadedBy: 'Tandem Health Lab',
    tags: ['blood test'],
  },
  {
    id: '3',
    name: 'Chest X-ray',
    description: 'Imaging report',
    type: 'Imaging',
    date: '5 May 2026, 11:20',
    uploadedBy: 'Radiology Center',
    tags: ['x-ray', 'chest'],
  },
  {
    id: '4',
    name: 'Referral letter – Cardiology',
    description: 'Referral to specialist',
    type: 'Referral',
    date: '3 May 2026, 10:05',
    uploadedBy: 'Dr. Emma Larsen',
    tags: ['cardiology'],
  },
  {
    id: '5',
    name: 'Discharge summary',
    description: 'Hospital discharge document',
    type: 'Report',
    date: '28 Apr 2026, 16:45',
    uploadedBy: 'Oslo Medical Center',
    tags: ['discharge', '+1'],
  },
  {
    id: '6',
    name: 'Consent form',
    description: 'Patient consent',
    type: 'Form',
    date: '20 Apr 2026, 09:30',
    uploadedBy: 'Dr. Emma Larsen',
    tags: ['consent'],
  },
  {
    id: '7',
    name: 'Care plan',
    description: 'Ongoing care plan',
    type: 'Other',
    date: '15 Apr 2026, 13:10',
    uploadedBy: 'Dr. Emma Larsen',
    tags: ['care plan'],
  },
  {
    id: '8',
    name: 'Lipid panel results',
    description: 'Cholesterol test results',
    type: 'Lab results',
    date: '10 Apr 2026, 08:50',
    uploadedBy: 'Tandem Health Lab',
    tags: ['lipid panel'],
  },
];

export const patientRecentUploads: PatientRecentUpload[] = [
  {
    id: '1',
    name: 'Consultation note – 12 May 2026',
    date: '12 May 2026, 09:15',
    type: 'Clinical note',
    unread: true,
  },
  {
    id: '2',
    name: 'Lab results – 8 May 2026',
    date: '8 May 2026, 14:32',
    type: 'Lab results',
    unread: true,
  },
  {
    id: '3',
    name: 'Chest X-ray',
    date: '5 May 2026, 11:20',
    type: 'Imaging',
    unread: true,
  },
];

export const patientStorageUsage: PatientStorageUsage = {
  percentUsed: 42,
  usedLabel: '4.2 GB',
  totalLabel: 'of 10 GB used',
};



// Merge these into your existing @/data/patientDemoData file.

import {
  PrescriptionMedication,
  PatientClinicalSummary,
  PrescriptionOverview,
  SendPrescriptionOption,
} from '@/types/patient';

export const prescriptionMedications: PrescriptionMedication[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    form: 'Capsule',
    dose: '500 mg',
    route: 'Oral',
    frequency: 'Three times daily',
    duration: '7 days',
    quantity: '21 capsules',
  },
  {
    id: '2',
    name: 'Paracetamol 500mg',
    form: 'Tablet',
    dose: '500 mg',
    route: 'Oral',
    frequency: 'Every 6 hours as needed',
    duration: '5 days',
    quantity: '20 tablets',
  },
  {
    id: '3',
    name: 'Omeprazole 20mg',
    form: 'Capsule',
    dose: '20 mg',
    route: 'Oral',
    frequency: 'Once daily (morning)',
    duration: '14 days',
    quantity: '14 capsules',
  },
];

export const patientClinicalSummary: PatientClinicalSummary = {
  name: 'Anna Johansen',
  avatarInitials: 'AJ',
  sex: 'Female',
  age: 38,
  dateOfBirth: '12 May 1988',
  allergies: ['Penicillin (rash)'],
  conditions: ['Migraine'],
  currentMedications: ['Sumatriptan 50mg (PRN)'],
};

export const prescriptionOverview: PrescriptionOverview = {
  medicationsCount: 3,
  totalItems: 55,
  duration: 'Up to 14 days',
  createdBy: 'Dr. Emma Larsen',
  date: '12 May 2026, 09:15',
};

export const sendPrescriptionOptions: SendPrescriptionOption[] = [
  {
    id: 'electronic',
    icon: 'Share2',
    title: 'Send electronically',
    description: "Send to patient's pharmacy",
  },
  {
    id: 'print',
    icon: 'Printer',
    title: 'Print prescription',
    description: 'Print for patient',
  },
  {
    id: 'draft',
    icon: 'Save',
    title: 'Save as draft',
    description: 'Save and complete later',
  },
];

// Merge these into your existing @/data/patientDemoData file.

import {
  HeartStat,
  EjectionFractionPoint,
  CardiovascularRisk,
  HeartTestResult,
  HeartFunctionMeasurement,
  HeartRecommendation,
  PatientHeartSummary,
  HeartAlert,
  LifestyleFactor,
} from '@/types/patient';

export const heartStats: HeartStat[] = [
  {
    id: 'overall-health',
    icon: 'Heart',
    label: 'Overall heart health',
    value: 'Good',
    valueColor: 'text-emerald-600',
    detail: 'Improved vs last visit',
    detailColor: 'text-emerald-600',
  },
  {
    id: 'ejection-fraction',
    icon: 'Activity',
    label: 'Ejection fraction',
    value: '58%',
    valueColor: 'text-fg',
    detail: 'Normal (55–70%)',
    detailColor: 'text-emerald-600',
  },
  {
    id: 'blood-pressure',
    icon: 'Droplet',
    label: 'Blood pressure',
    value: '120/80 mmHg',
    valueColor: 'text-fg',
    detail: 'Normal',
    detailColor: 'text-emerald-600',
  },
  {
    id: 'resting-heart-rate',
    icon: 'Gauge',
    label: 'Resting heart rate',
    value: '68 bpm',
    valueColor: 'text-fg',
    detail: 'Normal (60–100 bpm)',
    detailColor: 'text-emerald-600',
  },
];

export const ejectionFractionTrend: EjectionFractionPoint[] = [
  { month: 'May 2024', value: 61 },
  { month: 'Jul 2024', value: 63 },
  { month: 'Sep 2024', value: 60 },
  { month: 'Nov 2024', value: 56 },
  { month: 'Jan 2025', value: 60 },
  { month: 'Mar 2025', value: 59 },
  { month: 'May 2025', value: 58 },
];

export const cardiovascularRisk: CardiovascularRisk = {
  percent: 12,
  riskLabel: 'Low risk',
  comparisonPercentile: 82,
};

export const heartTestResults: HeartTestResult[] = [
  {
    id: '1',
    test: 'Echocardiogram',
    result: 'Normal',
    resultColor: 'text-emerald-600',
    referenceRange: 'Normal',
    date: '12 May 2026',
  },
  {
    id: '2',
    test: 'ECG',
    result: 'Normal sinus rhythm',
    resultColor: 'text-emerald-600',
    referenceRange: 'Normal',
    date: '12 May 2026',
  },
  {
    id: '3',
    test: 'Cholesterol (Total)',
    result: '4.2 mmol/L',
    resultColor: 'text-emerald-600',
    referenceRange: '< 5.2 mmol/L',
    date: '12 May 2026',
  },
  {
    id: '4',
    test: 'LDL Cholesterol',
    result: '2.1 mmol/L',
    resultColor: 'text-emerald-600',
    referenceRange: '< 3.0 mmol/L',
    date: '12 May 2026',
  },
  {
    id: '5',
    test: 'HDL Cholesterol',
    result: '1.4 mmol/L',
    resultColor: 'text-emerald-600',
    referenceRange: '> 1.0 mmol/L',
    date: '12 May 2025',
  },
  {
    id: '6',
    test: 'Triglycerides',
    result: '1.1 mmol/L',
    resultColor: 'text-emerald-600',
    referenceRange: '< 1.7 mmol/L',
    date: '12 May 2026',
  },
];

export const heartFunctionMeasurements: HeartFunctionMeasurement[] = [
  { label: 'LV size', status: 'Normal' },
  { label: 'LV function', status: 'Normal' },
  { label: 'RV size', status: 'Normal' },
  { label: 'Valve function', status: 'Normal' },
  { label: 'Wall motion', status: 'Normal' },
  { label: 'Pericardium', status: 'Normal' },
];

export const heartRecommendations: HeartRecommendation[] = [
  {
    id: 'keep-moving',
    icon: 'Footprints',
    title: 'Keep moving',
    description: 'Aim for at least 150 minutes of moderate exercise per week.',
  },
  {
    id: 'heart-healthy-diet',
    icon: 'Heart',
    title: 'Heart healthy diet',
    description: 'Continue eating balanced meals rich in fruits, vegetables and whole grains.',
  },
  {
    id: 'maintain-weight',
    icon: 'Scale',
    title: 'Maintain healthy weight',
    description: 'Your BMI is 22.7. Keep up the good work!',
  },
  {
    id: 'regular-checkups',
    icon: 'Calendar',
    title: 'Regular check-ups',
    description: 'Continue regular heart health checks to monitor your progress.',
  },
];

export const patientHeartSummary: PatientHeartSummary = {
  name: 'Anna Johansen',
  avatarInitials: 'AJ',
  sex: 'Female',
  age: 38,
  dateOfBirth: '12 May 1988',
  latestHeartCheck: '12 May 2026',
  nextFollowUp: '12 Aug 2026',
  conditions: ['None known'],
  medications: ['Sumatriptan 50mg (PRN)'],
};

export const heartAlerts: HeartAlert[] = [
  {
    id: '1',
    status: 'ok',
    title: 'No critical alerts',
    description: 'Your heart health is stable.',
  },
  {
    id: '2',
    status: 'warning',
    title: 'Follow-up due soon',
    description: 'Your next heart check is in 3 months.',
  },
];

export const lifestyleFactors: LifestyleFactor[] = [
  { id: 'activity', icon: 'Activity', label: 'Physical activity', value: 'Good' },
  { id: 'diet', icon: 'Utensils', label: 'Diet', value: 'Good' },
  { id: 'smoking', icon: 'Cigarette', label: 'Smoking', value: 'Non-smoker' },
  { id: 'stress', icon: 'Brain', label: 'Stress level', value: 'Low' },
  { id: 'sleep', icon: 'Moon', label: 'Sleep', value: 'Good' },
];


import {
  Calendar,
  CreditCard,
  FlaskConical,
  Heart,
} from 'lucide-react';
import {
  MessageConversation,
  QuickContact,
  RecentConversation,
  ThreadMessage,
} from '@/types/patient';

export const conversations: MessageConversation[] = [
  {
    id: 'tandem-health',
    icon: Heart,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    name: 'Tandem Health',
    preview: 'Your appointment is confirmed for...',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: 'appointment-reminders',
    icon: Calendar,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    name: 'Appointment Reminders',
    preview: 'Reminder: Follow-up on 12 May',
    timestamp: 'Yesterday',
    unreadCount: 1,
  },
  {
    id: 'prescriptions',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    name: 'Prescriptions',
    preview: 'Your prescription is ready',
    timestamp: '2 May',
  },
  {
    id: 'billing',
    icon: CreditCard,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    name: 'Billing & Payment',
    preview: 'Payment receipt for consult...',
    timestamp: '30 Apr',
  },
  {
    id: 'health-tips',
    icon: Heart,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    name: 'Health Tips',
    preview: '5 tips for better sleep',
    timestamp: '28 Apr',
  },
];

export const threadMessages: ThreadMessage[] = [
  {
    id: '1',
    direction: 'incoming',
    text: "Hi Anna! 👋 Welcome to Tandem Health. We're here to help you manage your health and stay on track.",
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    direction: 'outgoing',
    text: 'Thank you! I have a question about my upcoming appointment.',
    timestamp: '10:02 AM',
    read: true,
  },
  {
    id: '3',
    direction: 'incoming',
    text: "Sure, I'd be happy to help. What would you like to know?",
    timestamp: '10:03 AM',
  },
  {
    id: '4',
    direction: 'outgoing',
    text: 'Can I reschedule it to a different time?',
    timestamp: '10:04 AM',
    read: true,
  },
  {
    id: '5',
    direction: 'incoming',
    text: 'Yes, you can reschedule or cancel your appointment from the Appointments section or reply here if you need help.',
    timestamp: '10:05 AM',
  },
];

export const quickContacts: QuickContact[] = [
  {
    id: 'tandem-health',
    icon: Heart,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Tandem Health',
    subtitle: 'General support and updates',
  },
  {
    id: 'appointment-support',
    icon: Calendar,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Appointment Support',
    subtitle: 'Get help with appointments',
  },
  {
    id: 'lab-support',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Lab Support',
    subtitle: 'Questions about lab results',
  },
  {
    id: 'billing-support',
    icon: CreditCard,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Billing Support',
    subtitle: 'Payments and receipts',
  },
];

export const recentConversations: RecentConversation[] = [
  {
    id: 'tandem-health',
    icon: Heart,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Tandem Health',
    subtitle: 'Your appointment is confirmed',
    timestamp: '10:30 AM',
  },
  {
    id: 'appointment-reminders',
    icon: Calendar,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
    title: 'Appointment Reminders',
    subtitle: 'Follow-up on 12 May',
    timestamp: 'Yesterday',
  },
  {
    id: 'lab-results',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Lab Results',
    subtitle: 'Your lab results are ready',
    timestamp: 'Yesterday',
  },
  {
    id: 'prescriptions',
    icon: FlaskConical,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Prescriptions',
    subtitle: 'Your prescription is ready',
    timestamp: '2 May',
  },
];




import {
  Droplet,
  FileText,
  FileUp,
  Footprints,
} from 'lucide-react';
import { PatientTask, TaskReminder } from '@/types/patient';

export const tasks: PatientTask[] = [
  {
    id: '1',
    icon: Calendar,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Attend follow-up appointment',
    subtitle: 'Dr. Emma Larsen',
    category: 'Appointment',
    categoryColor: 'violet',
    dueDate: '12 May 2026, 11:30 AM',
    priority: 'High',
    priorityColor: 'red',
    status: 'Upcoming',
    statusColor: 'blue',
  },
  {
    id: '2',
    icon: Droplet,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Take medication',
    subtitle: 'Sumatriptan 50mg',
    category: 'Medication',
    categoryColor: 'green',
    dueDate: 'Today, 08:00 PM',
    priority: 'Medium',
    priorityColor: 'amber',
    status: 'In progress',
    statusColor: 'blue',
  },
  {
    id: '3',
    icon: FlaskConical,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Complete blood test',
    subtitle: 'Check cholesterol levels',
    category: 'Lab test',
    categoryColor: 'blue',
    dueDate: '15 May 2026, 09:00 AM',
    priority: 'Medium',
    priorityColor: 'amber',
    status: 'Upcoming',
    statusColor: 'blue',
  },
  {
    id: '4',
    icon: Heart,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: 'Log your blood pressure',
    subtitle: 'Daily tracking',
    category: 'Health tracking',
    categoryColor: 'red',
    dueDate: 'Today',
    priority: 'Low',
    priorityColor: 'green',
    status: 'Pending',
    statusColor: 'gray',
  },
  {
    id: '5',
    icon: FileText,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Review lab results',
    subtitle: 'From 8 May 2026',
    category: 'Results',
    categoryColor: 'amber',
    dueDate: '16 May 2026',
    priority: 'Low',
    priorityColor: 'green',
    status: 'Pending',
    statusColor: 'gray',
  },
  {
    id: '6',
    icon: Footprints,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Walk for 30 minutes',
    subtitle: 'Daily activity goal',
    category: 'Lifestyle',
    categoryColor: 'violet',
    dueDate: 'Today',
    priority: 'Low',
    priorityColor: 'green',
    status: 'In progress',
    statusColor: 'blue',
  },
  {
    id: '7',
    icon: FileUp,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Upload insurance document',
    subtitle: 'For upcoming appointment',
    category: 'Administrative',
    categoryColor: 'blue',
    dueDate: '20 May 2026',
    priority: 'Low',
    priorityColor: 'green',
    status: 'Pending',
    statusColor: 'gray',
  },
  {
    id: '8',
    icon: Calendar,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Fill out pre-visit form',
    subtitle: 'For 12 May appointment',
    category: 'Appointment',
    categoryColor: 'violet',
    dueDate: '11 May 2026',
    priority: 'Medium',
    priorityColor: 'amber',
    status: 'Pending',
    statusColor: 'gray',
  },
];

export const reminders: TaskReminder[] = [
  {
    id: '1',
    icon: Droplet,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: 'Take medication',
    subtitle: 'Today, 08:00 PM',
  },
  {
    id: '2',
    icon: Calendar,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Appointment tomorrow',
    subtitle: '12 May 2026, 11:30 AM',
  },
  {
    id: '3',
    icon: Heart,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: 'Log blood pressure',
    subtitle: 'Daily reminder',
  },
];
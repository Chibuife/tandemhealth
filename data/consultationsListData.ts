import {
  ConsultationSummaryData,
  QuickActionItem,
  TodayScheduleItem,
} from '@/types/consultation-list';


export const consultationSummary: ConsultationSummaryData = {
  total: 12,
  pending: 4,
  accepted: 3,
  declined: 2,
  completed: 3,
};

export const todaysSchedule: TodayScheduleItem[] = [
  { time: '10:00 AM', patientName: 'Kevin Liu', status: 'Accepted' },
  { time: '1:00 PM', patientName: 'Nina Patel', status: 'Accepted' },
  { time: '2:30 PM', patientName: 'Sarah Johnson', status: 'Pending' },
  { time: '4:00 PM', patientName: 'Michael Roberts', status: 'Pending' },
];

export const quickActions: QuickActionItem[] = [
  {
    icon: 'calendar',
    label: 'Set availability',
    description: 'Manage your consultation hours',
  },
  {
    icon: 'link',
    label: 'Create consultation link',
    description: 'Share link for instant booking',
  },
  {
    icon: 'calendar-days',
    label: 'View calendar',
    description: 'Open full schedule view',
  },
];



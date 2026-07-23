'use client';

import { ConsultationsPageHeader } from '@/components/doctor/consultations/ConsultationsPageHeader';
import { ConsultationsWorkspace } from '@/components/doctor/consultations/ConsultationsWorkspace';
import { ConsultationSummaryCard } from '@/components/doctor/consultations/ConsultationSummaryCard';
import { TodaysScheduleCard } from '@/components/doctor/consultations/TodaysScheduleCard';
import { QuickActionsCard } from '@/components/doctor/consultations/QuickActionsCard';
import { SupportCard } from '@/components/doctor/consultations/SupportCard';
import { quickActions } from '@/data/consultationsListData'; // static, unrelated to the backend
import { useConsultationsData } from '@/hooks/useConsultationsData';

export default function ConsultationsPage() {
  const {
    consultations,
    todaysUpcoming,
    todaysSchedule,
    summary,
    loading,
    error,
    accept,
    decline,
  } = useConsultationsData();

  if (loading) {
    return (
      <>
        <ConsultationsPageHeader />
        <div className="py-12 text-center text-sm text-gray-500">Loading consultations…</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ConsultationsPageHeader />
        <div className="py-12 text-center text-sm text-red-600">{error}</div>
      </>
    );
  }

  return (
    <>
      <ConsultationsPageHeader />

      {/* Main content (left, 2 cols) + summary sidebar (right, 1 col) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ConsultationsWorkspace
            consultations={consultations}
            todaysUpcoming={todaysUpcoming}
            onAccept={accept}
            onDecline={decline}
          />
        </div>

        <div className="flex flex-col gap-4">
          <ConsultationSummaryCard summary={summary} />
          <TodaysScheduleCard schedule={todaysSchedule} />
          <QuickActionsCard actions={quickActions} />
          <SupportCard />
        </div>
      </div>
    </>
  );
}
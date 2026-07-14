import PatientOverviewHeader from '@/components/patient/PatientOverviewHeader';
import PatientOverviewStats from '@/components/patient/PatientOverviewStats';
import PatientRecentConsultations from '@/components/patient/PatientRecentConsultations';
import PatientHealthSummary from '@/components/patient/PatientHealthSummary';
import PatientMessagesCard from '@/components/patient/PatientMessagesCard';
import PatientRecommendedForYou from '@/components/patient/PatientRecommendedForYou';

import {
  patientAiNoteAlert,
  patientOverviewStats,
  patientRecentConsultations,
  patientHealthSummary,
  patientMessagePreviews,
  patientRecommendedForYou,
  patientProfile,
} from '@/data/patientDemoData';

export default function PatientOverviewPage() {
  return (
    <div>
      <PatientOverviewHeader
        patientFirstName={patientProfile.name.split(' ')[0]}
        aiNoteAlert={patientAiNoteAlert}
      />

      <PatientOverviewStats stats={patientOverviewStats} />

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PatientRecentConsultations consultations={patientRecentConsultations} />
        <PatientHealthSummary metrics={patientHealthSummary} />
        <PatientMessagesCard messages={patientMessagePreviews} />
      </div>

      <PatientRecommendedForYou items={patientRecommendedForYou} />
    </div>
  );
}
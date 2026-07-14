import NewPrescriptionHeader from '@/components/patient/prescriptions/NewPrescriptionHeader';
import AddMedicationCard from '@/components/patient/prescriptions/AddMedicationCard';
import PrescriptionInstructionsCard from '@/components/patient/prescriptions/PrescriptionInstructionsCard';
import PrescriptionNotesCard from '@/components/patient/prescriptions/PrescriptionNotesCard';
import DispenseAsCard from '@/components/patient/prescriptions/DispenseAsCard';
import PatientSummaryCard from '@/components/patient/prescriptions/PatientSummaryCard';
import PrescriptionOverviewCard from '@/components/patient/prescriptions/PrescriptionOverviewCard';
import SendPrescriptionCard from '@/components/patient/prescriptions/SendPrescriptionCard';
import SecureComplianceBanner from '@/components/patient/prescriptions/SecureComplianceBanner';

import {
  prescriptionMedications,
  patientClinicalSummary,
  prescriptionOverview,
  sendPrescriptionOptions,
} from '@/data/patientDemoData';

export default function NewPrescriptionPage() {
  return (
    <div>
      <NewPrescriptionHeader />

      {/* Form takes 3/4 on large screens, patient/summary/send sidebar takes 1/4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <AddMedicationCard medications={prescriptionMedications} />
          <PrescriptionInstructionsCard />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PrescriptionNotesCard />
            <DispenseAsCard />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-1">
          <PatientSummaryCard summary={patientClinicalSummary} />
          <PrescriptionOverviewCard overview={prescriptionOverview} />
          <SendPrescriptionCard options={sendPrescriptionOptions} />
          <SecureComplianceBanner />
        </div>
      </div>
    </div>
  );
}
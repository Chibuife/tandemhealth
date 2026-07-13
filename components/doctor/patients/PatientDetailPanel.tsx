import { Patient } from "@/lib/patients/types";
import PatientDetailHeader from "./PatientDetailHeader";
import PatientInfoCard from "./PatientInfoCard";
import HealthSummaryCard from "./HealthSummaryCard";
import RecentConsultationsTable from "./RecentConsultationsTable";

interface PatientDetailPanelProps {
  patient: Patient;
}

export default function PatientDetailPanel({ patient }: PatientDetailPanelProps) {
  return (
    <div className="rounded-2xl border border-border bg-white">
      <PatientDetailHeader patient={patient} />

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <PatientInfoCard patient={patient} />
          <HealthSummaryCard patient={patient} />
        </div>

        <RecentConsultationsTable patient={patient} />
      </div>
    </div>
  );
}
import ClinicalDecisionSupportCard from "@/components/doctor/overview/ClinicalDecisionSupportCard";
import OverviewHeader from "@/components/doctor/overview/OverviewHeader";
import OverviewStats from "@/components/doctor/overview/OverviewStats";
import PatientOverviewTable from "@/components/doctor/overview/PatientOverviewTable";
import RecentActivityCard from "@/components/doctor/overview/RecentActivityCard";
import TaskSummaryCard from "@/components/doctor/overview/TaskSummaryCard";
import TodayScheduleCard from "@/components/doctor/overview/TodayScheduleCard";

export default function DashboardOverviewPage() {
  return (
    <div>
      <OverviewHeader clinicianFirstName="Emma" date="12 May 2026" />

      <OverviewStats />

      {/* Schedule / activity / tasks: stacks to 1 column, then 3 equal columns on large screens */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <TodayScheduleCard />
        <RecentActivityCard />
        <TaskSummaryCard />
      </div>

      {/* Patients table / clinical decision support: table takes 2/3 on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PatientOverviewTable />
        </div>
        <ClinicalDecisionSupportCard />
      </div>
    </div>
  );
}
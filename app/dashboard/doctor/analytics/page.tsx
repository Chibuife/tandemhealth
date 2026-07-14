import AnalyticsHeader from "@/components/doctor/analytics/AnalyticsHeader";
import AnalyticsTabs from "@/components/doctor/analytics/AnalyticsTabs";
import AnalyticsStats from "@/components/doctor/analytics/AnalyticsStats";
import ConsultationsOverTimeChart from "@/components/doctor/analytics/ConsultationsOverTimeChart";
import ConsultationsByTypeChart from "@/components/doctor/analytics/ConsultationsByTypeChart";
import DocumentationTimeSavedChart from "@/components/doctor/analytics/DocumentationTimeSavedChart";
import TopDiagnosisCategories from "@/components/doctor/analytics/TopDiagnosisCategories";
import AiUsageOverview from "@/components/doctor/analytics/AiUsageOverview";
import TeamPerformanceTable from "@/components/doctor/analytics/TeamPerformanceTable";
import InsightsSection from "@/components/doctor/analytics/InsightsSection";
import ReportsPanel from "@/components/doctor/analytics/ReportsPanel";

export default function AnalyticsPage() {
  return (
    <div>
      <AnalyticsHeader />

      <AnalyticsTabs />

      <AnalyticsStats />

      {/* Trend line, type breakdown, and time-saved trend */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ConsultationsOverTimeChart />
        </div>
        <div className="lg:col-span-3">
          <ConsultationsByTypeChart />
        </div>
        <div className="lg:col-span-4">
          <DocumentationTimeSavedChart />
        </div>
      </div>

      {/* Diagnosis breakdown, AI usage, and team performance */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <TopDiagnosisCategories />
        </div>
        <div className="lg:col-span-4">
          <AiUsageOverview />
        </div>
        <div className="lg:col-span-5">
          <TeamPerformanceTable />
        </div>
      </div>

      {/* Insights callouts and downloadable reports */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <InsightsSection />
        </div>
        <div className="lg:col-span-4">
          <ReportsPanel />
        </div>
      </div>
    </div>
  );
}
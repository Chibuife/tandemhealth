import HeartSummaryHeader from '@/components/patient/health-summary/HeartSummaryHeader';
import HeartSummaryStats from '@/components/patient/health-summary/HeartSummaryStats';
import EjectionFractionTrendChart from '@/components/patient/health-summary/EjectionFractionTrendChart';
import CardiovascularRiskCard from '@/components/patient/health-summary/CardiovascularRiskCard';
import RecentHeartTestResultsCard from '@/components/patient/health-summary/RecentHeartTestResultsCard';
import HeartFunctionCard from '@/components/patient/health-summary/HeartFunctionCard';
import HeartRecommendationsCard from '@/components/patient/health-summary/HeartRecommendationsCard';
import PatientSummarySidebarCard from '@/components/patient/health-summary/PatientSummarySidebarCard';
import AlertsCard from '@/components/patient/health-summary/AlertsCard';
import LifestyleFactorsCard from '@/components/patient/health-summary/LifestyleFactorsCard';

import {
  heartStats,
  ejectionFractionTrend,
  cardiovascularRisk,
  heartTestResults,
  heartFunctionMeasurements,
  heartRecommendations,
  patientHeartSummary,
  heartAlerts,
  lifestyleFactors,
} from '@/data/patientDemoData';

export default function HeartSummaryPage() {
  return (
    <div>
      <HeartSummaryHeader />

      {/* Main content takes 3/4 on large screens, patient/alerts/lifestyle sidebar takes 1/4 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <HeartSummaryStats stats={heartStats} />

          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <EjectionFractionTrendChart data={ejectionFractionTrend} />
            </div>
            <div className="lg:col-span-5">
              <CardiovascularRiskCard risk={cardiovascularRisk} />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <RecentHeartTestResultsCard results={heartTestResults} />
            <HeartFunctionCard measurements={heartFunctionMeasurements} echocardiogramDate="12 May 2026" />
          </div>

          <HeartRecommendationsCard recommendations={heartRecommendations} />
        </div>

        <div className="space-y-4 lg:col-span-1">
          <PatientSummarySidebarCard summary={patientHeartSummary} />
          <AlertsCard alerts={heartAlerts} />
          <LifestyleFactorsCard factors={lifestyleFactors} />
        </div>
      </div>
    </div>
  );
}
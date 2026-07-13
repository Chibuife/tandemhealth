import CDSAlerts from "@/components/doctor/clinical-decision-support/CDSAlerts";
import CDSHeader from "@/components/doctor/clinical-decision-support/CDSHeader";
import CDSPopularGuidelines from "@/components/doctor/clinical-decision-support/CDSPopularGuidelines";
import CDSRecommendations from "@/components/doctor/clinical-decision-support/CDSRecommendations";
import CDSSearchBar from "@/components/doctor/clinical-decision-support/CDSSearchBar";
import CDSStats from "@/components/doctor/clinical-decision-support/CDSStats";
import CDSTools from "@/components/doctor/clinical-decision-support/CDSTools";

export default function ClinicalDecisionSupportPage() {
  return (
    <div>
      <CDSHeader />

      <CDSSearchBar />

      <CDSStats />

      {/* Recommendations / tools / alerts: stacks to 1 column, then weighted 3 columns on large screens */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <CDSRecommendations />
        </div>
        <div className="lg:col-span-4">
          <CDSTools />
        </div>
        <div className="lg:col-span-3">
          <CDSAlerts />
        </div>
      </div>

      <CDSPopularGuidelines />
    </div>
  );
}
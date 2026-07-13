import SectionHero from "@/components/doctor/SectionHero";

export default function AnalyticsPage() {
  return (
    <div>
      <SectionHero
        title="Analytics"
        subtitle="Track consultation volume, patient outcomes, and clinician performance over time."
      />
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
        Charts and reporting widgets go here.
      </div>
    </div>
  );
}
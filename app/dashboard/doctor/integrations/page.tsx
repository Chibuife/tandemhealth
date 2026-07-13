import { SectionHero } from '@/components/doctor/SectionHero';

export default function RecordsPage() {
  return (
    <div>
      <SectionHero
        title="Records"
        subtitle="Review past consultation notes, SOAP summaries, and clinical documents."
      />
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
        Records table and document viewer go here.
      </div>
    </div>
  );
}
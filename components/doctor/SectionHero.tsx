interface SectionHeroProps {
  title: string;
  subtitle: string;
}

export function SectionHero({ title, subtitle }: SectionHeroProps) {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-lg text-sm text-muted">{subtitle}</p>
    </div>
  );
}

export default SectionHero;
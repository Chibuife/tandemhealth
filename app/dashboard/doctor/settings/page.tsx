import SectionHero from "@/components/doctor/SectionHero";

export default function SettingsPage() {
  return (
    <div>
      <SectionHero
        title="Settings"
        subtitle="Manage your profile, notification preferences, and account details."
      />
      <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center text-sm text-muted">
        Account and preference forms go here.
      </div>
    </div>
  );
}
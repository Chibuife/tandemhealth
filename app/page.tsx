import { Stethoscope, UserRound } from 'lucide-react';
import { TopBanner } from '@/components/TopBanner';
import { AppHeader } from '@/components/AppHeader';
import { RoleOptionCard } from '@/components/home/RoleOptionCard';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopBanner />
      <AppHeader />

      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-3xl">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold text-ink">Welcome to Tandem</h1>
            <p className="text-sm text-muted">Choose how you&apos;d like to continue</p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <RoleOptionCard
              href="/dashboard/consultant"
              icon={Stethoscope}
              iconBg="#EAF1FF"
              iconFg="#3B6FE0"
              title="Join as Consultant"
              description="Run consultations with AI-assisted transcription, clinical notes, and ICD-10 suggestions in real time."
              ctaLabel="Continue as Consultant"
            />
            <RoleOptionCard
              href="/dashboard/patient"
              icon={UserRound}
              iconBg="#F1ECFE"
              iconFg="#7C5CE0"
              title="Join as Patient"
              description="Join your video consultation, chat with your clinician, and access your documents afterward."
              ctaLabel="Continue as Patient"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

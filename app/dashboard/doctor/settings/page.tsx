import SettingsHeader from "@/components/doctor/settings/SettingsHeader";
import SettingsTabs from "@/components/doctor/settings/SettingsTabs";
import GeneralPreferencesCard from "@/components/doctor/settings/GeneralPreferencesCard";
import ConsultationDefaultsCard from "@/components/doctor/settings/ConsultationDefaultsCard";
import DataPrivacyCard from "@/components/doctor/settings/DataPrivacyCard";
import AppearanceCard from "@/components/doctor/settings/AppearanceCard";
import AccountCard from "@/components/doctor/settings/AccountCard";
import PracticeInfoCard from "@/components/doctor/settings/PracticeInfoCard";
import SystemCard from "@/components/doctor/settings/SystemCard";
import NeedHelpCard from "@/components/doctor/settings/NeedHelpCard";

export default function SettingsPage() {
  return (
    <div>
      <SettingsHeader />
      <SettingsTabs />

      {/* General settings / account+practice+system sidebar: 7 / 5 on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <GeneralPreferencesCard />
          <ConsultationDefaultsCard />
          <DataPrivacyCard />
          <AppearanceCard />
        </div>

        <div className="lg:col-span-5">
          <AccountCard />
          <PracticeInfoCard />
          <SystemCard />
          <NeedHelpCard />
        </div>
      </div>
    </div>
  );
}
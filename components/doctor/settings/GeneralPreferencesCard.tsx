import { Calendar, Clock, ClipboardList, Globe } from "lucide-react";
import SettingsSelectField from "./SettingsSelectField";

export default function GeneralPreferencesCard() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">General preferences</h3>
      <p className="mt-0.5 text-sm text-fg-muted">Customize your experience with Tandem.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SettingsSelectField label="Language" value="English (UK)" icon={Globe} />
        <SettingsSelectField label="Date format" value="12 May 2026" icon={Calendar} />
        <SettingsSelectField label="Time format" value="24-hour (14:30)" icon={Clock} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SettingsSelectField label="Timezone" value="(GMT+02:00) Oslo, Norway" icon={Globe} />
        <SettingsSelectField
          label="Default consultation type"
          value="In-person"
          icon={ClipboardList}
        />
      </div>
    </div>
  );
}
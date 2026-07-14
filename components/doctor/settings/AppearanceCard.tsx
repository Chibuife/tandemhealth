import { LayoutList, Sun } from "lucide-react";
import SettingsSelectField from "./SettingsSelectField";

export default function AppearanceCard() {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">Appearance</h3>
      <p className="mt-0.5 text-sm text-fg-muted">Customize how Tandem looks for you.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SettingsSelectField label="Theme" value="Light" icon={Sun} />
        <SettingsSelectField label="Sidebar density" value="Comfortable" icon={LayoutList} />
      </div>
    </div>
  );
}
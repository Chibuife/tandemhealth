import { ChevronDown, LucideIcon } from "lucide-react";

interface SettingsSelectFieldProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export default function SettingsSelectField({ label, value, icon: Icon }: SettingsSelectFieldProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-fg-muted">{label}</label>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-border bg-white px-3 py-2.5 text-left text-sm text-fg hover:bg-bg-subtle"
      >
        <span className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-fg-muted" />
          {value}
        </span>
        <ChevronDown className="h-4 w-4 text-fg-muted" />
      </button>
    </div>
  );
}
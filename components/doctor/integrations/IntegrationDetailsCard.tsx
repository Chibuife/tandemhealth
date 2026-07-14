import { ChevronDown, Settings } from "lucide-react";
import { IntegrationDetail } from "@/lib/integrations/types";

interface IntegrationDetailsCardProps {
  detail: IntegrationDetail;
  onManageIntegration?: () => void;
}

export default function IntegrationDetailsCard({
  detail,
  onManageIntegration,
}: IntegrationDetailsCardProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Connected on", value: detail.connectedOn },
    { label: "Last sync", value: detail.lastSync },
    { label: "Next sync", value: detail.nextSync },
    { label: "Data synced", value: detail.dataSynced },
    { label: "Sync frequency", value: detail.syncFrequency },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Integration details</h3>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-fg hover:bg-bg-subtle"
        >
          All status
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${detail.logoClassName}`}
          >
            {detail.logoLabel}
          </span>
          <div>
            <p className="text-sm font-medium text-fg">{detail.name}</p>
            <p className="text-sm text-fg-muted">{detail.description}</p>
          </div>
        </div>

        <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
          Connected
        </span>
      </div>

      <p className="mt-3 text-sm text-fg-muted">{detail.longDescription}</p>

      <dl className="mt-4 divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="max-w-[60%] text-right font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={onManageIntegration}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-fg hover:bg-bg-subtle"
      >
        <Settings className="h-4 w-4" />
        Manage integration
      </button>
    </div>
  );
}
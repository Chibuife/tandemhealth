import { MoreHorizontal } from "lucide-react";
import { Integration } from "@/lib/integrations/types";
import { ReactNode } from "react";

interface IntegrationRowProps {
  integration: Integration;
  actionSlot: ReactNode;
  onSelect?: (integration: Integration) => void;
}

export default function IntegrationRow({ integration, actionSlot, onSelect }: IntegrationRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <button
        type="button"
        onClick={() => onSelect?.(integration)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${integration.logoClassName}`}
        >
          {integration.logoLabel}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-fg">{integration.name}</span>
          <span className="block truncate text-sm text-fg-muted">{integration.description}</span>
        </span>
      </button>

      <div className="flex shrink-0 items-center gap-6">
        {integration.status === "connected" && (
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
              Connected
            </span>
            <span className="text-xs text-fg-muted">{integration.lastSyncLabel}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {actionSlot}
          <button
            type="button"
            aria-label={`More actions for ${integration.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted hover:bg-bg-subtle"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
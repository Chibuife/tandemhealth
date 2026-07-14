import { ArrowRight } from "lucide-react";
import { Integration } from "@/lib/integrations/types";
import IntegrationRow from "./IntegrationRow";

interface ConnectedIntegrationsListProps {
  integrations: Integration[];
  onSelectIntegration?: (integration: Integration) => void;
  onManage?: (integration: Integration) => void;
  onViewAll?: () => void;
}

export default function ConnectedIntegrationsList({
  integrations,
  onSelectIntegration,
  onManage,
  onViewAll,
}: ConnectedIntegrationsListProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-fg">Connected integrations</h3>

      <div className="mt-2 divide-y divide-border">
        {integrations.map((integration) => (
          <IntegrationRow
            key={integration.id}
            integration={integration}
            onSelect={onSelectIntegration}
            actionSlot={
              <button
                type="button"
                onClick={() => onManage?.(integration)}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-fg hover:bg-bg-subtle"
              >
                Manage
              </button>
            }
          />
        ))}

        {integrations.length === 0 && (
          <p className="py-6 text-center text-sm text-fg-muted">No connected integrations yet.</p>
        )}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
      >
        View all connected integrations
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
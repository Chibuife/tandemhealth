import { ArrowRight } from "lucide-react";
import { Integration } from "@/lib/integrations/types";
import IntegrationRow from "./IntegrationRow";

interface AvailableIntegrationsListProps {
  integrations: Integration[];
  onSelectIntegration?: (integration: Integration) => void;
  onConnect?: (integration: Integration) => void;
  onViewAll?: () => void;
}

export default function AvailableIntegrationsList({
  integrations,
  onSelectIntegration,
  onConnect,
  onViewAll,
}: AvailableIntegrationsListProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-fg">Available integrations</h3>

      <div className="mt-2 divide-y divide-border">
        {integrations.map((integration) => (
          <IntegrationRow
            key={integration.id}
            integration={integration}
            onSelect={onSelectIntegration}
            actionSlot={
              <button
                type="button"
                onClick={() => onConnect?.(integration)}
                className="px-1 text-sm font-medium text-blue-600 hover:underline"
              >
                Connect
              </button>
            }
          />
        ))}

        {integrations.length === 0 && (
          <p className="py-6 text-center text-sm text-fg-muted">No available integrations match your search.</p>
        )}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
      >
        View all available integrations
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
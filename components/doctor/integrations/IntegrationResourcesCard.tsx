import { AlertTriangle, ChevronRight, FileText, Webhook } from "lucide-react";
import { IntegrationResource } from "@/lib/integrations/types";

const RESOURCE_ICONS: Record<string, typeof FileText> = {
  guide: FileText,
  "api-docs": FileText,
  webhooks: Webhook,
  troubleshooting: AlertTriangle,
};

interface IntegrationResourcesCardProps {
  resources: IntegrationResource[];
}

export default function IntegrationResourcesCard({ resources }: IntegrationResourcesCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">Integration resources</h3>

      <div className="mt-2 divide-y divide-border">
        {resources.map((resource) => {
          const Icon = RESOURCE_ICONS[resource.id] ?? FileText;

          return (
            <button
              key={resource.id}
              type="button"
              className="flex w-full items-center justify-between gap-3 py-3 text-left hover:bg-bg-subtle"
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${resource.iconClassName}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">{resource.title}</span>
                  <span className="block text-sm text-fg-muted">{resource.description}</span>
                </span>
              </span>

              <ChevronRight className="h-4 w-4 shrink-0 text-fg-muted" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
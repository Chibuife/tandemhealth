"use client";

import { useMemo, useState } from "react";
import IntegrationsHeader from "@/components/doctor/integrations/IntegrationsHeader";
import IntegrationsStats from "@/components/doctor/integrations/IntegrationsStats";
import IntegrationsCategoryTabs from "@/components/doctor/integrations/IntegrationsCategoryTabs";
import ConnectedIntegrationsList from "@/components/doctor/integrations/ConnectedIntegrationsList";
import AvailableIntegrationsList from "@/components/doctor/integrations/AvailableIntegrationsList";
import IntegrationDetailsCard from "@/components/doctor/integrations/IntegrationDetailsCard";
import IntegrationResourcesCard from "@/components/doctor/integrations/IntegrationResourcesCard";
import CustomIntegrationBanner from "@/components/doctor/integrations/CustomIntegrationBanner";
import {
  availableIntegrations,
  connectedIntegrations,
  integrationResources,
  selectedIntegrationDetail,
} from "@/lib/integrations/mock-data";

const CATEGORIES = [
  "All",
  "EHR/EMR",
  "Practice management",
  "Communication",
  "Labs & imaging",
  "Payments",
  "Analytics",
  "Other",
] as const;

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filterIntegrations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return (list: typeof connectedIntegrations) =>
      list.filter((integration) => {
        const matchesCategory =
          activeCategory === "All" || integration.category === activeCategory;
        const matchesQuery =
          !query ||
          integration.name.toLowerCase().includes(query) ||
          integration.description.toLowerCase().includes(query);

        return matchesCategory && matchesQuery;
      });
  }, [searchQuery, activeCategory]);

  return (
    <div>
      <IntegrationsHeader searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      <IntegrationsStats />

      {/* Integration lists / detail sidebar: 7 / 5 on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-border bg-white p-5 lg:col-span-7">
          <IntegrationsCategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <div className="mt-4">
            <ConnectedIntegrationsList integrations={filterIntegrations(connectedIntegrations)} />
            <AvailableIntegrationsList integrations={filterIntegrations(availableIntegrations)} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <IntegrationDetailsCard detail={selectedIntegrationDetail} />
          <IntegrationResourcesCard resources={integrationResources} />
          <CustomIntegrationBanner />
        </div>
      </div>
    </div>
  );
}
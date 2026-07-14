"use client";

import { useState } from "react";

const TABS = [
  "General",
  "Account",
  "Practice",
  "Users & roles",
  "Notifications",
  "Security",
  "Billing",
  "API & webhooks",
] as const;

interface SettingsTabsProps {
  onTabChange?: (tab: (typeof TABS)[number]) => void;
}

export default function SettingsTabs({ onTabChange }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("General");

  const handleSelect = (tab: (typeof TABS)[number]) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="mb-5 flex gap-6 overflow-x-auto border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => handleSelect(tab)}
          className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
            activeTab === tab
              ? "border-lime-500 text-fg"
              : "border-transparent text-fg-muted hover:text-fg"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
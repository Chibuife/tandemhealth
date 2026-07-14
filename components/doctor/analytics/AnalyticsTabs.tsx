"use client";

import { useState } from "react";

const tabs = ["Overview", "Consultations", "Documentation", "Patients", "AI & automation", "Team"];

export default function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="mb-4 inline-flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive ? "bg-fg text-bg" : "text-muted-foreground hover:text-fg"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
"use client";

import { useState } from "react";
import clsx from "clsx";

const tabs = ["All tasks", "My tasks", "Assigned to me", "Completed"];

export default function TasksTabs() {
  const [activeTab, setActiveTab] = useState("All tasks");

  return (
    <div className="mb-4 flex gap-6 border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors",
              isActive ? "border-emerald-500 text-fg" : "border-transparent text-muted-foreground hover:text-fg",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
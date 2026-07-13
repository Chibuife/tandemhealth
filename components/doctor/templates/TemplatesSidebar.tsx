"use client";

import { useState } from "react";
import { FileText, ClipboardList } from "lucide-react";

const categories = [
  { name: "All templates", count: 24 },
  { name: "SOAP Notes", count: 8 },
  { name: "Consultation Notes", count: 6 },
  { name: "Referral Letters", count: 3 },
  { name: "Discharge Summaries", count: 2 },
  { name: "Care Plans", count: 2 },
  { name: "Patient Instructions", count: 2 },
  { name: "Other", count: 1 },
];

const tags = [
  { name: "cardiology", count: 5 },
  { name: "respiratory", count: 4 },
  { name: "follow-up", count: 3 },
  { name: "pediatrics", count: 2 },
  { name: "chronic care", count: 2 },
];

export default function TemplatesSidebar() {
  const [activeCategory, setActiveCategory] = useState("All templates");

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-2 px-2 text-sm font-semibold text-fg">Categories</h3>
        <ul className="space-y-1">
          {categories.map((category) => {
            const isActive = category.name === activeCategory;
            return (
              <li key={category.name}>
                <button
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm transition-colors ${
                    isActive ? "bg-emerald-50 font-medium text-emerald-700" : "text-fg hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category.name === "All templates" ? (
                      <ClipboardList className="h-4 w-4" />
                    ) : (
                      <FileText className="h-4 w-4" />
                    )}
                    {category.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{category.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-3 px-2 text-sm font-semibold text-fg">Tags</h3>
        <div className="flex flex-wrap gap-2 px-2">
          {tags.map((tag) => (
            <button
              key={tag.name}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-fg hover:bg-muted/70"
            >
              {tag.name} <span className="text-muted-foreground">{tag.count}</span>
            </button>
          ))}
        </div>
        <button className="mt-3 w-full rounded-lg border border-border px-2 py-2 text-sm font-medium text-fg hover:bg-muted">
          + View all tags
        </button>
      </div>
    </div>
  );
}
"use client";

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

interface IntegrationsCategoryTabsProps {
  activeCategory: (typeof CATEGORIES)[number];
  onCategoryChange: (category: (typeof CATEGORIES)[number]) => void;
}

export default function IntegrationsCategoryTabs({
  activeCategory,
  onCategoryChange,
}: IntegrationsCategoryTabsProps) {
  return (
    <div className="flex gap-6 overflow-x-auto border-b border-border">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onCategoryChange(category)}
          className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
            activeCategory === category
              ? "border-fg text-fg"
              : "border-transparent text-fg-muted hover:text-fg"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
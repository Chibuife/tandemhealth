"use client";

import { useState } from "react";
import { FileText, Eye, Copy, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryColor: string;
  tags: string[];
  updated: string;
  iconBg: string;
  iconColor: string;
};

const templates: Template[] = [
  {
    id: "1",
    name: "SOAP Note",
    description: "Standard SOAP note for general consultations",
    category: "SOAP Notes",
    categoryColor: "bg-emerald-50 text-emerald-700",
    tags: ["general", "adult", "+1"],
    updated: "12 May 2026",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "2",
    name: "Follow-up Consultation",
    description: "Template for follow-up patient consultations",
    category: "Consultation Notes",
    categoryColor: "bg-violet-50 text-violet-700",
    tags: ["follow-up", "chronic care"],
    updated: "10 May 2026",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: "3",
    name: "Referral Letter",
    description: "Standard referral to specialist",
    category: "Referral Letters",
    categoryColor: "bg-orange-50 text-orange-700",
    tags: ["general", "specialist"],
    updated: "9 May 2026",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "4",
    name: "Discharge Summary",
    description: "Hospital discharge summary template",
    category: "Discharge Summaries",
    categoryColor: "bg-blue-50 text-blue-700",
    tags: ["inpatient", "discharge"],
    updated: "7 May 2026",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "5",
    name: "Care Plan",
    description: "Patient care plan template",
    category: "Care Plans",
    categoryColor: "bg-pink-50 text-pink-700",
    tags: ["chronic care", "management"],
    updated: "6 May 2026",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    id: "6",
    name: "Pediatric Consultation",
    description: "Pediatric patient consultation template",
    category: "Consultation Notes",
    categoryColor: "bg-violet-50 text-violet-700",
    tags: ["pediatrics", "child"],
    updated: "4 May 2026",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: "7",
    name: "Patient Instructions",
    description: "Post-consultation patient instructions",
    category: "Patient Instructions",
    categoryColor: "bg-orange-50 text-orange-700",
    tags: ["education", "discharge"],
    updated: "3 May 2026",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    id: "8",
    name: "Telehealth Note",
    description: "Template for telemedicine consultations",
    category: "Consultation Notes",
    categoryColor: "bg-violet-50 text-violet-700",
    tags: ["telehealth", "virtual"],
    updated: "1 May 2026",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export default function TemplatesTable() {
  const [page, setPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="px-5 py-3 font-medium">Template name</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Tags</th>
              <th className="px-5 py-3 font-medium">Updated</th>
              <th className="px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${template.iconBg}`}>
                      <FileText className={`h-4 w-4 ${template.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-fg">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`rounded-md px-2 py-1 text-xs font-medium ${template.categoryColor}`}>
                    {template.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-muted px-2 py-1 text-xs text-fg">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">{template.updated}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="Preview">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="Duplicate">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="rounded-md p-1.5 hover:bg-muted hover:text-fg" aria-label="More actions">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">Showing 1 to 8 of 24 templates</p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`h-8 w-8 rounded-md text-sm font-medium ${
                page === n ? "bg-fg text-bg" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
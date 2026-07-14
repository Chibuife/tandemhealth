"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { label: "AI notes generated", value: 93, percent: "72.7%", color: "#10b981" },
  { label: "AI suggestions accepted", value: 24, percent: "18.8%", color: "#3b82f6" },
  { label: "AI suggestions edited", value: 8, percent: "6.3%", color: "#8b5cf6" },
  { label: "AI suggestions dismissed", value: 3, percent: "2.3%", color: "#f97316" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function AiUsageOverview() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">AI usage overview</h3>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius={45} outerRadius={65} startAngle={90} endAngle={-270}>
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-fg">{total}</span>
            <span className="text-xs text-muted-foreground">Notes</span>
          </div>
        </div>

        <ul className="w-full space-y-2">
          {data.map((entry) => (
            <li key={entry.label} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 text-fg">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.label}
              </span>
              <span className="shrink-0 text-muted-foreground">
                {entry.value} ({entry.percent})
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2.5 text-sm text-blue-700">
        <span>AI assistance used in 90% of consultations</span>
        <TrendingUp className="h-4 w-4" />
      </div>
    </div>
  );
}
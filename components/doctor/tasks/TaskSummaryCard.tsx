"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { label: "Pending", value: 14, percent: "58%", color: "#f97316" },
  { label: "In progress", value: 5, percent: "21%", color: "#3b82f6" },
  { label: "Completed", value: 5, percent: "21%", color: "#10b981" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function TaskSummaryCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Task summary</h3>
        <button className="text-sm font-medium text-emerald-700 hover:underline">View all</button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-28 w-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="label" innerRadius={35} outerRadius={54} startAngle={90} endAngle={-270}>
                {data.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-fg">{total}</span>
            <span className="text-xs text-muted-foreground">Total tasks</span>
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {data.map((entry) => (
            <li key={entry.label} className="flex items-center justify-between text-sm">
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
    </div>
  );
}
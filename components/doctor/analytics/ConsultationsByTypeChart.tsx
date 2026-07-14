"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { label: "In-person", value: 78, percent: "54.9%", color: "#10b981" },
  { label: "Virtual", value: 42, percent: "29.6%", color: "#3b82f6" },
  { label: "Follow-up", value: 16, percent: "11.3%", color: "#8b5cf6" },
  { label: "Phone", value: 6, percent: "4.2%", color: "#f97316" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

export default function ConsultationsByTypeChart() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold text-fg">Consultations by type</h3>

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
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
        </div>

        <ul className="w-full space-y-2">
          {data.map((entry) => (
            <li key={entry.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-fg">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.label}
              </span>
              <span className="text-muted-foreground">
                {entry.value} ({entry.percent})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
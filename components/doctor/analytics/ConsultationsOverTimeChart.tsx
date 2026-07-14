"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "12 May", thisPeriod: 20, previousPeriod: 14 },
  { day: "13 May", thisPeriod: 26, previousPeriod: 19 },
  { day: "14 May", thisPeriod: 22, previousPeriod: 13 },
  { day: "15 May", thisPeriod: 26, previousPeriod: 19 },
  { day: "16 May", thisPeriod: 33, previousPeriod: 15 },
  { day: "17 May", thisPeriod: 23, previousPeriod: 17 },
  { day: "18 May", thisPeriod: 38, previousPeriod: 19 },
];

export default function ConsultationsOverTimeChart() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Consultations over time</h3>
        <button className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-fg hover:bg-muted">
          Daily
        </button>
      </div>

      <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          This period
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          Previous period
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f2" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Line
              type="monotone"
              dataKey="previousPeriod"
              stroke="#cbd5e1"
              strokeWidth={2}
              dot={{ r: 3, fill: "#cbd5e1", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="thisPeriod"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
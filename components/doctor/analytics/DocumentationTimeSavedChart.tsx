"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { day: "12 May", hours: 15 },
  { day: "13 May", hours: 17 },
  { day: "14 May", hours: 19 },
  { day: "15 May", hours: 21 },
  { day: "16 May", hours: 20 },
  { day: "17 May", hours: 24 },
  { day: "18 May", hours: 26.4 },
];

export default function DocumentationTimeSavedChart() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Documentation time saved</h3>
        <button className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-fg hover:bg-muted">
          This week
        </button>
      </div>

      <p className="mb-1 text-2xl font-semibold text-fg">
        26.4 <span className="text-base font-normal text-muted-foreground">hrs</span>
      </p>
      <p className="mb-3 text-xs text-muted-foreground">Total time saved</p>

      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="timeSavedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} interval={data.length - 2} />
            <YAxis hide domain={[0, "dataMax + 5"]} />
            <Area type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} fill="url(#timeSavedGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
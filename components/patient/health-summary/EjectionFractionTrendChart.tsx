'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EjectionFractionPoint } from '@/types/patient';

interface EjectionFractionTrendChartProps {
  data: EjectionFractionPoint[];
}

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: Array<{ value: number }>;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-medium text-fg">{label}</p>
      <p className="flex items-center gap-1.5 text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
        {payload[0].value}%
      </p>
    </div>
  );
}

export function EjectionFractionTrendChart({ data }: EjectionFractionTrendChartProps) {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold text-fg">Ejection fraction trend</h3>
          <p className="text-sm text-muted-foreground">Your heart pumping strength over time.</p>
        </div>
        <button className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-fg hover:bg-muted">
          Past 12 months
        </button>
      </div>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f2" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[40, 70]}
              ticks={[40, 50, 60, 70]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={{ r: 4, fill: '#7c3aed', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EjectionFractionTrendChart;
'use client';

import { AudioQualityMetrics, QualityLevel } from '@/types/patient';
import clsx from 'clsx';
import { Badge } from '../Badge';
import Card from '../Card';


interface Props {
  metrics: AudioQualityMetrics;
}

function StatusTag({ level }: { level: QualityLevel }) {
  const variant = level === 'Good' ? 'live' : 'neutral';
  return <Badge label={level} variant={variant} />;
}

function MetricTile({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: QualityLevel;
}) {
  return (
    <div className="mr-[2%] mb-3 w-[48%] rounded-[10px] bg-bg p-3">
      <p className="mb-1 text-[11px] text-muted">{label}</p>
      <div className="flex items-center justify-between">
        <p className="text-base font-bold text-ink">{value}</p>
        <StatusTag level={status} />
      </div>
    </div>
  );
}

export function AudioQualityCard({ metrics }: Props) {
  return (
    <Card className="flex-1">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">Audio quality</h2>
        <StatusTag level={metrics.overallQuality} />
      </div>

      <div className="flex flex-wrap">
        <MetricTile label="Latency" value={`${metrics.latencyMs} ms`} status={metrics.latencyStatus} />
        <MetricTile label="Packet loss" value={`${metrics.packetLossPct}%`} status={metrics.packetLossStatus} />
        <MetricTile label="Jitter" value={`${metrics.jitterMs} ms`} status={metrics.jitterStatus} />
        <div className="mr-[2%] mb-3 w-[48%] rounded-[10px] bg-bg p-3">
          <p className="mb-1 text-[11px] text-muted">Connection</p>
          <p className="text-base font-bold text-ink">{metrics.connectionStatus}</p>
        </div>
      </div>

      <div className="my-2 h-px bg-divider" />

      <div className="flex items-center justify-between py-2.5">
        <p className="text-[11px] text-muted">Microphone</p>
        <p className="text-xs font-semibold text-ink">{metrics.microphoneName}</p>
      </div>

      <div className="flex items-center justify-between py-2.5">
        <p className="text-[11px] text-muted">Audio level</p>
        <div className="flex items-end gap-[3px]">
          {[1, 2, 3, 4, 5].map((bar) => (
            <span
              key={bar}
              className={clsx(
                'w-[3px] rounded-sm',
                bar <= metrics.audioLevelBars ? 'bg-live' : 'bg-divider',
              )}
              style={{ height: `${6 + bar * 3}px` }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AudioQualityCard;

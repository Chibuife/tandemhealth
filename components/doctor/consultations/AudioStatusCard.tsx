'use client';

import { Wifi } from 'lucide-react';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import { AudioStatusMetrics } from '@/types';

interface Props {
  metrics: AudioStatusMetrics;
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="mr-[2%] mb-3 w-[48%] rounded-[10px] bg-bg p-3">
      <p className="mb-1 text-[11px] text-muted">{label}</p>
      <p className="text-base font-bold text-ink">{value}</p>
    </div>
  );
}

export function AudioStatusCard({ metrics }: Props) {
  const bars = [6, 9, 12, 15, 18];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">Audio status</h2>
        <Badge label={metrics.audioQuality} variant="live" />
      </div>

      <div className="flex flex-wrap">
        <MetricTile label="Latency" value={`${metrics.latencyMs} ms`} />
        <MetricTile label="Packet loss" value={`${metrics.packetLossPct}%`} />
        <MetricTile label="Jitter" value={`${metrics.jitterMs} ms`} />
        <MetricTile label="Bitrate" value={`${metrics.bitrateKbps} kbps`} />
      </div>

      <div className="my-2 h-px bg-divider" />

      <div className="flex items-center justify-between py-2.5">
        <div>
          <p className="mb-1 text-[11px] text-muted">Microphone</p>
          <p className="text-base font-bold text-ink">{metrics.microphoneName}</p>
        </div>
        <div className="flex items-center">
          <Wifi size={14} className="mr-1 text-live" />
          <span className="text-xs font-semibold text-ink">
            {metrics.microphoneConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between py-2.5">
        <p className="text-[11px] text-muted">Audio quality</p>
        <div className="flex items-center">
          <div className="flex items-end">
            {bars.map((h, i) => (
              <span
                key={i}
                className="mr-[2px] w-[3px] rounded-sm bg-live"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="ml-2 text-xs font-semibold text-ink">{metrics.audioQuality}</span>
        </div>
      </div>
    </Card>
  );
}

export default AudioStatusCard;
'use client';

import { Mic, Video, Wifi } from 'lucide-react';
import { Card } from '../../Card';
import { Badge } from '../../Badge';
import type { ConnectionStats } from '@/hooks/useConnectionStats';

interface Props {
  stats: ConnectionStats;
  microphoneName?: string;
  microphoneConnected?: boolean;
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 w-[23%] rounded-[10px] bg-bg p-3">
      <p className="mb-1 text-[11px] text-muted">{label}</p>
      <p className="text-base font-bold text-ink">{value}</p>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</span>
      <div className="h-px flex-1 bg-divider" />
    </div>
  );
}

function QualityBars({ quality }: { quality: ConnectionStats['quality'] }) {
  const levels = { Excellent: 5, Good: 4, Fair: 3, Poor: 1 } as const;
  const active  = levels[quality];
  const bars    = [6, 9, 12, 15, 18];
  const colours = {
    Excellent: 'bg-live',
    Good:      'bg-live',
    Fair:      'bg-yellow-400',
    Poor:      'bg-red-500',
  } as const;

  return (
    <div className="flex items-end gap-[2px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm ${i < active ? colours[quality] : 'bg-border'}`}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

const qualityVariant: Record<ConnectionStats['quality'], 'live' | 'lime' | 'neutral' | undefined> = {
  Excellent: 'live',
  Good:      'lime',
  Fair:      'neutral',
  Poor:      undefined,
};

export function AudioStatusCard({
  stats,
  microphoneName = 'Default microphone',
  microphoneConnected = true,
}: Props) {
  return (
    <Card>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">Connection status</h2>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted">RTT {stats.rttMs} ms</span>
          <Badge label={stats.quality} variant={qualityVariant[stats.quality]} />
        </div>
      </div>

      {/* Network overview */}
      <SectionDivider label="Network" />
      <div className="mb-2 flex flex-wrap gap-[2%]">
        <MetricTile label="Round-trip time" value={`${stats.rttMs} ms`} />
        <MetricTile label="Uplink"          value={`${stats.uplinkKbps} kbps`} />
        <MetricTile label="Downlink"        value={`${stats.downlinkKbps} kbps`} />
      </div>

      {/* Audio */}
      <SectionDivider label="Audio" />
      <div className="mb-2 flex flex-wrap gap-[2%]">
        <MetricTile label="Latency"     value={`${stats.audioLatencyMs} ms`} />
        <MetricTile label="Jitter"      value={`${stats.audioJitterMs} ms`} />
        <MetricTile label="Packet loss" value={`${stats.audioPacketLoss}%`} />
        <MetricTile label="Bitrate"     value={`${stats.audioBitrateKbps} kbps`} />
      </div>

      {/* Video */}
      <SectionDivider label="Video" />
      <div className="mb-4 flex flex-wrap gap-[2%]">
        <MetricTile label="Latency"     value={`${stats.videoLatencyMs} ms`} />
        <MetricTile label="Jitter"      value={`${stats.videoJitterMs} ms`} />
        <MetricTile label="Packet loss" value={`${stats.videoPacketLoss}%`} />
        <MetricTile label="Bitrate"     value={`${stats.videoBitrateKbps} kbps`} />
        <MetricTile label="Frame rate"  value={`${stats.videoFrameRate} fps`} />
        <MetricTile label="Resolution"  value={stats.videoResolution} />
      </div>

      <div className="my-2 h-px bg-divider" />

      {/* Microphone row */}
      <div className="flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2">
          <Mic size={14} className="text-muted" />
          <div>
            <p className="text-[11px] text-muted">Microphone</p>
            <p className="text-sm font-bold text-ink">{microphoneName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Wifi size={14} className={microphoneConnected ? 'text-live' : 'text-red-500'} />
          <span className="text-xs font-semibold text-ink">
            {microphoneConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Audio quality bar row */}
      <div className="flex items-center justify-between py-2.5">
        <div className="flex items-center gap-2">
          <Video size={14} className="text-muted" />
          <p className="text-[11px] text-muted">Overall quality</p>
        </div>
        <div className="flex items-center gap-2">
          <QualityBars quality={stats.quality} />
          <span className="text-xs font-semibold text-ink">{stats.quality}</span>
        </div>
      </div>
    </Card>
  );
}

export default AudioStatusCard;
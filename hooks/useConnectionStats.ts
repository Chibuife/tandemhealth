// src/hooks/useConnectionStats.ts
import { useEffect, useState } from 'react';
import { Room } from 'livekit-client';

export interface ConnectionStats {
    // Audio
    audioLatencyMs: number;
    audioJitterMs: number;
    audioPacketLoss: number;   // percentage 0–100
    audioBitrateKbps: number;

    // Video
    videoLatencyMs: number;
    videoJitterMs: number;
    videoPacketLoss: number;   // percentage 0–100
    videoBitrateKbps: number;
    videoFrameRate: number;
    videoResolution: string;   // e.g. "1280×720"

    // Network
    rttMs: number;   // round-trip time (most reliable latency signal)
    uplinkKbps: number;
    downlinkKbps: number;

    // Quality label derived from RTT + packet loss
    quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

const EMPTY: ConnectionStats = {
    audioLatencyMs: 0,
    audioJitterMs: 0,
    audioPacketLoss: 0,
    audioBitrateKbps: 0,
    videoLatencyMs: 0,
    videoJitterMs: 0,
    videoPacketLoss: 0,
    videoBitrateKbps: 0,
    videoFrameRate: 0,
    videoResolution: '—',
    rttMs: 0,
    uplinkKbps: 0,
    downlinkKbps: 0,
    quality: 'Good',
};

function deriveQuality(rtt: number, packetLoss: number): ConnectionStats['quality'] {
    if (rtt < 80 && packetLoss < 1) return 'Excellent';
    if (rtt < 150 && packetLoss < 3) return 'Good';
    if (rtt < 300 && packetLoss < 8) return 'Fair';
    return 'Poor';
}

const round = (n: number, dp = 1) => Math.round(n * 10 ** dp) / 10 ** dp;
// Describes only the internal shape we actually access — nothing more.


interface LiveKitRoomInternal {
    engine?: {
        publisher?: { pc?: RTCPeerConnection };
        pcManager?: { publisher?: { pc?: RTCPeerConnection } };
    };
}


export function useConnectionStats(room: Room | null, intervalMs = 2000): ConnectionStats {
    const [stats, setStats] = useState<ConnectionStats>(EMPTY);

    useEffect(() => {
        if (!room) return;

        const collect = async () => {
            try {
                // LiveKit exposes per-sender/receiver stats via the underlying RTCPeerConnection
                const internal = room as unknown as LiveKitRoomInternal;
                const engine = internal.engine;
                if (!engine) return;

                const pc: RTCPeerConnection | undefined =
                    engine.publisher?.pc ?? engine.pcManager?.publisher?.pc;

                if (!pc) return;

                const reports = await pc.getStats();

                let audioJitter = 0, audioLoss = 0, audioBitrate = 0, audioRtt = 0;
                let videoJitter = 0, videoLoss = 0, videoBitrate = 0, videoRtt = 0;
                let videoFps = 0, videoW = 0, videoH = 0;
                let totalUplink = 0, totalDownlink = 0;

                reports.forEach((report) => {
                    // Outbound (uplink) — what we're sending
                    if (report.type === 'outbound-rtp') {
                        const bps = (report.bytesSent ?? 0) * 8 / (intervalMs / 1000);
                        totalUplink += bps / 1000;

                        if (report.kind === 'audio') audioBitrate = round(bps / 1000);
                        if (report.kind === 'video') {
                            videoBitrate = round(bps / 1000);
                            videoFps = report.framesPerSecond ?? 0;
                            videoW = report.frameWidth ?? 0;
                            videoH = report.frameHeight ?? 0;
                        }
                    }

                    // Inbound (downlink) — what we're receiving
                    if (report.type === 'inbound-rtp') {
                        const bps = (report.bytesReceived ?? 0) * 8 / (intervalMs / 1000);
                        totalDownlink += bps / 1000;

                        if (report.kind === 'audio') {
                            audioJitter = round((report.jitter ?? 0) * 1000);
                            const lost = report.packetsLost ?? 0;
                            const recv = (report.packetsReceived ?? 0) + lost;
                            audioLoss = recv > 0 ? round((lost / recv) * 100) : 0;
                        }

                        if (report.kind === 'video') {
                            videoJitter = round((report.jitter ?? 0) * 1000);
                            const lost = report.packetsLost ?? 0;
                            const recv = (report.packetsReceived ?? 0) + lost;
                            videoLoss = recv > 0 ? round((lost / recv) * 100) : 0;
                        }
                    }

                    // RTT from candidate-pair (most accurate latency source)
                    if (
                        report.type === 'candidate-pair' &&
                        report.state === 'succeeded' &&
                        report.currentRoundTripTime != null
                    ) {
                        const rtt = round(report.currentRoundTripTime * 1000);
                        audioRtt = rtt;
                        videoRtt = rtt;
                    }
                });

                const rtt = audioRtt || videoRtt;

                setStats({
                    audioLatencyMs: rtt,
                    audioJitterMs: audioJitter,
                    audioPacketLoss: audioLoss,
                    audioBitrateKbps: audioBitrate,

                    videoLatencyMs: rtt,
                    videoJitterMs: videoJitter,
                    videoPacketLoss: videoLoss,
                    videoBitrateKbps: videoBitrate,
                    videoFrameRate: round(videoFps, 0),
                    videoResolution: videoW && videoH ? `${videoW}×${videoH}` : '—',

                    rttMs: rtt,
                    uplinkKbps: round(totalUplink),
                    downlinkKbps: round(totalDownlink),

                    quality: deriveQuality(rtt, Math.max(audioLoss, videoLoss)),
                });
            } catch {
                // getStats() can throw if the PC is closed — ignore
            }
        };

        collect(); // run immediately
        const id = setInterval(collect, intervalMs);
        return () => clearInterval(id);
    }, [room, intervalMs]);

    return stats;
}


'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, RoomEvent } from 'livekit-client';
import axios from 'axios';
import { PatientConsultationHeader } from '@/components/patient/consultation/PatientConsultationHeader';
import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
import { ChatPanel } from '@/components/patient/consultation/ChatPanel';
import { ConsultationSummaryCard } from '@/components/patient/consultation/ConsultationSummaryCard';
import { PatientAIClinicalNoteCard } from '@/components/patient/consultation/PatientAIClinicalNoteCard';
import { DocumentsCard } from '@/components/patient/consultation/DocumentsCard';
import { useConnectionStats } from '@/hooks/useConnectionStats';
import {
  fetchConsultationById,
  getConsultationJoinToken,
} from '@/lib/api/consultations';
import type { TranscriptEntry } from '@/types';
import type { CallParticipant } from '@/types/patient';
import type { Participant, LocalParticipant, RemoteParticipant } from 'livekit-client';
import { VideoCallPanel } from '@/components/VideoCallPanel';

const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

const colorForIdentity = (identity: string) => {
  const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const toCallParticipant = (
  participant: Participant | LocalParticipant | RemoteParticipant,
  isLocal: boolean
): CallParticipant => {
  const videoPublication = Array.from(participant.videoTrackPublications.values())[0];
  return {
    id: participant.identity,
    displayName: participant.name || participant.identity,
    avatarColor: colorForIdentity(participant.identity),
    micActive: participant.isMicrophoneEnabled,
    videoTrack: videoPublication?.track ?? undefined,
    isLocal,
  };
};

const formatElapsed = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatClockTime = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// ─── Transcript types ─────────────────────────────────────────────────────────

type TranscriptRole = 'doctor' | 'patient' | 'unknown';


const PLACEHOLDER_PARTICIPANTS: CallParticipant[] = [
  {
    id:          'placeholder-patient',
    displayName: 'Waiting for patient to join…',
    avatarColor: '#94a3b8',
    micActive:   false,
    videoTrack:  undefined,
    isLocal:     false,
  },
];


interface TranscriptDataMessage {
  type: 'transcript';
  role: TranscriptRole;
  identity: string;
  text: string;
  final: boolean;
  overlap?: boolean;
  timestamp: number;
}

function isTranscriptMessage(value: unknown): value is TranscriptDataMessage {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    v.type === 'transcript' &&
    typeof v.text === 'string' &&
    typeof v.final === 'boolean' &&
    typeof v.timestamp === 'number' &&
    (v.role === 'doctor' || v.role === 'patient' || v.role === 'unknown')
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PatientConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const roomRef = useRef<Room | null>(null);
  const callStartRef = useRef<number | null>(null);
  const listenersAttachedRef = useRef(false);
  const entryIdRef = useRef(0);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [clinicianName, setClinicianName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isConnecting, setIsConnecting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);

  const [liveParticipants, setLiveParticipants] = useState<CallParticipant[]>([]);
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

  const [micName, setMicName] = useState('Default microphone');
  const [micConnected, setMicConnected] = useState(false);

  const [liveRoom, setLiveRoom] = useState<Room | null>(null);
  const connectionStats = useConnectionStats(liveRoom);

  // ─── Participants + mic sync ──────────────────────────────────────────────

  const refreshParticipants = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;
    const local = toCallParticipant(room.localParticipant, true);
    const remote = Array.from(room.remoteParticipants.values()).map((p) =>
      toCallParticipant(p, false)
    );
    setLiveParticipants([local, ...remote]);

    const localParticipant = room.localParticipant;
    if (localParticipant) {
      setMicName(localParticipant.name || 'Default microphone');
      setMicConnected(localParticipant.isMicrophoneEnabled);
    }
  }, []);

  // ─── Data fetching ────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false;
    callStartRef.current = null;

    const load = async () => {
      try {
        const record = await fetchConsultationById(id);
        if (cancelled) return;
        setClinicianName(record.doctorName ?? '');
        setSlug(record.slug);
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Failed to load consultation');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    };
  }, [id]);

  // ─── LiveKit room ─────────────────────────────────────────────────────────

  const joinCall = async () => {
    setJoinError(null);
    setIsConnecting(true);

    try {
      const { token, livekitUrl } = await getConsultationJoinToken(slug, 'patient');

      const room = roomRef.current ?? new Room();
      roomRef.current = room;

      if (!listenersAttachedRef.current) {
        room.on(RoomEvent.Connected, () => {
          callStartRef.current = Date.now();
          setIsLive(true);
          setHasJoined(true);
          setLiveRoom(room);
          refreshParticipants();
        });

        room.on(RoomEvent.Disconnected, () => {
          setIsLive(false);
          setHasJoined(false);
          setLiveRoom(null);
          setLiveParticipants([]);
          setMicConnected(false);
        });

        room.on(RoomEvent.ParticipantConnected, refreshParticipants);
        room.on(RoomEvent.ParticipantDisconnected, refreshParticipants);
        room.on(RoomEvent.TrackSubscribed, refreshParticipants);
        room.on(RoomEvent.TrackUnsubscribed, refreshParticipants);
        room.on(RoomEvent.TrackMuted, refreshParticipants);
        room.on(RoomEvent.TrackUnmuted, refreshParticipants);
        room.on(RoomEvent.LocalTrackPublished, refreshParticipants);
        room.on(RoomEvent.LocalTrackUnpublished, refreshParticipants);

        room.on(RoomEvent.DataReceived, (payload: Uint8Array, _participant, _kind, topic) => {
          let parsed: unknown;
          try {
            parsed = JSON.parse(new TextDecoder().decode(payload));
          } catch {
            return;
          }

          if (topic === 'transcript' || topic === undefined) {
            if (!isTranscriptMessage(parsed) || !parsed.final) return;
            const message = parsed;

            setTranscriptEntries((prev) => {
              const alreadyExists = prev.some(
                (e) =>
                  e.text === message.text &&
                  e.timestamp === formatClockTime(message.timestamp)
              );
              if (alreadyExists) return prev;

              return [
                ...prev,
                {
                  id: `t-${entryIdRef.current++}`,
                  timestamp: formatClockTime(message.timestamp),
                  speaker:
                    message.role === 'doctor' ? 'Doctor'
                      : message.role === 'patient' ? 'Patient'
                        : 'Unknown',
                  speakerType: message.role === 'doctor' ? 'doctor' : 'patient',
                  text: message.text,
                },
              ];
            });
          }
        });

        listenersAttachedRef.current = true;
      }

      await room.connect(livekitUrl, token);
      await room.localParticipant.enableCameraAndMicrophone();
      refreshParticipants();
    } catch (err) {
      console.error(err);
      setJoinError(err instanceof Error ? err.message : 'Failed to join consultation');
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    } finally {
      setIsConnecting(false);
    }
  };

  // ─── Leave ────────────────────────────────────────────────────────────────

  const leaveCall = useCallback(() => {
    roomRef.current?.disconnect();
    roomRef.current = null;
    listenersAttachedRef.current = false;
    setIsLive(false);
    setHasJoined(false);
    setLiveRoom(null);
    setLiveParticipants([]);
    setMicConnected(false);
    setMeetingEnded(true);
    router.push('/dashboard/patient/consultations');
  }, [router]);

  // ─── Timers ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLive || callStartRef.current === null) return;
    const tick = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [isLive]);

  // ─── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading consultation…
      </div>
    );
  }

  const consultationInfo = {
    clinicianName,
    isLive,
    elapsedTime: formatElapsed(elapsedSeconds),
  };

  const showContent = !joinError && !meetingEnded;

  return (
    <>
      {meetingEnded && (
        <div
          role="status"
          className="mb-4 w-full rounded-md bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          This consultation has ended.
        </div>
      )}

      {loadError && (
        <div
          role="alert"
          className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
        >
          {loadError}
        </div>
      )}

      <PatientConsultationHeader
        info={consultationInfo}
        onJoin={joinCall}
        onLeave={leaveCall}
        isConnecting={isConnecting}
        hasJoined={hasJoined}
        meetingEnded={meetingEnded}
      />

      {joinError && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {joinError}
        </div>
      )}

      {showContent && (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <VideoCallPanel participants={hasJoined ? liveParticipants : PLACEHOLDER_PARTICIPANTS} room={liveRoom} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <LiveTranscriptCard entries={transcriptEntries} />
                <AudioStatusCard
                  stats={connectionStats}
                  microphoneName={micName}
                  microphoneConnected={micConnected}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}









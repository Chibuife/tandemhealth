
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, RoomEvent } from 'livekit-client';
import { ConsultationHeader } from '@/components/doctor/consultations/ConsultationHeader';
import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
import { AIClinicalNoteCard } from '@/components/doctor/consultations/AIClinicalNoteCard';
import { ConsultationTimelineCard } from '@/components/doctor/consultations/ConsultationTimelineCard';
import { Icd10CodesCard } from '@/components/doctor/consultations/Icd10CodesCard';
import { ClinicalShortcutsCard } from '@/components/doctor/consultations/ClinicalShortcutsCard';
import { AIClinicalAssistantCard } from '@/components/doctor/consultations/AIClinicalAssistantCard';
import { VideoCallPanel } from '@/components/VideoCallPanel';

import {
  assistantMessages,
  audioStatus,
  clinicalShortcuts,
  icd10Suggestions,
  soapNote,
  timelineEvents,
  transcript,
} from '@/data/demoData';
import { callParticipants } from '@/data/patientDemoData'; // fallback before joining
import {
  fetchConsultationById,
  getConsultationJoinToken,
  endConsultationMeeting,
} from '@/lib/api/consultations';
import type { Consultation } from '@/types';
import type { CallParticipant } from '@/types/patient';
import type { Participant, RemoteParticipant, LocalParticipant } from 'livekit-client';

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

export default function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const roomRef = useRef<Room | null>(null);
  const callStartRef = useRef<number | null>(null);
  // Guards against attaching RoomEvent listeners more than once per Room instance.
  const listenersAttachedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  // Page-level error: consultation record failed to load. Rendering this
  // replaces the whole page, so it must never be set by an in-call failure.
  const [loadError, setLoadError] = useState<string | null>(null);
  // Call-level error: joining/connecting to the room failed. Rendered as an
  // inline banner so the rest of the page (header, cards, demo data) stays visible.
  const [joinError, setJoinError] = useState<string | null>(null);

  const [patientName, setPatientName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  // Once true, the meeting is over: no early return, just a persistent
  // banner and both Start/End controls disabled.
  const [meetingEnded, setMeetingEnded] = useState(false);

  // Live participants built from the actual Room, shown once joined.
  // Falls back to the static demo data before joining, so the layout
  // still has something to show on first paint.
  const [liveParticipants, setLiveParticipants] = useState<CallParticipant[]>([]);

  const refreshParticipants = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;

    const local = toCallParticipant(room.localParticipant, true);
    const remote = Array.from(room.remoteParticipants.values()).map((p) =>
      toCallParticipant(p, false)
    );

    setLiveParticipants([local, ...remote]);
  }, []);

  // Load the consultation record only - NOT the LiveKit token. The token
  // has a short TTL (10m) and, more importantly, the backend flips the
  // meeting to "live" and notifies the other participant the moment a
  // token is issued - so it must only be requested when the doctor
  // actually clicks join (see joinCall below), not just from opening
  // this page.
  useEffect(() => {
    let cancelled = false;

    // Reset all per-consultation state up front so nothing from a
    // previously viewed consultation (e.g. a stale "meeting ended"
    // banner) leaks into this one while the new data loads.
    // setLoading(true);
    // setLoadError(null);
    // setJoinError(null);
    // setPatientName('');
    // setSlug('');
    // setIsLive(false);
    // setElapsedSeconds(0);
    // setIsConnecting(false);
    // setIsEnding(false);
    // setHasJoined(false);
    // setMeetingEnded(false);
    // setLiveParticipants([]);
    callStartRef.current = null;

    const load = async () => {
      try {
        const record = await fetchConsultationById(id);
        if (cancelled) return;
        setPatientName(record.patientName);
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

  // Manually join the LiveKit room: fetches a fresh token right now (not
  // one grabbed on page load, which could be stale by the time the doctor
  // clicks) and connects. Safe to call again after a failed attempt:
  // reuses the same Room instance but only ever attaches the
  // Connected/Disconnected listeners once.
  const joinCall = async () => {
    // if (hasJoined || isConnecting || meetingEnded || !slug) return;

    setJoinError(null);
    setIsConnecting(true);

    try {
      const role ="doctor"
      const { token, livekitUrl } = await getConsultationJoinToken(slug, role);

      const room = roomRef.current ?? new Room();
      roomRef.current = room;

      if (!listenersAttachedRef.current) {
        room.on(RoomEvent.Connected, () => {
          callStartRef.current = Date.now();
          setIsLive(true);
          setHasJoined(true);
          refreshParticipants();
        });

        room.on(RoomEvent.Disconnected, () => {
          setIsLive(false);
          setHasJoined(false);
          setLiveParticipants([]);
        });

        // Any of these change what should be rendered in a video tile
        // (a participant joining/leaving, their camera track becoming
        // available, or their mic mute state changing) - just rebuild
        // the whole list rather than tracking each field individually.
        room.on(RoomEvent.ParticipantConnected, refreshParticipants);
        room.on(RoomEvent.ParticipantDisconnected, refreshParticipants);
        room.on(RoomEvent.TrackSubscribed, refreshParticipants);
        room.on(RoomEvent.TrackUnsubscribed, refreshParticipants);
        room.on(RoomEvent.TrackMuted, refreshParticipants);
        room.on(RoomEvent.TrackUnmuted, refreshParticipants);
        room.on(RoomEvent.LocalTrackPublished, refreshParticipants);
        room.on(RoomEvent.LocalTrackUnpublished, refreshParticipants);

        listenersAttachedRef.current = true;
      }

      await room.connect(livekitUrl, token);
      await room.localParticipant.enableCameraAndMicrophone();
      refreshParticipants();
    } catch (err) {
      console.error(err);
      setJoinError(
        err instanceof Error ? err.message : 'Failed to join consultation'
      );
      // Drop the failed room so the next attempt starts clean rather than
      // retrying a connection that's already in a bad state.
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Elapsed-time ticker, only runs once actually connected.
  useEffect(() => {
    if (!isLive || callStartRef.current === null) return;

    const tick = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
    }, 1000);

    return () => clearInterval(tick);
  }, [isLive]);

  // Ends the meeting in place: no navigation. The page stays mounted and
  // shows a persistent red banner, with the toggle button disabled.
  const handleEndConsultation = useCallback(async () => {
    if (!slug || isEnding || meetingEnded) return;

    setIsEnding(true);
    try {
      await endConsultationMeeting(slug);
    } catch (err) {
      console.error('Failed to end consultation', err);
    } finally {
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
      setIsLive(false);
      setHasJoined(false);
      setLiveParticipants([]);
      setMeetingEnded(true);
      setIsEnding(false);
    }
  }, [slug, isEnding, meetingEnded]);

  if (loading) {
    return <div className="py-12 text-center text-sm text-gray-500">Loading consultation details…</div>;
  }

  const consultation: Consultation = {
    patientName,
    isLive,
    elapsedTime: formatElapsed(elapsedSeconds),
  } as Consultation;

  return (
    <>
      {loadError && (
        <div
          role="alert"
          className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
        >
          {loadError}
        </div>
      )}

      {meetingEnded && (
        <div
          role="status"
          className="mb-4 w-full rounded-md bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          This meeting has ended.
        </div>
      )}

      <ConsultationHeader
        consultation={consultation}
        onStart={joinCall}
        onEnd={handleEndConsultation}
        isConnecting={isConnecting || isEnding}
        hasJoined={hasJoined}
        meetingEnded={meetingEnded}
      />

      {joinError && (
        <div role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {joinError}
        </div>
      )}

      {/* Row 1: video + transcript (left, 2 cols) + AI clinical note (right, 1 col) */}
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <VideoCallPanel participants={hasJoined ? liveParticipants : callParticipants} />
          <LiveTranscriptCard entries={transcript} />
        </div>
        <AIClinicalNoteCard note={soapNote} />
      </div>

      {/* Row 2: audio status */}
      <div className="mb-4">
        <AudioStatusCard metrics={audioStatus} />
      </div>

      {/* Row 3: timeline, ICD-10 codes, shortcuts */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ConsultationTimelineCard events={timelineEvents} />
        <Icd10CodesCard suggestions={icd10Suggestions} />
        <ClinicalShortcutsCard shortcuts={clinicalShortcuts} />
      </div>

      {/* Row 4: AI clinical assistant */}
      <AIClinicalAssistantCard messages={assistantMessages} />
    </>
  );
}
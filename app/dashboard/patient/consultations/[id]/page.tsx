
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, RoomEvent } from 'livekit-client';
import { PatientConsultationHeader } from '@/components/patient/consultation/PatientConsultationHeader';
import { VideoCallPanel } from '@/components/VideoCallPanel';
import { TranscriptCard } from '@/components/patient/consultation/TranscriptCard';
import { AudioQualityCard } from '@/components/patient/consultation/AudioQualityCard';
import { ChatPanel } from '@/components/patient/consultation/ChatPanel';
import { ConsultationSummaryCard } from '@/components/patient/consultation/ConsultationSummaryCard';
import { PatientAIClinicalNoteCard } from '@/components/patient/consultation/PatientAIClinicalNoteCard';
import { DocumentsCard } from '@/components/patient/consultation/DocumentsCard';

import {
  audioQuality,
  chatMessages,
  consultationDocuments,
  consultationSummary,
  soapNote,
  transcript,
} from '@/data/patientDemoData';
import {
  fetchConsultationById,
  getConsultationJoinToken,
} from '@/lib/api/consultations';
import type { CallParticipant } from '@/types/patient';
import type { Participant, LocalParticipant, RemoteParticipant } from 'livekit-client';

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

export default function PatientConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const roomRef = useRef<Room | null>(null);
  const callStartRef = useRef<number | null>(null);
  const listenersAttachedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  // Page-level error: consultation record failed to load. When set, no
  // content sections are rendered — only the banner is shown.
  const [loadError, setLoadError] = useState<string | null>(null);
  // Call-level error: joining/token fetch failed. When set, no content
  // sections are rendered — the header stays but cards are hidden until
  // the error is cleared by a successful retry.
  const [joinError, setJoinError] = useState<string | null>(null);

  const [clinicianName, setClinicianName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isConnecting, setIsConnecting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);
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

  useEffect(() => {
    let cancelled = false;

    // setLoading(true);
    // setLoadError(null);
    // setJoinError(null);
    // setClinicianName('');
    // setSlug('');
    // setIsLive(false);
    // setElapsedSeconds(0);
    // setIsConnecting(false);
    // setHasJoined(false);
    // setMeetingEnded(false);
    // setLiveParticipants([]);
    callStartRef.current = null;

    const load = async () => {
      try {
        const record = await fetchConsultationById(id);
        console.log(record,"record")
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

  const joinCall = async () => {
    // if (hasJoined || isConnecting || meetingEnded || !slug) return;

    setJoinError(null);
    setIsConnecting(true);

    try {
      const role = "patient"
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
      setJoinError(err instanceof Error ? err.message : 'Failed to join consultation');
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    } finally {
      setIsConnecting(false);
    }
  };

  const leaveCall = useCallback(() => {
    roomRef.current?.disconnect();
    roomRef.current = null;
    listenersAttachedRef.current = false;
    setIsLive(false);
    setHasJoined(false);
    setLiveParticipants([]);
    setMeetingEnded(true);
    router.push('/dashboard/patient/consultations');
  }, [router]);

  useEffect(() => {
    if (!isLive || callStartRef.current === null) return;
    const tick = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [isLive]);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading consultation…
      </div>
    );
  }

  // Page-level load failure: nothing renders below the banner.
  // if (loadError) {
  //   return (
  //     <div
  //       role="alert"
  //       className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
  //     >
  //       {loadError}
  //     </div>
  //   );
  // }

  const consultationInfo = {
    clinicianName,
    isLive,
    elapsedTime: formatElapsed(elapsedSeconds),
  };

  // Content sections are only rendered when there is no blocking join error
  // and the meeting has not ended without a redirect (edge case: leaveCall
  // redirects, but meetingEnded stays true until unmount).
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

      {
        loadError && (
          <div
            role="alert"
            className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
          >
            {loadError}
          </div>
        )
      }
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
          {/* Row 1: video + transcript/audio (left, 2 cols) + AI note (right, 1 col) */}
          <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <VideoCallPanel participants={liveParticipants } />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TranscriptCard entries={transcript} />
                <AudioQualityCard metrics={audioQuality} />
              </div>
            </div>
            <PatientAIClinicalNoteCard note={soapNote} />
          </div>

          {/* Row 2: chat + summary */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ChatPanel clinicianName={clinicianName} messages={chatMessages} />
            <ConsultationSummaryCard summary={consultationSummary} />
          </div>

          {/* Row 3: documents */}
          <div className="mb-4">
            <DocumentsCard documents={consultationDocuments} />
          </div>
        </>
      )}
    </>
  );
}
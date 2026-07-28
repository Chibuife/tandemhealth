
// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Room, RoomEvent } from 'livekit-client';
// import { PatientConsultationHeader } from '@/components/patient/consultation/PatientConsultationHeader';
// import { VideoCallPanel } from '@/components/VideoCallPanel';
// import { TranscriptCard } from '@/components/patient/consultation/TranscriptCard';
// import { AudioQualityCard } from '@/components/patient/consultation/AudioQualityCard';
// import { ChatPanel } from '@/components/patient/consultation/ChatPanel';
// import { ConsultationSummaryCard } from '@/components/patient/consultation/ConsultationSummaryCard';
// import { PatientAIClinicalNoteCard } from '@/components/patient/consultation/PatientAIClinicalNoteCard';
// import { DocumentsCard } from '@/components/patient/consultation/DocumentsCard';

// import {
//   audioQuality,
//   chatMessages,
//   consultationDocuments,
//   consultationSummary,
//   soapNote,
//   transcript,
// } from '@/data/patientDemoData';
// import {
//   fetchConsultationById,
//   getConsultationJoinToken,
// } from '@/lib/api/consultations';
// import type { CallParticipant } from '@/types/patient';
// import type { Participant, LocalParticipant, RemoteParticipant } from 'livekit-client';

// const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

// const colorForIdentity = (identity: string) => {
//   const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
//   return AVATAR_COLORS[hash % AVATAR_COLORS.length];
// };

// const toCallParticipant = (
//   participant: Participant | LocalParticipant | RemoteParticipant,
//   isLocal: boolean
// ): CallParticipant => {
//   const videoPublication = Array.from(participant.videoTrackPublications.values())[0];
//   return {
//     id: participant.identity,
//     displayName: participant.name || participant.identity,
//     avatarColor: colorForIdentity(participant.identity),
//     micActive: participant.isMicrophoneEnabled,
//     videoTrack: videoPublication?.track ?? undefined,
//     isLocal,
//   };
// };

// const formatElapsed = (seconds: number) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// };

// export default function PatientConsultationPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const roomRef = useRef<Room | null>(null);
//   const callStartRef = useRef<number | null>(null);
//   const listenersAttachedRef = useRef(false);

//   const [loading, setLoading] = useState(true);
//   // Page-level error: consultation record failed to load. When set, no
//   // content sections are rendered — only the banner is shown.
//   const [loadError, setLoadError] = useState<string | null>(null);
//   // Call-level error: joining/token fetch failed. When set, no content
//   // sections are rendered — the header stays but cards are hidden until
//   // the error is cleared by a successful retry.
//   const [joinError, setJoinError] = useState<string | null>(null);

//   const [clinicianName, setClinicianName] = useState('');
//   const [slug, setSlug] = useState('');
//   const [isLive, setIsLive] = useState(false);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   const [isConnecting, setIsConnecting] = useState(false);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [meetingEnded, setMeetingEnded] = useState(false);
//   const [liveParticipants, setLiveParticipants] = useState<CallParticipant[]>([]);

//   const refreshParticipants = useCallback(() => {
//     const room = roomRef.current;
//     if (!room) return;
//     const local = toCallParticipant(room.localParticipant, true);
//     const remote = Array.from(room.remoteParticipants.values()).map((p) =>
//       toCallParticipant(p, false)
//     );
//     setLiveParticipants([local, ...remote]);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;

//     // setLoading(true);
//     // setLoadError(null);
//     // setJoinError(null);
//     // setClinicianName('');
//     // setSlug('');
//     // setIsLive(false);
//     // setElapsedSeconds(0);
//     // setIsConnecting(false);
//     // setHasJoined(false);
//     // setMeetingEnded(false);
//     // setLiveParticipants([]);
//     callStartRef.current = null;

//     const load = async () => {
//       try {
//         const record = await fetchConsultationById(id);
//         if (cancelled) return;
//         setClinicianName(record.doctorName ?? '');
//         setSlug(record.slug);
//       } catch (err) {
//         if (!cancelled) {
//           setLoadError(err instanceof Error ? err.message : 'Failed to load consultation');
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();

//     return () => {
//       cancelled = true;
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//     };
//   }, [id]);

//   const joinCall = async () => {
//     // if (hasJoined || isConnecting || meetingEnded || !slug) return;

//     setJoinError(null);
//     setIsConnecting(true);

//     try {
//       const role = "patient"
//       const { token, livekitUrl } = await getConsultationJoinToken(slug, role);

//       const room = roomRef.current ?? new Room();
//       roomRef.current = room;

//       if (!listenersAttachedRef.current) {
//         room.on(RoomEvent.Connected, () => {
//           callStartRef.current = Date.now();
//           setIsLive(true);
//           setHasJoined(true);
//           refreshParticipants();
//         });

//         room.on(RoomEvent.Disconnected, () => {
//           setIsLive(false);
//           setHasJoined(false);
//           setLiveParticipants([]);
//         });

//         room.on(RoomEvent.ParticipantConnected, refreshParticipants);
//         room.on(RoomEvent.ParticipantDisconnected, refreshParticipants);
//         room.on(RoomEvent.TrackSubscribed, refreshParticipants);
//         room.on(RoomEvent.TrackUnsubscribed, refreshParticipants);
//         room.on(RoomEvent.TrackMuted, refreshParticipants);
//         room.on(RoomEvent.TrackUnmuted, refreshParticipants);
//         room.on(RoomEvent.LocalTrackPublished, refreshParticipants);
//         room.on(RoomEvent.LocalTrackUnpublished, refreshParticipants);

//         listenersAttachedRef.current = true;
//       }

//       await room.connect(livekitUrl, token);
//       await room.localParticipant.enableCameraAndMicrophone();
//       refreshParticipants();
//     } catch (err) {
//       console.error(err);
//       setJoinError(err instanceof Error ? err.message : 'Failed to join consultation');
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const leaveCall = useCallback(() => {
//     roomRef.current?.disconnect();
//     roomRef.current = null;
//     listenersAttachedRef.current = false;
//     setIsLive(false);
//     setHasJoined(false);
//     setLiveParticipants([]);
//     setMeetingEnded(true);
//     router.push('/dashboard/patient/consultations');
//   }, [router]);

//   useEffect(() => {
//     if (!isLive || callStartRef.current === null) return;
//     const tick = setInterval(() => {
//       setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
//     }, 1000);
//     return () => clearInterval(tick);
//   }, [isLive]);

//   if (loading) {
//     return (
//       <div className="py-12 text-center text-sm text-gray-500">
//         Loading consultation…
//       </div>
//     );
//   }

//   // Page-level load failure: nothing renders below the banner.
//   // if (loadError) {
//   //   return (
//   //     <div
//   //       role="alert"
//   //       className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
//   //     >
//   //       {loadError}
//   //     </div>
//   //   );
//   // }

//   const consultationInfo = {
//     clinicianName,
//     isLive,
//     elapsedTime: formatElapsed(elapsedSeconds),
//   };

//   // Content sections are only rendered when there is no blocking join error
//   // and the meeting has not ended without a redirect (edge case: leaveCall
//   // redirects, but meetingEnded stays true until unmount).
//   const showContent = !joinError && !meetingEnded;

//   return (
//     <>
//       {meetingEnded && (
//         <div
//           role="status"
//           className="mb-4 w-full rounded-md bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
//         >
//           This consultation has ended.
//         </div>
//       )}

//       {
//         loadError && (
//           <div
//             role="alert"
//             className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
//           >
//             {loadError}
//           </div>
//         )
//       }
//       <PatientConsultationHeader
//         info={consultationInfo}
//         onJoin={joinCall}
//         onLeave={leaveCall}
//         isConnecting={isConnecting}
//         hasJoined={hasJoined}
//         meetingEnded={meetingEnded}
//       />

//       {joinError && (
//         <div
//           role="alert"
//           className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
//         >
//           {joinError}
//         </div>
//       )}

//       {showContent && (
//         <>
//           {/* Row 1: video + transcript/audio (left, 2 cols) + AI note (right, 1 col) */}
//           <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
//             <div className="flex flex-col gap-4 lg:col-span-2">
//               <VideoCallPanel participants={liveParticipants } />
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <TranscriptCard entries={transcript} />
//                 <AudioQualityCard metrics={audioQuality} />
//               </div>
//             </div>
//             <PatientAIClinicalNoteCard note={soapNote} />
//           </div>

//           {/* Row 2: chat + summary */}
//           <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
//             <ChatPanel clinicianName={clinicianName} messages={chatMessages} />
//             <ConsultationSummaryCard summary={consultationSummary} />
//           </div>

//           {/* Row 3: documents */}
//           <div className="mb-4">
//             <DocumentsCard documents={consultationDocuments} />
//           </div>
//         </>
//       )}
//     </>
//   );
// }


'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, RoomEvent } from 'livekit-client';
import axios from 'axios';
import { PatientConsultationHeader } from '@/components/patient/consultation/PatientConsultationHeader';
import { VideoCallPanel } from '@/components/VideoCallPanel';
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

interface TranscriptDataMessage {
  type:      'transcript';
  role:      TranscriptRole;
  identity:  string;
  text:      string;
  final:     boolean;
  overlap?:  boolean;
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

  const roomRef              = useRef<Room | null>(null);
  const callStartRef         = useRef<number | null>(null);
  const listenersAttachedRef = useRef(false);
  const entryIdRef           = useRef(0);

  const [loading,           setLoading]           = useState(true);
  const [loadError,         setLoadError]         = useState<string | null>(null);
  const [joinError,         setJoinError]         = useState<string | null>(null);

  const [clinicianName,     setClinicianName]     = useState('');
  const [slug,              setSlug]              = useState('');
  const [isLive,            setIsLive]            = useState(false);
  const [elapsedSeconds,    setElapsedSeconds]    = useState(0);

  const [isConnecting,      setIsConnecting]      = useState(false);
  const [hasJoined,         setHasJoined]         = useState(false);
  const [meetingEnded,      setMeetingEnded]      = useState(false);

  const [liveParticipants,  setLiveParticipants]  = useState<CallParticipant[]>([]);
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

  const [micName,           setMicName]           = useState('Default microphone');
  const [micConnected,      setMicConnected]      = useState(false);

  const [liveRoom,          setLiveRoom]          = useState<Room | null>(null);
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

        room.on(RoomEvent.ParticipantConnected,    refreshParticipants);
        room.on(RoomEvent.ParticipantDisconnected, refreshParticipants);
        room.on(RoomEvent.TrackSubscribed,         refreshParticipants);
        room.on(RoomEvent.TrackUnsubscribed,       refreshParticipants);
        room.on(RoomEvent.TrackMuted,              refreshParticipants);
        room.on(RoomEvent.TrackUnmuted,            refreshParticipants);
        room.on(RoomEvent.LocalTrackPublished,     refreshParticipants);
        room.on(RoomEvent.LocalTrackUnpublished,   refreshParticipants);

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
                  id:          `t-${entryIdRef.current++}`,
                  timestamp:   formatClockTime(message.timestamp),
                  speaker:
                    message.role === 'doctor'  ? 'Doctor'
                    : message.role === 'patient' ? 'Patient'
                    : 'Unknown',
                  speakerType: message.role === 'doctor' ? 'doctor' : 'patient',
                  text:        message.text,
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
              <VideoCallPanel participants={liveParticipants} />
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



































// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Room, RoomEvent } from 'livekit-client';
// import axios from 'axios';
// import { PatientConsultationHeader } from '@/components/patient/consultation/PatientConsultationHeader';
// import { VideoCallPanel } from '@/components/VideoCallPanel';
// import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
// import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
// import { useConnectionStats } from '@/hooks/useConnectionStats';
// import {
//   fetchConsultationById,
//   getConsultationJoinToken,
// } from '@/lib/api/consultations';
// import type { TranscriptEntry } from '@/types';
// import type { CallParticipant } from '@/types/patient';
// import type { Participant, LocalParticipant, RemoteParticipant } from 'livekit-client';

// // ─── Constants ────────────────────────────────────────────────────────────────

// const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

// const colorForIdentity = (identity: string) => {
//   const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
//   return AVATAR_COLORS[hash % AVATAR_COLORS.length];
// };

// const toCallParticipant = (
//   participant: Participant | LocalParticipant | RemoteParticipant,
//   isLocal: boolean
// ): CallParticipant => {
//   const videoPublication = Array.from(participant.videoTrackPublications.values())[0];
//   return {
//     id: participant.identity,
//     displayName: participant.name || participant.identity,
//     avatarColor: colorForIdentity(participant.identity),
//     micActive: participant.isMicrophoneEnabled,
//     videoTrack: videoPublication?.track ?? undefined,
//     isLocal,
//   };
// };

// const formatElapsed = (seconds: number) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// };

// const formatClockTime = (ms: number) =>
//   new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // ─── Transcript types ─────────────────────────────────────────────────────────

// type TranscriptRole = 'doctor' | 'patient' | 'unknown';

// interface TranscriptDataMessage {
//   type:      'transcript';
//   role:      TranscriptRole;
//   identity:  string;
//   text:      string;
//   final:     boolean;
//   overlap?:  boolean;
//   timestamp: number;
// }

// function isTranscriptMessage(value: unknown): value is TranscriptDataMessage {
//   if (typeof value !== 'object' || value === null) return false;
//   const v = value as Record<string, unknown>;
//   return (
//     v.type === 'transcript' &&
//     typeof v.text === 'string' &&
//     typeof v.final === 'boolean' &&
//     typeof v.timestamp === 'number' &&
//     (v.role === 'doctor' || v.role === 'patient' || v.role === 'unknown')
//   );
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function LivePulse() {
//   return (
//     <span className="relative flex h-2.5 w-2.5">
//       <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
//       <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
//     </span>
//   );
// }

// function StatusBanner({
//   type,
//   message,
// }: {
//   type: 'error' | 'ended' | 'warning';
//   message: string;
// }) {
//   const styles = {
//     error:   'bg-red-50 border border-red-200 text-red-700',
//     ended:   'bg-slate-800 text-white',
//     warning: 'bg-amber-50 border border-amber-200 text-amber-800',
//   };
//   return (
//     <div
//       role={type === 'ended' ? 'status' : 'alert'}
//       className={`mb-4 w-full rounded-xl px-4 py-3 text-center text-sm font-medium ${styles[type]}`}
//     >
//       {message}
//     </div>
//   );
// }

// function LoadingScreen() {
//   return (
//     <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
//       <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
//       <p className="text-sm font-medium text-slate-500">Loading your consultation…</p>
//     </div>
//   );
// }

// // ─── Waiting state (before joining) ──────────────────────────────────────────

// function WaitingToJoin({
//   clinicianName,
//   isConnecting,
//   onJoin,
// }: {
//   clinicianName: string;
//   isConnecting: boolean;
//   onJoin: () => void;
// }) {
//   return (
//     <div className="flex flex-col items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white px-6 py-16 text-center shadow-sm">
//       {/* Doctor avatar placeholder */}
//       <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-semibold text-blue-600 shadow-inner">
//         {clinicianName ? clinicianName.charAt(0).toUpperCase() : 'D'}
//       </div>

//       <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
//         Your consultation with
//       </p>
//       <h2 className="mb-6 text-2xl font-semibold text-slate-800">
//         {clinicianName || 'Your Doctor'}
//       </h2>

//       <button
//         type="button"
//         onClick={onJoin}
//         disabled={isConnecting}
//         className="flex items-center gap-2.5 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-95 disabled:opacity-60"
//       >
//         {isConnecting ? (
//           <>
//             <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
//             Connecting…
//           </>
//         ) : (
//           <>
//             <span className="h-2 w-2 rounded-full bg-emerald-300" />
//             Join consultation
//           </>
//         )}
//       </button>

//       <p className="mt-5 text-xs text-slate-400">
//         Make sure your camera and microphone are allowed in your browser.
//       </p>
//     </div>
//   );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function PatientConsultationPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const roomRef              = useRef<Room | null>(null);
//   const callStartRef         = useRef<number | null>(null);
//   const listenersAttachedRef = useRef(false);
//   const entryIdRef           = useRef(0);

//   const [loading,           setLoading]           = useState(true);
//   const [loadError,         setLoadError]         = useState<string | null>(null);
//   const [joinError,         setJoinError]         = useState<string | null>(null);

//   const [clinicianName,     setClinicianName]     = useState('');
//   const [slug,              setSlug]              = useState('');
//   const [isLive,            setIsLive]            = useState(false);
//   const [elapsedSeconds,    setElapsedSeconds]    = useState(0);

//   const [isConnecting,      setIsConnecting]      = useState(false);
//   const [hasJoined,         setHasJoined]         = useState(false);
//   const [meetingEnded,      setMeetingEnded]      = useState(false);

//   const [liveParticipants,  setLiveParticipants]  = useState<CallParticipant[]>([]);
//   const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

//   const [micName,           setMicName]           = useState('Default microphone');
//   const [micConnected,      setMicConnected]      = useState(false);

//   const [liveRoom,          setLiveRoom]          = useState<Room | null>(null);
//   const connectionStats = useConnectionStats(liveRoom);

//   // ─── Participants + mic sync ──────────────────────────────────────────────

//   const refreshParticipants = useCallback(() => {
//     const room = roomRef.current;
//     if (!room) return;
//     const local = toCallParticipant(room.localParticipant, true);
//     const remote = Array.from(room.remoteParticipants.values()).map((p) =>
//       toCallParticipant(p, false)
//     );
//     setLiveParticipants([local, ...remote]);

//     const localParticipant = room.localParticipant;
//     if (localParticipant) {
//       setMicName(localParticipant.name || 'Default microphone');
//       setMicConnected(localParticipant.isMicrophoneEnabled);
//     }
//   }, []);

//   // ─── Data fetching ────────────────────────────────────────────────────────

//   useEffect(() => {
//     let cancelled = false;
//     callStartRef.current = null;

//     const load = async () => {
//       try {
//         const record = await fetchConsultationById(id);
//         if (cancelled) return;
//         setClinicianName(record.doctorName ?? '');
//         setSlug(record.slug);
//       } catch (err) {
//         if (!cancelled) {
//           setLoadError(err instanceof Error ? err.message : 'Failed to load consultation');
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();

//     return () => {
//       cancelled = true;
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//     };
//   }, [id]);

//   // ─── LiveKit room ─────────────────────────────────────────────────────────

//   const joinCall = async () => {
//     setJoinError(null);
//     setIsConnecting(true);

//     try {
//       const { token, livekitUrl } = await getConsultationJoinToken(slug, 'patient');

//       const room = roomRef.current ?? new Room();
//       roomRef.current = room;

//       if (!listenersAttachedRef.current) {
//         room.on(RoomEvent.Connected, () => {
//           callStartRef.current = Date.now();
//           setIsLive(true);
//           setHasJoined(true);
//           setLiveRoom(room);
//           refreshParticipants();
//         });

//         room.on(RoomEvent.Disconnected, () => {
//           setIsLive(false);
//           setHasJoined(false);
//           setLiveRoom(null);
//           setLiveParticipants([]);
//           setMicConnected(false);
//         });

//         room.on(RoomEvent.ParticipantConnected,    refreshParticipants);
//         room.on(RoomEvent.ParticipantDisconnected, refreshParticipants);
//         room.on(RoomEvent.TrackSubscribed,         refreshParticipants);
//         room.on(RoomEvent.TrackUnsubscribed,       refreshParticipants);
//         room.on(RoomEvent.TrackMuted,              refreshParticipants);
//         room.on(RoomEvent.TrackUnmuted,            refreshParticipants);
//         room.on(RoomEvent.LocalTrackPublished,     refreshParticipants);
//         room.on(RoomEvent.LocalTrackUnpublished,   refreshParticipants);

//         room.on(RoomEvent.DataReceived, (payload: Uint8Array, _participant, _kind, topic) => {
//           let parsed: unknown;
//           try {
//             parsed = JSON.parse(new TextDecoder().decode(payload));
//           } catch {
//             return;
//           }

//           if (topic === 'transcript' || topic === undefined) {
//             if (!isTranscriptMessage(parsed) || !parsed.final) return;
//             const message = parsed;

//             setTranscriptEntries((prev) => {
//               const alreadyExists = prev.some(
//                 (e) =>
//                   e.text === message.text &&
//                   e.timestamp === formatClockTime(message.timestamp)
//               );
//               if (alreadyExists) return prev;

//               return [
//                 ...prev,
//                 {
//                   id:          `t-${entryIdRef.current++}`,
//                   timestamp:   formatClockTime(message.timestamp),
//                   speaker:
//                     message.role === 'doctor'  ? 'Doctor'
//                     : message.role === 'patient' ? 'Patient'
//                     : 'Unknown',
//                   speakerType: message.role === 'doctor' ? 'doctor' : 'patient',
//                   text:        message.text,
//                 },
//               ];
//             });
//           }
//         });

//         listenersAttachedRef.current = true;
//       }

//       await room.connect(livekitUrl, token);
//       await room.localParticipant.enableCameraAndMicrophone();
//       refreshParticipants();
//     } catch (err) {
//       console.error(err);
//       setJoinError(err instanceof Error ? err.message : 'Failed to join consultation');
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   // ─── Leave ────────────────────────────────────────────────────────────────

//   const leaveCall = useCallback(() => {
//     roomRef.current?.disconnect();
//     roomRef.current = null;
//     listenersAttachedRef.current = false;
//     setIsLive(false);
//     setHasJoined(false);
//     setLiveRoom(null);
//     setLiveParticipants([]);
//     setMicConnected(false);
//     setMeetingEnded(true);
//     router.push('/dashboard/patient/consultations');
//   }, [router]);

//   // ─── Timers ───────────────────────────────────────────────────────────────

//   useEffect(() => {
//     if (!isLive || callStartRef.current === null) return;
//     const tick = setInterval(() => {
//       setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
//     }, 1000);
//     return () => clearInterval(tick);
//   }, [isLive]);

//   // ─── Render ───────────────────────────────────────────────────────────────

//   if (loading) return <LoadingScreen />;

//   const consultationInfo = {
//     clinicianName,
//     isLive,
//     elapsedTime: formatElapsed(elapsedSeconds),
//   };

//   return (
//     <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">

//       {/* ── Banners ── */}
//       {meetingEnded && (
//         <StatusBanner type="ended" message="This consultation has ended." />
//       )}
//       {loadError && (
//         <StatusBanner type="error" message={loadError} />
//       )}

//       {/* ── Header ── */}
//       <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
//         <div className="flex items-center gap-3 min-w-0">
//           {isLive && <LivePulse />}
//           <div className="min-w-0">
//             <p className="truncate text-sm font-semibold text-slate-800">
//               {isLive ? `In consultation with ${clinicianName}` : clinicianName || 'Consultation'}
//             </p>
//             {isLive && (
//               <p className="text-xs tabular-nums text-slate-400">
//                 {formatElapsed(elapsedSeconds)}
//               </p>
//             )}
//           </div>
//         </div>

//         {hasJoined && !meetingEnded && (
//           <button
//             type="button"
//             onClick={leaveCall}
//             className="shrink-0 rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-red-600 active:scale-95"
//           >
//             Leave
//           </button>
//         )}
//       </div>

//       {/* ── Join error ── */}
//       {joinError && (
//         <StatusBanner type="warning" message={joinError} />
//       )}

//       {/* ── Main content ── */}
//       {!meetingEnded && (
//         <>
//           {!hasJoined ? (
//             /* Pre-join waiting screen */
//             <WaitingToJoin
//               clinicianName={clinicianName}
//               isConnecting={isConnecting}
//               onJoin={joinCall}
//             />
//           ) : (
//             /* Active call layout */
//             <div className="flex flex-col gap-4">

//               {/* Video — full width, hero */}
//               <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
//                 <VideoCallPanel participants={liveParticipants} />
//               </div>

//               {/* Transcript + Audio — side by side on md+, stacked on mobile */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
//                   <LiveTranscriptCard entries={transcriptEntries} />
//                 </div>
//                 <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
//                   <AudioStatusCard
//                     stats={connectionStats}
//                     microphoneName={micName}
//                     microphoneConnected={micConnected}
//                   />
//                 </div>
//               </div>

//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
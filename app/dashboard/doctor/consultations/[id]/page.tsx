// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Room, RoomEvent } from 'livekit-client';
// import { ConsultationHeader } from '@/components/doctor/consultations/ConsultationHeader';
// import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
// import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
// import { AIClinicalNoteCard } from '@/components/doctor/consultations/AIClinicalNoteCard';
// import { ConsultationTimelineCard } from '@/components/doctor/consultations/ConsultationTimelineCard';
// import { Icd10CodesCard } from '@/components/doctor/consultations/Icd10CodesCard';
// import { ClinicalShortcutsCard } from '@/components/doctor/consultations/ClinicalShortcutsCard';
// import { AIClinicalAssistantCard } from '@/components/doctor/consultations/AIClinicalAssistantCard';
// import { VideoCallPanel } from '@/components/VideoCallPanel';
// import axios from "axios";

// import {
//   assistantMessages,
//   audioStatus,
//   clinicalShortcuts,
//   icd10Suggestions,
//   soapNote,
//   timelineEvents,
// } from '@/data/demoData';
// import {
//   fetchConsultationById,
//   getConsultationJoinToken,
//   endConsultationMeeting,
// } from '@/lib/api/consultations';
// import type { Consultation, TranscriptEntry } from '@/types';
// import type { CallParticipant } from '@/types/patient';
// import type { Participant, RemoteParticipant } from 'livekit-client';

// const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

// const colorForIdentity = (identity: string) => {
//   const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
//   return AVATAR_COLORS[hash % AVATAR_COLORS.length];
// };

// // Only ever called on remote participants now — the local doctor's own
// // tile is no longer rendered through this list (handled separately by
// // VideoCallPanel, or omitted entirely).
// const toCallParticipant = (participant: Participant | RemoteParticipant): CallParticipant => {
//   const videoPublication = Array.from(participant.videoTrackPublications.values())[0];

//   return {
//     id: participant.identity,
//     displayName: participant.name || participant.identity,
//     avatarColor: colorForIdentity(participant.identity),
//     micActive: participant.isMicrophoneEnabled,
//     videoTrack: videoPublication?.track ?? undefined,
//     isLocal: false,
//   };
// };

// // Shown before anyone has joined / while waiting for the patient, so the
// // video grid isn't empty and we're not relying on fake demo people.
// const PLACEHOLDER_PARTICIPANTS: CallParticipant[] = [
//   {
//     id: 'placeholder-patient',
//     displayName: 'Waiting for patient to join…',
//     avatarColor: '#94a3b8',
//     micActive: false,
//     videoTrack: undefined,
//     isLocal: false,
//   },
// ];

// const formatElapsed = (seconds: number) => {
//   const mins = Math.floor(seconds / 60);
//   const secs = seconds % 60;
//   return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// };

// const formatClockTime = (ms: number) =>
//   new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// // --- Transcript data-channel message shape + runtime validation ---
// // The agent (a separate process) sends these over LiveKit's data channel.
// // Nothing at compile time guarantees the two sides agree on shape, so this
// // is validated at runtime rather than just cast.
// type TranscriptRole = 'doctor' | 'patient' | 'unknown';

// interface TranscriptDataMessage {
//   type: 'transcript';
//   role: TranscriptRole;
//   identity: string;
//   text: string;
//   final: boolean;
//   overlap?: boolean;
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

// async function saveTranscript(payload: {
//   roomName: string;
//   role: "doctor"|"patient";
//   identity: string;
//   text: string;
//   timestamp: number;
//   final: boolean;
//   overlap: boolean;
// }) {
//   try {
//     await axios.post(
//       `${process.env.API_URL}/api/transcripts`,
//       payload
//     );
//   } catch (err) {
//     console.error("Failed to save transcript", err);
//   }
// }
// export default function ConsultationPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const roomRef = useRef<Room | null>(null);
//   const callStartRef = useRef<number | null>(null);
//   const listenersAttachedRef = useRef(false);
//   const entryIdRef = useRef(0);

//   const [loading, setLoading] = useState(true);
//   const [loadError, setLoadError] = useState<string | null>(null);
//   const [joinError, setJoinError] = useState<string | null>(null);

//   const [patientName, setPatientName] = useState('');
//   const [slug, setSlug] = useState('');
//   const [isLive, setIsLive] = useState(false);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isEnding, setIsEnding] = useState(false);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [meetingEnded, setMeetingEnded] = useState(false);

//   // Live remote participants built from the actual Room, shown once joined.
//   const [liveParticipants, setLiveParticipants] = useState<CallParticipant[]>([]);

//   // Real transcript entries fed by the AI agent over the LiveKit data channel —
//   // replaces the demoData `transcript` array. Only final (not interim)
//   // segments get pushed here, in arrival order, so the card renders the
//   // natural doctor/patient/doctor... back-and-forth.
//   const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

//   const refreshParticipants = useCallback(() => {
//     const room = roomRef.current;
//     if (!room) return;

//     const remote = Array.from(room.remoteParticipants.values()).map((p) =>
//       toCallParticipant(p)
//     );

//     setLiveParticipants(remote);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;
//     callStartRef.current = null;

//     const load = async () => {
//       try {
//         const record = await fetchConsultationById(id);
//         if (cancelled) return;
//         setPatientName(record.patientName);
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
//     setJoinError(null);
//     setIsConnecting(true);

//     try {
//       const role = 'doctor';
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

//         room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
//           let parsed: unknown;
//           try {
//             parsed = JSON.parse(new TextDecoder().decode(payload));
//           } catch {
//             return; // not valid JSON — ignore
//           }

//           if (!isTranscriptMessage(parsed) || !parsed.final) return; // only persist finals

//           setTranscriptEntries((prev) => [
//             ...prev,
//             {
//               id: `t-${entryIdRef.current++}`,
//               timestamp: formatClockTime(parsed.timestamp),
//               speaker:
//                 parsed.role === 'doctor' ? 'Doctor' : parsed.role === 'patient' ? 'Patient' : 'Unknown',
//               speakerType: parsed.role === 'doctor' ? 'doctor' : 'patient',
//               text: parsed.text,
//             },
//           ]);
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

//   useEffect(() => {
//     if (!isLive || callStartRef.current === null) return;

//     const tick = setInterval(() => {
//       setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
//     }, 1000);

//     return () => clearInterval(tick);
//   }, [isLive]);

//   const handleEndConsultation = useCallback(async () => {
//     if (!slug || isEnding || meetingEnded) return;

//     setIsEnding(true);
//     try {
//       await endConsultationMeeting(slug);
//     } catch (err) {
//       console.error('Failed to end consultation', err);
//     } finally {
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//       setIsLive(false);
//       setHasJoined(false);
//       setLiveParticipants([]);
//       setMeetingEnded(true);
//       setIsEnding(false);
//     }
//   }, [slug, isEnding, meetingEnded]);

//   if (loading) {
//     return <div className="py-12 text-center text-sm text-gray-500">Loading consultation details…</div>;
//   }

//   const consultation: Consultation = {
//     patientName,
//     isLive,
//     elapsedTime: formatElapsed(elapsedSeconds),
//   } as Consultation;

//   return (
//     <>
//       {loadError && (
//         <div
//           role="alert"
//           className="mb-4 w-full rounded-md bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700"
//         >
//           {loadError}
//         </div>
//       )}

//       {meetingEnded && (
//         <div
//           role="status"
//           className="mb-4 w-full rounded-md bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white"
//         >
//           This meeting has ended.
//         </div>
//       )}

//       <ConsultationHeader
//         consultation={consultation}
//         onStart={joinCall}
//         onEnd={handleEndConsultation}
//         isConnecting={isConnecting || isEnding}
//         hasJoined={hasJoined}
//         meetingEnded={meetingEnded}
//       />

//       {joinError && (
//         <div role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
//           {joinError}
//         </div>
//       )}

//       <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
//         <div className="flex flex-col gap-4 lg:col-span-2">
//           <VideoCallPanel participants={hasJoined ? liveParticipants : PLACEHOLDER_PARTICIPANTS} />
//           <LiveTranscriptCard entries={transcriptEntries} />
//         </div>
//         <AIClinicalNoteCard note={soapNote} />
//       </div>

//       <div className="mb-4">
//         <AudioStatusCard metrics={audioStatus} />
//       </div>

//       <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
//         <ConsultationTimelineCard events={timelineEvents} />
//         <Icd10CodesCard suggestions={icd10Suggestions} />
//         <ClinicalShortcutsCard shortcuts={clinicalShortcuts} />
//       </div>

//       <AIClinicalAssistantCard messages={assistantMessages} />
//     </>
//   );
// }

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Room, RoomEvent } from 'livekit-client';
import axios from 'axios';
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
} from '@/data/demoData';
import {
  fetchConsultationById,
  getConsultationJoinToken,
  endConsultationMeeting,
} from '@/lib/api/consultations';
import type { Consultation, TranscriptEntry } from '@/types';
import type { CallParticipant } from '@/types/patient';
import type { Participant, RemoteParticipant } from 'livekit-client';

const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

const colorForIdentity = (identity: string) => {
  const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const toCallParticipant = (participant: Participant | RemoteParticipant): CallParticipant => {
  const videoPublication = Array.from(participant.videoTrackPublications.values())[0];

  return {
    id: participant.identity,
    displayName: participant.name || participant.identity,
    avatarColor: colorForIdentity(participant.identity),
    micActive: participant.isMicrophoneEnabled,
    videoTrack: videoPublication?.track ?? undefined,
    isLocal: false,
  };
};

const PLACEHOLDER_PARTICIPANTS: CallParticipant[] = [
  {
    id: 'placeholder-patient',
    displayName: 'Waiting for patient to join…',
    avatarColor: '#94a3b8',
    micActive: false,
    videoTrack: undefined,
    isLocal: false,
  },
];

const formatElapsed = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const formatClockTime = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

type TranscriptRole = 'doctor' | 'patient' | 'unknown';

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

export default function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const roomRef = useRef<Room | null>(null);
  const callStartRef = useRef<number | null>(null);
  const listenersAttachedRef = useRef(false);
  const entryIdRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [patientName, setPatientName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [meetingEnded, setMeetingEnded] = useState(false);

  const [liveParticipants, setLiveParticipants] = useState<CallParticipant[]>([]);
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

  const refreshParticipants = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;

    const remote = Array.from(room.remoteParticipants.values()).map((p) =>
      toCallParticipant(p)
    );

    setLiveParticipants(remote);
  }, []);

  // Loads any transcript already recorded before this page was opened
  // (e.g. rejoining a call in progress, or reviewing after the fact).
  // // This is a read-only GET — writes belong on the agent, not here.
  // const fetchTranscriptHistory = useCallback(async () => {
  //   if (!id) return;
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/transcripts/${id}`
  //     );
  //     type APITranscriptItem = {
  //       id: number | string;
  //       timestamp: string;
  //       role: 'doctor' | 'patient' | string;
  //       text: string;
  //     };
  //     const history: TranscriptEntry[] = (data as APITranscriptItem[]).map((item) => ({
  //       id: `h-${item.id}`,
  //       timestamp: formatClockTime(new Date(item.timestamp).getTime()),
  //       speaker: item.role === 'doctor' ? 'Doctor' : item.role === 'patient' ? 'Patient' : 'Unknown',
  //       speakerType: item.role === 'doctor' ? 'doctor' : 'patient',
  //       text: item.text,
  //     }));
  //     setTranscriptEntries(history);
  //   } catch (err) {
  //     console.error('Failed to load transcript history', err);
  //   }
  // }, [id]);

  const fetchTranscriptHistory = useCallback(async (roomName: string) => {
    if (!roomName) return;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transcripts/${roomName}`
      );
      type APITranscriptItem = {
        id: number | string;
        timestamp: string;
        role: 'doctor' | 'patient' | string;
        text: string;
      };
      const history: TranscriptEntry[] = (data as APITranscriptItem[]).map((item) => ({
        id: `h-${item.id}`,
        timestamp: formatClockTime(new Date(item.timestamp).getTime()),
        speaker: item.role === 'doctor' ? 'Doctor' : item.role === 'patient' ? 'Patient' : 'Unknown',
        speakerType: item.role === 'doctor' ? 'doctor' : 'patient',
        text: item.text,
      }));
      setTranscriptEntries(history);
    } catch (err) {
      console.error('Failed to load transcript history', err);
    }
  }, []);

  // Fires once `slug` actually resolves from fetchConsultationById — not
  // tied to `id`, since `id` is the route param, `slug` is the LiveKit room
  // name the backend actually keys transcripts by.
  // useEffect(() => {
  //   if (!slug) return;

  //   // Call async fetch inside effect to avoid calling setState synchronously
  //   let cancelled = false;
  //   (async () => {
  //     try {
  //       await fetchTranscriptHistory(slug);
  //     } catch (err) {
  //       if (!cancelled) console.error('Failed to fetch transcript history', err);
  //     }
  //   })();

  //   return () => {
  //     cancelled = true;
  //   };
  // }, [slug, fetchTranscriptHistory]);

  useEffect(() => {
    let cancelled = false;
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

    // Run async work from inside the effect to avoid calling setState
    // synchronously in the effect body (which can trigger cascading renders).
    const run = async () => {
      await load();
      await fetchTranscriptHistory(slug);
    };

    run();

    return () => {
      cancelled = true;
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    };
  }, [id, fetchTranscriptHistory]);

  const joinCall = async () => {
    setJoinError(null);
    setIsConnecting(true);

    try {
      const role = 'doctor';
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

        room.on(RoomEvent.DataReceived, (payload: Uint8Array) => {
          let parsed: unknown;
          try {
            parsed = JSON.parse(new TextDecoder().decode(payload));
          } catch {
            return;
          }

          if (!isTranscriptMessage(parsed) || !parsed.final) return;

          const message = parsed;

          setTranscriptEntries((prev) => {
            // Defensive dedup only — the agent should never send the same
            // final segment twice, but a redelivered/replayed data message
            // shouldn't show up twice in the UI if it ever does.
            const alreadyExists = prev.some(
              (entry) => entry.text === message.text && entry.timestamp === formatClockTime(message.timestamp)
            );
            if (alreadyExists) return prev;

            return [
              ...prev,
              {
                id: `t-${entryIdRef.current++}`,
                timestamp: formatClockTime(message.timestamp),
                speaker:
                  message.role === 'doctor' ? 'Doctor' : message.role === 'patient' ? 'Patient' : 'Unknown',
                speakerType: message.role === 'doctor' ? 'doctor' : 'patient',
                text: message.text,
              },
            ];
          });
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

  useEffect(() => {
    if (!isLive || callStartRef.current === null) return;

    const tick = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
    }, 1000);

    return () => clearInterval(tick);
  }, [isLive]);

  // Auto-scroll whenever the transcript grows, same pattern as any chat UI.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptEntries]);

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

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <VideoCallPanel participants={hasJoined ? liveParticipants : PLACEHOLDER_PARTICIPANTS} />
          <LiveTranscriptCard entries={transcriptEntries} />
          <div ref={bottomRef} />
        </div>
        <AIClinicalNoteCard note={soapNote} />
      </div>

      <div className="mb-4">
        <AudioStatusCard metrics={audioStatus} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ConsultationTimelineCard events={timelineEvents} />
        <Icd10CodesCard suggestions={icd10Suggestions} />
        <ClinicalShortcutsCard shortcuts={clinicalShortcuts} />
      </div>

      <AIClinicalAssistantCard messages={assistantMessages} />
    </>
  );
}
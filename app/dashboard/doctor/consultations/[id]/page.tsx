// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Room, RoomEvent } from 'livekit-client';
// import axios from 'axios';
// import { ConsultationHeader } from '@/components/doctor/consultations/ConsultationHeader';
// import { LiveTranscriptCard } from '@/components/doctor/consultations/LiveTranscriptCard';
// import { AudioStatusCard } from '@/components/doctor/consultations/AudioStatusCard';
// import { AIClinicalNoteCard } from '@/components/doctor/consultations/AIClinicalNoteCard';
// import { ConsultationTimelineCard } from '@/components/doctor/consultations/ConsultationTimelineCard';
// import { Icd10CodesCard } from '@/components/doctor/consultations/Icd10CodesCard';
// import { ClinicalShortcutsCard } from '@/components/doctor/consultations/ClinicalShortcutsCard';
// import { AIClinicalAssistantCard } from '@/components/doctor/consultations/AIClinicalAssistantCard';
// import { VideoCallPanel } from '@/components/VideoCallPanel';

// import {
//   assistantMessages,
//   audioStatus,
//   clinicalShortcuts,
//   icd10Suggestions,
//   timelineEvents,
// } from '@/data/demoData';
// import {
//   fetchConsultationById,
//   getConsultationJoinToken,
//   endConsultationMeeting,
// } from '@/lib/api/consultations';
// import type { Consultation, TranscriptEntry, SoapNote } from '@/types';
// import type { CallParticipant } from '@/types/patient';
// import type { Participant, RemoteParticipant } from 'livekit-client';

// // ─── Constants ────────────────────────────────────────────────────────────────

// const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

// const EMPTY_SOAP: SoapNote = {
//   subjective: '',
//   objective: '',
//   assessment: '',
//   plan: [],
//   status: 'draft',
// };

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// const colorForIdentity = (identity: string) => {
//   const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
//   return AVATAR_COLORS[hash % AVATAR_COLORS.length];
// };

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

// // ─── Transcript types ─────────────────────────────────────────────────────────

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

// // ─── SOAP types ───────────────────────────────────────────────────────────────

// interface RawSoap {
//   subjective: string;
//   objective: string;
//   assessment: string;
//   plan: string | string[];
//   status?: string;
// }

// function normalisePlan(plan: string | string[]): string[] {
//   if (Array.isArray(plan)) return plan.filter(Boolean);
//   return plan
//     .split(/\n|;/)
//     .map((s) => s.replace(/^[-•*]\s*/, '').trim())
//     .filter(Boolean);
// }

// function toSoapNote(raw: RawSoap): SoapNote {
//   return {
//     subjective: raw.subjective,
//     objective:  raw.objective,
//     assessment: raw.assessment,
//     plan:       normalisePlan(raw.plan),
//     status:     raw.status === 'final' ? 'final' : 'draft',
//   };
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function ConsultationPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();

//   const roomRef               = useRef<Room | null>(null);
//   const callStartRef          = useRef<number | null>(null);
//   const listenersAttachedRef  = useRef(false);
//   const entryIdRef            = useRef(0);
//   const bottomRef             = useRef<HTMLDivElement>(null);

//   const [loading, setLoading]         = useState(true);
//   const [loadError, setLoadError]     = useState<string | null>(null);
//   const [joinError, setJoinError]     = useState<string | null>(null);

//   const [patientName, setPatientName] = useState('');
//   const [slug, setSlug]               = useState('');
//   const [isLive, setIsLive]           = useState(false);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   const [isConnecting, setIsConnecting] = useState(false);
//   const [isEnding, setIsEnding]         = useState(false);
//   const [hasJoined, setHasJoined]       = useState(false);
//   const [meetingEnded, setMeetingEnded] = useState(false);

//   const [liveParticipants, setLiveParticipants]   = useState<CallParticipant[]>([]);
//   const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

//   // Starts empty — shows the empty state / Generate button in the card.
//   // Replaced by the saved note on load, or by a fresh generation on click.
//   const [liveSoapNote, setLiveSoapNote]   = useState<SoapNote>(EMPTY_SOAP);
//   const [isGenerating, setIsGenerating]   = useState(false);

//   // ─── Participants ───────────────────────────────────────────────────────────

//   const refreshParticipants = useCallback(() => {
//     const room = roomRef.current;
//     if (!room) return;
//     setLiveParticipants(
//       Array.from(room.remoteParticipants.values()).map(toCallParticipant)
//     );
//   }, []);

//   // ─── Data fetching ──────────────────────────────────────────────────────────

//   const fetchTranscriptHistory = useCallback(async (roomName: string) => {
//     if (!roomName) return;
//     try {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/transcripts/${roomName}`
//       );
//       type APITranscriptItem = {
//         id: number | string;
//         timestamp: string;
//         role: 'doctor' | 'patient' | string;
//         transcript: string;
//       };
//       const history: TranscriptEntry[] = (data as APITranscriptItem[]).map((item) => ({
//         id: `h-${item.id}`,
//         timestamp: formatClockTime(new Date(item.timestamp).getTime()),
//         speaker: item.role === 'doctor' ? 'Doctor' : item.role === 'patient' ? 'Patient' : 'Unknown',
//         speakerType: item.role === 'doctor' ? 'doctor' : 'patient',
//         text: item.transcript,
//       }));
//       setTranscriptEntries(history);
//     } catch (err) {
//       console.error('Failed to load transcript history', err);
//     }
//   }, []);

//   // Fetch the last saved SOAP note on load — no generation cost.
//   // If the room has no note yet the endpoint returns 404 and we silently
//   // leave the empty state so the doctor sees the Generate button.
//   const fetchSoapHistory = useCallback(async (roomName: string) => {
//     if (!roomName) return;
//     try {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/soap/${roomName}`
//       );
//       if (data) setLiveSoapNote(toSoapNote(data as RawSoap));
//     } catch {
//       // 404 = no note yet — keep EMPTY_SOAP so the card shows Generate
//     }
//   }, []);

//   useEffect(() => {
//     let cancelled = false;
//     callStartRef.current = null;

//     const run = async () => {
//       try {
//         const record = await fetchConsultationById(id);
//         if (cancelled) return;

//         setPatientName(record.patientName);
//         setSlug(record.slug);

//         await Promise.all([
//           fetchTranscriptHistory(record.slug),
//           fetchSoapHistory(record.slug),
//         ]);
//       } catch (err) {
//         if (!cancelled) {
//           setLoadError(err instanceof Error ? err.message : 'Failed to load consultation');
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     run();

//     return () => {
//       cancelled = true;
//       roomRef.current?.disconnect();
//       roomRef.current = null;
//       listenersAttachedRef.current = false;
//     };
//   }, [id, fetchTranscriptHistory, fetchSoapHistory]);

//   // ─── Generate SOAP on demand ────────────────────────────────────────────────

//   const handleGenerateSoap = useCallback(async () => {
//     if (!slug || isGenerating) return;
//     setIsGenerating(true);
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/soap/${slug}/generate`
//       );
//       setLiveSoapNote(toSoapNote(data as RawSoap));
//     } catch (err) {
//       console.error('Failed to generate SOAP note', err);
//     } finally {
//       setIsGenerating(false);
//     }
//   }, [slug, isGenerating]);

//   // ─── LiveKit room ───────────────────────────────────────────────────────────

//   const joinCall = async () => {
//     setJoinError(null);
//     setIsConnecting(true);

//     try {
//       const { token, livekitUrl } = await getConsultationJoinToken(slug, 'doctor');

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

//           // Transcript finals
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
//                   id: `t-${entryIdRef.current++}`,
//                   timestamp: formatClockTime(message.timestamp),
//                   speaker:
//                     message.role === 'doctor' ? 'Doctor'
//                     : message.role === 'patient' ? 'Patient'
//                     : 'Unknown',
//                   speakerType: message.role === 'doctor' ? 'doctor' : 'patient',
//                   text: message.text,
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

//   // ─── Timers ─────────────────────────────────────────────────────────────────

//   useEffect(() => {
//     if (!isLive || callStartRef.current === null) return;
//     const tick = setInterval(() => {
//       setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
//     }, 1000);
//     return () => clearInterval(tick);
//   }, [isLive]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [transcriptEntries]);

//   // ─── End consultation ───────────────────────────────────────────────────────

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

//   // ─── Render ─────────────────────────────────────────────────────────────────

//   if (loading) {
//     return (
//       <div className="py-12 text-center text-sm text-gray-500">
//         Loading consultation details…
//       </div>
//     );
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
//           <div ref={bottomRef} />
//         </div>

//         <AIClinicalNoteCard
//           note={liveSoapNote}
//           onGenerate={handleGenerateSoap}
//           isGenerating={isGenerating}
//         />
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
  clinicalShortcuts,
  icd10Suggestions,
  timelineEvents,
} from '@/data/demoData';
import { useConnectionStats } from '@/hooks/useConnectionStats';
import {
  fetchConsultationById,
  getConsultationJoinToken,
  endConsultationMeeting,
} from '@/lib/api/consultations';
import type { Consultation, TranscriptEntry, SoapNote } from '@/types';
import type { CallParticipant } from '@/types/patient';
import type { Participant, RemoteParticipant } from 'livekit-client';

// ─── Constants ────────────────────────────────────────────────────────────────

const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#e11d48', '#7c3aed'];

const EMPTY_SOAP: SoapNote = {
  subjective: '',
  objective:  '',
  assessment: '',
  plan:       [],
  status:     'draft',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const colorForIdentity = (identity: string) => {
  const hash = identity.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
};

const toCallParticipant = (participant: Participant | RemoteParticipant): CallParticipant => {
  const videoPublication = Array.from(participant.videoTrackPublications.values())[0];
  return {
    id:           participant.identity,
    displayName:  participant.name || participant.identity,
    avatarColor:  colorForIdentity(participant.identity),
    micActive:    participant.isMicrophoneEnabled,
    videoTrack:   videoPublication?.track ?? undefined,
    isLocal:      false,
  };
};

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

// ─── SOAP types ───────────────────────────────────────────────────────────────

interface RawSoap {
  subjective: string;
  objective:  string;
  assessment: string;
  plan:       string | string[];
  status?:    string;
}

function normalisePlan(plan: string | string[]): string[] {
  if (Array.isArray(plan)) return plan.filter(Boolean);
  return plan
    .split(/\n|;/)
    .map((s) => s.replace(/^[-•*]\s*/, '').trim())
    .filter(Boolean);
}

function toSoapNote(raw: RawSoap): SoapNote {
  return {
    subjective: raw.subjective,
    objective:  raw.objective,
    assessment: raw.assessment,
    plan:       normalisePlan(raw.plan),
    status:     raw.status === 'final' ? 'final' : 'draft',
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConsultationPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const roomRef              = useRef<Room | null>(null);
  const callStartRef         = useRef<number | null>(null);
  const listenersAttachedRef = useRef(false);
  const entryIdRef           = useRef(0);
  const bottomRef            = useRef<HTMLDivElement>(null);

  const [loading,       setLoading]       = useState(true);
  const [loadError,     setLoadError]     = useState<string | null>(null);
  const [joinError,     setJoinError]     = useState<string | null>(null);

  const [patientName,   setPatientName]   = useState('');
  const [slug,          setSlug]          = useState('');
  const [isLive,        setIsLive]        = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [isConnecting,  setIsConnecting]  = useState(false);
  const [isEnding,      setIsEnding]      = useState(false);
  const [hasJoined,     setHasJoined]     = useState(false);
  const [meetingEnded,  setMeetingEnded]  = useState(false);

  const [liveParticipants,  setLiveParticipants]  = useState<CallParticipant[]>([]);
  const [transcriptEntries, setTranscriptEntries] = useState<TranscriptEntry[]>([]);

  const [liveSoapNote,  setLiveSoapNote]  = useState<SoapNote>(EMPTY_SOAP);
  const [isGenerating,  setIsGenerating]  = useState(false);

  // Mic state in React state — NOT read from roomRef during render
  const [micName,       setMicName]       = useState('Default microphone');
  const [micConnected,  setMicConnected]  = useState(false);

  // Stable room reference for the stats hook — updated via state so the
  // hook re-subscribes whenever the room changes.
  const [liveRoom, setLiveRoom] = useState<Room | null>(null);
  const connectionStats = useConnectionStats(liveRoom);

  // ─── Participants + mic sync ────────────────────────────────────────────────

  const refreshParticipants = useCallback(() => {
    const room = roomRef.current;
    if (!room) return;

    setLiveParticipants(
      Array.from(room.remoteParticipants.values()).map(toCallParticipant)
    );

    // Sync mic state into proper React state so it's safe to read during render
    const local = room.localParticipant;
    if (local) {
      setMicName(local.name || 'Default microphone');
      setMicConnected(local.isMicrophoneEnabled);
    }
  }, []);

  // ─── Data fetching ──────────────────────────────────────────────────────────

  const fetchTranscriptHistory = useCallback(async (roomName: string) => {
    if (!roomName) return;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/transcripts/${roomName}`
      );
      type APITranscriptItem = {
        id:         number | string;
        timestamp:  string;
        role:       'doctor' | 'patient' | string;
        transcript: string;
      };
      const history: TranscriptEntry[] = (data as APITranscriptItem[]).map((item) => ({
        id:          `h-${item.id}`,
        timestamp:   formatClockTime(new Date(item.timestamp).getTime()),
        speaker:     item.role === 'doctor' ? 'Doctor' : item.role === 'patient' ? 'Patient' : 'Unknown',
        speakerType: item.role === 'doctor' ? 'doctor' : 'patient',
        text:        item.transcript,
      }));
      setTranscriptEntries(history);
    } catch (err) {
      console.error('Failed to load transcript history', err);
    }
  }, []);

  const fetchSoapHistory = useCallback(async (roomName: string) => {
    if (!roomName) return;
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/soap/${roomName}`
      );
      if (data) setLiveSoapNote(toSoapNote(data as RawSoap));
    } catch {
      // 404 = no note yet — keep EMPTY_SOAP so the card shows Generate
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    callStartRef.current = null;

    const run = async () => {
      try {
        const record = await fetchConsultationById(id);
        if (cancelled) return;

        setPatientName(record.patientName);
        setSlug(record.slug);

        await Promise.all([
          fetchTranscriptHistory(record.slug),
          fetchSoapHistory(record.slug),
        ]);
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : 'Failed to load consultation');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
      roomRef.current?.disconnect();
      roomRef.current = null;
      listenersAttachedRef.current = false;
    };
  }, [id, fetchTranscriptHistory, fetchSoapHistory]);

  // ─── Generate SOAP on demand ────────────────────────────────────────────────

  const handleGenerateSoap = useCallback(async () => {
    if (!slug || isGenerating) return;
    setIsGenerating(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/soap/${slug}/generate`
      );
      setLiveSoapNote(toSoapNote(data as RawSoap));
    } catch (err) {
      console.error('Failed to generate SOAP note', err);
    } finally {
      setIsGenerating(false);
    }
  }, [slug, isGenerating]);

  // ─── LiveKit room ───────────────────────────────────────────────────────────

  const joinCall = async () => {
    setJoinError(null);
    setIsConnecting(true);

    try {
      const { token, livekitUrl } = await getConsultationJoinToken(slug, 'doctor');

      const room = roomRef.current ?? new Room();
      roomRef.current = room;

      if (!listenersAttachedRef.current) {
        room.on(RoomEvent.Connected, () => {
          callStartRef.current = Date.now();
          setIsLive(true);
          setHasJoined(true);
          setLiveRoom(room); // expose room to the stats hook via state
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

  // ─── Timers ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isLive || callStartRef.current === null) return;
    const tick = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - callStartRef.current!) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [isLive]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcriptEntries]);

  // ─── End consultation ───────────────────────────────────────────────────────

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
      setLiveRoom(null);
      setLiveParticipants([]);
      setMicConnected(false);
      setMeetingEnded(true);
      setIsEnding(false);
    }
  }, [slug, isEnding, meetingEnded]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-gray-500">
        Loading consultation details…
      </div>
    );
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

        <AIClinicalNoteCard
          note={liveSoapNote}
          onGenerate={handleGenerateSoap}
          isGenerating={isGenerating}
        />
      </div>

      <div className="mb-4">
        <AudioStatusCard
          stats={connectionStats}
          microphoneName={micName}
          microphoneConnected={micConnected}
        />
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
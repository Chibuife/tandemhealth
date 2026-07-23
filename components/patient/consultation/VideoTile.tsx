'use client';

import { useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { CallParticipant } from '@/types/patient';

interface Props {
  participant: CallParticipant;
}

export function VideoTile({ participant }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attach/detach the live track when it's present. participant.videoTrack
  // is a minimal AttachableTrack (any object with attach/detach - this
  // matches LiveKit's Track class without importing livekit-client here).
  useEffect(() => {
    const track = participant.videoTrack;
    const el = videoRef.current;

    if (track && el) {
      track.attach(el);
      return () => {
        track.detach(el);
      };
    }
  }, [participant.videoTrack]);

  const initials = participant.displayName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className="relative flex aspect-video flex-1 items-center justify-center overflow-hidden rounded-2xl"
      style={{ backgroundColor: participant.avatarColor }}
    >
      {participant.videoTrack ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={participant.isLocal}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-4xl font-bold text-ink/40">{initials}</span>
      )}

      <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-live">
        {participant.micActive ? (
          <Mic size={14} className="text-surface" />
        ) : (
          <MicOff size={14} className="text-surface" />
        )}
      </span>

      <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-surface">
        {participant.displayName}
      </span>
    </div>
  );
}

export default VideoTile;
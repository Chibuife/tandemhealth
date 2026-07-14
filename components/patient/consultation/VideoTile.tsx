'use client';

import { Mic, MicOff } from 'lucide-react';
import { CallParticipant } from '@/types/patient';

interface Props {
  participant: CallParticipant;
}

/**
 * Placeholder video tile. In production this would host a real <video>
 * element bound to a WebRTC track; here we render a colored panel with
 * initials so the layout can be reviewed without a live stream.
 */
export function VideoTile({ participant }: Props) {
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
      <span className="text-4xl font-bold text-ink/40">{initials}</span>

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

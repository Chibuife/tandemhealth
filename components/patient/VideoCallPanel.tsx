'use client';

import { VideoTile } from './VideoTile';
import { CallControlsBar } from './CallControlsBar';
import { CallParticipant } from '@/types/patient';

interface Props {
  participants: CallParticipant[];
}

export function VideoCallPanel({ participants }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-3 flex gap-3">
        {participants.map((participant) => (
          <VideoTile key={participant.id} participant={participant} />
        ))}
      </div>
      <CallControlsBar />
    </div>
  );
}

export default VideoCallPanel;

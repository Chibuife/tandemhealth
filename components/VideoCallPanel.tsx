// 'use client';

// import { UserRound } from 'lucide-react';
// import { VideoTile } from './patient/consultation/VideoTile';
// import { CallControlsBar } from './patient/consultation/CallControlsBar';
// import { CallParticipant } from '@/types/patient';

// interface Props {
//   participants: CallParticipant[];
// }

// function EmptyCallState() {
//   return (
//     <div className="flex aspect-video flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
//       <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
//         <UserRound size={22} className="text-slate-400" />
//       </div>
//       <p className="text-sm font-medium text-slate-500">Waiting for participants to join…</p>
//     </div>
//   );
// }

// export function VideoCallPanel({ participants }: Props) {
//   return (
//     <div className="mb-4">
//       <div className="mb-3 flex gap-3">
//         {participants.length === 0 ? (
//           <EmptyCallState />
//         ) : (
//           participants.map((participant) => (
//             <VideoTile key={participant.id} participant={participant} />
//           ))
//         )}
//       </div>
//       <CallControlsBar />
//     </div>
//   );
// }

// export default VideoCallPanel;
'use client';

import { UserRound } from 'lucide-react';
import { VideoTile } from './patient/consultation/VideoTile';
import { CallControlsBar } from './patient/consultation/CallControlsBar';
import { CallParticipant } from '@/types/patient';
import type { Room } from 'livekit-client';

interface Props {
  participants: CallParticipant[];
  room?: Room | null;
}

function EmptyCallState() {
  return (
    <div className="flex aspect-video flex-1 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
        <UserRound size={22} className="text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-500">Waiting for participants to join…</p>
    </div>
  );
}

export function VideoCallPanel({ participants, room = null }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-3 flex gap-3">
        {participants.length === 0 ? (
          <EmptyCallState />
        ) : (
          participants.map((participant) => (
            <VideoTile key={participant.id} participant={participant} />
          ))
        )}
      </div>
      <CallControlsBar room={room} />
    </div>
  );
}

export default VideoCallPanel;
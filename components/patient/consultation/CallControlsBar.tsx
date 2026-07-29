// 'use client';

// import { Mic, MoreHorizontal, MessageSquare, MonitorUp, Phone, Video } from 'lucide-react';

// interface ControlButtonProps {
//   icon: React.ReactNode;
//   label: string;
// }

// function ControlButton({ icon, label }: ControlButtonProps) {
//   return (
//     <button className="flex items-center rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10">
//       <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
//         {icon}
//       </span>
//       <span className="text-xs font-medium">{label}</span>
//     </button>
//   );
// }

// export function CallControlsBar() {
//   return (
//     <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-2.5">
//       <div className="flex items-center gap-1">
//         <ControlButton icon={<Mic size={15} />} label="Microphone" />
//         <ControlButton icon={<Video size={15} />} label="Camera" />
//         <ControlButton icon={<MonitorUp size={15} />} label="Share screen" />
//         {/* <ControlButton icon={<MessageSquare size={15} />} label="Chat" /> */}
//         <ControlButton icon={<MoreHorizontal size={15} />} label="More" />
//       </div>

//       {/* <button className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2.5 transition hover:bg-red-600">
//         <Phone size={15} className="rotate-[135deg] text-white" />
//         <span className="text-xs font-semibold text-white">Leave</span>
//       </button> */}
//     </div>
//   );
// }

// export default CallControlsBar;
'use client';

import { Mic, MicOff, Video, VideoOff, MonitorUp, MoreHorizontal } from 'lucide-react';
import { useState, useCallback } from 'react';
import type { Room } from 'livekit-client';

interface Props {
  room: Room | null;
}

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;   // true = feature is ON (mic/cam enabled)
  muted?: boolean;    // true = currently muted/off
  onClick?: () => void;
}

function ControlButton({ icon, label, muted = false, onClick }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10 ${
        muted ? 'opacity-60' : ''
      }`}
    >
      <span
        className={`mr-2 flex h-8 w-8 items-center justify-center rounded-full transition ${
          muted ? 'bg-red-500/80' : 'bg-white/10'
        }`}
      >
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export function CallControlsBar({ room }: Props) {
  const [micEnabled,    setMicEnabled]    = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [isTogglingMic, setIsTogglingMic] = useState(false);
  const [isTogglingCam, setIsTogglingCam] = useState(false);

  const toggleMic = useCallback(async () => {
    if (!room || isTogglingMic) return;
    setIsTogglingMic(true);
    try {
      await room.localParticipant.setMicrophoneEnabled(!micEnabled);
      setMicEnabled((prev) => !prev);
    } catch (err) {
      console.error('Failed to toggle mic', err);
    } finally {
      setIsTogglingMic(false);
    }
  }, [room, micEnabled, isTogglingMic]);

  const toggleCamera = useCallback(async () => {
    if (!room || isTogglingCam) return;
    setIsTogglingCam(true);
    try {
      await room.localParticipant.setCameraEnabled(!cameraEnabled);
      setCameraEnabled((prev) => !prev);
    } catch (err) {
      console.error('Failed to toggle camera', err);
    } finally {
      setIsTogglingCam(false);
    }
  }, [room, cameraEnabled, isTogglingCam]);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-2.5">
      <div className="flex items-center gap-1">

        {/* Mic toggle */}
        <ControlButton
          icon={micEnabled ? <Mic size={15} /> : <MicOff size={15} />}
          label={micEnabled ? 'Microphone' : 'Unmute'}
          muted={!micEnabled}
          onClick={toggleMic}
        />

        {/* Camera toggle */}
        <ControlButton
          icon={cameraEnabled ? <Video size={15} /> : <VideoOff size={15} />}
          label={cameraEnabled ? 'Camera' : 'Start video'}
          muted={!cameraEnabled}
          onClick={toggleCamera}
        />

        <ControlButton icon={<MonitorUp size={15} />} label="Share screen" />
        <ControlButton icon={<MoreHorizontal size={15} />} label="More" />
      </div>
    </div>
  );
}

export default CallControlsBar;
'use client';

import { Mic, MoreHorizontal, MessageSquare, MonitorUp, Phone, Video } from 'lucide-react';

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ControlButton({ icon, label }: ControlButtonProps) {
  return (
    <button className="flex items-center rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10">
      <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
        {icon}
      </span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

export function CallControlsBar() {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-2.5">
      <div className="flex items-center gap-1">
        <ControlButton icon={<Mic size={15} />} label="Microphone" />
        <ControlButton icon={<Video size={15} />} label="Camera" />
        <ControlButton icon={<MonitorUp size={15} />} label="Share screen" />
        <ControlButton icon={<MessageSquare size={15} />} label="Chat" />
        <ControlButton icon={<MoreHorizontal size={15} />} label="More" />
      </div>

      <button className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2.5 transition hover:bg-red-600">
        <Phone size={15} className="rotate-[135deg] text-white" />
        <span className="text-xs font-semibold text-white">Leave</span>
      </button>
    </div>
  );
}

export default CallControlsBar;

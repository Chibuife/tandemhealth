'use client';

import { ArrowRight, ClipboardList, FilePlus, LucideIcon, PlusCircle, Send } from 'lucide-react';
import { Card } from '../../Card';
import { ClinicalShortcut, ShortcutTint } from '@/types';

interface Props {
  shortcuts: ClinicalShortcut[];
}

const ICON_MAP: Record<ClinicalShortcut['icon'], LucideIcon> = {
  FilePlus,
  Send,
  ClipboardList,
  PlusCircle,
};

const TINT_MAP: Record<ShortcutTint, { bg: string; fg: string }> = {
  red: { bg: 'bg-chip-redBg', fg: 'text-chip-redText' },
  blue: { bg: 'bg-chip-blueBg', fg: 'text-chip-blueText' },
  purple: { bg: 'bg-chip-purpleBg', fg: 'text-chip-purpleText' },
  green: { bg: 'bg-live-bg', fg: 'text-live' },
};

function ShortcutRow({ item }: { item: ClinicalShortcut }) {
  const Icon = ICON_MAP[item.icon];
  const tint = TINT_MAP[item.tint];

  return (
    <button className="mb-2.5 flex w-full items-center text-left">
      <span className={`mr-2.5 flex h-7 w-7 items-center justify-center rounded-lg ${tint.bg}`}>
        <Icon size={14} className={tint.fg} />
      </span>
      <span className="text-xs font-semibold text-ink">{item.label}</span>
    </button>
  );
}

export function ClinicalShortcutsCard({ shortcuts }: Props) {
  return (
    <Card className="flex-1">
      <h2 className="mb-3 text-sm font-bold text-ink">Clinical shortcuts</h2>

      {shortcuts.map((item) => (
        <ShortcutRow key={item.id} item={item} />
      ))}

      <button className="mt-1 flex items-center text-xs font-bold text-ink">
        More actions
        <ArrowRight size={13} className="ml-1" />
      </button>
    </Card>
  );
}

export default ClinicalShortcutsCard;
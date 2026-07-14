import { Share2, Printer, Save, LucideIcon } from 'lucide-react';
import { SendPrescriptionOption, SendPrescriptionIcon } from '@/types/patient';

const ICON_MAP: Record<SendPrescriptionIcon, LucideIcon> = {
  Share2,
  Printer,
  Save,
};

interface SendPrescriptionCardProps {
  options: SendPrescriptionOption[];
}

export function SendPrescriptionCard({ options }: SendPrescriptionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Send prescription</h3>
      <p className="mb-3 text-sm text-muted-foreground">Choose how you want to send this prescription.</p>

      <ul>
        {options.map((option) => {
          const Icon = ICON_MAP[option.icon];
          return (
            <li key={option.id}>
              <button className="flex w-full items-center gap-3 rounded-lg py-2.5 text-left hover:bg-muted/40">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border">
                  <Icon className="h-4 w-4 text-fg" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-fg">{option.title}</span>
                  <span className="block text-xs text-muted-foreground">{option.description}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SendPrescriptionCard;
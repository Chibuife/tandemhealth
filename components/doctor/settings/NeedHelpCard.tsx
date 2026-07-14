import { HelpCircle, MessageCircle } from "lucide-react";

interface NeedHelpCardProps {
  onHelpCenter?: () => void;
  onContactSupport?: () => void;
}

export default function NeedHelpCard({ onHelpCenter, onContactSupport }: NeedHelpCardProps) {
  return (
    <div className="mt-4 rounded-2xl border border-violet-100 bg-violet-50 p-5">
      <h3 className="text-sm font-semibold text-violet-700">Need help?</h3>
      <p className="mt-1 text-sm text-violet-700/80">
        Visit our help center or contact support if you need assistance.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onHelpCenter}
          className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-fg hover:bg-violet-100/50"
        >
          <HelpCircle className="h-4 w-4" />
          Help center
        </button>
        <button
          type="button"
          onClick={onContactSupport}
          className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-fg hover:bg-violet-100/50"
        >
          <MessageCircle className="h-4 w-4" />
          Contact support
        </button>
      </div>
    </div>
  );
}
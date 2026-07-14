import { Puzzle } from "lucide-react";

interface CustomIntegrationBannerProps {
  onContactTeam?: () => void;
}

export default function CustomIntegrationBanner({ onContactTeam }: CustomIntegrationBannerProps) {
  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl border border-violet-100 bg-violet-50 p-5">
      <div className="relative z-10 max-w-[75%]">
        <h3 className="text-sm font-semibold text-violet-700">Need a custom integration?</h3>
        <p className="mt-1 text-sm text-violet-700/80">
          Our team can help build a custom integration for your workflow.
        </p>

        <button
          type="button"
          onClick={onContactTeam}
          className="mt-3 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-fg hover:bg-violet-100/50"
        >
          Contact integration team
        </button>
      </div>

      <Puzzle className="absolute -bottom-3 -right-3 h-20 w-20 text-violet-200" strokeWidth={1.5} />
    </div>
  );
}
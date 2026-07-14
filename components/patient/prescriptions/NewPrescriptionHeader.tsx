import { ArrowLeft, ChevronDown } from 'lucide-react';

export function NewPrescriptionHeader() {
  return (
    <div className="mb-4">
      <button className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-fg">
        <ArrowLeft className="h-4 w-4" />
        Back to prescriptions
      </button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-fg">New prescription</h1>

        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
            Cancel
          </button>
          <div className="flex items-center overflow-hidden rounded-lg bg-fg text-bg">
            <button className="px-4 py-2 text-sm font-medium hover:opacity-90">Save prescription</button>
            <button
              className="flex h-full items-center border-l border-bg/20 px-2.5 py-2 hover:opacity-90"
              aria-label="More save options"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPrescriptionHeader;
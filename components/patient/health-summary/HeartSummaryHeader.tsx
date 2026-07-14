import { ArrowLeft, Heart, Download, Share2 } from 'lucide-react';

export function HeartSummaryHeader() {
  return (
    <div className="mb-4">
      <button className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-fg">
        <ArrowLeft className="h-4 w-4" />
        Back to overview
      </button>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-fg">Heart summary</h1>
            <Heart className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Comprehensive overview of your heart health.</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
            <Download className="h-4 w-4" />
            Download report
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
            <Share2 className="h-4 w-4" />
            Share report
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeartSummaryHeader;
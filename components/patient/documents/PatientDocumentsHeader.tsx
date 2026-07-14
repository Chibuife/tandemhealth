import { Upload, Plus } from 'lucide-react';

export function PatientDocumentsHeader() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Documentation</h1>
        <p className="mt-1 text-sm text-muted-foreground">View, manage and share clinical documents securely.</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
          <Upload className="h-4 w-4" />
          Upload
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          <Plus className="h-4 w-4" />
          New document
        </button>
      </div>
    </div>
  );
}

export default PatientDocumentsHeader;
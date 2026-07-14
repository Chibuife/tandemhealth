import { Plus } from "lucide-react";

export default function TasksHeader() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-fg">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">Stay on top of your clinical and administrative tasks.</p>
      </div>

      <button className="inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
        <Plus className="h-4 w-4" />
        New task
      </button>
    </div>
  );
}
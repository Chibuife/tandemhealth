import { Plus } from 'lucide-react';

export function TasksHeader() {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ink sm:text-[28px]">Tasks</h1>
        <p className="mt-1 text-sm text-muted">
          Stay on top of your health by completing important tasks.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 self-start rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white sm:self-auto">
        <Plus size={16} />
        New task
      </button>
    </div>
  );
}

export default TasksHeader;
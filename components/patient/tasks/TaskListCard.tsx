'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { Badge } from '@/components/doctor/Badge';
import { TaskFiltersBar } from './TaskFiltersBar';
import { tasks } from '@/data/patientDemoData';

const TABS = ['All tasks', 'Due soon', 'In progress', 'Completed'];
const PAGE_SIZE = 8;

export function TaskListCard() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);

  const pageItems = tasks.slice(0, PAGE_SIZE);
  const totalPages = 2;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-6 overflow-x-auto border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'shrink-0 whitespace-nowrap border-b-2 pb-2.5 text-sm font-medium transition',
              activeTab === tab
                ? 'border-emerald-600 font-semibold text-ink'
                : 'border-transparent text-muted hover:text-ink',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <TaskFiltersBar />

      <div className="-mx-1 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="w-8 px-1 py-2">
                <input type="checkbox" className="h-4 w-4 rounded border-border" />
              </th>
              <th className="px-1 py-2 font-medium">Task</th>
              <th className="px-1 py-2 font-medium">Category</th>
              <th className="px-1 py-2 font-medium">Due date</th>
              <th className="px-1 py-2 font-medium">Priority</th>
              <th className="px-1 py-2 font-medium">Status</th>
              <th className="w-8 px-1 py-2" />
            </tr>
          </thead>
          <tbody>
            {pageItems.map((task) => {
              const Icon = task.icon;
              return (
                <tr key={task.id} className="border-t border-border text-sm">
                  <td className="px-1 py-3 align-top">
                    <input
                      type="checkbox"
                      checked={!!checked[task.id]}
                      onChange={() => toggle(task.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </td>
                  <td className="px-1 py-3">
                    <div className="flex items-start gap-3">
                      <span
                        className={clsx(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                          task.iconBg,
                          task.iconColor,
                        )}
                      >
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <p className="whitespace-nowrap text-sm font-semibold text-ink">{task.title}</p>
                        <p className="whitespace-nowrap text-xs text-muted">{task.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 align-top">
                    <Badge label={task.category} color={task.categoryColor} />
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 align-top text-muted">{task.dueDate}</td>
                  <td className="whitespace-nowrap px-1 py-3 align-top">
                    <Badge label={task.priority} color={task.priorityColor} />
                  </td>
                  <td className="whitespace-nowrap px-1 py-3 align-top">
                    <Badge label={task.status} color={task.statusColor} />
                  </td>
                  <td className="px-1 py-3 align-top">
                    <button
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border text-muted"
                      aria-label="More actions"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-xs text-muted">
          Showing 1 to {pageItems.length} of {tasks.length + 4} tasks
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted"
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>
          {[1, 2].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                page === n ? 'bg-ink text-white' : 'text-ink hover:bg-bg',
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted"
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskListCard;
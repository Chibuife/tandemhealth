// ConsultationsWorkspace.tsx
'use client';

import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { ConsultationStatus } from '@/types/consultation-list';
import { PendingRequestCard } from './PendingRequestCard';
import { ConsultationRow } from './ConsultationRow';
import { useRouter } from 'next/navigation';
import { ConsultationRecord } from '@/types/consultations';

interface ConsultationsWorkspaceProps {
  consultations: ConsultationRecord[];
  todaysUpcoming: ConsultationRecord[];
  onAccept?: (id: string) => void | Promise<void>;
  onDecline?: (id: string) => void | Promise<void>;
}

type TabKey = 'All' | ConsultationStatus;

const TABS: TabKey[] = ['All', 'Pending', 'Accepted', 'Declined', 'Completed'];

const sectionTitle: Record<TabKey, string> = {
  All: 'All consultations',
  Pending: 'Pending requests',
  Accepted: 'Accepted consultations',
  Declined: 'Declined consultations',
  Completed: 'Completed consultations',
};

export function ConsultationsWorkspace({
  consultations,
  todaysUpcoming,
  onAccept,
  onDecline,
}: ConsultationsWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('Pending');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All types');
  const [priorityFilter, setPriorityFilter] = useState('All priorities');
  const router = useRouter();

  const handleViewMeeting = (id: string) => {
    router.push(`/dashboard/doctor/consultations/${id}`);
  };
  const tabCounts = useMemo(() => {
    return {
      All: consultations.length,
      Pending: consultations.filter((c) => c.status.toLocaleLowerCase() === 'pending').length,
      Accepted: consultations.filter((c) => c.status.toLocaleLowerCase() === 'accepted').length,
      Declined: consultations.filter((c) => c.status.toLocaleLowerCase() === 'declined').length,
      Completed: consultations.filter((c) => c.status.toLocaleLowerCase() === 'completed').length,
    } satisfies Record<TabKey, number>;
  }, [consultations]);

  const filtered = useMemo(() => {
    return consultations
      .filter((c) => activeTab === 'All' || c.status === activeTab.toLocaleLowerCase())
      .filter((c) => {
        const query = search.trim().toLowerCase();
        if (!query) return true;
        return (
          c.patientName.toLowerCase().includes(query) ||
          c.patientId.toLowerCase().includes(query)
        );
      })
      // .filter((c) => typeFilter === 'All types' || c.type === typeFilter)
      .filter((c) => priorityFilter === 'All priorities' || c.priority === priorityFilter);
  }, [consultations, activeTab, search, typeFilter, priorityFilter]);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      {/* Tabs — horizontally scrollable on narrow screens instead of wrapping/overflowing */}
      <div className="-mx-1 overflow-x-auto">
        <div className="flex min-w-max gap-6 border-b border-slate-200 px-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab === "All" ? "All" : tab)}
              className={`relative shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition ${activeTab === tab ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                }`}
            >
              {tab} ({tabCounts[tab]})
              {activeTab === tab && (
                <span className="absolute -bottom-px left-0 h-0.5 w-full rounded-full bg-emerald-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by patient name or ID..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          className="min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        >
          <option>All types</option>
          <option>General Consultation</option>
          <option>Follow-up</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          className="min-w-0 max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        >
          <option>All priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Filtered list */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">
            {sectionTitle[activeTab]} ({filtered.length})
          </h2>
        </div>

        {filtered.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            No consultations match your filters.
          </p>
        ) : (
          <div className="overflow-x-auto">
            {filtered.map((record) => (
              <div key={record.id} className="group relative">
                {record.status.toLocaleLowerCase() === 'pending' ? (
                  <PendingRequestCard
                    request={record}
                    onAccept={onAccept}
                    onDecline={onDecline}
                  />
                ) : (
                  <ConsultationRow consultation={record} />
                )}
                <button
                  type="button"
                  onClick={() => handleViewMeeting(record.id)}
                  className="absolute right-5 top-3 text-xs font-medium text-slate-400 opacity-0 transition hover:text-slate-600 group-hover:opacity-100"
                >
                  View meeting
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Pending' && (
          <div className="border-t border-slate-100 px-5 py-3">
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
              View all pending requests
              <span aria-hidden>&rarr;</span>
            </button>
          </div>
        )}
      </div>

      {/* Always-visible today's upcoming (accepted) consultations */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/40 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-sm font-semibold text-blue-700">Upcoming consultations</h2>
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
        <div className="overflow-x-auto border-t border-blue-100 bg-white">
          {todaysUpcoming.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">
              No upcoming consultations today.
            </p>
          ) : (
            todaysUpcoming.map((record) => <ConsultationRow key={record.id} consultation={record} />)
          )}
        </div>
      </div>
    </div>
  );
}

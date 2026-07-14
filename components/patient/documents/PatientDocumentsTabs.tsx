'use client';

import { useState } from 'react';
import clsx from 'clsx';

const tabs = ['All documents', 'Clinical notes', 'Lab results', 'Imaging', 'Forms', 'Reports', 'Letters', 'Other'];

export function PatientDocumentsTabs() {
  const [activeTab, setActiveTab] = useState('All documents');

  return (
    <div className="mb-4 flex gap-6 overflow-x-auto border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors',
              isActive ? 'border-emerald-500 text-fg' : 'border-transparent text-muted-foreground hover:text-fg',
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

export default PatientDocumentsTabs;
'use client';

import { useState } from 'react';

const MAX_LENGTH = 500;
const DEFAULT_VALUE = 'Patient has no known drug allergies.';

export function PrescriptionNotesCard() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Prescription notes (optional)</h3>
      <p className="mb-3 text-sm text-muted-foreground">Add notes for the pharmacy or internal use.</p>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
          rows={5}
          className="w-full resize-none rounded-lg border border-border bg-card p-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-muted-foreground">
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}

export default PrescriptionNotesCard;
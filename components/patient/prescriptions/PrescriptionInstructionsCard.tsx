'use client';

import { useState } from 'react';

const MAX_LENGTH = 1000;
const DEFAULT_VALUE =
  'Take Amoxicillin after meals. Complete the full course even if you feel better. Paracetamol can be taken for pain or fever. Do not exceed 4 grams per day. Omeprazole to be taken in the morning before breakfast.';

export function PrescriptionInstructionsCard() {
  const [value, setValue] = useState(DEFAULT_VALUE);

  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Prescription instructions</h3>
      <p className="mb-3 text-sm text-muted-foreground">Add any additional instructions for the patient.</p>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LENGTH))}
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-card p-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 text-xs text-muted-foreground">
          {value.length}/{MAX_LENGTH}
        </span>
      </div>
    </div>
  );
}

export default PrescriptionInstructionsCard;
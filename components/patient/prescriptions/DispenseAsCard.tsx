'use client';

import { useState } from 'react';
import clsx from 'clsx';

const options = [
  { id: 'all', title: 'All medications', description: 'Dispense all medications together' },
  { id: 'partial', title: 'Partial', description: 'Allow pharmacy to dispense partially' },
  { id: 'as-written', title: 'As written', description: 'Do not substitute' },
];

export function DispenseAsCard() {
  const [selected, setSelected] = useState('all');

  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-semibold text-fg">Dispense as</h3>
      <p className="mb-3 text-sm text-muted-foreground">Choose how this prescription should be dispensed.</p>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = option.id === selected;
          return (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/40"
            >
              <span
                className={clsx(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
                  isSelected ? 'border-fg' : 'border-border',
                )}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-fg" />}
              </span>
              <span>
                <span className="block text-sm font-medium text-fg">{option.title}</span>
                <span className="block text-xs text-muted-foreground">{option.description}</span>
              </span>
              <input
                type="radio"
                name="dispense-as"
                value={option.id}
                checked={isSelected}
                onChange={() => setSelected(option.id)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default DispenseAsCard;
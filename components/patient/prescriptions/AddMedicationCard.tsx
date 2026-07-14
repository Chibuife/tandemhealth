import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { PrescriptionMedication } from '@/types/patient';

interface AddMedicationCardProps {
  medications: PrescriptionMedication[];
}

export function AddMedicationCard({ medications }: AddMedicationCardProps) {
  return (
    <div className="mb-4 rounded-xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-fg">Add medication</h3>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search medications (e.g. Amoxicillin 500mg)"
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-fg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-fg hover:bg-muted">
          <Plus className="h-4 w-4" />
          Add medication
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-2 pr-4 font-medium">Medication</th>
              <th className="py-2 pr-4 font-medium">Dose</th>
              <th className="py-2 pr-4 font-medium">Route</th>
              <th className="py-2 pr-4 font-medium">Frequency</th>
              <th className="py-2 pr-4 font-medium">Duration</th>
              <th className="py-2 pr-4 font-medium">Quantity</th>
              <th className="py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication) => (
              <tr key={medication.id} className="border-b border-border last:border-0">
                <td className="py-3 pr-4">
                  <p className="font-medium text-fg">{medication.name}</p>
                  <p className="text-xs text-muted-foreground">{medication.form}</p>
                </td>
                <td className="py-3 pr-4 text-fg">{medication.dose}</td>
                <td className="py-3 pr-4 text-fg">{medication.route}</td>
                <td className="py-3 pr-4 text-fg">{medication.frequency}</td>
                <td className="py-3 pr-4 text-fg">{medication.duration}</td>
                <td className="py-3 pr-4 text-fg">{medication.quantity}</td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-fg" aria-label="Edit medication">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-fg" aria-label="Remove medication">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm font-medium text-fg hover:bg-muted">
        <Plus className="h-4 w-4" />
        Add another medication
      </button>
    </div>
  );
}

export default AddMedicationCard;
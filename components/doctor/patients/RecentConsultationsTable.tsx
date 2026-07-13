import { FileText } from "lucide-react";
import { Patient } from "@/lib/patients/types";

interface RecentConsultationsTableProps {
  patient: Patient;
}

export default function RecentConsultationsTable({ patient }: RecentConsultationsTableProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fg">Recent consultations</h3>
        <button type="button" className="text-sm font-medium text-fg-muted hover:text-fg">
          View all consultations
        </button>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs text-fg-muted">
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Reason</th>
              <th className="pb-2 font-medium">Clinician</th>
              <th className="pb-2 font-medium">Type</th>
              <th className="pb-2 font-medium">Note</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patient.consultations.map((consultation) => (
              <tr key={consultation.id}>
                <td className="py-3 pr-4 text-fg">
                  {consultation.date}, {consultation.time}
                </td>
                <td className="py-3 pr-4 text-fg">{consultation.reason}</td>
                <td className="py-3 pr-4 text-fg">{consultation.clinician}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      consultation.type === "In-person"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {consultation.type}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-blue-600 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Clinical note
                  </button>
                </td>
                <td className="py-3 pr-4">
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    {consultation.status}
                  </span>
                </td>
              </tr>
            ))}

            {patient.consultations.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-fg-muted">
                  No consultations recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
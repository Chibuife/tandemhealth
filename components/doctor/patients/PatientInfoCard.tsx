import { Patient } from "@/lib/patients/types";

interface PatientInfoCardProps {
  patient: Patient;
}

export default function PatientInfoCard({ patient }: PatientInfoCardProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Date of birth", value: patient.dateOfBirth },
    { label: "Address", value: patient.address },
    { label: "Phone", value: patient.phone },
    { label: "Email", value: patient.email },
    { label: "Allergies", value: patient.allergies },
    { label: "Conditions", value: patient.conditions },
    { label: "Blood group", value: patient.bloodGroup },
  ];

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <h3 className="text-sm font-semibold text-fg">Patient information</h3>

      <dl className="mt-3 divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="max-w-[60%] text-right font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
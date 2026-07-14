const clinicians = [
  { initials: "DE", name: "Dr. Emma Larsen", avatarBg: "bg-emerald-100", avatarColor: "text-emerald-700", consultations: 42, notes: 38, timeSaved: "8.2 hrs" },
  { initials: "MC", name: "Dr. Michael Chen", avatarBg: "bg-blue-100", avatarColor: "text-blue-700", consultations: 38, notes: 34, timeSaved: "6.9 hrs" },
  { initials: "SJ", name: "Dr. Sarah Johnson", avatarBg: "bg-orange-100", avatarColor: "text-orange-700", consultations: 28, notes: 24, timeSaved: "5.4 hrs" },
  { initials: "JW", name: "Dr. James Wilson", avatarBg: "bg-violet-100", avatarColor: "text-violet-700", consultations: 22, notes: 18, timeSaved: "3.8 hrs" },
  { initials: "ED", name: "Dr. Emily Davis", avatarBg: "bg-pink-100", avatarColor: "text-pink-700", consultations: 12, notes: 10, timeSaved: "2.1 hrs" },
];

export default function TeamPerformanceTable() {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-fg">Team performance</h3>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-fg hover:bg-muted">
          View full report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground">
              <th className="py-2 font-medium">Clinician</th>
              <th className="py-2 font-medium">Consultations</th>
              <th className="py-2 font-medium">Notes generated</th>
              <th className="py-2 font-medium">Time saved</th>
            </tr>
          </thead>
          <tbody>
            {clinicians.map((clinician) => (
              <tr key={clinician.name} className="border-t border-border">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${clinician.avatarBg} ${clinician.avatarColor}`}
                    >
                      {clinician.initials}
                    </span>
                    <span className="whitespace-nowrap text-fg">{clinician.name}</span>
                  </div>
                </td>
                <td className="py-2.5 text-fg">{clinician.consultations}</td>
                <td className="py-2.5 text-fg">{clinician.notes}</td>
                <td className="py-2.5 text-fg">{clinician.timeSaved}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
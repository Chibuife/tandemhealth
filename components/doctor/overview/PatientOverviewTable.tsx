import { Badge, BadgeColor } from '../Badge';

interface PatientRow {
  id: string;
  name: string;
  lastConsultation: string;
  nextAppointment: string;
  tag: string;
  tagColor: BadgeColor;
  status: string;
  statusColor: BadgeColor;
}

const patients: PatientRow[] = [
  {
    id: '1',
    name: 'Anna Johansen',
    lastConsultation: '12 May 2026',
    nextAppointment: '22 May 2026, 10:30',
    tag: 'Chronic',
    tagColor: 'red',
    status: 'Active',
    statusColor: 'green',
  },
  {
    id: '2',
    name: 'Michael Chen',
    lastConsultation: '12 May 2026',
    nextAppointment: '–',
    tag: 'Follow-up',
    tagColor: 'blue',
    status: 'Active',
    statusColor: 'green',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    lastConsultation: '8 May 2026',
    nextAppointment: '15 May 2026, 14:00',
    tag: 'Asthma',
    tagColor: 'amber',
    status: 'Active',
    statusColor: 'green',
  },
  {
    id: '4',
    name: 'James Wilson',
    lastConsultation: '3 May 2026',
    nextAppointment: '–',
    tag: 'Diabetes',
    tagColor: 'red',
    status: 'Inactive',
    statusColor: 'gray',
  },
  {
    id: '5',
    name: 'Emily Davis',
    lastConsultation: '2 May 2026',
    nextAppointment: '–',
    tag: 'Asthma',
    tagColor: 'amber',
    status: 'Active',
    statusColor: 'green',
  },
];

export function PatientOverviewTable() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-bold text-ink">Patient overview</h2>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink">
          View all patients
        </button>
      </div>

      <div className="-mx-1 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th className="px-1 py-2 font-medium">Patient</th>
              <th className="px-1 py-2 font-medium">Last consultation</th>
              <th className="px-1 py-2 font-medium">Next appointment</th>
              <th className="px-1 py-2 font-medium">Tags</th>
              <th className="px-1 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t border-border text-sm">
                <td className="whitespace-nowrap px-1 py-3 font-semibold text-ink">{patient.name}</td>
                <td className="whitespace-nowrap px-1 py-3 text-muted">{patient.lastConsultation}</td>
                <td className="whitespace-nowrap px-1 py-3 text-muted">{patient.nextAppointment}</td>
                <td className="whitespace-nowrap px-1 py-3">
                  <Badge label={patient.tag} color={patient.tagColor} />
                </td>
                <td className="whitespace-nowrap px-1 py-3">
                  <Badge label={patient.status} color={patient.statusColor} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientOverviewTable;
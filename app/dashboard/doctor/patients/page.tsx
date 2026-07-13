"use client";

import { useMemo, useState } from "react";
import PatientsHeader from "@/components/doctor/patients/PatientsHeader";
import PatientsStats from "@/components/doctor/patients/PatientsStats";
import PatientsList from "@/components/doctor/patients/PatientsList";
import PatientDetailPanel from "@/components/doctor/patients/PatientDetailPanel";
import PatientActivityCard from "@/components/doctor/patients/PatientActivityCard";
import PatientTagsCard from "@/components/doctor/patients/PatientTagsCard";
import { patients } from "@/lib/patients/mock-data";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);

  const filteredPatients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return patients;

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) ?? patients[0];

  return (
    <div>
      <PatientsHeader />
      <PatientsStats />

      {/* Patient list / patient detail / activity+tags sidebar: 4 / 5 / 3 on large screens */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <PatientsList
            patients={filteredPatients}
            totalCount={patients.length}
            selectedPatientId={selectedPatient.id}
            onSelectPatient={setSelectedPatientId}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        </div>

        <div className="lg:col-span-5">
          <PatientDetailPanel patient={selectedPatient} />
        </div>

        <div className="lg:col-span-3">
          <PatientActivityCard />
          <PatientTagsCard tags={selectedPatient.tags} />
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { usePatientDoctors } from "@/hooks/usePatientDoctors";
import { usePatientConsultations } from "@/hooks/usePatientConsultations";
import { DoctorCard } from "@/components/patient/consultation/DoctorCard";
import { RequestConsultationModal } from "@/components/patient/consultation/RequestConsultationModal";
import { ConsultationRow } from "@/components/doctor/consultations/ConsultationRow";
import type { Doctor } from "@/types/doctor";

export default function PatientConsultationsPage() {
  const { doctors, loading, error, search, setSearch, specialty, setSpecialty, requestMeeting } =
    usePatientDoctors();
  const {
    consultations,
    loading: consultationsLoading,
    error: consultationsError,
    refetch: refetchConsultations,
  } = usePatientConsultations();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Find a doctor</h1>
        <p className="text-sm text-slate-500">Browse available doctors and request a consultation.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor name or specialty..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="min-w-0 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
        >
          <option>All specialties</option>
          <option>General Practice</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
          <option>Pediatrics</option>
        </select>
      </div>

      {successMessage && (
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-gray-500">Loading doctors…</div>
      ) : error ? (
        <div className="py-12 text-center text-sm text-red-600">{error}</div>
      ) : doctors.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">No doctors match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} onRequest={setSelectedDoctor} />
          ))}
        </div>
      )}

      {selectedDoctor && (
        <RequestConsultationModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSubmit={async (input) => {
            await requestMeeting(input);
            setSuccessMessage(`Request sent to Dr. ${selectedDoctor.name}. You'll be notified once they respond.`);
            refetchConsultations();
          }}
        />
      )}

      {/* Patient's own consultation requests */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-900">Your consultations ({consultations.length})</h2>
        </div>

        {consultationsLoading ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">Loading your consultations…</p>
        ) : consultationsError ? (
          <p className="px-5 py-8 text-center text-sm text-red-600">{consultationsError}</p>
        ) : consultations.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">
            You haven&apos;t requested any consultations yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            {consultations.map((record) => (
              <ConsultationRow key={record.id} consultation={record} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
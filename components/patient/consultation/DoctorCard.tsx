import { Stethoscope, CalendarPlus } from "lucide-react";
import type { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
  onRequest: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onRequest }: DoctorCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Stethoscope className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">Dr. {doctor.name}</p>
          <p className="truncate text-xs text-slate-500">{doctor.specialty}</p>
        </div>
      </div>

      {doctor.bio && <p className="line-clamp-2 text-xs text-slate-500">{doctor.bio}</p>}

      {typeof doctor.yearsOfExperience === "number" && (
        <p className="text-xs text-slate-500">{doctor.yearsOfExperience} yrs experience</p>
      )}

      <button
        type="button"
        onClick={() => onRequest(doctor)}
        className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        <CalendarPlus className="h-4 w-4" />
        Request consultation
      </button>
    </div>
  );
}
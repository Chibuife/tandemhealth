import { getAccessToken } from "@/lib/auth/session";
import type { Doctor } from "@/types/doctor";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authFetch = async (path: string, options: RequestInit = {}) => {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }

  return res.json();
};

export async function fetchDoctors(params?: { specialty?: string; search?: string }): Promise<Doctor[]> {
  const query = new URLSearchParams();
  if (params?.specialty) query.set("specialty", params.specialty);
  if (params?.search) query.set("search", params.search);

  const qs = query.toString();
  const data = await authFetch(`/doctors${qs ? `?${qs}` : ""}`);
  return data.doctors as Doctor[];
}
export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  avatarUrl?: string | null;
  bio?: string | null;
  yearsOfExperience?: number | null;
}
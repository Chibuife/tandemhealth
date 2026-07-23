const ACCESS_TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient';
}

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getStoredUser = (): StoredUser | null => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setStoredUser = (user: StoredUser) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_KEY);
};

export const clearSession = () => {
  clearAccessToken();
  clearStoredUser();
};
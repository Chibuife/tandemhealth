'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  MessageCircle,
  ClipboardCheck,
  Shield,
  BarChart3,
  User,
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { login } from '@/lib/api/auth';
import { setAccessToken, setStoredUser } from '@/lib/auth/session';

type Role = 'patient' | 'doctor';

const FEATURES = [
  {
    icon: MessageCircle,
    title: 'Real-time consultations',
    body: 'High quality audio and secure communication',
  },
  {
    icon: ClipboardCheck,
    title: 'AI-powered documentation',
    body: 'SOAP notes, summaries, and more',
  },
  {
    icon: Shield,
    title: 'Clinical decision support',
    body: 'Evidence-based recommendations',
  },
  {
    icon: BarChart3,
    title: 'Built for privacy & security',
    body: 'HIPAA-aligned architecture',
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setError(null);
    setIsSubmitting(true);

    try {
      const { token, user } = await login(email, password);

      setAccessToken(token);
      setStoredUser(user);

      router.push(user.role === 'doctor' ? '/dashboard/doctor/consultations' : '/dashboard/patient');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="relative hidden w-[420px] shrink-0 flex-col justify-between overflow-hidden bg-[#FBF6E3] px-10 py-10 lg:flex">
        <div>
          <div className="mb-8 flex items-center gap-2">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A]">
              <span className="absolute right-0 h-6 w-3 rounded-r-full bg-white" />
            </span>
            <span className="text-lg font-semibold text-[#1A1A1A]">Tandem</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-[#DCE0B8] bg-[#F3EFD1] px-3 py-1.5 text-xs font-medium text-[#5B6B2E]">
            <ShieldCheck size={13} />
            AI-Powered. Clinician-Focused. Patient-Centered.
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight text-[#1A1A1A]">
            Welcome back
            <br />
            to <span className="text-[#7A8B3C]">Tandem</span>
          </h1>

          <p className="mb-8 text-sm leading-relaxed text-[#6B7280]">
            Sign in to continue the smarter, more connected care experience clinicians and
            patients trust.
          </p>

          <div className="flex flex-col gap-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#7A8B3C] shadow-sm">
                  <feature.icon size={16} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{feature.title}</p>
                  <p className="text-xs text-[#8A8F7A]">{feature.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative citrus-toned gradient standing in for photography */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
          style={{
            background:
              'radial-gradient(120% 100% at 20% 100%, rgba(212,196,74,0.35), transparent 60%), radial-gradient(80% 80% at 70% 100%, rgba(122,139,60,0.25), transparent 65%)',
          }}
        />
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col bg-white px-6 py-10 sm:px-12 lg:px-20">
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-2 text-sm text-slate-600"
          >
            <Globe size={15} />
            English
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-1 text-2xl font-bold text-[#1A1A1A]">Sign in</h2>
          <p className="mb-6 text-sm text-slate-500">Welcome back, let&apos;s get you signed in</p>

          {error && (
            <div role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Role toggle */}
          {/* <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                role === 'patient'
                  ? 'border-[#DCE0B8] bg-[#FBF6E3] text-[#5B6B2E]'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <User size={16} />
              Patient
            </button>
            <button
              type="button"
              onClick={() => setRole('doctor')}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                role === 'doctor'
                  ? 'border-[#DCE0B8] bg-[#FBF6E3] text-[#5B6B2E]'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Briefcase size={16} />
              Doctor
            </button>
          </div> */}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7A8B3C] focus:outline-none focus:ring-2 focus:ring-[#EFEBC9]"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-slate-700">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs font-medium text-[#7A8B3C] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7A8B3C] focus:outline-none focus:ring-2 focus:ring-[#EFEBC9]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#7A8B3C] focus:ring-[#7A8B3C]"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 rounded-full bg-[#EFCB4E] py-3 text-sm font-bold text-[#1A1A1A] transition hover:bg-[#E6BE3A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Signing in…' : 'Log in'}
            </button>

            <div className="my-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Continue with Apple
            </button>

            <p className="mt-1 text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <a href="/signup" className="font-medium text-[#7A8B3C] hover:underline">
                Sign up
              </a>
            </p>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck size={13} />
              Your data is encrypted and secure.
            </p>
            <p className="text-center text-xs text-slate-400">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-[#7A8B3C] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-[#7A8B3C] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
'use client';

import {
  Video,
  FileText,
  ClipboardCheck,
  Lock,
  ShieldCheck,
  AudioLines,
  Sparkles,
  Users,
  MessageSquare,
  Smile,
  Check,
  Star,
  ArrowRight,
  Mic,
  Camera,
  MonitorUp,
  MoreHorizontal,
  PhoneOff,
} from 'lucide-react';

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.5 7.2a2.9 2.9 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1 12a30 30 0 0 0 .5 4.8 2.9 2.9 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 23 12a30 30 0 0 0-.5-4.8ZM9.8 15.4V8.6l5.8 3.4-5.8 3.4Z" />
    </svg>
  );
}

const trustBadges = [
  { icon: ShieldCheck, title: 'HIPAA Compliant', desc: 'Enterprise-grade security', bg: 'bg-[#eaf3e6]', fg: 'text-[#5b8a4a]' },
  { icon: AudioLines, title: 'Real-time & Reliable', desc: 'High quality audio', bg: 'bg-[#eef1e0]', fg: 'text-[#8a9a4a]' },
  { icon: Sparkles, title: 'AI-Powered', desc: 'Save time, focus on care', bg: 'bg-[#fbf6e3]', fg: 'text-[#b99a3a]' },
  { icon: Lock, title: 'Secure & Private', desc: 'Your data is protected', bg: 'bg-[#eaf3e6]', fg: 'text-[#5b8a4a]' },
];

const logos = ['MedCare', 'LifePoint', 'CarePlus', 'HealthFirst', 'WellSpace', 'Cliniq'];

const features = [
  { icon: Video, title: 'Real-time consultations', desc: 'High-quality, secure audio calls built for healthcare.', bg: 'bg-[#eaf3e6]', fg: 'text-[#5b8a4a]' },
  { icon: FileText, title: 'AI documentation', desc: 'Automatically generate SOAP notes, summaries, and more.', bg: 'bg-[#fbf6e3]', fg: 'text-[#b99a3a]' },
  { icon: ClipboardCheck, title: 'Clinical decision support', desc: 'Get evidence-based insights and ICD-10 suggestions.', bg: 'bg-[#eaf3e6]', fg: 'text-[#5b8a4a]' },
  { icon: Lock, title: 'Secure & compliant', desc: 'HIPAA-compliant platform with end-to-end encryption.', bg: 'bg-[#fbf6e3]', fg: 'text-[#b99a3a]' },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Healthcare professionals' },
  { icon: MessageSquare, value: '250,000+', label: 'Consultations completed' },
  { icon: FileText, value: '1M+', label: 'AI notes generated' },
  { icon: Smile, value: '98%', label: 'Customer satisfaction' },
];

const clinicianPoints = [
  'Focus more on your patients, less on paperwork',
  'Streamline your workflow',
  'Access tools that support better decisions',
  'Work securely from anywhere',
];

const patientPoints = [
  'Connect with your doctor from anywhere',
  'Secure messaging and follow-ups',
  'Access your visit summaries and prescriptions',
  'Better communication, better outcomes',
];

const testimonials = [
  {
    quote: 'Tandem has transformed how I consult with patients. The AI notes save me so much time and everything is so easy to use.',
    name: 'Dr. Sarah Johnson',
    role: 'Family Physician',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80&auto=format&fit=crop',
  },
  {
    quote: 'The call quality is excellent and I love getting my visit summaries right after the consultation.',
    name: 'Michael Roberts',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80&auto=format&fit=crop',
  },
  {
    quote: 'Finally, a platform that puts patient data security and clinician efficiency at the center.',
    name: 'Dr. Aisha Khan',
    role: 'Internal Medicine',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80&auto=format&fit=crop',
  },
];

const articles = [
  {
    tag: 'FEATURED',
    title: '5 Ways AI is improving clinical documentation',
    desc: 'Discover how AI-powered tools are helping clinicians save time and reduce burnout.',
    date: 'May 12, 2026',
    read: '6 min read',
    image: 'https://images.unsplash.com/photo-1666214280165-2ce03a5bf871?w=700&q=80&auto=format&fit=crop',
  },
  {
    tag: 'GUIDE',
    title: 'Getting started with telehealth: A complete guide',
    desc: 'Best practices for delivering high-quality virtual care experiences.',
    date: 'May 8, 2026',
    read: '8 min read',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=700&q=80&auto=format&fit=crop',
  },
  {
    tag: 'NEWS',
    title: 'Tandem is now SOC 2 Type II compliant',
    desc: 'Our continued commitment to security, privacy, and trust.',
    date: 'May 6, 2026',
    read: '4 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80&auto=format&fit=crop',
  },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-11 items-center justify-between rounded-full bg-slate-900 px-1">
        <span className="h-3.5 w-3.5 rounded-full bg-white" />
        <span className="h-3.5 w-3.5 rounded-full bg-white/30" />
      </span>
      <span className="text-lg font-semibold tracking-tight text-slate-900">Tandem</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#solutions" className="hover:text-slate-900">Solutions</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#resources" className="hover:text-slate-900">Resources</a>
            <a href="#about" className="hover:text-slate-900">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="hidden text-sm font-medium text-slate-700 hover:text-slate-900 sm:block">Log in</a>
            <a href="/signup" className="rounded-full bg-[#d7e94f] px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#cadf3a]">
              Get started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[-8%] top-[-10%] h-96 w-96 rounded-full bg-[#eef2d5] opacity-70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#f3efe2] px-3 py-1 text-xs font-semibold text-slate-700">
              <Sparkles className="h-3.5 w-3.5 text-[#b99a3a]" />
              AI-POWERED CARE
            </span>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Smarter consultations.
              <br />
              Better <span className="text-[#9db52e]">patient care.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
              Tandem combines real-time communication, AI documentation, and clinical decision support to help you focus on what matters most—your patients.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[#d7e94f] px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-[#cadf3a]">
                Get started for free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#demo" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
                Watch demo
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
              {trustBadges.map((b) => (
                <div key={b.title} className="flex items-start gap-2.5">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${b.bg}`}>
                    <b.icon className={`h-4 w-4 ${b.fg}`} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{b.title}</p>
                    <p className="text-[11px] text-slate-500">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video call mockup */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-slate-900 shadow-xl">
              <div className="flex items-center justify-between px-4 pt-3 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> Live 00:12:46
                </span>
              </div>
              <div className="relative mx-3 mt-2 aspect-[4/3] overflow-hidden rounded-xl bg-slate-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80&auto=format&fit=crop"
                  alt="Doctor on a video consultation"
                  className="h-full w-full object-cover"
                />
                <div className="absolute right-3 top-3 h-16 w-20 overflow-hidden rounded-lg border-2 border-white/80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80&auto=format&fit=crop"
                    alt="Patient on the call"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 px-4 py-3">
                <span className="rounded-full bg-white/10 p-2"><Mic className="h-4 w-4 text-white" /></span>
                <span className="rounded-full bg-white/10 p-2"><Camera className="h-4 w-4 text-white" /></span>
                <span className="rounded-full bg-white/10 p-2"><MonitorUp className="h-4 w-4 text-white" /></span>
                <span className="rounded-full bg-white/10 p-2"><MessageSquare className="h-4 w-4 text-white" /></span>
                <span className="rounded-full bg-white/10 p-2"><MoreHorizontal className="h-4 w-4 text-white" /></span>
                <span className="rounded-full bg-red-500 p-2"><PhoneOff className="h-4 w-4 text-white" /></span>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 hidden w-48 rounded-2xl border border-black/5 bg-white p-4 shadow-lg sm:block">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-800">AI Clinical Note</p>
                <span className="rounded-full bg-[#eef2d5] px-2 py-0.5 text-[10px] font-medium text-slate-600">Draft</span>
              </div>
              {['Subjective', 'Objective', 'Assessment', 'Plan'].map((s) => (
                <div key={s} className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{s[0]} {s}</span>
                  <Check className="h-3 w-3 text-[#5b8a4a]" />
                </div>
              ))}
            </div>

            <div className="absolute -bottom-6 -right-6 hidden w-44 rounded-2xl border border-black/5 bg-white p-4 shadow-lg sm:block">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-800">Audio Quality</p>
                <span className="rounded-full bg-[#eaf3e6] px-2 py-0.5 text-[10px] font-medium text-[#5b8a4a]">Good</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  <p className="font-semibold text-slate-800">28 ms</p>
                  <p>Latency</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">6 ms</p>
                  <p>Jitter</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="border-t border-black/5 py-10">
          <p className="text-center text-xs font-medium text-slate-400">Trusted by healthcare professionals worldwide</p>
          <div className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 text-sm font-semibold text-slate-400">
            {logos.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Everything you need for seamless care</h2>
          <p className="mt-3 text-slate-500">
            Powerful tools that help you communicate better, document faster, and make more informed clinical decisions.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-black/5 p-6 transition hover:shadow-md">
              <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg}`}>
                <f.icon className={`h-5 w-5 ${f.fg}`} />
              </span>
              <h3 className="mb-1.5 font-semibold text-slate-900">{f.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-[#8a9a2e]">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#fbf6d8] px-8 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <s.icon className="mb-3 h-5 w-5 text-slate-700" />
                <p className="text-2xl font-semibold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for clinicians / patients */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Built for clinicians. Loved by patients.</h2>
          <p className="mt-3 text-slate-500">Tandem brings everyone together for a better care experience.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-[#eef4e5]">
            <div className="p-8">
              <span className="mb-4 inline-block rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#5b8a4a]">
                FOR CLINICIANS
              </span>
              <h3 className="mb-4 text-2xl font-semibold leading-tight text-slate-900">
                Save time.
                <br />
                Deliver better care.
              </h3>
              <ul className="mb-6 space-y-2.5">
                {clinicianPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#5b8a4a]" /> {p}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                Learn more for clinicians <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="relative h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=80&auto=format&fit=crop"
                alt="Clinician reviewing notes on a laptop"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-[#fdf3dc]">
            <div className="p-8">
              <span className="mb-4 inline-block rounded-full bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#b99a3a]">
                FOR PATIENTS
              </span>
              <h3 className="mb-4 text-2xl font-semibold leading-tight text-slate-900">
                Care that&apos;s
                <br />
                personal and accessible.
              </h3>
              <ul className="mb-6 space-y-2.5">
                {patientPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#b99a3a]" /> {p}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                Learn more for patients <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="relative h-48 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1580281657702-257584239a55?w=900&q=80&auto=format&fit=crop"
                alt="Patient checking their phone"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-semibold tracking-tight">What our users are saying</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-black/5 p-6">
              <p className="mb-6 text-2xl text-slate-300">&ldquo;</p>
              <p className="mb-6 -mt-8 text-sm leading-relaxed text-slate-600">{t.quote}</p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#e8b923] text-[#e8b923]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="resources" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Latest insights and resources</h2>
          <a href="#" className="hidden items-center gap-1 text-sm font-semibold text-slate-700 sm:inline-flex">
            View all articles <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <div key={a.title} className="overflow-hidden rounded-2xl border border-black/5">
              <div className="relative h-40 overflow-hidden bg-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-700">
                  {a.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="mb-2 font-semibold leading-snug text-slate-900">{a.title}</h3>
                <p className="mb-4 text-sm text-slate-500">{a.desc}</p>
                <p className="text-xs text-slate-400">{a.date} · {a.read}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl bg-[#fbf6d8] px-8 py-10 sm:px-12">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Ready to transform your consultations?</h3>
              <p className="mt-2 text-sm text-slate-600">Join thousands of clinicians using Tandem to deliver smarter, more connected care.</p>
            </div>
            <div className="w-full max-w-md lg:w-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-[#c7d92e] focus:outline-none focus:ring-4 focus:ring-[#e7f27a]/40"
                />
                <button type="submit" className="whitespace-nowrap rounded-full bg-[#d7e94f] px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-[#cadf3a]">
                  Get started for free
                </button>
              </form>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                <Check className="h-3.5 w-3.5" /> No credit card required · Free forever plan available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-[220px] text-sm text-slate-500">
              AI-powered communication and clinical intelligence for modern healthcare.
            </p>
            <div className="mt-4 flex gap-3 text-slate-400">
              <LinkedinIcon className="h-4 w-4" />
              <TwitterIcon className="h-4 w-4" />
              <YoutubeIcon className="h-4 w-4" />
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Product</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Features</li><li>Integrations</li><li>Security</li><li>Pricing</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Solutions</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>For Clinicians</li><li>For Patients</li><li>Healthcare Systems</li><li>Telehealth</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Resources</p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Blog</li><li>Guides</li><li>Webinars</li><li>Help Center</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">Stay updated</p>
            <p className="mb-3 text-sm text-slate-500">Subscribe to our newsletter</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-slate-200 px-3.5 py-2 text-sm focus:border-[#c7d92e] focus:outline-none"
              />
              <button type="submit" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 Tandem Health, Inc. All rights reserved.</p>
          <div className="flex gap-5">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>HIPAA Notice</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
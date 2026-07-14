import { ShieldCheck } from 'lucide-react';

export function SecureComplianceBanner() {
  return (
    <div className="rounded-xl border border-violet-100 bg-violet-50 p-5">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100">
        <ShieldCheck className="h-4 w-4 text-violet-700" />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-violet-900">Secure &amp; compliant</h3>
      <p className="text-sm text-violet-700">
        All prescriptions are encrypted and stored in compliance with GDPR and local health regulations.
      </p>
    </div>
  );
}

export default SecureComplianceBanner;
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tandem — Consultation',
  description: 'AI-assisted clinical consultation dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}

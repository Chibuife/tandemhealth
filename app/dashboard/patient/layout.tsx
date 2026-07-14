'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { TopBanner } from '@/components/TopBanner';
import { AppHeader } from '@/components/AppHeader';
import { PatientSidebar } from '@/components/patient/PatientSidebar';

export default function PatientDashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen flex-col bg-bg">
            <TopBanner />
            <AppHeader />

            <div className="flex flex-1 overflow-hidden">
                <PatientSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                <main className="flex-1 overflow-y-auto p-5">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-fg lg:hidden"
                    >
                        <Menu className="h-4 w-4" />
                        Menu
                    </button>
                    {children}
                </main>
            </div>
        </div>
    );
}
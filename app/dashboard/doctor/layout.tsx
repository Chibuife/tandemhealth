import { ReactNode } from 'react';
import { TopBanner } from '@/components/TopBanner';
import { AppHeader } from '@/components/AppHeader';
import { Sidebar } from '@/components/doctor/Sidebar';
import { SidebarProvider } from '@/components/doctor/SidebarContext';
import { MobileMenuButton } from '@/components/doctor/MobileMenuButton';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col bg-bg">
        <TopBanner />
        <AppHeader />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto p-5">
            <div className="mb-4 lg:hidden">
              <MobileMenuButton />
            </div>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalRoute = pathname.startsWith('/portal');

  if (isPortalRoute) {
    // Dedicated Standalone Parent & Student Grade Portal
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-blue-600 selection:text-white">
        {children}
      </div>
    );
  }

  // Class Adviser Management Portal
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/75">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

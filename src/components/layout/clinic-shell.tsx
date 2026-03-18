'use client';

import React from 'react';
import { ClinicSidebar } from './clinic-sidebar';
import { ClinicHeader } from './clinic-header';

export function ClinicShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <ClinicSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0">
        <ClinicHeader />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

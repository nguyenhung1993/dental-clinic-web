'use client';

import { usePathname } from 'next/navigation';
import { ClinicShell } from "@/components/layout/clinic-shell";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password');
    const isPortalPage = pathname.startsWith('/portal');

    if (isAuthPage || isPortalPage) {
        return <>{children}</>;
    }

    return (
        <ClinicShell>
            {children}
        </ClinicShell>
    );
}

import React from 'react';
import { StatCards } from '@/components/appointments/stat-cards';
import { DaySchedule } from '@/components/appointments/day-schedule';
import { WaitingRoom } from '@/components/appointments/waiting-room';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { getAppointments, getAppointmentStats } from '@/actions/appointments';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { AppointmentsHeader } from '@/components/appointments/appointments-header';

export default async function AppointmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const sp = await searchParams;
  const dateParam = typeof sp.date === 'string' ? sp.date : undefined;
  const selectedDate = dateParam ? new Date(dateParam) : new Date();
  const appointments = await getAppointments(selectedDate);
  const stats = await getAppointmentStats();

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <AppointmentsHeader selectedDate={selectedDate} />

      {/* Stats Section */}
      <StatCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <DaySchedule appointments={appointments} />
        </div>
        <div className="xl:col-span-1">
          <WaitingRoom appointments={appointments} />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppointmentModal } from './appointment-modal';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface AppointmentsHeaderProps {
  selectedDate: Date;
}

export function AppointmentsHeader({ selectedDate }: AppointmentsHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-red-500" />
            Lịch hẹn
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý lịch trình hẹn hàng ngày của bạn</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-xl">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="px-4 text-sm font-bold text-gray-900 border-x border-gray-50">
              {format(selectedDate, "'Hôm nay, ' dd 'Th' M yyyy", { locale: vi })}
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-xl">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold text-sm">Đặt lịch hẹn mới</span>
          </Button>
        </div>
      </div>
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialDate={selectedDate} />
    </>
  );
}

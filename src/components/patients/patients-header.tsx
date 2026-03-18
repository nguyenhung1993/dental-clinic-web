'use client';

import React, { useState } from 'react';
import { UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PatientModal } from './patient-modal';

export function PatientsHeader({ total }: { total: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <User className="w-7 h-7 text-red-500" />
            Danh sách bệnh nhân
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý và theo dõi {total} hồ sơ bệnh nhân trong hệ thống</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          <span className="font-bold text-sm">Thêm bệnh nhân mới</span>
        </Button>
      </div>
      <PatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

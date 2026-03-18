'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { updateAppointmentStatus } from '@/actions/appointments';
import { toast } from 'sonner';
import { Play, CheckCircle2 } from 'lucide-react';

export function WaitingRoom({ appointments }: { appointments: any[] }) {
  const waitingPatients = appointments.filter(apt => 
    apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED' || apt.status === 'ARRIVED' || apt.status === 'IN_PROGRESS'
  );

  const handleAction = async (id: string, status: string) => {
    const result = await updateAppointmentStatus(id, status);
    if (result.success) {
      toast.success('Cập nhật thành công');
    } else {
      toast.error(result.error || 'Lỗi khi cập nhật');
    }
  };

  return (
    <Card className="border-none shadow-sm shadow-gray-100 rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
        <CardTitle className="text-lg font-bold">Danh sách chờ & Đang khám</CardTitle>
        <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {waitingPatients.length} bệnh nhân
        </span>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {waitingPatients.length === 0 ? (
          <div className="py-10 text-center text-gray-400 text-xs italic">
            Hiện không có bệnh nhân nào trong danh sách
          </div>
        ) : (
          waitingPatients.map((apt) => (
            <div 
              key={apt.id}
              className={`p-4 rounded-2xl flex items-center gap-4 transition-all duration-200 border border-transparent group ${
                apt.status === 'IN_PROGRESS' ? 'bg-red-50/50 border-red-100 shadow-sm' : 'hover:bg-gray-50'
              }`}
            >
              <Avatar className="h-10 w-10 rounded-xl">
                <AvatarFallback className="bg-gray-100 text-gray-500 font-bold text-xs uppercase rounded-xl">
                  {apt.patient.fullName.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 truncate">{apt.patient.fullName}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-semibold text-gray-400">
                    {format(new Date(apt.scheduledAt), 'HH:mm')}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <Badge 
                    variant="outline" 
                    className={`text-[8px] font-bold px-1.5 py-0 rounded-md border-none ${
                        apt.status === 'IN_PROGRESS' ? 'bg-red-500 text-white' : 
                        apt.status === 'ARRIVED' ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {apt.status === 'IN_PROGRESS' ? 'Đang khám' : 
                     apt.status === 'ARRIVED' ? 'Đã đến' : 'Chưa đến'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED' ? (
                  <Button 
                    onClick={() => handleAction(apt.id, 'ARRIVED')}
                    size="sm" 
                    className="h-8 w-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white p-0"
                    title="Đánh dấu đã đến"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                ) : apt.status === 'ARRIVED' ? (
                  <Button 
                    onClick={() => handleAction(apt.id, 'IN_PROGRESS')}
                    size="sm" 
                    className="h-8 w-8 rounded-lg bg-red-500 hover:bg-red-600 text-white p-0"
                    title="Bắt đầu khám"
                  >
                    <Play className="w-3 h-3 ml-0.5" />
                  </Button>
                ) : apt.status === 'IN_PROGRESS' ? (
                  <Button 
                    onClick={() => handleAction(apt.id, 'WAITING_PAYMENT')}
                    size="sm" 
                    className="h-8 w-8 rounded-lg bg-green-500 hover:bg-green-600 text-white p-0"
                    title="Hoàn thành khám"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

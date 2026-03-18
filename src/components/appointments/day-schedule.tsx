'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Video, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { updateAppointmentStatus } from '@/actions/appointments';
import { toast } from 'sonner';

const statusConfig: Record<string, { label: string, color: string }> = {
  SCHEDULED: { label: 'Đã hẹn', color: 'bg-blue-50 text-blue-600' },
  CONFIRMED: { label: 'Xác nhận', color: 'bg-indigo-50 text-indigo-600' },
  ARRIVED: { label: 'Đã đến', color: 'bg-orange-50 text-orange-600' },
  IN_PROGRESS: { label: 'Đang khám', color: 'bg-purple-50 text-purple-600' },
  WAITING_PAYMENT: { label: 'Chờ thanh toán', color: 'bg-yellow-50 text-yellow-600' },
  COMPLETED: { label: 'Hoàn thành', color: 'bg-green-50 text-green-600' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-50 text-red-600' },
  NO_SHOW: { label: 'Vắng mặt', color: 'bg-gray-50 text-gray-600' },
};

export function DaySchedule({ appointments }: { appointments: any[] }) {
  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateAppointmentStatus(id, status);
    if (result.success) {
      toast.success('Cập nhật trạng thái thành công');
    } else {
      toast.error(result.error || 'Lỗi khi cập nhật trạng thái');
    }
  };

  // Nhóm lịch hẹn theo giờ
  const hourlySlots: Record<string, any[]> = {};
  
  appointments.forEach(apt => {
    const hour = format(new Date(apt.scheduledAt), 'h:00 a', { locale: vi }).toUpperCase();
    if (!hourlySlots[hour]) hourlySlots[hour] = [];
    hourlySlots[hour].push(apt);
  });

  const slots = Object.keys(hourlySlots).sort();

  return (
    <Card className="border-none shadow-sm shadow-gray-100 rounded-3xl overflow-hidden flex-1">
      <CardHeader className="flex flex-row items-center justify-between p-6 bg-white border-b border-gray-50">
        <CardTitle className="text-lg font-bold text-gray-900">Lịch trình trong ngày</CardTitle>
        <Button variant="ghost" size="icon" className="text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-50">
          {slots.length === 0 ? (
            <div className="py-20 text-center text-gray-400 font-bold uppercase text-xs italic tracking-widest">
              Không có lịch hẹn nào trong ngày này
            </div>
          ) : (
            slots.map((time) => (
              <div key={time} className="flex min-h-[120px]">
                <div className="w-24 py-6 px-4 flex flex-col items-center justify-start border-r border-gray-50">
                  <span className="text-sm font-bold text-gray-900">{time.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{time.split(' ')[1]}</span>
                </div>
                <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hourlySlots[time].map((apt) => (
                    <div 
                      key={apt.id}
                      className="p-4 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/20 transition-all duration-200 group bg-white shadow-sm shadow-gray-50 relative"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 rounded-xl">
                            <AvatarFallback className="bg-gray-100 text-gray-600 font-bold text-[10px] uppercase rounded-xl">
                              {apt.patient.fullName.split(' ').map((n: string) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <Link href={`/patients/${apt.patient.id}`} className="hover:underline">
                            <div>
                              <h4 className="text-sm font-bold text-gray-900">{apt.patient.fullName}</h4>
                              <span className="text-[11px] font-semibold text-gray-400 flex items-center gap-1">
                                {apt.serviceNote?.includes('Online') ? <Video className="w-3 h-3 text-blue-400" /> : <Users className="w-3 h-3 text-gray-400" />}
                                {apt.serviceNote || 'Khám tổng quát'}
                              </span>
                            </div>
                          </Link>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuLabel className="text-[10px] font-bold text-gray-400 uppercase">Trạng thái</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <DropdownMenuItem 
                                key={key}
                                onClick={() => handleStatusUpdate(apt.id, key)}
                                className={cn(
                                  "text-xs font-bold gap-2",
                                  apt.status === key && "bg-gray-50 text-red-500"
                                )}
                              >
                                <div className={cn("w-2 h-2 rounded-full", config.color.split(' ')[1].replace('text-', 'bg-'))} />
                                {config.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                            <UserSquare2Icon className="w-3 h-3 text-gray-400" />
                            {apt.doctor.fullName}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-[8px] font-bold border-none w-fit py-0",
                              statusConfig[apt.status]?.color
                            )}
                          >
                            {statusConfig[apt.status]?.label}
                          </Badge>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className="text-[9px] font-bold py-0">{format(new Date(apt.scheduledAt), 'HH:mm')}</Badge>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            {apt.duration} phút
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function UserSquare2Icon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 21a6 6 0 0 0-12 0" />
            <circle cx="12" cy="9" r="4" />
            <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
    )
}

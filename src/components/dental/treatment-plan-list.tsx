'use client';

import React from 'react';
import { 
  ChevronRight, 
  Clock, 
  CircleDollarSign, 
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusConfig: Record<string, { label: string, color: string }> = {
  PLANNED: { label: 'Đang lập kế hoạch', color: 'bg-blue-50 text-blue-600' },
  ACTIVE: { label: 'Đang thực hiện', color: 'bg-orange-50 text-orange-600' },
  COMPLETED: { label: 'Đã hoàn thành', color: 'bg-green-50 text-green-600' },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-50 text-red-600' },
};

interface TreatmentPlanListProps {
  plans: any[];
}

export function TreatmentPlanList({ plans }: TreatmentPlanListProps) {
  if (!plans || plans.length === 0) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-gray-50 flex flex-col items-center justify-center text-center">
        <FileText className="w-12 h-12 text-gray-100 mb-4" />
        <p className="text-sm font-bold text-gray-400">Bệnh nhân chưa có phác đồ điều trị nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div 
          key={plan.id} 
          className="bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{plan.title}</h4>
                  <span className="text-[10px] font-bold text-gray-400">#{plan.planNo}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(plan.createdAt), 'dd/MM/yyyy')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {plan.items.length} dịch vụ
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Tổng chi phí</p>
                <p className="text-lg font-black text-gray-900">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(plan.totalAmount)}
                </p>
              </div>
              <Badge className={cn("px-3 py-1 rounded-full text-[10px] font-bold border-none", statusConfig[plan.status]?.color)}>
                {statusConfig[plan.status]?.label}
              </Badge>
              <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-300">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-50">
            <div className="flex flex-wrap gap-2">
              {plan.items.map((item: any, idx: number) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-100 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm"
                >
                  <span className="text-[10px] font-bold bg-gray-50 text-gray-500 w-5 h-5 flex items-center justify-center rounded-lg">
                    {item.toothNumber || 'R'}
                  </span>
                  <span className="text-xs font-bold text-gray-700">{item.service.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

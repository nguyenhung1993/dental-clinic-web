'use client';

import React from 'react';
import { Syringe, Search, Plus, Calendar, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const vaccinations = [
  { id: 'VAC-01', patient: 'Lê Văn Tèo', vaccine: 'Vắc xin uốn ván', date: '15/03/2026', nextDose: '15/04/2026', status: 'COMPLETED' },
  { id: 'VAC-02', patient: 'Phạm Thị Mơ', vaccine: 'Vắc xin HPV', date: '10/03/2026', nextDose: '10/09/2026', status: 'PENDING' },
];

export default function VaccinationsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Tiêm chủng & Nha phòng chặn</h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Theo dõi lịch tiêm và chăm sóc sức khỏe dự phòng</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="font-bold text-sm">Ghi nhận tiêm mới</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardHeader className="bg-white p-8 border-b border-gray-50">
                <CardTitle className="text-lg font-bold">Lịch sử Tiêm chủng</CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Bệnh nhân & Vắc xin</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Ngày tiêm</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Hẹn mũi kế</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {vaccinations.map((v) => (
                                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                                                <Syringe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{v.patient}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{v.vaccine}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-900">{v.date}</td>
                                    <td className="px-8 py-6 text-sm font-bold text-red-500 underline decoration-red-200">{v.nextDose}</td>
                                    <td className="px-8 py-6">
                                        <Badge className={cn(
                                            "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                                            v.status === 'COMPLETED' ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                                        )}>
                                            {v.status === 'COMPLETED' ? 'Hoàn tất' : 'Đang theo dõi'}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-gray-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-24 h-24" />
            </div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                Thông báo khẩn
            </h3>
            <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-orange-400 uppercase mb-2">Nhắc hẹn tiêm</p>
                    <p className="text-sm font-medium leading-relaxed">BN. Trần Văn B sắp đến ngày tiêm nhắc lại uốn ván (18/03).</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-bold text-green-400 uppercase mb-2">Kho vắc xin</p>
                    <p className="text-sm font-medium leading-relaxed">Lô vắc xin HPV mới đã nhập kho chi nhánh Q1.</p>
                </div>
            </div>
            <Button className="w-full mt-8 bg-white text-gray-900 rounded-2xl h-12 font-black text-xs uppercase hover:bg-gray-100">
              Gửi nhắc hẹn tự động
            </Button>
        </Card>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

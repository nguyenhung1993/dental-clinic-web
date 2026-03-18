'use client';

import React from 'react';
import { FlaskConical, Search, Plus, Download, Clipboard, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const labTests = [
  { id: 'LAB-9901', patient: 'Nguyễn Văn Anh', test: 'Xét nghiệm máu tổng quát', date: '17/03/2026', status: 'PENDING', result: '-' },
  { id: 'LAB-9885', patient: 'Trần Thị Bảo', test: 'Chụp CT Cone Beam', date: '16/03/2026', status: 'COMPLETED', result: 'Bình thường' },
];

export default function LabsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Xét nghiệm & Chẩn đoán</h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Quản lý các chỉ định xét nghiệm và kết quả lâm sàng</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white shadow-sm">
                <Download className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Tải kết quả</span>
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Chỉ định mới</span>
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
        <CardHeader className="bg-white p-8 border-b border-gray-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Danh sách Chỉ định</CardTitle>
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input className="pl-10 h-10 w-64 rounded-xl border-gray-100 bg-gray-50/50" placeholder="Tìm theo tên BN..." />
            </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Mã XN & Bệnh nhân</th>
                            <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Loại xét nghiệm</th>
                            <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Ngày chỉ định</th>
                            <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Kết quả</th>
                            <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {labTests.map((lab) => (
                            <tr key={lab.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                                            <FlaskConical className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{lab.patient}</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">{lab.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-gray-700">{lab.test}</td>
                                <td className="px-8 py-6 text-sm font-black text-gray-900">{lab.date}</td>
                                <td className="px-8 py-6 text-sm font-medium text-gray-600 italic">{lab.result}</td>
                                <td className="px-8 py-6">
                                    <Badge className={cn(
                                        "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                                        lab.status === 'COMPLETED' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                                    )}>
                                        {lab.status === 'COMPLETED' ? 'Đã có kết quả' : 'Đang xử lý'}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

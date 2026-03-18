'use client';

import React from 'react';
import { Pill, Search, Plus, Download, Clipboard, Trash2, Printer, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const prescriptions = [
  { id: 'DT-1025', patient: 'Nguyễn Văn Anh', doctor: 'BS. James Wilson', date: '17/03/2026', medicines: 'Amoxicillin, Paracetamol', status: 'PRINTED' },
  { id: 'DT-1024', patient: 'Lê Hoàng Cường', doctor: 'BS. Lisa Chang', date: '16/03/2026', medicines: 'Súc miệng Kin, Ibuprofen', status: 'DRAFT' },
];

export default function PrescriptionsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold uppercase text-red-600">Quản lý Đơn thuốc</h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Kê đơn nhanh chóng và theo dõi lịch sử thuốc của bệnh nhân</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white shadow-sm">
                <Printer className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">In đơn thuốc loạt</span>
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Tạo đơn thuốc (Shift+N)</span>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-9 border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardHeader className="bg-white p-8 border-b border-gray-50">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">Danh sách Đơn thuốc</CardTitle>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <Input className="pl-10 h-10 w-64 rounded-xl border-gray-100 bg-gray-50/50" placeholder="Tìm bệnh nhân, mã đơn..." />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Mã đơn & Bệnh nhân</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Danh mục thuốc</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Người kê đơn</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Ngày tạo</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Trạng thái</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {prescriptions.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                                                <Clipboard className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{p.patient}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{p.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-bold text-gray-600 truncate max-w-[200px]">{p.medicines}</p>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-bold text-gray-900 uppercase italic tracking-tighter">{p.doctor}</td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-900">{p.date}</td>
                                    <td className="px-8 py-6 text-center">
                                        <Badge className={p.status === 'PRINTED' ? "bg-green-50 text-green-600 border-none uppercase text-[9px] font-bold" : "bg-gray-50 text-gray-400 border-none uppercase text-[9px] font-bold"}>
                                            {p.status === 'PRINTED' ? 'Đã in' : 'Bản nháp'}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg">
                                                <Printer className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-white border border-red-50">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Lưu ý Y khoa
                </h3>
                <ul className="space-y-4">
                    {[
                      'Luôn kiểm tra tiền sử dị ứng thuốc.',
                      'Amoxicillin cần được uống sau ăn.',
                      'Sử dụng kháng sinh đúng liều 5-7 ngày.'
                    ].map((note, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                        <span className="text-xs font-bold text-gray-500 leading-relaxed uppercase tracking-widest">{note}</span>
                      </li>
                    ))}
                </ul>
            </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  ArrowLeftRight, 
  Package, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Plus,
  ChevronRight,
  Filter,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const transfers = [
  { id: 'TRF-1024', item: 'Mắc cài kim loại 3M', qty: 50, from: 'Chi nhánh Quận 1', to: 'Chi nhánh Quận 7', status: 'IN_TRANSIT', date: '15/03/2026' },
  { id: 'TRF-1023', item: 'Thuốc tẩy trắng Pola Night', qty: 20, from: 'Kho Hàng Tổng', to: 'Chi nhánh Quận 1', status: 'COMPLETED', date: '14/03/2026' },
  { id: 'TRF-1022', item: 'Găng tay y tế (Size M)', qty: 100, from: 'Chi nhánh Quận 3', to: 'Chi nhánh Quận 7', status: 'CANCELLED', date: '12/03/2026' },
];

export default function SupplyChainPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chuỗi cung ứng & Điều phối</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý luân chuyển vật tư và dự báo tồn kho toàn chuỗi chi nhánh</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white shadow-sm">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Dự báo AI</span>
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Tạo lệnh chuyển kho</span>
            </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Lệnh đang vận chuyển", value: "12", sub: "Giao trong ngày", icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Vật tư thiếu hụt", value: "08", sub: "Cần điều phối gấp", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
          { label: "Tổng giá trị luân chuyển", value: "$42,500", sub: "Tháng này", icon: ArrowLeftRight, color: "text-green-500", bg: "bg-green-50" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-8 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-[24px] ${s.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <s.icon className={`w-8 h-8 ${s.color}`} />
                </div>
                <div>
                    <h4 className="text-3xl font-black text-gray-900 leading-none">{s.value}</h4>
                    <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{s.label}</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">{s.sub}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Transfer History Table */}
        <Card className="lg:col-span-8 border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 bg-white border-b border-gray-50 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <ArrowLeftRight className="w-5 h-5 text-red-500" />
                        Lịch sử điều phối
                    </CardTitle>
                    <CardDescription className="font-medium">Theo dõi các lệnh chuyển kho giữa các chi nhánh</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                        <Input className="pl-10 h-10 w-48 rounded-xl border-gray-100 bg-gray-50/50" placeholder="Tìm mã lệnh..." />
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 rounded-xl hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Mã lệnh & Vật tư</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Lộ trình</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Trạng thái</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transfers.map((trf) => (
                                <tr key={trf.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 group-hover:text-red-500 transition-colors">{trf.item}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">SỐ LƯỢNG: {trf.qty}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                <span className="text-xs font-medium text-gray-500">{trf.from}</span>
                                            </div>
                                            <div className="w-px h-2 bg-gray-200 ml-[2.5px]" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                <span className="text-xs font-bold text-gray-700">{trf.to}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge className={cn(
                                            "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                                            trf.status === 'COMPLETED' ? "bg-green-50 text-green-600" : trf.status === 'IN_TRANSIT' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                                        )}>
                                            {trf.status === 'COMPLETED' ? 'Hoàn tất' : trf.status === 'IN_TRANSIT' ? 'Đang giao' : 'Đã hủy'}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-gray-900">{trf.date}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase italic">{trf.id}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        {/* Sidebar: Optimization & Branches */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-gray-900 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Building2 className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-5 h-5 text-red-500" />
                    Trạng thái tồn kho chi nhánh
                </h3>
                <div className="space-y-4">
                    {[
                        { name: 'Quận 1', health: 95, color: 'bg-green-500' },
                        { name: 'Quận 7', health: 65, color: 'bg-yellow-500' },
                        { name: 'Kho Tổng', health: 100, color: 'bg-blue-500' },
                    ].map((b, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-400">{b.name}</span>
                                <span className="text-xs font-black">{b.health}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full ${b.color} transition-all duration-700`} style={{ width: `${b.health}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="w-full mt-8 bg-white text-gray-900 rounded-2xl h-11 font-black text-xs hover:bg-gray-100 uppercase tracking-widest">
                    Báo cáo tồn kho
                </Button>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-white">
                <h3 className="text-lg font-black text-gray-900 mb-6">Dự kiến sắp hết</h3>
                <div className="space-y-6">
                    {[
                        { item: 'Thuốc tê Lidocaine', days: 3, icon: Clock, color: 'text-red-500', bg: 'bg-red-50' },
                        { item: 'Mũi khoan kim cương', days: 7, icon: Package, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50/50 p-2 rounded-2xl transition-colors">
                            <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-900 leading-tight">{item.item}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Còn khoảng {item.days} ngày</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" />
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-10 rounded-2xl border-gray-100 h-12 font-bold text-gray-500 text-xs uppercase tracking-widest">
                    TỰ ĐỘNG LÊN LỆNH NHẬP
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

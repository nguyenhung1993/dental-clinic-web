'use client';

import React, { useState } from 'react';
import { 
  FlaskConical, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Truck,
  MoreHorizontal,
  ChevronRight,
  User,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { updateLaboStatus } from '@/actions/labo';
import { LaboStatus } from '@prisma/client';

interface LaboClientProps {
  initialOrders: any[];
}

const statusMap = {
  SENT: { label: 'Đã gửi xưởng', color: 'bg-blue-50 text-blue-600', icon: Truck },
  RECEIVED: { label: 'Đã nhận hàng', color: 'bg-green-50 text-green-600', icon: CheckCircle2 },
  INSTALLED: { label: 'Đã lắp bệnh nhân', color: 'bg-purple-50 text-purple-600', icon: Activity },
  CANCELLED: { label: 'Đã hủy', color: 'bg-red-50 text-red-600', icon: Clock },
};

export default function LaboClient({ initialOrders }: LaboClientProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => 
    order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.patient?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = async (id: string, status: LaboStatus) => {
    const result = await updateLaboStatus(id, status);
    if (result.success) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Labo</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Theo dõi các đơn hàng phục hình gửi xưởng chế tác</p>
        </div>
        
        <div className="flex gap-3">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Gửi đơn Labo mới</span>
            </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Đang ở xưởng", value: orders.filter(o => o.status === 'SENT').length.toString(), icon: Truck, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Đã về phòng khám", value: orders.filter(o => o.status === 'RECEIVED').length.toString(), icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
          { label: "Đã hoàn tất", value: orders.filter(o => o.status === 'INSTALLED').length.toString(), icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Tổng đơn hàng", value: orders.length.toString(), icon: FlaskConical, color: "text-gray-900", bg: "bg-gray-100" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-3xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <div>
                    <h4 className="text-2xl font-black text-gray-900 leading-none">{s.value}</h4>
                    <p className="text-[11px] font-bold text-gray-400 uppercase mt-1 tracking-wider">{s.label}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Labo Content */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input 
                    placeholder="Tìm mã đơn, tên bệnh nhân, hoặc xưởng..." 
                    className="pl-10 h-11 bg-white border-gray-100 focus:border-red-500 transition-all rounded-2xl shadow-sm shadow-gray-50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl border-gray-100 h-11 bg-white shadow-sm gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold">Lọc trạng thái</span>
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {filteredOrders.map((order) => (
                <Card key={order.id} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden hover:shadow-md transition-all group">
                    <CardContent className="p-0">
                        <div className="flex flex-col lg:flex-row lg:items-center">
                            {/* Left Info: Identity */}
                            <div className="p-6 lg:p-8 flex-1 lg:border-r border-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge variant="outline" className="text-[10px] font-bold bg-gray-50 border-none px-2 py-0.5 rounded-lg text-gray-500 uppercase">
                                        {order.orderNo || 'LAB-NEW'}
                                    </Badge>
                                    <Badge className={cn("border-none text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1", statusMap[order.status as keyof typeof statusMap].color)}>
                                        {React.createElement(statusMap[order.status as keyof typeof statusMap].icon, { className: "w-3 h-3" })}
                                        {statusMap[order.status as keyof typeof statusMap].label}
                                    </Badge>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    {order.service}
                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                    <span className="text-red-500">Răng {order.toothNumber || 'N/A'}</span>
                                </h3>
                                <div className="flex flex-wrap items-center gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <User className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Bệnh nhân</p>
                                            <p className="text-sm font-bold text-gray-900 mt-1">{order.patient?.fullName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                                            <FlaskConical className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Xưởng cung cấp</p>
                                            <p className="text-sm font-bold text-gray-900 mt-1">{order.supplier}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Center Info: Details */}
                            <div className="p-6 lg:p-8 bg-gray-50/30 flex flex-wrap lg:flex-nowrap gap-8 items-center border-b lg:border-b-0 lg:border-r border-gray-50">
                                <div className="min-w-[100px]">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ngày gửi</p>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                        <span className="text-sm font-bold text-gray-700">
                                          {order.sentDate ? new Date(order.sentDate).toLocaleDateString('vi-VN') : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="min-w-[100px]">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Dự kiến về</p>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-sm font-bold text-blue-600">
                                          {order.receivedDate ? new Date(order.receivedDate).toLocaleDateString('vi-VN') : 'Đang chờ'}
                                        </span>
                                    </div>
                                </div>
                                <div className="min-w-[60px]">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Màu sắc</p>
                                    <Badge className="bg-gray-900 text-white border-none font-bold text-[10px] px-2">{order.colorCode || 'N/A'}</Badge>
                                </div>
                            </div>

                            {/* Right Info: Pricing & Actions */}
                            <div className="p-6 lg:p-8 lg:w-48 flex lg:flex-col items-center justify-between gap-4">
                                <div className="text-right lg:w-full">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Chi phí xưởng</p>
                                    <p className="text-2xl font-black text-gray-900">
                                      {new Intl.NumberFormat('vi-VN').format(order.cost || 0)} đ
                                    </p>
                                </div>
                                <div className="flex gap-2 w-full lg:mt-2">
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      className="flex-1 rounded-xl h-10 border-gray-100 hover:border-green-100 hover:text-green-500"
                                      onClick={() => handleStatusChange(order.id, 'RECEIVED')}
                                      disabled={order.status === 'RECEIVED' || order.status === 'INSTALLED'}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="flex-1 rounded-xl h-10 border-gray-100">
                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            {filteredOrders.length === 0 && (
              <div className="py-20 text-center text-gray-400 font-bold">
                Không tìm thấy đơn hàng Labo nào
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { 
  Zap, 
  MessageSquare, 
  Clock, 
  Settings2, 
  Plus, 
  MoreHorizontal,
  Mail,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const automations = [
  {
    id: '1',
    name: 'Nhắc lịch trước 24h',
    description: 'Tự động gửi tin nhắn Zalo/SMS nhắc bệnh nhân về lịch hẹn vào ngày mai.',
    channel: 'Zalo / SMS',
    status: true,
    lastRun: '15 phút trước',
    count: 1254
  },
  {
    id: '2',
    name: 'Chào mừng bệnh nhân mới',
    description: 'Gửi tin nhắn hướng dẫn và cảm ơn sau khi bệnh nhân đăng ký hồ sơ.',
    channel: 'Email',
    status: true,
    lastRun: '2 giờ trước',
    count: 452
  },
  {
    id: '3',
    name: 'Khảo sát sau khám',
    description: 'Tự động gửi link khảo sát mức độ hài lòng sau khi hoàn tất thanh toán.',
    channel: 'Zalo',
    status: false,
    lastRun: '1 ngày trước',
    count: 890
  },
  {
    id: '4',
    name: 'Nhắc lịch tái khám định kỳ',
    description: 'Thông báo cho bệnh nhân đã 6 tháng chưa quay lại lấy cao răng/kiểm tra.',
    channel: 'Zalo / App',
    status: true,
    lastRun: '5 giờ trước',
    count: 210
  }
];

export default function AutomationsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tự động hóa & Chăm sóc</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Cấu hình các kịch bản tự động gửi thông báo cho bệnh nhân</p>
        </div>
        
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="font-bold text-sm">Tạo kịch bản mới</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Automations List */}
        <div className="lg:col-span-2 space-y-6">
            {automations.map((auto) => (
                <Card key={auto.id} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-8">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${auto.status ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-300'}`}>
                                    <Zap className="w-7 h-7" />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-gray-900">{auto.name}</h3>
                                        <Badge variant="outline" className="rounded-lg bg-gray-50 border-gray-100 text-[10px] font-bold py-0.5">
                                            {auto.channel}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 font-medium max-w-md">{auto.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <Switch checked={auto.status} className="data-[state=checked]:bg-red-500" />
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-red-500 rounded-lg">
                                    <Settings2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-gray-300" />
                                    <span className="text-xs font-bold text-gray-500">{auto.count.toLocaleString()} tin đã gửi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-gray-300" />
                                    <span className="text-[11px] font-bold text-gray-400">Chạy lần cuối: {auto.lastRun}</span>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl px-4">
                                Xem báo cáo gửi tin
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-gray-900 text-white p-8">
                <h3 className="text-xl font-bold mb-6">Trạng thái hạ tầng</h3>
                <div className="space-y-6">
                    {[
                        { label: 'Hệ thống Job', status: 'Hoạt động', icon: CheckCircle2, color: 'text-green-400' },
                        { label: 'Cổng Zalo Cloud', status: 'Hoạt động', icon: CheckCircle2, color: 'text-green-400' },
                        { label: 'SMTP Server', status: 'Hoạt động', icon: CheckCircle2, color: 'text-green-400' },
                        { label: 'Redis Cache', status: 'Cảnh báo', icon: AlertCircle, color: 'text-orange-400' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <s.icon className={`w-4 h-4 ${s.color}`} />
                                <span className="text-sm font-medium text-gray-400">{s.label}</span>
                            </div>
                            <span className="text-xs font-bold">{s.status}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Dự kiến gửi hôm nay</p>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-black">428</span>
                        <span className="text-xs font-bold text-green-400 mb-1">+12%</span>
                    </div>
                </div>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Kênh thông báo phối hợp</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { name: 'Zalo ZNS', icon: MessageSquare, active: true },
                        { name: 'SMS Brand', icon: Smartphone, active: true },
                        { name: 'Email Mart', icon: Mail, active: false },
                        { name: 'App Push', icon: Zap, active: true },
                    ].map((k, i) => (
                        <div key={i} className={`p-4 rounded-2xl border ${k.active ? 'border-red-50 bg-red-50/20' : 'border-gray-50 bg-gray-50/50 opacity-60'} flex flex-col items-center gap-3 text-center`}>
                            <k.icon className={`w-6 h-6 ${k.active ? 'text-red-500' : 'text-gray-400'}`} />
                            <span className="text-[10px] font-bold text-gray-600 uppercase">{k.name}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}

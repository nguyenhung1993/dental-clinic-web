'use client';

import React from 'react';
import { 
  Users, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle2, 
  Star,
  ChevronRight,
  UserCheck,
  Zap,
  Calendar,
  MoreHorizontal,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const staffPerformance = [
  { 
    id: '1', 
    name: 'Bs. James Wilson', 
    role: 'Bác sĩ Implant', 
    score: 98, 
    cases: 124, 
    satisfaction: 4.9, 
    onTime: 96,
    trend: '+12%',
    avatar: 'https://github.com/shadcn.png' 
  },
  { 
    id: '2', 
    name: 'Bs. Sarah Patel', 
    role: 'Bác sĩ Chỉnh nha', 
    score: 92, 
    cases: 98, 
    satisfaction: 4.8, 
    onTime: 88,
    trend: '+5%',
    avatar: 'https://github.com/leerob.png' 
  },
  { 
    id: '3', 
    name: 'Bs. Lisa Chang', 
    role: 'Nha khoa Tổng quát', 
    score: 85, 
    cases: 110, 
    satisfaction: 4.7, 
    onTime: 92,
    trend: '-2%',
    avatar: 'https://github.com/evilrabbit.png' 
  },
];

export default function PerformancePage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hiệu suất & KPIs Nhân sự</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Theo dõi năng lực chuyên môn và mức độ hài lòng của đội ngũ bác sĩ</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-10 px-6 gap-2 bg-white shadow-sm shadow-gray-50">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase">Thiết lập mục tiêu</span>
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Calendar className="w-5 h-5" />
              <span className="font-bold text-sm">Chấm công tháng</span>
            </Button>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Điểm hiệu suất TB", value: "92.5", sub: "Tháng này", icon: Award, color: "text-red-500", bg: "bg-red-50" },
          { label: "Ca khám hoàn thành", value: "428", sub: "+12.5% so với tháng trước", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
          { label: "Tỷ lệ hài lòng", value: "4.8/5", sub: "Từ 1.2k phản hồi", icon: Star, color: "text-yellow-500", bg: "bg-yellow-50" },
          { label: "Tỷ lệ đúng giờ", value: "94%", sub: "Thời gian đón tiếp TB", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center mb-6`}>
                    <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <h4 className="text-3xl font-black text-gray-900 leading-none">{s.value}</h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{s.label}</p>
                <p className="text-[10px] font-medium text-gray-400 mt-4 px-3 py-1 bg-gray-50 rounded-full">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Staff List */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 px-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                Xếp hạng Bác sĩ
            </h2>
            {staffPerformance.map((staff) => (
                <Card key={staff.id} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden group hover:shadow-md transition-all">
                    <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <Avatar className="h-16 w-16 rounded-2xl border-4 border-white shadow-sm">
                                    <AvatarImage src={staff.avatar} />
                                    <AvatarFallback>{staff.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{staff.name}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{staff.role}</p>
                                    <Badge className="mt-2 bg-gray-50 text-gray-400 border-none text-[9px] font-bold tracking-widest uppercase">KPI: {staff.score}/100</Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-8 text-center border-t md:border-t-0 md:border-l border-gray-50 pt-6 md:pt-0 md:pl-8">
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Ca khám</p>
                                    <p className="text-xl font-black text-gray-900">{staff.cases}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Hài lòng</p>
                                    <p className="text-xl font-black text-gray-900">{staff.satisfaction}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Đúng giờ</p>
                                    <p className="text-xl font-black text-gray-900">{staff.onTime}%</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-center">
                                <div className={`text-xs font-bold mb-3 flex items-center gap-1 ${staff.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                    <TrendingUp className={`w-3 h-3 ${staff.trend.startsWith('-') && 'rotate-180'}`} />
                                    {staff.trend}
                                </div>
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-300 hover:text-red-500 rounded-xl bg-gray-50/50">
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Efficiency & Insights */}
        <div className="space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-white p-8 overflow-hidden relative">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Trạng thái Nhân sự</h3>
                    <Badge className="bg-green-50 text-green-600 border-none font-bold text-[10px]">98% TRỰC TUYẾN</Badge>
                </div>
                <div className="space-y-6">
                    {[
                        { label: 'Bác sĩ hiện diện', current: 12, total: 14, icon: UserCheck, color: 'bg-blue-500' },
                        { label: 'Đang tiếp bệnh', current: 8, total: 12, icon: Activity, color: 'bg-red-500' },
                        { label: 'Y tá hỗ trợ', current: 24, total: 26, icon: Users, color: 'bg-gray-900' },
                    ].map((s, i) => (
                        <div key={i} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <s.icon className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-bold text-gray-600">{s.label}</span>
                                </div>
                                <span className="text-sm font-black text-gray-900">{s.current}/{s.total}</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full ${s.color} transition-all duration-700`} 
                                    style={{ width: `${(s.current / s.total) * 100}%` }} 
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full mt-10 rounded-2xl border-gray-100 h-12 font-bold text-gray-500 text-xs">XEM CHI TIẾT ĐIỂM DANH</Button>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-red-500 p-8 text-white group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                    <Zap className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold relative z-10">Tối ưu Năng suất</h3>
                <p className="text-sm font-medium opacity-80 mt-2 relative z-10 leading-relaxed italic">"Bác sĩ Wilson có tỷ lệ hoàn thành ca cao hơn 15% so với trung bình của chuỗi."</p>
                <div className="mt-8 flex items-center justify-between relative z-10">
                    <div className="flex -space-x-3">
                        {staffPerformance.map(s => (
                            <Avatar key={s.id} className="h-10 w-10 border-4 border-red-500 shadow-xl rounded-2xl">
                                <AvatarImage src={s.avatar} />
                            </Avatar>
                        ))}
                    </div>
                    <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl h-10 px-4 font-bold text-xs gap-2">
                        Báo cáo AI
                        <Target className="w-4 h-4" />
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}

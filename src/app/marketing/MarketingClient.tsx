'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Gift, 
  Crown, 
  Tag, 
  Zap, 
  ArrowUpRight, 
  MousePointer2,
  Megaphone,
  Share2,
  Plus,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MarketingClientProps {
  initialCampaigns: any[];
  stats: {
    cac: number;
    ltv: number;
    totalReach: number;
    totalLeads: number;
    referralRate: number;
  };
  loyaltySummary: {
    SILVER: number;
    GOLD: number;
    DIAMOND: number;
  };
}

export default function MarketingClient({ initialCampaigns, stats, loyaltySummary }: MarketingClientProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const metrics = [
    { 
      label: "CAC (Chi phí thu hút)", 
      value: `${new Intl.NumberFormat('vi-VN').format(stats.cac)} đ`, 
      trend: "+0%", 
      desc: "Trung bình mỗi khách tiềm năng", 
      icon: MousePointer2, 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      label: "LTV (Giá trị vòng đời)", 
      value: `${new Intl.NumberFormat('vi-VN').format(stats.ltv)} đ`, 
      trend: "+0%", 
      desc: "Doanh thu trung bình/khách", 
      icon: TrendingUp, 
      color: "text-green-500", 
      bg: "bg-green-50" 
    },
    { 
      label: "Hệ số Referral", 
      value: stats.referralRate.toString(), 
      trend: "+0", 
      desc: "Mỗi BN giới thiệu x người", 
      icon: Share2, 
      color: "text-purple-500", 
      bg: "bg-purple-50" 
    },
    { 
      label: "Tổng tiếp cận", 
      value: stats.totalReach >= 1000 ? `${(stats.totalReach / 1000).toFixed(1)}k` : stats.totalReach.toString(), 
      trend: "+0%", 
      desc: "Toàn bộ các chiến dịch", 
      icon: Megaphone, 
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trung tâm Tăng trưởng (Growth)</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý các chiến dịch Marketing, tích điểm Loyalty và tối ưu doanh thu</p>
        </div>
        
        <div className="flex gap-3">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Chiến dịch mới</span>
            </Button>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((s, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center`}>
                        <s.icon className={`w-6 h-6 ${s.color}`} />
                    </div>
                    <Badge className="bg-green-50 text-green-600 border-none font-black text-[9px] px-2 py-0.5">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        {s.trend}
                    </Badge>
                </div>
                <h4 className="text-3xl font-black text-gray-900 leading-none">{s.value}</h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{s.label}</p>
                <p className="text-[10px] font-medium text-gray-400 mt-4 italic">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Campaigns */}
        <Card className="lg:col-span-8 border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 bg-white border-b border-gray-50 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-red-500" />
                        Chiến dịch Marketing
                    </CardTitle>
                    <CardDescription className="font-medium">Quản lý và theo dõi hiệu quả các chiến dịch thực tế</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-gray-400 hover:text-red-500">Xem tất cả</Button>
            </CardHeader>
            <CardContent className="p-0 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Tên chiến dịch</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Trạng thái</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Tiếp cận</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Chuyển đổi</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Ngân sách</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {campaigns.map((camp) => (
                                <tr key={camp.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                                                <Target className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 group-hover:text-red-500 transition-colors">{camp.name}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    {camp.channels.map((chan: string, i: number) => (
                                                        <span key={i} className="text-[9px] font-bold text-gray-300 uppercase px-1.5 bg-gray-50 rounded italic group-hover:text-gray-400">{chan}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Badge className={cn(
                                            "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                                            camp.status === 'ACTIVE' ? "bg-green-50 text-green-600" : camp.status === 'PAUSED' ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-400"
                                        )}>
                                            {camp.status === 'ACTIVE' ? 'Đang chạy' : camp.status === 'PAUSED' ? 'Đã tạm dừng' : camp.status === 'SCHEDULED' ? 'Đã lên lịch' : 'Hoàn thành'}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-gray-900">{camp.actualReach.toLocaleString()}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase italic">Lượt tiếp cận</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-green-600">{(camp.conversionRate * 100).toFixed(1)}%</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase italic">{camp.leads} Khách tiềm năng</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-black text-gray-900">{new Intl.NumberFormat('vi-VN').format(camp.budget)} đ</p>
                                        <Progress value={Math.min((camp.actualReach / (camp.expectedReach || 1)) * 100, 100)} className="h-1 bg-gray-100 mt-1 max-w-[60px]" />
                                    </td>
                                </tr>
                            ))}
                            {campaigns.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400 font-bold">Chưa có chiến dịch nào được khởi tạo</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        {/* Loyalty & AI Insights */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-gray-900 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Rocket className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-red-500" />
                    Đề xuất từ AI
                </h3>
                <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group/item">
                        <div className="flex items-center justify-between mb-3">
                            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-black uppercase tracking-widest">Cơ hội cao</Badge>
                            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover/item:text-white transition-colors" />
                        </div>
                        <h4 className="text-sm font-bold mb-2">Chiến dịch SMS Chúc mừng Sinh nhật</h4>
                        <p className="text-xs text-gray-400 leading-relaxed italic">"Dự đoán có 45 bệnh nhân sinh nhật trong tháng 04. Ưu đãi 20% giúp tăng 15% doanh thu labo."</p>
                    </div>
                </div>
                <Button className="w-full mt-8 bg-white text-gray-900 rounded-2xl h-11 font-black text-xs hover:bg-gray-100 uppercase tracking-widest">
                    Chạy đề xuất này
                </Button>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-white">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">Hệ thống Loyalty</h3>
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                        <Crown className="w-5 h-5 text-orange-500" />
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Cấp độ Kim cương</p>
                            <p className="text-xl font-black text-gray-900 mt-1">{loyaltySummary.DIAMOND} <span className="text-xs font-bold text-gray-400 uppercase ml-1">Bệnh nhân</span></p>
                        </div>
                        <div className="w-1.5 h-10 bg-orange-500 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Cấp độ Vàng</p>
                            <p className="text-xl font-black text-gray-900 mt-1">{loyaltySummary.GOLD} <span className="text-xs font-bold text-gray-400 uppercase ml-1">Bệnh nhân</span></p>
                        </div>
                        <div className="w-1.5 h-10 bg-yellow-400 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Cấp độ Bạc</p>
                            <p className="text-xl font-black text-gray-900 mt-1">{loyaltySummary.SILVER} <span className="text-xs font-bold text-gray-400 uppercase ml-1">Bệnh nhân</span></p>
                        </div>
                        <div className="w-1.5 h-10 bg-gray-400 rounded-full" />
                    </div>
                </div>
                <Button variant="outline" className="w-full mt-10 rounded-2xl border-gray-100 h-12 font-bold text-gray-500 text-xs gap-2 group">
                    Cấu hình chính sách
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
}

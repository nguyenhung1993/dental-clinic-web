'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Download,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

import { getAnalyticsStats, getServicesBreakdown } from '@/actions/analytics';

export default function AnalyticsPage() {
  const [data, setData] = React.useState<any>(null);
  const [services, setServices] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      const [statsRes, servicesRes] = await Promise.all([
        getAnalyticsStats(),
        getServicesBreakdown()
      ]);
      
      if (statsRes) {
        setData(statsRes);
      } else {
        setData({
          stats: { totalRevenue: 0, newPatients: 0, returnRate: "0%", netProfit: 0 },
          chartData: [],
          doctorPerformance: []
        });
      }
      
      setServices(servicesRes || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="p-20 text-center font-bold text-gray-400">Đang tải dữ liệu thực tế...</div>;
  }

  const revenueData = data?.chartData || [];
  const doctorPerformance = data?.doctorPerformance || [];
  const stats = [
    { label: "Tổng Doanh Thu", value: `$${data?.stats.totalRevenue.toLocaleString()}`, trend: "+12.5%", positive: true, icon: DollarSign, color: "bg-green-50 text-green-600" },
    { label: "Bệnh nhân mới", value: data?.stats.newPatients.toString(), trend: "+8.2%", positive: true, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Tỷ lệ quay lại", value: data?.stats.returnRate, trend: "-2.1%", positive: false, icon: TrendingUp, color: "bg-orange-50 text-orange-600" },
    { label: "Lợi nhuận ròng", value: `$${Math.round(data?.stats.netProfit).toLocaleString()}`, trend: "+15.3%", positive: true, icon: BarChart3, color: "bg-red-50 text-red-600" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Báo cáo & Phân tích</h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Theo dõi doanh thu, hiệu suất và tăng trưởng phòng khám</p>
        </div>
        
        <div className="flex gap-3">
            <Select defaultValue="this-month">
                <SelectTrigger className="w-[180px] rounded-2xl border-gray-100 bg-white shadow-sm h-10 font-bold text-xs">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Chọn thời gian" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    <SelectItem value="today">Hôm nay</SelectItem>
                    <SelectItem value="this-week">Tuần này</SelectItem>
                    <SelectItem value="this-month">Tháng này</SelectItem>
                    <SelectItem value="this-year">Năm nay</SelectItem>
                </SelectContent>
            </Select>
            <Button 
                variant="outline" 
                className="rounded-2xl border-gray-100 h-10 px-6 gap-2 bg-white shadow-sm shadow-gray-50"
                onClick={async () => {
                   const { exportToPDF } = await import('@/lib/export-utils');
                   const headers = ['Tháng', 'Doanh thu ($)', 'Tăng trưởng'];
                   const chartData = data?.chartData || [];
                   const tableData = chartData.map((d: any) => [d.month, d.value, d.trend || 'N/A']);
                   await exportToPDF('BÁO CÁO DOANH THU', headers, tableData, 'Bao_cao_doanh_thu');
                }}
            >
                <Download className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Xuất PDF</span>
            </Button>
            <Button 
                variant="outline" 
                className="rounded-2xl border-gray-100 h-10 px-6 gap-2 bg-white shadow-sm shadow-gray-50"
                onClick={async () => {
                   const { exportToExcel } = await import('@/lib/export-utils');
                   const chartData = data?.chartData || [];
                   const excelData = chartData.map((d: any) => ({
                       'Tháng': d.month,
                       'Doanh thu ($)': d.value,
                       'Bệnh nhân mới': d.patients || 0
                   }));
                   await exportToExcel(excelData, 'Bao_cao_doanh_thu', 'Doanh thu');
                }}
            >
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Xuất Excel</span>
            </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-3xl group hover:shadow-md transition-all">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6" />
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                        stat.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                        {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.trend}
                    </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Revenue Chart with Recharts */}
        <Card className="lg:col-span-2 border-none shadow-sm shadow-gray-100 rounded-3xl overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-50">
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="text-lg font-bold uppercase tracking-tight">Biểu đồ doanh thu</CardTitle>
                    <CardDescription className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Thống kê tăng trưởng 6 tháng gần nhất</CardDescription>
                </div>
                <Badge variant="outline" className="rounded-lg bg-gray-50 border-gray-100 text-[10px] font-bold py-1 px-3 uppercase text-gray-400 tracking-tighter">USD ($)</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-10">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px', color: '#1e293b' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#ef4444" 
                    radius={[8, 8, 0, 0]} 
                    barSize={45}
                  >
                    {revenueData.map((_entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#ef4444' : '#fee2e2'} className="hover:fill-red-500 transition-all" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Commission/Performance */}
        <Card className="border-none shadow-sm shadow-gray-100 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Hiệu suất Bác sĩ</CardTitle>
            <CardDescription>Báo cáo doanh số & hoa hồng tháng</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
                {doctorPerformance.map((dr: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-gray-900">{dr.name}</span>
                            <span className="text-xs font-black text-red-500">${dr.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-gray-400 uppercase">{dr.treatments} CA KHÁM</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                                    <span className="text-[10px] font-bold text-gray-600">{dr.rating}</span>
                                </div>
                            </div>
                            <Badge className="bg-green-50 text-green-600 border-none text-[9px] font-bold">
                                HH: ${Math.round(dr.commission).toLocaleString()}
                            </Badge>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                            <div 
                                className="h-full bg-gray-900 transition-all duration-500" 
                                style={{ width: `${Math.min((dr.revenue / 5000) * 100, 100)}%` }} 
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-gray-400 hover:text-red-500 rounded-xl">
                XEM CHI TIẾT HOA HỒNG
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Services Breakdown Table */}
      <Card className="border-none shadow-sm shadow-gray-100 rounded-3xl overflow-hidden mb-8">
        <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-lg font-bold text-gray-900">Doanh thu theo dịch vụ</CardTitle>
                <CardDescription>Phân tích các nhóm nguồn thu chính</CardDescription>
            </div>
            <Button variant="outline" className="rounded-xl border-gray-100 gap-2 h-9 px-4">
                <Filter className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs font-bold">Lọc dịch vụ</span>
            </Button>
        </CardHeader>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Nhóm dịch vụ</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Số lượng</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Doanh số</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Tỷ trọng</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Xu hướng</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {services.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-8 py-4 font-bold text-gray-900 text-sm">{row.name}</td>
                            <td className="px-8 py-4 text-sm font-medium text-gray-600">{row.count}</td>
                            <td className="px-8 py-4 text-sm font-black text-gray-900">${row.revenue.toLocaleString()}</td>
                            <td className="px-8 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500" style={{ width: `${row.ratio}%` }} />
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-400 tracking-tighter">{row.ratio}%</span>
                                </div>
                            </td>
                            <td className="px-8 py-4">
                                <Badge className={cn(
                                    "border-none text-[9px] font-bold px-2 rounded-lg",
                                    row.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                )}>
                                    {row.trend}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}


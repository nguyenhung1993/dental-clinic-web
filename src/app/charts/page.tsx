'use client';

import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart as LineChartIcon,
  TrendingUp, 
  Target,
  Users,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from 'recharts';

const patientTypeData = [
  { name: 'Niềng răng', value: 40, color: '#ef4444' },
  { name: 'Implant', value: 25, color: '#f87171' },
  { name: 'Tẩy trắng', value: 20, color: '#fca5a5' },
  { name: 'Khám định kỳ', value: 15, color: '#fee2e2' },
];

const growthData = [
  { name: 'Thanh 1', value: 2400 },
  { name: 'Thanh 2', value: 1398 },
  { name: 'Thanh 3', value: 9800 },
  { name: 'Thanh 4', value: 3908 },
  { name: 'Thanh 5', value: 4800 },
  { name: 'Thanh 6', value: 3800 },
  { name: 'Thanh 7', value: 4300 },
];

export default function ChartsPage() {
  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 uppercase">Hệ thống Biểu đồ Phân tích</h1>
        <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Trực quan hóa dữ liệu vận hành và tăng trưởng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart: Patient Breakdown */}
        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-50">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <PieChart className="w-5 h-5 text-red-500" />
              Cơ cấu Bệnh nhân theo Dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10 flex flex-col items-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={patientTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {patientTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart: Growth Trend */}
        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
          <CardHeader className="bg-white border-b border-gray-50">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Xu hướng Tăng trưởng Bệnh nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="p-10">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ef4444" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { label: "Thời gian khám trung bình", value: "45p", sub: "Giảm 10% so với tháng trước", icon: Calendar },
          { label: "Tỷ lệ chuyển đổi tư vấn", value: "68%", sub: "Tăng 5% sau khi dùng AI", icon: Target },
          { label: "Mức độ hài lòng (CSAT)", value: "4.9/5", sub: "Dựa trên 2.500 đánh giá", icon: Sparkles },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-[24px]">
            <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h4 className="text-xl font-black text-gray-900 leading-none">{stat.value}</h4>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{stat.label}</p>
                    <p className="text-[9px] font-medium text-green-500 mt-1">{stat.sub}</p>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

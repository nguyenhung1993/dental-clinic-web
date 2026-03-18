'use client';

import React, { useState } from 'react';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  DollarSign, 
  TrendingDown, 
  TrendingUp,
  Download,
  Calendar,
  Wallet,
  Building2,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FlaskConical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

import { useDebounce } from '@/hooks/use-debounce';

interface ExpensesClientProps {
  initialExpenses: any[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    profitMargin: number;
  };
}

const categoryMap = {
  SALARY: { label: 'Lương nhân viên', color: 'bg-blue-50 text-blue-600', icon: Wallet },
  RENT: { label: 'Mặt bằng', color: 'bg-purple-50 text-purple-600', icon: Building2 },
  UTILITIES: { label: 'Điện nước', color: 'bg-yellow-50 text-yellow-600', icon: Activity },
  MATERIALS: { label: 'Vật tư', color: 'bg-red-50 text-red-600', icon: Tag },
  MARKETING: { label: 'Quảng cáo', color: 'bg-orange-50 text-orange-600', icon: TrendingUp },
  LABO: { label: 'Chi phí Labo', color: 'bg-cyan-50 text-cyan-600', icon: FlaskConical },
  OTHER: { label: 'Khác', color: 'bg-gray-50 text-gray-600', icon: Receipt },
};

export default function ExpensesClient({ initialExpenses, summary }: ExpensesClientProps) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteredExpenses = expenses.filter(exp => 
    exp.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    exp.id.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chi phí vận hành</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý các khoản chi và theo dõi dòng tiền ra của phòng khám</p>
        </div>
        
        <div className="flex gap-3">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Tạo phiếu chi</span>
            </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-red-500 text-white p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-24 h-24" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tổng chi hệ thống</p>
            <h2 className="text-4xl font-black mt-2">
              {new Intl.NumberFormat('vi-VN').format(summary.totalExpenses)} đ
            </h2>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold bg-white/10 w-fit px-3 py-1.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                <span>+0% so với tháng trước</span>
            </div>
        </Card>

        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-white p-6 flex flex-col justify-between shadow-xs">
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Doanh thu thuần (Thực thu)</p>
                <h2 className="text-3xl font-black text-gray-900 mt-1">
                  {new Intl.NumberFormat('vi-VN').format(summary.totalRevenue)} đ
                </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-green-600 mt-4">
                <TrendingUp className="w-4 h-4" />
                <span>Số liệu dựa trên hóa đơn đã thanh toán</span>
            </div>
        </Card>

        <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] bg-gray-900 text-white p-6 flex flex-col justify-between">
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest opacity-80">Lợi nhuận ròng (P&L)</p>
                <h2 className="text-3xl font-black mt-1">
                  {new Intl.NumberFormat('vi-VN').format(summary.netProfit)} đ
                </h2>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${summary.profitMargin}%` }} />
            </div>
            <p className="text-[10px] font-bold opacity-60 mt-2 text-right uppercase">
              {summary.profitMargin.toFixed(1)}% Doanh thu
            </p>
        </Card>
      </div>

      {/* Expense Table */}
      <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input 
                    placeholder="Tìm kiếm nội dung chi, mã phiếu..." 
                    className="pl-10 h-11 bg-gray-50/50 border-transparent focus:bg-white transition-all rounded-2xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Select defaultValue="all">
                    <SelectTrigger className="w-[140px] rounded-xl border-gray-100 h-11 font-bold text-xs">
                        <SelectValue placeholder="Chi nhánh" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả chi nhánh</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" className="rounded-xl border-gray-100 h-11 gap-2 px-6">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold uppercase text-[10px]">Xuất báo cáo</span>
                </Button>
            </div>
        </div>
        <div className="overflow-x-auto bg-white">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Mã phiếu & Ngày</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Danh mục</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Nội dung chi</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Chi nhánh</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Số tiền</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                             <td className="px-8 py-4">
                                <p className="text-[10px] font-bold text-red-500 uppercase leading-none mb-1">
                                  {exp.id.substring(0, 8).toUpperCase()}
                                </p>
                                <p className="text-xs font-medium text-gray-400">
                                  {new Date(exp.date).toLocaleDateString('vi-VN')}
                                </p>
                            </td>
                            <td className="px-8 py-4">
                                <Badge className={cn("border-none text-[9px] font-bold px-2 py-0.5 rounded-lg", categoryMap[exp.category as keyof typeof categoryMap]?.color || 'bg-gray-50 text-gray-600')}>
                                    {categoryMap[exp.category as keyof typeof categoryMap]?.label || exp.category}
                                </Badge>
                            </td>
                            <td className="px-8 py-4">
                                <p className="text-sm font-bold text-gray-900">{exp.description}</p>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                                    Người chi: <span className="font-bold">{exp.staff?.fullName || 'N/A'}</span>
                                </p>
                            </td>
                            <td className="px-8 py-4">
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-3.5 h-3.5 text-gray-300" />
                                    <span className="text-xs font-bold text-gray-600">{exp.branch?.name || 'N/A'}</span>
                                </div>
                            </td>
                            <td className="px-8 py-4">
                                <span className="text-lg font-black text-gray-900">
                                  {new Intl.NumberFormat('vi-VN').format(exp.amount)} đ
                                </span>
                            </td>
                        </tr>
                    ))}
                    {filteredExpenses.length === 0 && (
                      <tr className="bg-white">
                        <td colSpan={5} className="py-20 text-center text-gray-400 font-bold">
                          Không tìm thấy phiếu chi nào
                        </td>
                      </tr>
                    )}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}

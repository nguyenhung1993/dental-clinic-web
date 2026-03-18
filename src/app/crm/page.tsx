'use client';

import React from 'react';
import { 
  Users, 
  UserCheck, 
  Crown, 
  Timer,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { useDebounce } from '@/hooks/use-debounce';

const customers = [
  { id: '1', name: 'Nguyễn Văn A', type: 'VIP', spend: '$5,200', lastVisit: '2 ngày trước', score: 95, initials: 'VA' },
  { id: '2', name: 'Trần Thị B', type: 'Thân thiết', spend: '$2,100', lastVisit: '1 tuần trước', score: 82, initials: 'TB' },
  { id: '3', name: 'Lê Văn C', type: 'Mới', spend: '$450', lastVisit: 'Hôm qua', score: 88, initials: 'VC' },
  { id: '4', name: 'Phạm Thị D', type: 'Tiềm năng', spend: '$0', lastVisit: 'Chưa có', score: 75, initials: 'PD' },
];

export default function CRMPage() {
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 500);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    c.type.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    c.id.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý khách hàng (CRM)</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Phân loại và chăm sóc bệnh nhân theo hành vi chi tiêu</p>
        </div>
        
        <div className="flex gap-3">
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              <span className="font-bold text-sm">Thành viên mới</span>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Tổng bệnh nhân", value: "1,254", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Bệnh nhân VIP", value: "42", icon: Crown, color: "text-red-500", bg: "bg-red-50" },
          { label: "Đang hoạt động", value: "856", icon: UserCheck, color: "text-green-500", bg: "bg-green-50" },
          { label: "Cần chăm sóc", value: "12", icon: Timer, color: "text-orange-500", bg: "bg-orange-50" },
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

      {/* CRM Table */}
      <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
                <Input 
                    placeholder="Tìm kiếm khách hàng..." 
                    className="pl-10 h-11 bg-gray-50/50 border-transparent focus:bg-white transition-all rounded-2xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl border-gray-100 h-11 gap-2 px-4">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-bold">Phân loại</span>
                </Button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Tên & Hạng thành viên</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Tổng chi tiêu</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Lần cuối đến</th>
                        <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Điểm tin cậy</th>
                        <th className="px-8 py-4 text-right"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="px-8 py-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10 rounded-xl">
                                        <AvatarFallback className="bg-red-50 text-red-600 font-bold text-xs">{c.initials}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{c.name}</p>
                                        <Badge className={cn(
                                            "text-[9px] font-bold px-1.5 py-0 rounded-md border-none",
                                            c.type === 'VIP' ? "bg-red-100 text-red-600" : 
                                            c.type === 'Thân thiết' ? "bg-purple-100 text-purple-600" : 
                                            "bg-gray-100 text-gray-500"
                                        )}>
                                            {c.type}
                                        </Badge>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-4">
                                <span className="text-sm font-black text-gray-900">{c.spend}</span>
                            </td>
                            <td className="px-8 py-4 text-sm font-medium text-gray-500">
                                {c.lastVisit}
                            </td>
                            <td className="px-8 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: `${c.score}%` }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600">{c.score}</span>
                                </div>
                            </td>
                            <td className="px-8 py-4 text-right">
                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg">
                                        <MessageSquare className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 rounded-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <tr className="bg-white">
                        <td colSpan={5} className="py-20 text-center text-gray-400 font-bold uppercase text-[10px]">
                          Không tìm thấy khách hàng nào
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

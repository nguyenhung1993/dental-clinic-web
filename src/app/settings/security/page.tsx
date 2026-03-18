'use client';

import React from 'react';
import { 
  ShieldCheck, 
  History, 
  UserCircle2, 
  Eye, 
  Search, 
  Download, 
  Filter, 
  Lock,
  Globe,
  AlertCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const auditLogs = [
  { id: 'LOG-45210', user: 'BS. James Wilson', action: 'Xem hồ sơ bệnh nhân', target: 'BN Nguyễn Văn Anh', time: '14:25:30 - 17/03/2026', ip: '192.168.1.45', status: 'SUCCESS' },
  { id: 'LOG-45209', user: 'Admin Hệ Thống', action: 'Xuất báo cáo tài chính', target: 'Báo cáo Q1 2026', time: '14:10:15 - 17/03/2026', ip: '203.113.14.82', status: 'SUCCESS' },
  { id: 'LOG-45208', user: 'BS. Sarah Patel', action: 'Sửa phác đồ điều trị', target: 'BN Trần Thị B', time: '13:50:00 - 17/03/2026', ip: '192.168.1.52', status: 'WARNING' },
  { id: 'LOG-45207', user: 'Unknown User', action: 'Đăng nhập sai mật khẩu', target: 'Tài khoản: nurse_ann', time: '13:45:10 - 17/03/2026', ip: '45.122.34.11', status: 'FAILURE' },
];

export default function SecurityAuditPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Bảo mật & Nhật ký Audit</h1>
            <Badge className="bg-blue-600 text-white border-none font-bold text-[9px] uppercase tracking-widest px-2 py-0.5">HIPAA Ready</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">Giám sát toàn bộ hoạt động truy cập dữ liệu và nhật ký hệ thống</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white shadow-sm">
                <Download className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Xuất báo cáo Audit</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-blue-100 transition-all active:scale-95">
              <ShieldCheck className="w-5 h-5" />
              <span className="font-bold text-sm">Cấu hình bảo mật</span>
            </Button>
        </div>
      </div>

      {/* Security Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Trạng thái hệ thống", value: "An toàn", color: "text-green-600", bg: "bg-green-50", icon: ShieldCheck },
          { label: "Lượt truy cập nhạy cảm", value: "482", color: "text-blue-600", bg: "bg-blue-50", icon: Eye },
          { label: "Cảnh báo bảo mật", value: "02", color: "text-orange-600", bg: "bg-orange-50", icon: AlertCircle },
          { label: "IP bị chặn", value: "14", color: "text-red-600", bg: "bg-red-50", icon: Lock },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardContent className="p-8">
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <h4 className="text-3xl font-black text-gray-900 leading-none">{s.value}</h4>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Audit Log Table */}
        <Card className="lg:col-span-9 border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
            <CardHeader className="p-8 bg-white border-b border-gray-50 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <History className="w-5 h-5 text-blue-600" />
                        Nhật ký hoạt động (Audit Logs)
                    </CardTitle>
                    <CardDescription className="font-medium">Hồ sơ chi tiết về các hành động truy xuất và thay đổi dữ liệu</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <Input className="pl-10 h-10 w-64 rounded-xl border-gray-100 bg-gray-50/50" placeholder="Tìm người dùng, hành động..." />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Người dùng & Hành động</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Đối tượng tác động</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Thời gian & IP</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]">Kết quả</th>
                                <th className="px-8 py-4 font-bold text-gray-400 uppercase text-[10px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {auditLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/80 transition-colors group cursor-pointer">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                                <UserCircle2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase">{log.user}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{log.action}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-600">{log.target}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Clock className="w-3 h-3" />
                                            <p className="text-xs font-medium">{log.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-gray-400">
                                            <Globe className="w-3 h-3" />
                                            <p className="text-[10px] font-bold">{log.ip}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <Badge className={cn(
                                            "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                                            log.status === 'SUCCESS' ? "bg-green-50 text-green-600" : log.status === 'WARNING' ? "bg-orange-50 text-orange-600" : "bg-red-50 text-red-600"
                                        )}>
                                            {log.status === 'SUCCESS' ? 'Thành công' : log.status === 'WARNING' ? 'Cảnh báo' : 'Thất bại'}
                                        </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-blue-600 rounded-xl">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

        {/* Security Summary Sidebar */}
        <div className="lg:col-span-3 space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-gray-900 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Lock className="w-24 h-24" />
                </div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    Mức độ bảo vệ
                </h3>
                <div className="flex items-end gap-3 mb-4">
                    <span className="text-5xl font-black text-green-500">A+</span>
                    <span className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Tiêu chuẩn quốc tế</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed italic border-t border-white/10 pt-4">
                    "Hệ thống đã mã hóa 100% dữ liệu nhạy cảm theo chuẩn AES-256."
                </p>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-white border border-blue-50">
                <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Bảo quản dữ liệu
                </h3>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bản sao lưu (Backup)</span>
                            <span className="text-[10px] font-black text-green-600">ỔN ĐỊNH</span>
                        </div>
                        <Progress value={100} className="h-1.5 bg-gray-100" />
                        <p className="text-[10px] text-gray-400 font-medium mt-2">Bản gần nhất: 12 phút trước</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

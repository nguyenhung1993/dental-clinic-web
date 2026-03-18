'use client';

import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  ClipboardList, 
  CreditCard, 
  LogOut, 
  ChevronRight,
  Stethoscope,
  Pill,
  Clock,
  QrCode,
  Bell,
  HeartPulse,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PatientPortal() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Portal Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-100">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-tight">Ember Dental</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Cổng Bệnh Nhân</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>
            <Avatar className="h-10 w-10 rounded-2xl border-2 border-white shadow-sm">
              <AvatarImage src="https://github.com/nutlope.png" />
              <AvatarFallback>VA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome Card */}
        <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900">Chào bạn, Anh S.</h2>
            <p className="text-gray-500 font-medium mt-1">Chúc bạn một ngày tốt lành. Dưới đây là tóm tắt hồ sơ sức khỏe của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Actions & Stats */}
            <div className="md:col-span-2 space-y-8">
                {/* Appointment Banner */}
                <Card className="border-none bg-gray-900 text-white rounded-[40px] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
                        <Calendar className="w-32 h-32" />
                    </div>
                    <CardContent className="p-10 relative z-10">
                        <Badge className="bg-red-500 text-white border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1 mb-4">
                            Lịch hẹn sắp tới
                        </Badge>
                        <h3 className="text-2xl font-bold">Khám định kỳ & Lấy cao răng</h3>
                        <div className="flex flex-wrap items-center gap-6 mt-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Thời gian</p>
                                    <p className="text-lg font-bold uppercase">09:30 SA</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Ngày khám</p>
                                    <p className="text-lg font-bold uppercase">20 Tháng 03</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex gap-4">
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 rounded-2xl px-8 h-12 font-bold shadow-xl shadow-black/20">
                                Xem bản đồ
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/10 rounded-2xl h-12 px-6 font-bold">
                                Thay đổi lịch
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Health Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                                <ClipboardList className="w-7 h-7 text-red-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Phác đồ điều trị</h4>
                            <p className="text-sm text-gray-400 mt-2 font-medium">Theo dõi tiến độ niềng răng Phase 2</p>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Tiến độ 65%</span>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="p-8">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <Pill className="w-7 h-7 text-blue-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Đơn thuốc của bạn</h4>
                            <p className="text-sm text-gray-400 mt-2 font-medium">Danh sách thuốc sau phẫu thuật</p>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">3 loại thuốc</span>
                                <ChevronRight className="w-5 h-5 text-gray-300" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Sidebar: Profile & Billing */}
            <div className="space-y-8">
                <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] text-center p-8">
                    <Avatar className="h-24 w-24 rounded-[32px] mx-auto border-4 border-white shadow-lg shadow-gray-100 mb-6">
                        <AvatarImage src="https://github.com/nutlope.png" />
                        <AvatarFallback>VA</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-gray-900">Nguyễn Văn Anh</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Mã BN: #BN-0428</p>
                    <Badge className="mt-4 bg-red-50 text-red-600 border-none font-bold text-[10px] px-3 py-1">THÀNH VIÊN VIP</Badge>
                </Card>

                <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
                    <CardHeader className="bg-gray-50/50 p-6">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            Thanh toán & Hóa đơn
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50/30 border border-red-50">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Còn nợ</p>
                                    <p className="text-lg font-black text-red-600">$450</p>
                                </div>
                                <Button size="sm" className="bg-red-500 hover:bg-red-600 rounded-xl font-bold text-[10px]">THANH TOÁN</Button>
                            </div>
                            <div className="pt-4 border-t border-gray-50 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-500">Hỗ trợ trả góp</span>
                                    <span className="text-xs font-bold text-green-600">Đang hoạt động</span>
                                </div>
                                <Button variant="ghost" className="w-full text-xs font-bold text-gray-400 hover:text-gray-900 group">
                                    Xem lịch sử thanh toán
                                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-blue-600 text-white group cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform">
                        <QrCode className="w-20 h-20" />
                    </div>
                    <CardTitle className="text-lg font-bold relative z-10">Mã QR của tôi</CardTitle>
                    <p className="text-xs font-medium opacity-80 mt-2 relative z-10 leading-relaxed">Dùng mã này để Check-in nhanh khi đến phòng khám.</p>
                    <Button variant="outline" className="mt-6 w-full bg-white/10 border-white/20 text-white rounded-xl font-bold text-xs h-10 hover:bg-white/20">
                        Mở mã QR
                    </Button>
                </Card>
            </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-gray-400">© 2026 Ember Dental Management. Bảo mật chuẩn HIPAA.</p>
            <div className="flex items-center gap-6">
                <Button variant="ghost" className="text-sm font-bold text-gray-400 hover:text-red-500 gap-2">
                    <Stethoscope className="w-4 h-4" />
                    Hỗ trợ y tế
                </Button>
                <Button variant="ghost" className="text-sm font-bold text-gray-400 hover:text-red-500 gap-2">
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                </Button>
            </div>
        </footer>
      </main>
    </div>
  );
}

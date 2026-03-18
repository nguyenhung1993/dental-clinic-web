import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  UserPlus, 
  MoreVertical, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPatients } from '@/actions/patients';
import Link from 'next/link';
import { SearchInput } from '@/components/shared/search-input';

export default async function PatientsOverviewPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const query = typeof sp.q === 'string' ? sp.q : '';
  const patients = await getPatients(query);

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Tổng quan Bệnh nhân</h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">Quản lý hồ sơ và lịch sử khám bệnh của khách hàng</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white shadow-sm">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase text-gray-500">Lọc nâng cao</span>
            </Button>
            <Link href="/patients">
              <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95">
                <UserPlus className="w-5 h-5" />
                <span className="font-bold text-sm">Thêm bệnh nhân mới</span>
              </Button>
            </Link>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-3">
            <SearchInput 
                defaultValue={query}
                placeholder="Tìm kiếm theo Tên, Số điện thoại hoặc Mã bệnh nhân..."
            />
        </div>
        <div className="bg-gray-900 rounded-3xl p-4 flex items-center justify-center gap-4 text-white shadow-xl shadow-gray-200">
            <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tổng số</p>
                <p className="text-2xl font-black">{patients.length}</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center text-green-400">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Đang tải</p>
                <p className="text-2xl font-black">...</p>
            </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {patients.map((p: any) => (
          <Link key={p.id} href={`/patients/${p.id}`}>
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden group hover:shadow-md transition-all h-full">
              <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                      <Avatar className="h-20 w-20 rounded-[24px] border-4 border-gray-50 group-hover:scale-105 transition-transform">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.fullName}`} />
                          <AvatarFallback>{p.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Badge className={cn(
                          "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest",
                          p.isActive ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"
                      )}>
                          {p.isActive ? 'Đang điều trị' : 'Tạm ngừng'}
                      </Badge>
                  </div>

                  <div className="space-y-1 mb-6">
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-red-500 transition-colors uppercase truncate">{p.fullName}</h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{p.patientCode} • {p.gender === 'MALE' ? 'NAM' : 'NỮ'} • {p.birthDate ? (new Date().getFullYear() - new Date(p.birthDate).getFullYear()) : '?'} TUỔI</p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3 text-gray-500">
                          <Phone className="w-3.5 h-3.5 text-gray-300" />
                          <span className="text-xs font-bold leading-none">{p.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gray-300" />
                          <span className="text-xs font-bold leading-none uppercase text-red-500/70 tracking-tighter truncate">
                            {p.address || 'Khám tổng quát'}
                          </span>
                      </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between group-hover:bg-red-50 transition-colors">
                      <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">Cập nhật cuối</p>
                          <p className="text-xs font-black text-gray-900">{typeof p.lastVisit === 'string' ? p.lastVisit : p.lastVisit.toLocaleDateString('vi-VN')}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-500" />
                  </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {patients.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase text-xs italic tracking-widest">
            Không tìm thấy bệnh nhân nào
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

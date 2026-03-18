import React from 'react';
import { 
  Search, 
  UserPlus, 
  Filter, 
  MoreHorizontal, 
  Phone, 
  Calendar,
  ChevronRight,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getPatients } from '@/actions/patients';
import { formatDate } from '@/lib/utils';

import { PatientsHeader } from '@/components/patients/patients-header';
import { SearchInput } from '@/components/shared/search-input';

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const query = typeof sp.q === 'string' ? sp.q : '';
  const patients = await getPatients(query);

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <PatientsHeader total={patients.length} />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput 
          defaultValue={query}
          className="flex-1"
          placeholder="Tìm kiếm theo tên, mã hoặc số điện thoại..."
        />
        <Button variant="outline" className="rounded-2xl h-11 border-gray-100 gap-2 px-6 shadow-sm shadow-gray-50 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">Lọc</span>
        </Button>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-50">
              <TableHead className="w-[120px] font-bold text-gray-400 uppercase text-[11px] py-4 pl-6">Mã BN</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Tên bệnh nhân</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Liên hệ</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Lần khám cuối</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient: any) => (
              <TableRow key={patient.id} className="group hover:bg-red-50/10 border-gray-50 transition-colors">
                <TableCell className="font-bold text-gray-900 text-sm pl-6 py-4">
                  {patient.patientCode}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-xl">
                      <AvatarFallback className="bg-orange-50 text-orange-600 font-bold text-xs rounded-xl">
                        {patient.fullName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{patient.fullName}</p>
                      <p className="text-[11px] font-medium text-gray-400">{patient.gender === 'FEMALE' ? 'Nữ' : 'Nam'} • {patient.birthDate ? (new Date().getFullYear() - new Date(patient.birthDate).getFullYear()) : '?'} tuổi</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {patient.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {patient.lastVisit instanceof Date ? formatDate(patient.lastVisit) : patient.lastVisit}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border-none",
                      patient.isActive ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"
                    )}
                  >
                    {patient.isActive ? 'ĐANG HOẠT ĐỘNG' : 'TẠM NGỪNG'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6 py-4">
                  <div className="flex items-center justify-end gap-2 translate-x-2 md:opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    <Link href={`/patients/${patient.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {patients.length === 0 && (
              <TableRow>
                <td colSpan={6} className="py-20 text-center text-gray-400 font-bold uppercase text-xs italic tracking-widest">
                  Không tìm thấy bệnh nhân nào
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

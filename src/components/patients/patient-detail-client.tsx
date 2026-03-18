'use client';

import React from 'react';
import { 
  ChevronLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  AlertCircle,
  Stethoscope,
  CircleDollarSign,
  FileText,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DentalChart } from '@/components/dental/dental-chart';
import { TreatmentPlanForm } from '@/components/dental/treatment-plan-form';
import { TreatmentPlanList } from '@/components/dental/treatment-plan-list';
import { PaymentModal } from '@/components/billing/payment-modal';
import { MedicalHistoryModal } from '@/components/patients/medical-history-modal';
import { XrayUpload } from '@/components/patients/XrayUpload';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface PatientDetailClientProps {
  patient: any;
}

export function PatientDetailClient({ patient }: PatientDetailClientProps) {
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [isPlanFormOpen, setIsPlanFormOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('chart');
  const [isMedicalModalOpen, setIsMedicalModalOpen] = React.useState(false);

  // Convert dental chart teeth records to the format expected by DentalChart
  const teethData = patient.dentalChart?.teeth.reduce((acc: any, tooth: any) => {
    acc[tooth.toothNumber] = tooth.condition;
    return acc;
  }, {}) || {};

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumbs / Back */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/patients">
          <Button variant="ghost" size="icon" className="h-10 w-10 border border-gray-100 rounded-xl bg-white shadow-sm shadow-gray-50">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Hồ sơ bệnh nhân</h2>
          <div className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
            <Link href="/patients" className="hover:text-red-500 transition-colors">Bệnh nhân</Link>
            <span>/</span>
            <span className="text-gray-600">Chi tiết bệnh nhân</span>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 border border-gray-50 shadow-sm shadow-gray-100 mb-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 opacity-20 -mr-16 -mt-16 rounded-full" />
        
        <Avatar className="h-24 w-24 rounded-3xl ring-4 ring-gray-50">
          <AvatarFallback className="bg-orange-50 text-orange-600 text-3xl font-black rounded-3xl">
            {patient.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{patient.fullName}</h1>
            <Badge className={patient.isActive ? "bg-green-50 text-green-600 border-none px-2 rounded-full text-[10px] font-bold" : "bg-gray-50 text-gray-600 border-none px-2 rounded-full text-[10px] font-bold"}>
              {patient.isActive ? 'HOẠT ĐỘNG' : 'KHÔNG HOẠT ĐỘNG'}
            </Badge>
            <div className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">
                #{patient.patientCode}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase">GIỚI TÍNH</p>
                   <p className="text-sm font-bold text-gray-700">{patient.gender === 'MALE' ? 'Nam' : patient.gender === 'FEMALE' ? 'Nữ' : 'Khác'}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase">NGÀY SINH</p>
                   <p className="text-sm font-bold text-gray-700">
                    {patient.dob ? format(new Date(patient.dob), 'dd MMMM, yyyy', { locale: vi }) : 'Chưa cập nhật'}
                   </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase">ĐIỆN THOẠI</p>
                   <p className="text-sm font-bold text-gray-700">{patient.phone}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-gray-400 uppercase">ĐỊA CHỈ</p>
                   <p className="text-sm font-bold text-gray-700 truncate max-w-[150px]">{patient.address || 'Chưa cập nhật'}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
            <Button 
                onClick={() => {
                    setActiveTab('treatment');
                    setIsPlanFormOpen(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-2xl h-10 px-6 gap-2"
            >
                <Stethoscope className="w-4 h-4" />
                <span className="text-xs font-bold font-sans">Bắt đầu điều trị</span>
            </Button>
            <Button 
                variant="outline" 
                onClick={() => setIsMedicalModalOpen(true)}
                className="rounded-2xl h-10 border-gray-100 text-gray-600 hover:bg-gray-50"
            >
                <AlertCircle className="w-4 h-4 mr-2" />
                <span className="text-xs font-bold font-sans">Tiền sử bệnh lý</span>
            </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border border-gray-100 p-1 rounded-2xl h-12 shadow-sm shadow-gray-50">
          <TabsTrigger value="chart" className="rounded-xl data-[state=active]:bg-red-50 data-[state=active]:text-red-500 data-[state=active]:shadow-none px-6 text-xs font-bold">
            Sơ đồ răng
          </TabsTrigger>
          <TabsTrigger value="treatment" className="rounded-xl data-[state=active]:bg-red-50 data-[state=active]:text-red-500 data-[state=active]:shadow-none px-6 text-xs font-bold">
            Phác đồ điều trị
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl data-[state=active]:bg-red-50 data-[state=active]:text-red-500 data-[state=active]:shadow-none px-6 text-xs font-bold">
            Thanh toán & Hóa đơn
          </TabsTrigger>
          <TabsTrigger value="files" className="rounded-xl data-[state=active]:bg-red-50 data-[state=active]:text-red-500 data-[state=active]:shadow-none px-6 text-xs font-bold">
            Phim X-quang & File
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <DentalChart patientId={patient.id} initialTeethData={teethData} />
        </TabsContent>

        <TabsContent value="treatment">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Danh sách phác đồ điều trị</h3>
              <Button 
                onClick={() => setIsPlanFormOpen(!isPlanFormOpen)}
                className={cn(
                  "rounded-2xl gap-2 font-bold px-6",
                  isPlanFormOpen ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-red-50 text-red-600 hover:bg-red-100"
                )}
              >
                {isPlanFormOpen ? (
                  <>Hủy bỏ</>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Tạo phác đồ mới
                  </>
                )}
              </Button>
            </div>

            {isPlanFormOpen ? (
              <TreatmentPlanForm 
                patientId={patient.id} 
                onSuccess={() => setIsPlanFormOpen(false)} 
              />
            ) : (
              <TreatmentPlanList plans={patient.treatmentPlans} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="billing">
            <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-gray-900">Lịch sử hóa đơn</h3>
                    <Button variant="ghost" className="text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl">Xem tất cả</Button>
                </div>
                {/* Simplified Invoice Table */}
                <div className="border border-gray-50 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-400 text-[10px] uppercase">Mã HĐ</th>
                                <th className="px-6 py-4 font-bold text-gray-400 text-[10px] uppercase">Dịch vụ</th>
                                <th className="px-6 py-4 font-bold text-gray-400 text-[10px] uppercase">Ngày</th>
                                <th className="px-6 py-4 font-bold text-gray-400 text-[10px] uppercase">Số tiền</th>
                                <th className="px-6 py-4 font-bold text-gray-400 text-[10px] uppercase">Trạng thái</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {patient.invoices && patient.invoices.length > 0 ? (
                              patient.invoices.map((invoice: any) => (
                                <tr key={invoice.id} className="group">
                                    <td className="px-6 py-4 font-bold">#{invoice.invoiceNo}</td>
                                    <td className="px-6 py-4 font-medium">{invoice.notes || 'Dịch vụ điều trị'}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                      {format(new Date(invoice.issuedAt), 'dd MMM, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 font-black">
                                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(invoice.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge className={
                                          invoice.paymentStatus === 'PAID' ? "bg-green-50 text-green-600 border-none px-2 rounded-full text-[9px] font-bold" :
                                          invoice.paymentStatus === 'PARTIAL' ? "bg-orange-50 text-orange-600 border-none px-2 rounded-full text-[9px] font-bold" :
                                          "bg-red-50 text-red-600 border-none px-2 rounded-full text-[9px] font-bold"
                                        }>
                                          {invoice.paymentStatus}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {invoice.paymentStatus !== 'PAID' && (
                                          <Button 
                                              onClick={() => setIsPaymentOpen(true)}
                                              className="h-8 rounded-lg bg-red-500 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all"
                                          >
                                              THANH TOÁN NGAY
                                          </Button>
                                        )}
                                    </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-400 font-medium italic">
                                  Chưa có hóa đơn nào
                                </td>
                              </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </TabsContent>

        <TabsContent value="files">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Tải tệp tin mới</h3>
              <XrayUpload patientId={patient.id} />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Thư viện ảnh y khoa</h3>
              <div className="grid grid-cols-2 gap-4">
                {patient.xrays && patient.xrays.length > 0 ? (
                  patient.xrays.map((xray: any) => (
                    <div key={xray.id} className="relative aspect-square rounded-3xl overflow-hidden group border border-gray-100">
                      <img src={xray.url} alt={xray.fileName} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="aspect-square bg-gray-50 rounded-3xl flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                    <FileText className="w-8 h-8 mb-2 opacity-20" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Chưa có hình ảnh</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        amount={0} 
        orderCode="" 
      />

      <MedicalHistoryModal
        isOpen={isMedicalModalOpen}
        onClose={() => setIsMedicalModalOpen(false)}
        patient={patient}
      />
    </div>
  );
}

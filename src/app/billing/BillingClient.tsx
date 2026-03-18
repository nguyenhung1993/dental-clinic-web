'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  FileText, 
  MoreVertical,
  Printer,
  FileSpreadsheet,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { exportToExcel, exportToPDF, formatCurrencyForExport } from '@/lib/export-utils';

interface BillingClientProps {
  initialInvoices: any[];
}

export default function BillingClient({ initialInvoices }: BillingClientProps) {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.patient.patientCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportExcel = async () => {
    const data = filteredInvoices.map(inv => ({
      'Mã Hóa Đơn': inv.invoiceNo,
      'Bệnh Nhân': inv.patient.fullName,
      'Mã BN': inv.patient.patientCode,
      'Ngày Lập': new Date(inv.issuedAt).toLocaleDateString('vi-VN'),
      'Tổng Tiền': inv.totalAmount,
      'Đã Thanh Toán': inv.paidAmount,
      'Còn Lại': inv.remainingAmount,
      'Trạng Thái': inv.paymentStatus === 'PAID' ? 'Đã thanh toán' : 
                    inv.paymentStatus === 'PARTIAL' ? 'Thanh toán một phần' : 'Chưa thanh toán'
    }));
    
    await exportToExcel(data, `Danh_sach_hoa_don_${new Date().getTime()}`, 'Hóa đơn');
  };

  const handleExportPDF = async (invoice: any) => {
    try {
      const { getInvoiceById } = await import('@/actions/billing');
      const result = await getInvoiceById(invoice.id);
      
      if (!result.success || !result.data) {
        alert('Không thể tải chi tiết hóa đơn để xuất PDF');
        return;
      }

      const fullInvoice = result.data;
      const headers = ['Dịch vụ', 'Số lượng', 'Đơn giá', 'Thành tiền'];
      
      const tableData = fullInvoice.items.map((item: any) => [
        item.description || item.service?.name || 'Dịch vụ',
        item.quantity.toString(),
        formatCurrencyForExport(item.unitPrice),
        formatCurrencyForExport(item.totalPrice)
      ]);

      // Thêm dòng tổng cộng
      tableData.push([
        { content: 'Tổng cộng', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
        formatCurrencyForExport(fullInvoice.totalAmount)
      ]);
      
      await exportToPDF(
        `HÓA ĐƠN: ${fullInvoice.invoiceNo}`,
        headers,
        tableData,
        fullInvoice.invoiceNo
      );
    } catch (error) {
      console.error('Export PDF error:', error);
      alert('Đã có lỗi xảy ra khi xuất PDF');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thanh Toán & Hóa Đơn</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý doanh thu, công nợ và in ấn tài chính</p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-green-100 transition-all active:scale-95"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span className="font-bold text-sm">Xuất Excel</span>
          </Button>
          <Button 
            variant="outline"
            className="rounded-2xl h-10 border-gray-100 gap-2 px-6 shadow-sm shadow-gray-50 bg-white hover:bg-gray-50"
          >
            <Printer className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-bold text-gray-700">In báo cáo</span>
          </Button>
        </div>
      </div>

      {/* Stats Overview (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">Tổng doanh thu</p>
          <p className="text-2xl font-black text-gray-900">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">Đã thu</p>
          <p className="text-2xl font-black text-green-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
            )}
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
          <p className="text-sm font-bold text-gray-400 uppercase mb-2">Công nợ</p>
          <p className="text-2xl font-black text-red-500">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              invoices.reduce((sum, inv) => sum + inv.remainingAmount, 0)
            )}
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <Input 
            className="pl-10 bg-white border-gray-100 focus-visible:ring-1 focus-visible:ring-blue-100 transition-all rounded-2xl h-11 shadow-sm shadow-gray-50" 
            placeholder="Tìm theo số hóa đơn, tên bệnh nhân..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-11 border-gray-100 gap-2 px-6 shadow-sm shadow-gray-50 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">Bộ lọc</span>
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-50">
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4 pl-6">Mã Hóa Đơn</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Bệnh Nhân</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Ngày Lập</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Tổng Tiền</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Trạng Thái</TableHead>
              <TableHead className="text-right pr-6 py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow key={inv.id} className="group hover:bg-blue-50/10 border-gray-50 transition-colors">
                <TableCell className="font-bold text-gray-900 text-sm pl-6 py-4">
                  {inv.invoiceNo}
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{inv.patient.fullName}</p>
                    <p className="text-[11px] font-medium text-gray-400">{inv.patient.patientCode}</p>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-sm text-gray-600 font-medium">
                  {new Date(inv.issuedAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell className="py-4 font-bold text-gray-900">
                  {new Intl.NumberFormat('vi-VN').format(inv.totalAmount)} đ
                </TableCell>
                <TableCell className="py-4">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] font-bold px-3 py-1 rounded-full border-none flex w-fit gap-1 items-center",
                      inv.paymentStatus === 'PAID' ? "bg-green-50 text-green-600" : 
                      inv.paymentStatus === 'PARTIAL' ? "bg-blue-50 text-blue-600" : 
                      "bg-red-50 text-red-600"
                    )}
                  >
                    {inv.paymentStatus === 'PAID' ? <CheckCircle2 className="w-3" /> : 
                     inv.paymentStatus === 'PARTIAL' ? <Clock className="w-3" /> : 
                     <AlertCircle className="w-3" />}
                    {inv.paymentStatus === 'PAID' ? 'Đã thanh toán' : 
                     inv.paymentStatus === 'PARTIAL' ? 'Một phần' : 'Chưa thanh toán'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                      onClick={() => handleExportPDF(inv)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-gray-100 shadow-xl">
                        <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-2.5">
                          <FileText className="w-4 h-4 text-gray-400" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl gap-2 font-bold text-xs py-2.5">
                          <Download className="w-4 h-4 text-gray-400" />
                          Tải xuống PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center">
                  <p className="text-gray-400 font-medium">Không tìm thấy hóa đơn nào</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

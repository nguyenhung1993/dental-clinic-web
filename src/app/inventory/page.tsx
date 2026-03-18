'use client';

import React from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle, 
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  MoreHorizontal
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
import { cn } from '@/lib/utils';

import { useDebounce } from '@/hooks/use-debounce';

const inventory = [
  { id: '1', name: 'Composite nha khoa (A2)', category: 'Vật liệu', stock: 45, unit: 'Ống', minStock: 10, status: 'Còn hàng' },
  { id: '2', name: 'Găng tay cao su (Size M)', category: 'Dùng một lần', stock: 5, unit: 'Hộp', minStock: 20, status: 'Sắp hết hàng' },
  { id: '3', name: 'Thuốc tê tại chỗ', category: 'Thuốc', stock: 120, unit: 'Ống tiêm', minStock: 30, status: 'Còn hàng' },
  { id: '4', name: 'Khẩu trang y tế (3 lớp)', category: 'Dùng một lần', stock: 0, unit: 'Hộp', minStock: 15, status: 'Hết hàng' },
  { id: '5', name: 'Bơm kim tiêm dùng một lần', category: 'Dùng một lần', stock: 200, unit: 'Cái', minStock: 50, status: 'Còn hàng' },
];

export default function InventoryPage() {
  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 500);

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    item.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý kho vật tư</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Theo dõi tồn kho, vật liệu và cung ứng lâm sàng</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-10 px-6 gap-2 bg-white shadow-sm shadow-gray-50">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="font-bold text-xs">Nhập kho</span>
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
                <Plus className="w-5 h-5" />
                <span className="font-bold text-sm">Thêm mặt hàng</span>
            </Button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-500" />
            </div>
            <div>
                <p className="text-2xl font-black text-gray-900 leading-none">124</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-1">Tổng mặt hàng</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <div>
                <p className="text-2xl font-black text-gray-900 leading-none">8</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-1">Cảnh báo tồn thấp</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <ArrowDownLeft className="w-6 h-6 text-red-500" />
            </div>
            <div>
                <p className="text-2xl font-black text-gray-900 leading-none">2</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase mt-1">Hết hàng</p>
            </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-red-500 transition-colors" />
          <Input 
            className="pl-10 bg-white border-gray-100 focus-visible:ring-1 focus-visible:ring-red-100 transition-all rounded-2xl h-11 shadow-sm shadow-gray-50" 
            placeholder="Tìm kiếm mặt hàng..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="rounded-2xl h-11 border-gray-100 gap-2 px-6 bg-white hover:bg-gray-50">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-bold">Danh mục</span>
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-sm shadow-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-50">
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4 pl-6">Tên mặt hàng</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Danh mục</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Mức tồn kho</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Tồn kho tối thiểu</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[11px] py-4">Trạng thái</TableHead>
              <TableHead className="w-[80px] py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id} className="group hover:bg-gray-50/50 border-gray-50 transition-colors">
                <TableCell className="py-4 pl-6">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">#{item.id.padStart(4, '0')}</span>
                    </div>
                </TableCell>
                <TableCell className="py-4">
                    <span className="text-xs font-bold text-gray-600 bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100">{item.category}</span>
                </TableCell>
                <TableCell className="py-4">
                    <div className="flex flex-col gap-1">
                        <span className={cn(
                            "text-sm font-black",
                            item.stock === 0 ? "text-red-500" : item.stock <= item.minStock ? "text-orange-500" : "text-gray-900"
                        )}>
                            {item.stock} {item.unit}
                        </span>
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={cn(
                                    "h-full transition-all duration-500",
                                    item.stock === 0 ? "bg-red-500" : item.stock <= item.minStock ? "bg-orange-500" : "bg-green-500"
                                )}
                                style={{ width: `${Math.min((item.stock / 100) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                </TableCell>
                <TableCell className="py-4 text-xs font-bold text-gray-400">
                    {item.minStock} {item.unit}
                </TableCell>
                <TableCell className="py-4">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-full border-none",
                      item.status === 'Còn hàng' ? "bg-green-50 text-green-600" : 
                      item.status === 'Sắp hết hàng' ? "bg-orange-50 text-orange-600" : 
                      "bg-red-50 text-red-600"
                    )}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6 py-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-red-500 rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredInventory.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-20 text-center text-gray-400 font-bold uppercase text-[10px]">
                  Không tìm thấy mặt hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

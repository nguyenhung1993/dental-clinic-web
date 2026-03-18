'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  MapPin, 
  Phone, 
  Users, 
  Activity,
  CheckCircle2,
  Settings2,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BranchesClientProps {
  initialBranches: any[];
}

export default function BranchesClient({ initialBranches }: BranchesClientProps) {
  const [branches, setBranches] = useState(initialBranches);

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chuỗi phòng khám</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Quản lý danh sách các chi nhánh và phân bổ nguồn lực</p>
        </div>
        
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-10 px-6 shadow-lg shadow-red-100 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="font-bold text-sm">Thêm chi nhánh mới</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch) => (
          <Card key={branch.id} className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden hover:shadow-md transition-all group bg-white">
            <CardContent className="p-0">
                <div className="h-24 bg-linear-to-r from-red-50 to-orange-50 relative">
                    <div className="absolute -bottom-6 left-8 w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-red-500" />
                    </div>
                    {branch.isActive && (
                        <Badge className="absolute top-4 right-6 bg-red-500 text-white border-none font-bold text-[9px] uppercase tracking-widest px-3 py-1">
                            {branch.id.includes('hcm') ? 'Trụ sở chính' : 'Đang hoạt động'}
                        </Badge>
                    )}
                </div>
                
                <div className="p-8 pt-10">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{branch.name}</h3>
                        <Badge className={cn(
                            "text-[9px] font-bold px-2 py-0.5 rounded-lg border-none",
                            branch.isActive ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                        )}>
                            {branch.isActive ? 'Đang hoạt động' : 'Đang bảo trì'}
                        </Badge>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-gray-300 mt-0.5" />
                            <p className="text-xs font-medium text-gray-500 leading-relaxed">{branch.address || 'Chưa cập nhật địa chỉ'}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-gray-300" />
                            <p className="text-xs font-bold text-gray-700">{branch.phone || 'Chưa có SĐT'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8 py-6 border-y border-gray-50">
                        <div className="flex flex-col items-center border-r border-gray-50 px-2 text-center">
                            <Users className="w-5 h-5 text-gray-400 mb-2" />
                            <p className="text-xl font-black text-gray-900">{branch._count?.patients || 0}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Bệnh nhân</p>
                        </div>
                        <div className="flex flex-col items-center px-2 text-center">
                            <Activity className="w-5 h-5 text-gray-400 mb-2" />
                            <p className="text-xl font-black text-gray-900">{branch._count?.staff || 0}</p>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nhân sự</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <Button className="flex-1 bg-gray-900 hover:bg-black text-white rounded-xl h-10 font-bold text-xs gap-2 transition-all">
                            Quản lý
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-gray-100 hover:bg-gray-50">
                            <Settings2 className="w-4 h-4 text-gray-400" />
                        </Button>
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Branch Mockup */}
        <div className="border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center p-8 min-h-[400px] hover:border-red-200 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors">
                <Plus className="w-8 h-8 text-gray-300 group-hover:text-red-400" />
            </div>
            <p className="text-sm font-bold text-gray-400 group-hover:text-red-500 transition-colors">Thêm chi nhánh khác</p>
        </div>
      </div>
    </div>
  );
}

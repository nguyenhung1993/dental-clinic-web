'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Package,
  CircleDollarSign,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { getServices, createTreatmentPlan } from '@/actions/treatment';
import { toast } from 'sonner';

interface TreatmentPlanFormProps {
  patientId: string;
  onSuccess?: () => void;
}

export function TreatmentPlanForm({ patientId, onSuccess }: TreatmentPlanFormProps) {
  const [items, setItems] = useState<{ id: string; serviceId: string; tooth: string; price: number; discount: number }[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const data = await getServices();
      setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(), serviceId: '', tooth: '', price: 0, discount: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: string, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        if (field === 'serviceId') {
          const service = services.find(s => s.id === value);
          return { ...item, [field]: value, price: service?.price || 0 };
        }
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSave = async () => {
    if (items.length === 0) {
      toast.error('Vui lòng thêm ít nhất một dịch vụ');
      return;
    }

    if (items.some(i => !i.serviceId)) {
      toast.error('Vui lòng chọn dịch vụ cho tất cả các dòng');
      return;
    }

    setSaving(true);
    const result = await createTreatmentPlan(patientId, {
      title: 'Phác đồ điều trị mới',
      totalAmount: total,
      items: items
    });
    setSaving(false);

    if (result.success) {
      toast.success('Đã lưu phác đồ điều trị thành công');
      setItems([]);
      onSuccess?.();
    } else {
      toast.error(result.error || 'Lỗi khi lưu phác đồ');
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price - item.discount), 0);

  if (loading) {
    return (
      <div className="bg-white p-20 rounded-3xl border border-gray-50 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-sm font-bold text-gray-400">Đang tải danh sách dịch vụ...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h3 className="text-xl font-bold text-gray-900">Phác đồ điều trị mới</h3>
            <p className="text-xs font-medium text-gray-400 mt-1">Chỉ định các phương pháp điều trị và điều khoản tài chính</p>
        </div>
        <Button onClick={addItem} className="bg-red-50 text-red-600 hover:bg-red-100 border-none rounded-2xl gap-2 font-bold text-xs h-10 px-5">
            <Plus className="w-4 h-4" />
            Thêm dịch vụ
        </Button>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
            <div className="border-2 border-dashed border-gray-50 rounded-3xl p-12 text-center">
                <Package className="w-12 h-12 text-gray-100 mx-auto mb-4" />
                <p className="text-sm font-bold text-gray-400">Chưa có dịch vụ nào được thêm</p>
            </div>
        ) : (
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-50 items-end group">
                        <div className="md:col-span-5 space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Dịch vụ</label>
                            <Select value={item.serviceId} onValueChange={(v) => updateItem(item.id, 'serviceId', v)}>
                                <SelectTrigger className="bg-white border-transparent h-10 rounded-xl font-medium text-sm">
                                    <SelectValue placeholder="Chọn một dịch vụ" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100">
                                    {services.map(s => (
                                        <SelectItem key={s.id} value={s.id} className="text-sm font-medium focus:bg-red-50 focus:text-red-500 rounded-lg">
                                            {s.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Răng #</label>
                            <Input 
                                placeholder="VD: 18" 
                                value={item.tooth}
                                onChange={(e) => updateItem(item.id, 'tooth', e.target.value)}
                                className="bg-white border-transparent h-10 rounded-xl text-sm font-bold"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Giá</label>
                            <div className="relative">
                                <CircleDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                <Input 
                                    type="number" 
                                    readOnly
                                    value={item.price}
                                    className="pl-9 bg-gray-100/50 border-transparent h-10 rounded-xl text-sm font-black text-gray-900"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">G.Giá</label>
                            <Input 
                                type="number" 
                                value={item.discount}
                                onChange={(e) => updateItem(item.id, 'discount', Number(e.target.value))}
                                className="bg-white border-transparent h-10 rounded-xl text-sm font-black text-green-600"
                            />
                        </div>
                        <div className="md:col-span-1 flex justify-end pb-1">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeItem(item.id)}
                                className="h-9 w-9 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between p-8 bg-gray-900 rounded-[32px] text-white">
        <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tổng tiền dự kiến</p>
            <h4 className="text-4xl font-black mt-1">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
            </h4>
        </div>
        <div className="flex gap-3 mt-6 md:mt-0">
            <Button variant="ghost" onClick={() => setItems([])} className="text-white hover:bg-white/10 rounded-2xl px-6 h-12 font-bold">Hủy bỏ</Button>
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-8 h-12 shadow-xl shadow-red-500/20 gap-2 font-bold"
            >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Lưu & Kích hoạt phác đồ
            </Button>
        </div>
      </div>
    </div>
  );
}

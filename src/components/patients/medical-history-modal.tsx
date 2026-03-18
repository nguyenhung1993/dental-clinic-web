'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { updatePatient } from '@/actions/patients';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';

interface MedicalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
}

export function MedicalHistoryModal({ isOpen, onClose, patient }: MedicalHistoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    medicalHistory: patient.medicalHistory || '',
    allergies: patient.allergies || '',
    bloodPressure: patient.bloodPressure || '',
    isDiabetic: patient.isDiabetic || false,
    isBloodDisorder: patient.isBloodDisorder || false,
    otherConditions: patient.otherConditions || '',
  });

  const handleSave = async () => {
    setLoading(true);
    const result = await updatePatient(patient.id, formData);
    setLoading(false);
    
    if (result.success) {
      toast.success('Đã cập nhật tiền sử bệnh lý');
      onClose();
    } else {
      toast.error(result.error || 'Lỗi khi cập nhật');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[32px] border-none p-0 overflow-hidden">
        <DialogHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-red-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">Tiền sử bệnh lý</DialogTitle>
              <p className="text-xs font-medium text-gray-400 mt-1">Cập nhật thông tin sức khỏe tổng quát của bệnh nhân</p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Huyết áp</Label>
              <Input 
                placeholder="VD: 120/80 mmHg"
                value={formData.bloodPressure}
                onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                className="bg-gray-50 border-transparent rounded-xl font-bold h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Dị ứng</Label>
              <Input 
                placeholder="VD: Penicillin, hải sản..."
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                className="bg-gray-50 border-transparent rounded-xl font-bold h-11 text-red-500"
              />
            </div>
          </div>

          <div className="flex gap-8 p-4 bg-orange-50/30 rounded-2xl border border-orange-50">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="diabetic" 
                checked={formData.isDiabetic}
                onCheckedChange={(checked) => setFormData({...formData, isDiabetic: !!checked})}
              />
              <Label htmlFor="diabetic" className="text-sm font-bold text-gray-700 cursor-pointer">Tiểu đường</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="bloodDisorder" 
                checked={formData.isBloodDisorder}
                onCheckedChange={(checked) => setFormData({...formData, isBloodDisorder: !!checked})}
              />
              <Label htmlFor="bloodDisorder" className="text-sm font-bold text-gray-700 cursor-pointer">Rối loạn đông máu</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Tiền sử bệnh lý chi tiết</Label>
            <Textarea 
              placeholder="Ghi chú về các bệnh lý đã hoặc đang điều trị..."
              rows={4}
              value={formData.medicalHistory}
              onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
              className="bg-gray-50 border-transparent rounded-2xl font-medium resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Các vấn đề khác</Label>
            <Input 
              placeholder="Các tình trạng sức khỏe khác cần lưu ý..."
              value={formData.otherConditions}
              onChange={(e) => setFormData({...formData, otherConditions: e.target.value})}
              className="bg-gray-50 border-transparent rounded-xl font-medium h-11"
            />
          </div>
        </div>

        <DialogFooter className="p-6 bg-gray-50/30 border-t border-gray-100 flex gap-3">
          <Button variant="ghost" onClick={onClose} className="rounded-2xl font-bold text-gray-500">Hủy bỏ</Button>
          <Button 
            onClick={handleSave} 
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white rounded-2xl px-8 font-bold gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Lưu thông tin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

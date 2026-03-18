'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createPatient } from '@/actions/patients';
import { toast } from 'sonner';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatientModal({ isOpen, onClose }: PatientModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      gender: formData.get('gender') as any,
      dob: formData.get('dob') ? new Date(formData.get('dob') as string) : null,
      address: formData.get('address') as string,
    };

    const result = await createPatient(data);
    setLoading(false);

    if (result.success) {
      toast.success('Thêm bệnh nhân thành công');
      onClose();
    } else {
      toast.error(result.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm bệnh nhân mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Họ và tên *</Label>
            <Input id="fullName" name="fullName" placeholder="Nguyễn Văn A" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input id="phone" name="phone" placeholder="0901234567" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select name="gender" defaultValue="MALE">
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Nam</SelectItem>
                  <SelectItem value="FEMALE">Nữ</SelectItem>
                  <SelectItem value="OTHER">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dob">Ngày sinh</Label>
              <Input id="dob" name="dob" type="date" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input id="address" name="address" placeholder="Địa chỉ thường trú" />
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Hủy
            </Button>
            <Button type="submit" className="bg-red-500 hover:bg-red-600" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu bệnh nhân'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

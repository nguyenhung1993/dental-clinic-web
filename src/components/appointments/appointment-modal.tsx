'use client';

import React, { useState, useEffect } from 'react';
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
import { createAppointment, getDoctors, searchPatients } from '@/actions/appointments';
import { toast } from 'sonner';
import { Search, User, X, Check } from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
}

export function AppointmentModal({ isOpen, onClose, initialDate }: AppointmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    if (isOpen) {
      loadDoctors();
      // Reset state
      setSearchQuery('');
      setPatients([]);
      setSelectedPatient(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setPatients([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchPatients(searchQuery);
        setPatients(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedPatient) {
      toast.error('Vui lòng chọn hoặc tìm bệnh nhân');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const dateStr = formData.get('date') as string;
    const timeStr = formData.get('time') as string;
    
    // Đảm bảo timeStr có định dạng HH:mm
    const scheduledAt = new Date(`${dateStr}T${timeStr}`);

    if (isNaN(scheduledAt.getTime())) {
      toast.error('Ngày hoặc giờ hẹn không hợp lệ');
      setLoading(false);
      return;
    }

    const data = {
      patientId: selectedPatient.id,
      doctorId: formData.get('doctorId') as string,
      scheduledAt,
      duration: parseInt(formData.get('duration') as string) || 60,
      chiefComplaint: formData.get('chiefComplaint') as string,
      status: 'SCHEDULED'
    };

    if (!data.doctorId) {
      toast.error('Vui lòng chọn bác sĩ phụ trách');
      setLoading(false);
      return;
    }

    try {
      const result = await createAppointment(data);
      if (result.success) {
        toast.success('Đặt lịch hẹn thành công');
        onClose();
      } else {
        toast.error(result.error || 'Có lỗi xảy ra khi tạo lịch hẹn');
      }
    } catch (err) {
      toast.error('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const defaultDate = initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
  const defaultTime = "09:00";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] overflow-visible">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Đặt lịch hẹn mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-5 py-4">
          {/* Patient Selection */}
          <div className="grid gap-2">
            <Label className="text-sm font-bold text-gray-700">Tìm bệnh nhân *</Label>
            {!selectedPatient ? (
              <div className="relative">
                <div className="relative">
                  <Input 
                    placeholder="Nhập tên, số điện thoại hoặc mã BN..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-gray-200 focus:border-red-500 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                
                {searchQuery.length >= 2 && (
                  <div className="absolute z-[100] w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-[240px] overflow-auto p-2 animate-in fade-in zoom-in-95 duration-200">
                    {patients.length > 0 ? (
                      patients.map((p) => (
                        <div 
                          key={p.id} 
                          className="flex items-center justify-between p-3 hover:bg-red-50 rounded-xl cursor-pointer transition-colors group"
                          onClick={() => {
                            setSelectedPatient(p);
                            setSearchQuery('');
                            setPatients([]);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold group-hover:bg-red-500 group-hover:text-white transition-colors">
                              {p.fullName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 group-hover:text-red-700">{p.fullName}</p>
                              <p className="text-xs text-gray-400 font-medium">{p.phone}</p>
                            </div>
                          </div>
                          <Check className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))
                    ) : (
                      !isSearching && <p className="p-4 text-center text-sm text-gray-400 font-medium">Không tìm thấy bệnh nhân nào</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border-2 border-red-100 rounded-2xl bg-red-50/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-red-100">
                    {selectedPatient.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{selectedPatient.fullName}</p>
                    <p className="text-xs font-bold text-red-500">{selectedPatient.phone}</p>
                  </div>
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                  onClick={() => setSelectedPatient(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-bold text-gray-700" htmlFor="doctorId">Bác sĩ phụ trách *</Label>
            <Select name="doctorId">
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {doctors.map((d) => (
                  <SelectItem key={d.id} value={d.id} className="rounded-lg">{d.fullName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-bold text-gray-700" htmlFor="date">Ngày hẹn *</Label>
              <Input id="date" name="date" type="date" defaultValue={defaultDate} required className="h-11 rounded-xl border-gray-200" />
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-bold text-gray-700" htmlFor="time">Giờ hẹn *</Label>
              <Input id="time" name="time" type="time" defaultValue={defaultTime} required className="h-11 rounded-xl border-gray-200" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-bold text-gray-700" htmlFor="duration">Thời lượng dự kiến</Label>
            <Select name="duration" defaultValue="60">
              <SelectTrigger className="h-11 rounded-xl border-gray-200">
                <SelectValue placeholder="Chọn thời lượng" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="30" className="rounded-lg">30 phút</SelectItem>
                <SelectItem value="60" className="rounded-lg">60 phút</SelectItem>
                <SelectItem value="90" className="rounded-lg">90 phút</SelectItem>
                <SelectItem value="120" className="rounded-lg">120 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-bold text-gray-700" htmlFor="chiefComplaint">Lý do khám / Triệu chứng</Label>
            <Input id="chiefComplaint" name="chiefComplaint" placeholder="Nhập lý do khách đến khám..." className="h-11 rounded-xl border-gray-200" />
          </div>

          <DialogFooter className="mt-4 gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={loading}
              className="h-11 rounded-xl flex-1 border-gray-100 font-bold text-gray-400"
            >
              Thoát
            </Button>
            <Button 
              type="submit" 
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 flex-[2] font-bold shadow-lg shadow-red-100 active:scale-[0.98] transition-all" 
              disabled={loading}
            >
              {loading ? 'Đang thực hiện...' : 'Xác nhận đặt hẹn'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageIcon, Upload, X, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadXrayAction } from '@/actions/storage';
import { toast } from 'sonner';

interface XrayUploadProps {
  patientId: string;
  onSuccess?: (data: any) => void;
}

export function XrayUpload({ patientId, onSuccess }: XrayUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const result = await uploadXrayAction(formData, patientId);
      
      if (result.success) {
        toast.success('Tải ảnh X-Quang thành công!');
        clearFile();
        if (onSuccess) onSuccess(result.data);
      } else {
        toast.error(result.error || 'Lỗi khi tải ảnh');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra trong quá trình tải ảnh');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-gray-100 shadow-none rounded-[32px] overflow-hidden bg-gray-50/30">
      <CardContent className="p-8">
        {!preview ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400">
              <ImageIcon className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-gray-900 uppercase">Tải ảnh X-Quang mới</h4>
              <p className="text-[11px] font-bold text-gray-400 uppercase mt-1">Dạng Panorama, Cephalo, hoặc ảnh đơn</p>
            </div>
            <Label 
              htmlFor="xray-upload"
              className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-900 shadow-sm cursor-pointer hover:bg-gray-50 active:scale-95 transition-all"
            >
              Chọn tệp từ máy tính
            </Label>
            <Input 
              id="xray-upload" 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gray-900">
              <img src={preview} alt="Xray Preview" className="w-full h-full object-contain" />
              <button 
                onClick={clearFile}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900 truncate max-w-[200px]">{file?.name}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{(file!.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
              
              <Button 
                onClick={handleUpload}
                disabled={uploading}
                className="bg-red-500 hover:bg-red-600 text-white rounded-2xl h-11 px-8 gap-2 shadow-lg shadow-red-100 min-w-[140px]"
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <span className="font-bold text-sm">{uploading ? 'Đang tải...' : 'Bắt đầu tải lên'}</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Banknote, 
  ArrowRight,
  CheckCircle2,
  Download,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderCode: string;
}

export function PaymentModal({ isOpen, onClose, amount, orderCode }: PaymentModalProps) {
  const [method, setMethod] = useState<'vietqr' | 'cash' | 'card'>('vietqr');
  const [step, setStep] = useState<'select' | 'processing'>('select');

  // VietQR URL generate (Mockup)
  // Format: https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=VIETQR_PAYMENT_MOCK_DATA_FOR_${orderCode}_AMOUNT_${amount}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none rounded-[32px] shadow-2xl">
        <div className="bg-gray-900 p-8 text-white relative">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
            <Badge className="bg-red-500/20 text-red-500 border-none mb-4 font-bold">CỔNG THANH TOÁN</Badge>
            <DialogTitle className="text-3xl font-black">Thanh toán</DialogTitle>
            <DialogDescription className="text-gray-400 mt-2 font-medium">
                Hoàn tất thanh toán cho Hóa đơn {orderCode}
            </DialogDescription>
            
            <div className="mt-8 flex items-end justify-between">
                <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Số tiền cần thanh toán</p>
                    <h2 className="text-4xl font-black">${amount.toLocaleString()}</h2>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tiền tệ</p>
                    <p className="text-xl font-bold">USD</p>
                </div>
            </div>
        </div>

        <div className="p-8 bg-white">
            {step === 'select' ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-3">
                        <button 
                            onClick={() => setMethod('vietqr')}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                method === 'vietqr' ? 'border-red-500 bg-red-50/50' : 'border-gray-50 hover:border-gray-100'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'vietqr' ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                <QrCode className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">Chuyển khoản VietQR</p>
                                <p className="text-xs text-gray-400 font-medium">Xác nhận tức thì qua App Ngân hàng</p>
                            </div>
                            {method === 'vietqr' && <CheckCircle2 className="w-5 h-5 text-red-500" />}
                        </button>

                        <button 
                            onClick={() => setMethod('cash')}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                                method === 'cash' ? 'border-red-500 bg-red-50/50' : 'border-gray-50 hover:border-gray-100'
                            }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === 'cash' ? 'bg-red-500 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                <Banknote className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-gray-900">Thanh toán tiền mặt</p>
                                <p className="text-xs text-gray-400 font-medium">Thanh toán trực tiếp tại quầy</p>
                            </div>
                            {method === 'cash' && <CheckCircle2 className="w-5 h-5 text-red-500" />}
                        </button>
                    </div>

                    <Button 
                        onClick={() => setStep('processing')}
                        className="w-full bg-gray-900 hover:bg-black text-white rounded-2xl h-14 font-bold text-lg group"
                    >
                        Tiếp tục thanh toán
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                    {method === 'vietqr' ? (
                        <>
                            <div className="bg-gray-50 p-4 rounded-[40px] shadow-inner mb-6 relative">
                                <div className="absolute inset-0 bg-red-500/5 rounded-[40px] animate-pulse" />
                                <img src={qrUrl} alt="VietQR" className="w-[200px] h-[200px] relative z-10" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Quét mã để thanh toán</h4>
                            <p className="text-sm text-gray-400 mt-2 max-w-xs">Mở ứng dụng ngân hàng và quét mã QR để hoàn tất chuyển khoản.</p>
                            
                            <div className="mt-8 flex gap-3 w-full">
                                <Button variant="outline" className="flex-1 rounded-2xl border-gray-100 h-11 gap-2">
                                    <Download className="w-4 h-4" />
                                    Lưu ảnh
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-2xl border-gray-100 h-11 gap-2">
                                    <Share2 className="w-4 h-4" />
                                    Chia sẻ
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="py-12">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Banknote className="w-10 h-10 text-green-500" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">Đang chờ tiền mặt</h4>
                            <p className="text-sm text-gray-400 mt-2">Vui lòng nhận tiền mặt từ bệnh nhân và xác nhận bên dưới.</p>
                            <Button className="mt-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl px-8 h-12 font-bold w-full">Xác nhận đã nhận tiền mặt</Button>
                        </div>
                    )}
                    
                    <button onClick={() => setStep('select')} className="mt-6 text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest">Thay đổi phương thức thanh toán</button>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

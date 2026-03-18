'use client';

import React, { useState } from 'react';
import { 
  ScanSearch, 
  Brain, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Upload, 
  ChevronRight,
  Maximize2,
  Info,
  Sparkles,
  FileText,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const detections = [
  { id: 1, type: 'CAVITY', tooth: '16 (Mặt nhai)', confidence: 94, severity: 'MEDIUM', action: 'Trám răng' },
  { id: 2, type: 'PERIODONTITIS', tooth: '41-43', confidence: 88, severity: 'HIGH', action: 'Lấy cao răng sâu' },
  { id: 3, type: 'IMPACTED_TOOTH', tooth: '38', confidence: 99, severity: 'LOW', action: 'Theo dõi' },
];

export default function AIDiagnosticsPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Chẩn đoán AI (Alpha)</h1>
            <Badge className="bg-red-500 text-white border-none font-bold text-[9px] uppercase tracking-widest px-2 py-0.5">Premium</Badge>
          </div>
          <p className="text-sm font-medium text-gray-500">Ứng dụng thị giác máy tính hỗ trợ phân tích hình ảnh X-Quang nhanh chóng</p>
        </div>
        
        <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-gray-100 h-11 px-6 gap-2 bg-white">
                <Info className="w-4 h-4 text-gray-400" />
                <span className="font-bold text-xs uppercase">Hướng dẫn</span>
            </Button>
            <Button onClick={handleAnalyze} disabled={analyzing} className="bg-red-500 hover:bg-red-600 text-white rounded-2xl gap-2 h-11 px-8 shadow-lg shadow-red-100 transition-all active:scale-95 group">
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
              <span className="font-bold text-sm">Bắt đầu phân tích AI</span>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Analysis Area */}
        <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden bg-gray-900 aspect-video relative group">
                {/* Mock X-Ray Viewport */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=2070')] bg-cover opacity-50 grayscale contrast-125" />
                    
                    {/* Scanning Line Animation */}
                    {analyzing && (
                        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">
                            <div className="w-full h-1 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] absolute animate-scan" style={{ top: `${progress}%` }} />
                        </div>
                    )}

                    {/* AI Bounding Boxes (Mock) */}
                    {!analyzing && progress === 100 && (
                        <div className="absolute inset-0 z-10 transition-opacity duration-500">
                             {/* Tooth 16 */}
                             <div className="absolute top-[40%] left-[30%] w-16 h-16 border-2 border-yellow-500 rounded-lg bg-yellow-500/10 cursor-help group/box">
                                <div className="absolute -top-6 left-0 bg-yellow-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Sâu răng (94%)</div>
                             </div>
                             {/* Tooth 41-43 */}
                             <div className="absolute bottom-[20%] right-[40%] w-32 h-12 border-2 border-red-500 rounded-lg bg-red-500/10 cursor-help">
                                <div className="absolute -bottom-6 left-0 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Viêm nha chu (88%)</div>
                             </div>
                        </div>
                    )}
                </div>

                {/* Viewport Actions */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10 z-20">
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                        <Upload className="w-4 h-4" />
                    </Button>
                    <div className="w-px h-6 bg-white/10" />
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                        <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-xl">
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <ScanSearch className="w-5 h-5 text-red-500" />
                        Kết quả phát hiện
                    </h3>
                    <div className="space-y-4">
                        {detections.map((d) => (
                            <div key={d.id} className="p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className={cn(
                                            "border-none text-[9px] font-bold px-2 py-0.5 rounded-lg uppercase",
                                            d.severity === 'HIGH' ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                                        )}>
                                            {d.severity === 'HIGH' ? 'Nghiêm trọng' : 'Trung bình'}
                                        </Badge>
                                        <span className="text-sm font-bold text-gray-900">{d.type === 'CAVITY' ? 'Sâu răng' : d.type === 'PERIODONTITIS' ? 'Viêm nha chu' : 'Răng mọc ngầm'}</span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{d.confidence}% tin cậy</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-500 font-medium">Vị trí: <span className="text-gray-900 font-bold">Răng {d.tooth}</span></p>
                                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black text-red-500 hover:bg-red-50 uppercase tracking-widest">
                                        Chi tiết
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-gray-900 text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Brain className="w-24 h-24" />
                    </div>
                    <h3 className="text-lg font-bold relative z-10 mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-red-500" />
                        Gợi ý phác đồ AI
                    </h3>
                    <div className="space-y-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ưu tiên cao nhất</p>
                            <h4 className="text-base font-bold mb-3">Phẫu thuật răng khôn #38 & Trám răng #16</h4>
                            <Progress value={85} className="h-2 bg-white/10" />
                            <p className="text-[10px] mt-2 text-gray-400 font-medium italic">Gợi ý dựa trên chẩn đoán hình ảnh và tiền sử bệnh lý.</p>
                        </div>
                        <Button className="w-full bg-red-500 hover:bg-red-600 rounded-2xl h-11 font-bold text-xs gap-2">
                            Áp dụng vào Kế hoạch điều trị
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>

        {/* Sidebar: Patient & History */}
        <div className="lg:col-span-4 space-y-8">
            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-[28px] flex items-center justify-center mb-4 relative">
                        <AlertCircle className="absolute -top-1 -right-1 w-6 h-6 text-red-500 bg-white rounded-full p-0.5" />
                        <span className="text-2xl font-black text-gray-400">VA</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Nguyễn Văn Anh</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Hồ sơ #BN-0428</p>
                </div>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] overflow-hidden">
                <CardHeader className="bg-gray-50/50 p-6 border-b border-gray-50">
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        Lịch sử phân tích
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {[
                        { date: '12 PHÚT TRƯỚC', type: 'Panorama X-Ray', status: 'COMPLETED' },
                        { date: '2 THÁNG TRƯỚC', type: 'Cephalo Analysis', status: 'COMPLETED' },
                        { date: '2 THÁNG TRƯỚC', type: 'Periapical Study', status: 'COMPLETED' },
                    ].map((h, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400">{h.date}</p>
                                <p className="text-sm font-bold text-gray-700 mt-0.5 group-hover:text-red-500 transition-colors uppercase">{h.type}</p>
                            </div>
                            <CheckCircle2 className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                    <Button variant="ghost" className="w-full h-12 text-xs font-black text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-none border-t border-gray-50">
                        XEM TẤT CẢ LỊCH SỬ
                    </Button>
                </CardContent>
            </Card>

            <Card className="border-none shadow-sm shadow-gray-100 rounded-[32px] p-8 bg-linear-to-br from-indigo-500 to-purple-600 text-white overflow-hidden relative group">
                <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-125 transition-transform">
                    <Brain className="w-40 h-40" />
                </div>
                <h3 className="text-xl font-bold relative z-10">Nâng cấp Lõi AI</h3>
                <p className="text-sm font-medium opacity-80 mt-2 relative z-10 leading-relaxed">Bộ công cụ AI mới đang được huấn luyện để phân tích mầm răng vĩnh viễn cho trẻ em.</p>
                <div className="mt-8 relative z-10">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white rounded-xl font-bold text-xs h-10 hover:bg-white/20 w-full mb-3">
                        Đăng ký trải nghiệm sớm
                    </Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

'use client';

import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Monitor, 
  MessageSquare, 
  Users, 
  MoreVertical, 
  PhoneOff,
  Minimize2,
  Maximize2,
  Share2,
  X,
  Send,
  User,
  Activity,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function TelehealthRoom() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="fixed inset-0 bg-gray-950 z-100 flex flex-col md:flex-row overflow-hidden border-4 border-white">
      {/* Video Content */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        {/* Main Remote Video (Patient) */}
        <div className="w-full h-full max-w-6xl aspect-video bg-gray-900 rounded-[40px] overflow-hidden relative border border-white/10 shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=2070')] bg-cover opacity-80" />
            </div>
            {/* Header Overlay */}
            <div className="absolute top-8 left-8 flex items-center gap-4 z-20">
                <Avatar className="h-12 w-12 border-2 border-white/20 rounded-2xl">
                    <AvatarImage src="https://github.com/nutlope.png" />
                    <AvatarFallback>BN</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-white font-bold">BN. Nguyễn Văn Anh</h3>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-red-500 text-white border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5 animate-pulse">Trực tiếp</Badge>
                        <span className="text-white/60 text-xs font-medium">14:45:12</span>
                    </div>
                </div>
            </div>
            {/* Signal Indicator */}
            <div className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-white/80 text-xs font-bold">KẾT NỐI TỐT</span>
            </div>
        </div>

        {/* Picture-in-Picture (Doctor Self-view) */}
        <div className="absolute bottom-12 right-12 w-72 aspect-video bg-gray-800 rounded-3xl overflow-hidden border-2 border-white shadow-2xl z-30 group cursor-move">
            <div className="absolute inset-0 bg-[url('https://github.com/shadcn.png')] bg-cover grayscale-[0.2]" />
            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                <p className="text-[10px] text-white font-bold uppercase">Bạn (Bác sĩ)</p>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/20 rounded-lg">
                    <Maximize2 className="w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 py-4 px-8 bg-black/40 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl">
            <Button 
                onClick={() => setIsMuted(!isMuted)} 
                variant="ghost" 
                className={cn("h-14 w-14 rounded-2xl transition-all", isMuted ? "bg-red-500 hover:bg-red-600 text-white" : "text-white hover:bg-white/20")}
            >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            <Button 
                onClick={() => setIsVideoOff(!isVideoOff)} 
                variant="ghost" 
                className={cn("h-14 w-14 rounded-2xl transition-all", isVideoOff ? "bg-red-500 hover:bg-red-600 text-white" : "text-white hover:bg-white/20")}
            >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
            </Button>
            <div className="w-px h-10 bg-white/10 mx-2" />
            <Button variant="ghost" className="h-14 w-14 rounded-2xl text-white hover:bg-white/20">
                <Monitor className="w-6 h-6" />
            </Button>
            <Button variant="ghost" className="h-14 w-14 rounded-2xl text-white hover:bg-white/20">
                <Share2 className="w-6 h-6" />
            </Button>
            <div className="w-px h-10 bg-white/10 mx-2" />
            <Button 
                className="h-14 w-20 bg-red-500 hover:bg-red-600 rounded-2xl shadow-xl shadow-red-500/20 active:scale-95 transition-all text-white"
            >
                <PhoneOff className="w-7 h-7" />
            </Button>
        </div>
      </div>

      {/* Control Panel (Chat & AI Assist) */}
      <div className={cn(
          "w-full md:w-[450px] bg-white transition-all border-l border-gray-100 flex flex-col",
          !isChatOpen && "md:w-0 overflow-hidden border-l-0"
      )}>
        <div className="h-20 px-8 border-b border-gray-50 flex items-center justify-between shrink-0">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-red-500" />
                Hỗ trợ Tư vấn
            </h2>
            <Button onClick={() => setIsChatOpen(false)} variant="ghost" size="icon" className="h-10 w-10 text-gray-300 hover:text-red-500 rounded-xl">
                <X className="w-5 h-5" />
            </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* AI Assistant Insight */}
            <Card className="border-none shadow-sm shadow-red-50 rounded-[32px] bg-red-500 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-16 h-16" />
                </div>
                <CardContent className="p-8">
                    <Badge className="bg-white/20 text-white border-none font-black text-[9px] uppercase tracking-widest px-2 mb-4">Gợi ý AI</Badge>
                    <h4 className="text-lg font-bold mb-2 leading-tight">Bệnh nhân hay hỏi về "Thời gian niềng răng"</h4>
                    <p className="text-xs text-white/80 italic">AI gợi ý: Hãy chuẩn bị Slide mô phỏng tiến độ 18 tháng để minh họa cho bệnh nhân.</p>
                </CardContent>
            </Card>

            {/* Chat Messages */}
            <div className="space-y-6">
                <div className="flex gap-4">
                    <Avatar className="h-8 w-8 rounded-xl shrink-0 mt-1">
                        <AvatarImage src="https://github.com/nutlope.png" />
                        <AvatarFallback>BN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none">
                            <p className="text-sm text-gray-700 font-medium leading-relaxed">Dạo này em hay bị buốt ở vùng răng số 16 khi uống nước lạnh ạ.</p>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">14:48 PM</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <div className="space-y-2 text-right">
                        <div className="bg-red-500 text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-red-100">
                            <p className="text-sm font-medium leading-relaxed">Chào Anh, tình trạng này có thể do mòn men răng. Anh có thể há miệng to hơn một chút để tôi quan sát X-Quang vừa chụp nhé.</p>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">14:50 PM</p>
                    </div>
                    <Avatar className="h-8 w-8 rounded-xl shrink-0 mt-1">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </div>

        {/* Chat Input */}
        <div className="p-8 border-t border-gray-50 flex items-center gap-3 shrink-0">
            <Input className="flex-1 h-12 rounded-2xl bg-gray-50/50 border-transparent focus-visible:ring-1 focus-visible:ring-red-100 transition-all font-medium" placeholder="Viết phản hồi..." />
            <Button className="h-12 w-12 bg-gray-900 hover:bg-black rounded-2xl shadow-xl shadow-black/10 active:scale-95 transition-all text-white shrink-0">
                <Send className="w-5 h-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}


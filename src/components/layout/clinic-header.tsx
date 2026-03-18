'use client';

import React from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Moon, 
  Sun 
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ClinicHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-16 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30">
      {/* Logo or Brand Space (Optional) */}
      <div className="flex-1 invisible md:visible">
        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden lg:block">Phòng khám Nha khoa DoctorCare</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl gap-2 h-10 shadow-lg shadow-red-100 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span className="font-semibold text-sm">Đặt lịch hẹn mới</span>
        </Button>

        <div className="h-6 w-px bg-gray-100 mx-2" />

        <div className="flex items-center gap-2">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl hover:bg-gray-50 text-gray-500"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}

          <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-50 text-gray-500 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </Button>

          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xs ring-2 ring-transparent hover:ring-red-50 transition-all cursor-pointer">
            AS
          </div>
        </div>
      </div>
    </header>
  );
}

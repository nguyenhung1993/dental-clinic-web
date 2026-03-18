'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  PieChart, 
  Users, 
  Calendar, 
  ClipboardList, 
  Pill, 
  FlaskConical, 
  Syringe, 
  Video, 
  Bed, 
  UserCog, 
  KanbanSquare, 
  Activity, 
  UserSquare2, 
  Receipt,
  HeartPulse,
  LogOut,
  Search,
  Plus,
  Bell,
  Moon,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  Rocket,
  LineChart,
  Sparkles,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const menuGroups = [
  {
    label: 'TỔNG QUAN',
    items: [
      { name: 'Bảng điều khiển', href: '/admin', icon: LayoutDashboard },
      { name: 'Phân tích', href: '/analytics', icon: BarChart3 },
      { name: 'Biểu đồ', href: '/charts', icon: PieChart },
    ]
  },
  {
    label: 'LÂM SÀNG',
    items: [
      { name: 'Tổng quan bệnh nhân', href: '/patients/overview', icon: Users },
      { name: 'Lịch hẹn', href: '/appointments', icon: Calendar },
      { name: 'Hồ sơ bệnh án', href: '/patients/records', icon: ClipboardList, badge: '8' },
      { name: 'Đơn thuốc', href: '/prescriptions', icon: Pill },
      { name: 'Xét nghiệm', href: '/labs', icon: FlaskConical },
      { name: 'Tiêm chủng', href: '/vaccinations', icon: Syringe },
      { name: 'Bảo mật & Audit', href: '/admin/audit-logs', icon: ShieldCheck },
    ]
  },
  {
    label: 'QUẢN TRỊ',
    items: [
      { name: 'Danh sách bệnh nhân', href: '/patients', icon: UserSquare2 },
      { name: 'Quản lý kho', href: '/inventory', icon: Pill },
      { name: 'Thanh toán', href: '/billing', icon: Receipt },
      { name: 'Chi phí vận hành', href: '/expenses', icon: DollarSign },
    ]
  },
  {
    label: 'VẬN HÀNH',
    items: [
      { name: 'Khám từ xa', href: '/telehealth', icon: Video },
      { name: 'Tự động hóa', href: '/automations', icon: KanbanSquare },
      { name: 'Chuỗi cung ứng', href: '/inventory/supply-chain', icon: Truck },
      { name: 'Quản lý Labo', href: '/labo', icon: FlaskConical },
      { name: 'Chi nhánh', href: '/branches', icon: Bed },
    ]
  },
  {
    label: 'CHIẾN LƯỢC',
    items: [
      { name: 'Chẩn đoán AI', href: '/ai-diagnostics', icon: Sparkles, badge: 'Alpha' },
      { name: 'Growth Center', href: '/marketing', icon: Rocket },
      { name: 'Báo cáo thông minh', href: '/analytics', icon: LineChart },
    ]
  },
  {
    label: 'CỔNG BỆNH NHÂN (TEST)',
    items: [
      { name: 'Patient Portal', href: '/portal', icon: UserSquare2 },
    ]
  },
];

interface ClinicSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function ClinicSidebar({ collapsed, onToggle }: ClinicSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      "bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-300 z-40",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo */}
      <div className={cn("p-6 flex items-center justify-between", collapsed && "px-0 justify-center")}>
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">DoctorCare</h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase font-semibold">Hệ thống</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={onToggle} className="text-gray-400 hover:bg-gray-50 rounded-xl">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center pb-4">
          <Button variant="ghost" size="icon" onClick={onToggle} className="text-gray-400 hover:bg-gray-50 rounded-xl">
            <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", collapsed && "rotate-180")} />
          </Button>
        </div>
      )}

      {/* Menu Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar overflow-x-hidden">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-6 last:mb-2">
            {!collapsed && (
              <h2 className="px-4 mb-2 text-[11px] font-bold text-gray-400 tracking-wider animate-in fade-in duration-500">
                {group.label}
              </h2>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-xl transition-all duration-200 group relative",
                      collapsed ? "justify-center px-0 h-11 w-11 mx-auto" : "justify-between",
                      isActive 
                        ? "bg-red-50 text-red-600 font-medium shadow-sm shadow-red-100" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn(
                        "w-5 h-5 transition-colors shrink-0",
                        isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-900"
                      )} />
                      {!collapsed && <span className="text-sm truncate">{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                        {item.badge}
                      </span>
                    )}
                    
                    {collapsed && (
                      <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-50">
        <div className={cn("flex items-center gap-3 px-2 py-1", collapsed && "px-0 justify-center")}>
          <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold overflow-hidden shrink-0">
            AS
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 overflow-hidden animate-in fade-in duration-300">
                <p className="text-sm font-bold text-gray-900 truncate">Aigars S.</p>
                <p className="text-xs text-gray-500 truncate">Quản trị viên</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-gray-400 hover:text-red-500 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

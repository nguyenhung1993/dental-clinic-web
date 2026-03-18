'use client';

import React from 'react';
import { 
  CalendarDays, 
  Users, 
  Video, 
  XCircle 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function StatCards({ stats }: { stats: any }) {
  const displayStats = [
    {
      label: "Tổng hôm nay",
      value: stats?.total || 0,
      icon: CalendarDays,
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      label: "Khám trực tiếp",
      value: stats?.direct || 0,
      icon: Users,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Khám từ xa",
      value: stats?.online || 0,
      icon: Video,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Đã hủy",
      value: stats?.cancelled || 0,
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-50/50",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayStats.map((stat, idx) => (
        <Card key={idx} className="border-none shadow-sm shadow-gray-100 rounded-3xl overflow-hidden group hover:shadow-md transition-all duration-300">
          <CardContent className="p-6 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
              <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

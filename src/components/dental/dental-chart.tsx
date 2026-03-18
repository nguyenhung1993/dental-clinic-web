'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveToothRecord } from '@/actions/dental';
import { toast } from 'sonner';

export type ToothCondition = 'HEALTHY' | 'CAVITY' | 'MISSING' | 'CROWNED' | 'IMPLANT' | 'FILLING';

interface ToothProps {
  number: number;
  condition: ToothCondition;
  isSelected?: boolean;
  onClick: (number: number) => void;
}

const conditionLabels: Record<ToothCondition, string> = {
  HEALTHY: 'Khỏe mạnh',
  CAVITY: 'Sâu răng',
  MISSING: 'Mất răng',
  CROWNED: 'Bọc sứ',
  IMPLANT: 'Implant',
  FILLING: 'Trám răng',
};

const Tooth = ({ number, condition, isSelected, onClick }: ToothProps) => {
  const getConditionColor = (cond: ToothCondition) => {
    switch (cond) {
      case 'CAVITY': return 'fill-red-500';      // Sâu răng
      case 'MISSING': return 'fill-gray-200 opacity-30'; // Răng khuyết
      case 'CROWNED': return 'fill-yellow-500';  // Bọc sứ
      case 'IMPLANT': return 'fill-blue-500';    // Implant
      case 'FILLING': return 'fill-green-500';   // Trám răng
      default: return 'fill-white';               // Khỏe mạnh
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            onClick={() => onClick(number)}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:scale-110 relative group",
              isSelected && "ring-2 ring-red-500 ring-offset-2 rounded-lg"
            )}
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10 drop-shadow-sm">
              <path 
                d="M10,12 C10,5 30,5 30,12 C30,25 25,35 20,35 C15,35 10,25 10,12 Z" 
                className={cn("stroke-gray-300 stroke-[1.5px]", getConditionColor(condition))}
              />
              <text x="20" y="22" textAnchor="middle" className="text-[10px] font-bold fill-gray-400 select-none group-hover:fill-gray-600 transition-colors">
                {number}
              </text>
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs font-bold">Răng {number}</p>
          <p className="text-[10px] text-gray-400 capitalize">
            {conditionLabels[condition]}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DentalChartProps {
  patientId: string;
  initialTeethData?: Record<number, ToothCondition>;
}

export function DentalChart({ patientId, initialTeethData = {} }: DentalChartProps) {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [teethData, setTeethData] = useState<Record<number, ToothCondition>>(initialTeethData);
  const [loading, setLoading] = useState(false);

  const toothNumbers = {
    upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
    upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
    lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
    lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
  };

  const handleToothClick = (num: number) => {
    setSelectedTooth(num === selectedTooth ? null : num);
  };

  const setCondition = async (cond: ToothCondition) => {
    if (!selectedTooth) return;
    
    setLoading(true);
    const result = await saveToothRecord(patientId, selectedTooth, cond);
    setLoading(false);

    if (result.success) {
      setTeethData(prev => ({ ...prev, [selectedTooth]: cond }));
      toast.success(`Đã cập nhật tình trạng răng #${selectedTooth}`);
    } else {
      toast.error(result.error || 'Lỗi khi lưu dữ liệu');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm shadow-gray-100">
      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        
        {/* Upper Teeth */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1">
            <div className="flex items-center gap-2 pr-4 border-r border-dashed border-gray-100">
              {toothNumbers.upperRight.map(n => (
                <Tooth key={n} number={n} condition={teethData[n] || 'HEALTHY'} isSelected={selectedTooth === n} onClick={handleToothClick} />
              ))}
            </div>
            <div className="flex items-center gap-2 pl-4">
              {toothNumbers.upperLeft.map(n => (
                <Tooth key={n} number={n} condition={teethData[n] || 'HEALTHY'} isSelected={selectedTooth === n} onClick={handleToothClick} />
              ))}
            </div>
          </div>
        </div>

        {/* Mouth Gap */}
        <div className="flex items-center justify-center -my-6">
          <div className="w-full h-px bg-gray-50 bg-dashed" />
        </div>

        {/* Lower Teeth */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center gap-1">
            <div className="flex items-center gap-2 pr-4 border-r border-dashed border-gray-100">
              {toothNumbers.lowerRight.reverse().map(n => (
                <Tooth key={n} number={n} condition={teethData[n] || 'HEALTHY'} isSelected={selectedTooth === n} onClick={handleToothClick} />
              ))}
            </div>
            <div className="flex items-center gap-2 pl-4">
              {toothNumbers.lowerLeft.map(n => (
                <Tooth key={n} number={n} condition={teethData[n] || 'HEALTHY'} isSelected={selectedTooth === n} onClick={handleToothClick} />
              ))}
            </div>
          </div>
        </div>

        {/* Legend & Controls */}
        {selectedTooth && (
          <div className="mt-8 p-6 bg-red-50/50 rounded-2xl border border-red-100 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-900">Cấu hình răng #{selectedTooth} {loading && <span className="text-xs font-normal ml-2">(Đang lưu...)</span>}</p>
              <button 
                onClick={() => setSelectedTooth(null)} 
                className="text-[10px] font-bold text-gray-400 uppercase hover:text-red-500"
                disabled={loading}
              >
                Đóng
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {(['HEALTHY', 'CAVITY', 'MISSING', 'CROWNED', 'IMPLANT', 'FILLING'] as ToothCondition[]).map(c => (
                <button
                  key={c}
                  disabled={loading}
                  onClick={() => setCondition(c)}
                  className={cn(
                    "py-2 px-3 rounded-xl text-[10px] font-bold uppercase transition-all",
                    teethData[selectedTooth] === c 
                      ? "bg-red-500 text-white shadow-lg shadow-red-100" 
                      : "bg-white text-gray-500 border border-gray-100 hover:border-red-200",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {c === 'HEALTHY' ? 'KHỎE MẠNH' :
                   c === 'CAVITY' ? 'SÂU RĂNG' :
                   c === 'MISSING' ? 'MẤT RĂNG' :
                   c === 'CROWNED' ? 'BỌC SỨ' :
                   c === 'IMPLANT' ? 'IMPLANT' :
                   c === 'FILLING' ? 'TRÁM RĂNG' : c}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

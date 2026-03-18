'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function SearchInput({ 
  placeholder = "Tìm kiếm...", 
  defaultValue = "", 
  className 
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [value, setValue] = useState(defaultValue);
  const debouncedValue = useDebounce(value, 500);

  // Đồng bộ giá trị nội bộ khi prop thay đổi (từ URL)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set('q', debouncedValue);
    } else {
      params.delete('q');
    }
    
    // Chỉ push nếu giá trị thực sự thay đổi so với URL hiện tại
    const currentQ = searchParams.get('q') || '';
    if (debouncedValue !== currentQ) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <div className={`relative group ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-red-500 transition-colors" />
      <Input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-12 h-14 rounded-3xl border-transparent bg-white shadow-sm shadow-gray-100 focus-visible:ring-red-100 font-medium text-gray-600" 
        placeholder={placeholder} 
      />
    </div>
  );
}

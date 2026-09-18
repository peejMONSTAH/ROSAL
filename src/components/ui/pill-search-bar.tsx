'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PillSearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue?: (val: string) => void;
  className?: string;
  wrapperClassName?: string;
}

export function PillSearchBar({
  value,
  onChangeValue,
  onChange,
  className,
  wrapperClassName,
  placeholder = 'Search item number, position...',
  ...props
}: PillSearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeValue) onChangeValue(e.target.value);
  };

  const handleClear = () => {
    if (onChangeValue) onChangeValue('');
  };

  return (
    <div className={cn('relative flex items-center max-w-md w-full', wrapperClassName)}>
      {/* Search pill container matching user reference */}
      <div className="relative flex items-center w-full rounded-full border border-slate-700/80 bg-white/95 px-3 py-1.5 shadow-sm transition-all focus-within:border-deped-blue focus-within:ring-2 focus-within:ring-deped-blue/20">
        <Search className="h-4 w-4 text-slate-500 shrink-0 mr-2 stroke-[1.75]" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none',
            className
          )}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-0.5 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
            title="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

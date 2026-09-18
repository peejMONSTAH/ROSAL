'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PillSearchBar } from '@/components/ui/pill-search-bar';
import { useStore } from '@/lib/store';
import { Bell, Printer, Download, Sparkles, ExternalLink } from 'lucide-react';
import { exportSF1ToExcel } from '@/lib/excel-export';

export function Header() {
  const router = useRouter();
  const { schoolProfile, learners, isDbConnected, isSyncing, dbError } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    if (val.trim()) {
      router.push(`/masterlist?q=${encodeURIComponent(val.trim())}`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between shadow-sm shrink-0 z-10">
      {/* Search Bar - matching user's uploaded reference image */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        <PillSearchBar
          value={searchQuery}
          onChangeValue={handleSearch}
          placeholder="Search item number, position, LRN, learner name..."
          wrapperClassName="w-full max-w-md"
        />
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-500 font-medium">
          {schoolProfile.gradeLevel && (
            <>
              <span className="px-2.5 py-1 bg-slate-100 rounded-full border border-slate-200 text-slate-700">
                {schoolProfile.gradeLevel} - {schoolProfile.section}
              </span>
              <span className="text-slate-400">•</span>
            </>
          )}
          <span>{learners.length} Active Learners</span>
        </div>
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center space-x-3.5">
        {/* Supabase Status */}
        {dbError ? (
          <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>DB Error</span>
          </div>
        ) : (
          <div className={`hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${isDbConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
            <span className={`w-2 h-2 rounded-full ${isDbConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'}`} />
            <span>{isSyncing ? 'Syncing...' : isDbConnected ? 'Supabase Live' : 'Connecting...'}</span>
          </div>
        )}

        <button
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-deped-blue hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-sm"
          title="Print Current View"
        >
          <Printer className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden sm:inline">Print</span>
        </button>

        <button
          onClick={() => exportSF1ToExcel(learners, schoolProfile)}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors shadow-sm"
          title="Export SF1 Excel"
        >
          <Download className="h-3.5 w-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Export SF1</span>
        </button>

        <Link
          href="/portal"
          target="_blank"
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors shadow-sm"
          title="Switch to Student / Parent SF9 Viewer Portal"
        >
          <ExternalLink className="h-3.5 w-3.5 text-amber-700" />
          <span className="hidden md:inline">Student Portal</span>
        </Link>

        <div className="h-6 w-px bg-slate-200" />

        {/* User Badge */}
        <div className="flex items-center space-x-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-deped-blue text-white font-bold flex items-center justify-center text-xs shadow-inner">
            KG
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {schoolProfile.adviserName}
            </div>
            <div className="text-[11px] text-slate-500">
              {schoolProfile.adviserTitle}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

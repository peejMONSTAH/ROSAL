'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  FileText, 
  Award, 
  Settings, 
  BookOpenCheck,
  RotateCcw,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Student Masterlist (SF1)',
    href: '/masterlist',
    icon: Users,
    badge: '44'
  },
  {
    title: 'Grades Management',
    href: '/grades',
    icon: GraduationCap,
    badge: 'T1'
  },
  {
    title: 'Attendance (SF2)',
    href: '/attendance',
    icon: CalendarCheck,
    badge: null
  },
  {
    title: 'Access Vouchers',
    href: '/vouchers',
    icon: KeyRound,
    badge: 'PORTAL'
  },
  {
    title: 'SF9 Report Cards',
    href: '/forms/sf9',
    icon: BookOpenCheck,
    badge: null
  },
  {
    title: 'SF10 Permanent Record',
    href: '/forms/sf10',
    icon: FileText,
    badge: 'JHS'
  },
  {
    title: 'Certificates & Awards',
    href: '/certificates',
    icon: Award,
    badge: '17'
  },
  {
    title: 'Settings & Setup',
    href: '/settings',
    icon: Settings,
    badge: null
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { schoolProfile, refreshFromDatabase, isSyncing } = useStore();

  return (
    <aside className="no-print flex flex-col w-72 bg-gradient-to-b from-[#051E3C] via-[#0B3B70] to-[#072850] text-white shrink-0 min-h-screen border-r border-slate-700/50 shadow-xl">
      {/* Brand & School Header */}
      <div className="p-5 border-b border-white/10 flex items-center space-x-3.5">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 p-0.5 shadow-md shrink-0 flex items-center justify-center">
          <img 
            src="/assets/image55.png" 
            alt="KNCHS Seal" 
            className="w-full h-full object-contain drop-shadow"
          />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">DepEd Region XII</span>
          </div>
          <h1 className="font-extrabold text-sm text-white tracking-tight truncate leading-snug">
            ADVISER&apos;S TOOLKIT PRO
          </h1>
          <p className="text-[11px] text-blue-200/80 truncate">
            {schoolProfile.gradeLevel} - {schoolProfile.section}
          </p>
        </div>
      </div>

      {/* Class Overview Pill */}
      <div className="px-4 py-3 border-b border-white/5 bg-black/10">
        <div className="flex items-center justify-between text-xs text-blue-200">
          <span className="font-medium text-slate-300">Adviser:</span>
          <span className="font-semibold text-white truncate max-w-[140px]" title={schoolProfile.adviserName}>
            {schoolProfile.adviserName}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-blue-200 mt-1">
          <span className="font-medium text-slate-300">School Year:</span>
          <span className="font-semibold text-amber-300">{schoolProfile.schoolYear}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
        <div className="px-2 pb-1.5 pt-1 text-[10px] font-bold tracking-wider text-blue-300/60 uppercase">
          Core Workspaces
        </div>
        {navItems.map(item => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-blue-600/80 text-white shadow-md shadow-blue-900/30 border border-blue-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className={cn('h-4 w-4 transition-colors', isActive ? 'text-amber-300' : 'text-blue-300/70 group-hover:text-amber-300')} />
                <span className="truncate">{item.title}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  'px-2 py-0.5 text-[11px] font-bold rounded-full',
                  isActive ? 'bg-amber-400 text-slate-900' : 'bg-white/15 text-blue-200'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-3">
          <div className="px-2 pb-1.5 pt-1 text-[10px] font-bold tracking-wider text-amber-300/80 uppercase">
            Public Access
          </div>
          <Link
            href="/portal"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 transition-all group shadow-sm"
          >
            <div className="flex items-center space-x-2.5">
              <ExternalLink className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Student / Parent Portal</span>
            </div>
            <span className="px-1.5 py-0.5 text-[9px] font-black bg-amber-400 text-slate-950 rounded uppercase tracking-wider">
              PORTAL
            </span>
          </Link>
        </div>
      </nav>

      {/* DepEd Footer & Reset */}
      <div className="p-4 border-t border-white/10 bg-black/20 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/assets/image63.png" alt="DepEd" className="h-6 object-contain brightness-0 invert opacity-80" />
            <span className="text-[11px] text-blue-200/80 font-medium">MATATAG v6.0</span>
          </div>
          <button
            onClick={() => {
              if (confirm('Reload all data from the Supabase database?')) {
                refreshFromDatabase();
              }
            }}
            disabled={isSyncing}
            className="flex items-center space-x-1 text-[11px] text-blue-300 hover:text-amber-300 transition-colors disabled:opacity-50"
            title="Reload from Database"
          >
            <RotateCcw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing' : 'Reload'}</span>
          </button>
        </div>
        <p className="text-[10px] text-blue-300/50 text-center leading-tight">
          Koronadal National Comprehensive High School
        </p>
      </div>
    </aside>
  );
}

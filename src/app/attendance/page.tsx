'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { PillSearchBar } from '@/components/ui/pill-search-bar';
import { 
  CalendarCheck, 
  AlertTriangle, 
  Award, 
  CheckCircle2, 
  Download, 
  Clock, 
  UserCheck, 
  Users,
  Info
} from 'lucide-react';

const MONTH_NAMES = [
  { key: 'june', label: 'June', days: 16 },
  { key: 'july', label: 'July', days: 23 },
  { key: 'aug', label: 'August', days: 20 },
  { key: 'sept', label: 'September', days: 22 },
  { key: 'oct', label: 'October', days: 22 },
  { key: 'nov', label: 'November', days: 20 },
  { key: 'dec', label: 'December', days: 14 },
  { key: 'jan', label: 'January', days: 20 },
  { key: 'feb', label: 'February', days: 20 },
  { key: 'mar', label: 'March', days: 21 },
  { key: 'apr', label: 'April', days: 6 },
];

export default function AttendancePage() {
  const { attendance, updateAttendanceMonth, schoolProfile } = useStore();

  const [selectedMonth, setSelectedMonth] = useState('sept');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PERFECT' | 'ALERT'>('ALL');

  const activeMonthInfo = MONTH_NAMES.find(m => m.key === selectedMonth) || MONTH_NAMES[3];

  const filteredAttendance = useMemo(() => {
    return attendance.filter(a => {
      const term = search.toLowerCase();
      const matchesSearch = !term || a.name.toLowerCase().includes(term) || a.lrn.includes(term);

      if (statusFilter === 'PERFECT') {
        return matchesSearch && (a.perfectAttendance.term1 || a.totalAbsent === 0);
      }
      if (statusFilter === 'ALERT') {
        return matchesSearch && (a.totalAbsent >= 5 || a.interventionNeeded);
      }
      return matchesSearch;
    });
  }, [attendance, search, statusFilter]);

  // Overall stats
  const totalDays = 204;
  const avgAttendanceRate = 97.4;
  const perfectCount = attendance.filter(a => a.perfectAttendance.term1).length;
  const alertCount = attendance.filter(a => a.totalAbsent >= 5).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <span>School Form 2 (SF2)</span>
            <span>•</span>
            <span>Learner Daily Attendance Report</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Attendance &amp; Dropout Monitoring
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Grade 7 - ROSAL | SY {schoolProfile.schoolYear} | Total Prescribed School Days: <strong>{totalDays}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Class Attendance Rate</span>
            <span className="text-xl font-black text-emerald-700">{avgAttendanceRate}%</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Enrolled Learners</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{attendance.length}</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Term 1 Perfect Attendance</p>
            <p className="text-2xl font-black text-indigo-700 mt-1">{perfectCount} Learners</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Home Visitation / Alerts</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{alertCount} Learners</p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Monthly Navigation & Pill Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-semibold">
          {MONTH_NAMES.map(m => (
            <button
              key={m.key}
              onClick={() => setSelectedMonth(m.key)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedMonth === m.key 
                  ? 'bg-deped-blue text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {m.label} ({m.days}d)
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <PillSearchBar
            value={search}
            onChangeValue={setSearch}
            placeholder="Search item number, position, LRN, learner..."
            wrapperClassName="w-full md:w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-deped-blue/20 shrink-0"
          >
            <option value="ALL">All Attendance</option>
            <option value="PERFECT">★ Perfect Attendance</option>
            <option value="ALERT">⚠ Absenteeism Alerts</option>
          </select>
        </div>
      </div>

      {/* Attendance Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3.5 w-12 text-center">#</th>
                <th className="py-3 px-3.5">LRN</th>
                <th className="py-3 px-3.5 min-w-[220px]">Learner&apos;s Name</th>
                <th className="py-3 px-2 text-center">Sex</th>
                <th className="py-3 px-3 text-center bg-blue-50/50">Month Days</th>
                <th className="py-3 px-3 text-center bg-emerald-50/70 text-emerald-900 font-bold">Present ({activeMonthInfo.label})</th>
                <th className="py-3 px-3 text-center bg-rose-50/70 text-rose-900 font-bold">Absent ({activeMonthInfo.label})</th>
                <th className="py-3 px-3 text-center font-bold">Total Present (YTD)</th>
                <th className="py-3 px-3 text-center font-bold">Total Absent (YTD)</th>
                <th className="py-3 px-3 text-center">Status &amp; Eligibility</th>
                <th className="py-3 px-3 text-right">Quick Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.map((rec, index) => {
                const monthData = rec.monthly[selectedMonth] || { present: activeMonthInfo.days, absent: 0 };
                const isPerfect = rec.perfectAttendance.term1;
                const isAlert = rec.totalAbsent >= 5;

                return (
                  <tr key={rec.learnerId} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-2.5 px-3.5 text-center font-bold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-slate-600 font-medium">
                      {rec.lrn}
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                      {rec.name}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${rec.sex === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                        {rec.sex}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center text-slate-500 bg-blue-50/20">
                      {activeMonthInfo.days}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-700 bg-emerald-50/30">
                      {monthData.present}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-rose-700 bg-rose-50/30">
                      {monthData.absent}
                    </td>
                    <td className="py-2.5 px-3 text-center font-semibold text-slate-800">
                      {rec.totalPresent}
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                      {rec.totalAbsent}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {isPerfect ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          ★ Perfect Attendee
                        </span>
                      ) : isAlert ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
                          ⚠ Home Visit Needed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => {
                          const newAbs = monthData.absent + 1;
                          const newPres = Math.max(0, activeMonthInfo.days - newAbs);
                          updateAttendanceMonth(rec.learnerId, selectedMonth, newPres, newAbs);
                        }}
                        className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition-colors font-semibold"
                        title="Add 1 Absence"
                      >
                        +1 Abs
                      </button>
                      <button
                        onClick={() => {
                          if (monthData.absent > 0) {
                            const newAbs = monthData.absent - 1;
                            const newPres = activeMonthInfo.days - newAbs;
                            updateAttendanceMonth(rec.learnerId, selectedMonth, newPres, newAbs);
                          }
                        }}
                        className="px-2 py-1 text-[11px] rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 transition-colors font-semibold"
                        title="Remove 1 Absence"
                      >
                        -1 Abs
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* DepEd SF2 Guidelines Callout */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-600 text-xs flex items-start space-x-3">
          <Info className="h-4 w-4 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-semibold text-slate-800">DepEd Guideline Reminder:</span> The class adviser will extend necessary intervention including but not limited to home visitation to learners who accumulate 5 consecutive days of absences or who show potential risk of dropping out.
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  Users, 
  GraduationCap, 
  CalendarCheck, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';

export default function DashboardPage() {
  const { schoolProfile, learners, term1Grades, attendance, isHydrated } = useStore();

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deped-blue"></div>
      </div>
    );
  }

  // Calculations
  const totalLearners = learners.length;
  const maleCount = learners.filter(l => l.sex === 'M').length;
  const femaleCount = learners.filter(l => l.sex === 'F').length;

  const classAvg = term1Grades.length > 0
    ? (term1Grades.reduce((sum, g) => sum + g.average, 0) / term1Grades.length).toFixed(1)
    : '0';

  const awardees = term1Grades.filter(g => g.honors !== null);

  // Grade Distribution
  const gradeDistribution = [
    { name: '90 & Above (Advancing)', count: term1Grades.filter(g => g.average >= 90).length, fill: '#059669' },
    { name: '85 - 89 (Benchmarking)', count: term1Grades.filter(g => g.average >= 85 && g.average < 90).length, fill: '#2563EB' },
    { name: '75 - 84 (Connecting)', count: term1Grades.filter(g => g.average >= 75 && g.average < 85).length, fill: '#F59E0B' },
    { name: '74 & Below (At Risk)', count: term1Grades.filter(g => g.average < 75).length, fill: '#DC2626' },
  ];

  // Gender Demographics
  const genderData = [
    { name: 'Male', value: maleCount, color: '#1D4ED8' },
    { name: 'Female', value: femaleCount, color: '#DB2777' },
  ];

  // Attendance Monthly Average
  const attendanceTrend = [
    { month: 'Jun', rate: 98.5 },
    { month: 'Jul', rate: 97.2 },
    { month: 'Aug', rate: 96.8 },
    { month: 'Sep', rate: 97.5 },
    { month: 'Oct', rate: 98.0 },
    { month: 'Nov', rate: 96.4 },
    { month: 'Dec', rate: 97.8 },
    { month: 'Jan', rate: 96.9 },
    { month: 'Feb', rate: 97.4 },
    { month: 'Mar', rate: 98.1 },
  ];

  // Intervention lists
  const failingLearners = term1Grades.filter(g => g.average < 75);
  const absenteeismLearners = attendance.filter(a => a.interventionNeeded || a.totalAbsent >= 5);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#051E3C] via-[#0B3B70] to-[#1E4E8C] text-white p-7 md:p-8 shadow-xl border border-blue-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
              <span>DepEd MATATAG Curriculum v6</span>
              <span>•</span>
              <span>{schoolProfile.schoolYear}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome, {schoolProfile.adviserName}!
            </h1>
            <p className="text-sm md:text-base text-blue-100/90 max-w-2xl leading-relaxed">
              {schoolProfile.schoolName} — <strong>{schoolProfile.gradeLevel} - {schoolProfile.section}</strong>. 
              Manage grades, track attendance, and generate official DepEd SF9 &amp; SF10 reports effortlessly.
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-black/20 p-4 rounded-xl border border-white/10 shrink-0">
            <img 
              src="/assets/image55.png" 
              alt="KNCHS Logo" 
              className="h-16 w-16 object-contain drop-shadow"
            />
            <div className="text-left border-l border-white/20 pl-4">
              <div className="text-xs uppercase text-amber-300 font-bold tracking-wider">Class Section</div>
              <div className="text-xl font-black text-white">{schoolProfile.section}</div>
              <div className="text-xs text-blue-200">School ID: {schoolProfile.schoolId}</div>
            </div>
          </div>
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Learners */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Learners</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{totalLearners}</h3>
            <p className="text-xs text-slate-500 mt-1">
              <span className="font-semibold text-blue-600">{maleCount} Boys</span> • <span className="font-semibold text-pink-600">{femaleCount} Girls</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 text-deped-blue flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Class Average */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Class Average</p>
            <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{classAvg}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-1" /> Term 1 Benchmarking
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        {/* Daily Attendance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Daily Attendance</p>
            <h3 className="text-3xl font-extrabold text-indigo-700 mt-1">97.4%</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">
              {attendance.filter(a => a.perfectAttendance.term1).length} Perfect Attendees
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CalendarCheck className="h-6 w-6" />
          </div>
        </div>

        {/* Academic Excellence Awardees */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Academic Awardees</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{awardees.length}</h3>
            <p className="text-xs text-amber-600 font-medium mt-1">
              Term 1 Honor Roll
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Quick Access Grid (from Excel Dashboard) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center justify-between">
          <span>Quick Access Navigation</span>
          <span className="text-xs font-normal text-slate-500">Fast shortcuts to toolkit modules</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          <Link
            href="/masterlist"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-700">Student SF1</span>
          </Link>

          <Link
            href="/grades?term=1"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-indigo-700">Term 1 Grades</span>
          </Link>

          <Link
            href="/attendance"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-700">Attendance SF2</span>
          </Link>

          <Link
            href="/forms/sf9"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-amber-700">SF9 Report Cards</span>
          </Link>

          <Link
            href="/forms/sf10"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FileCheck className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-rose-700">SF10 Record</span>
          </Link>

          <Link
            href="/certificates"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Award className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-purple-700">Certificates</span>
          </Link>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grade Distribution Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-base">Class Grade Distribution</h3>
              <p className="text-xs text-slate-500">DepEd MATATAG performance tier breakdown for Term 1</p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              44 Students Evaluated
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} interval={0} angle={-5} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip 
                  formatter={(val: number) => [`${val} Learners`, 'Count']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Demographics Donut Chart */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Class Demographics</h3>
            <p className="text-xs text-slate-500">Gender balance for Grade 7 - ROSAL</p>
          </div>
          <div className="h-52 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: number) => [`${val} Learners (${((val/totalLearners)*100).toFixed(0)}%)`, 'Gender']}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">{totalLearners}</span>
              <span className="block text-[11px] text-slate-500 font-medium">Enrolled</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-100">
            <div className="p-2 rounded-lg bg-blue-50">
              <span className="text-xs text-blue-700 font-semibold block">Male</span>
              <span className="text-lg font-bold text-blue-900">{maleCount}</span>
            </div>
            <div className="p-2 rounded-lg bg-pink-50">
              <span className="text-xs text-pink-700 font-semibold block">Female</span>
              <span className="text-lg font-bold text-pink-900">{femaleCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications Section (From Excel Dashboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Intervention Alert */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">
                Learners Needing Academic Intervention
              </h3>
              <p className="text-xs text-slate-500">Subject grade or general average below 75 (Failing)</p>
            </div>
          </div>

          {failingLearners.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800 text-xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Great job! No learners currently have failing grades below 75 in Term 1.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {failingLearners.map(f => (
                <div key={f.learnerId} className="flex items-center justify-between p-2.5 rounded-lg bg-red-50 text-red-900 text-xs border border-red-200">
                  <span className="font-semibold">{f.name}</span>
                  <span className="font-bold text-red-700">Average: {f.average}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Absenteeism Intervention Alert */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">
                Learners Needing Attendance Intervention
              </h3>
              <p className="text-xs text-slate-500">Committed 5+ absences or identified at dropout risk</p>
            </div>
          </div>

          {absenteeismLearners.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3 text-emerald-800 text-xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>No learners currently flagged for excessive consecutive absences or dropout risk.</span>
            </div>
          ) : (
            <div className="space-y-2">
              {absenteeismLearners.map(a => (
                <div key={a.learnerId} className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 text-amber-900 text-xs border border-amber-200">
                  <span className="font-semibold">{a.name}</span>
                  <span className="font-bold text-amber-800">{a.totalAbsent} Absences Recorded</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Official List of Academic Excellence Awardees Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span>Official List of Academic Excellence Awardees</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Grade 7 - ROSAL | Term 1 Academic Honor Roll (Average ≥ 90 with no grade &lt; 75)
            </p>
          </div>
          <Link
            href="/certificates"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors shrink-0"
          >
            <span>View All Certificates</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-y border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">LRN</th>
                <th className="py-2.5 px-3">Learner&apos;s Name</th>
                <th className="py-2.5 px-3">Sex</th>
                <th className="py-2.5 px-3 text-center">Average</th>
                <th className="py-2.5 px-3">Academic Honors Tier</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {awardees.slice(0, 8).map((a, i) => (
                <tr key={a.learnerId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900">#{i + 1}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{a.lrn}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{a.name}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${a.sex === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                      {a.sex}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-emerald-700">{a.average}</td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      ★ {a.honors}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      href={`/certificates?learnerId=${a.learnerId}`}
                      className="text-[11px] text-deped-blue hover:underline font-semibold"
                    >
                      Certificate →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

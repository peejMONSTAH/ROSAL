'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { getStudentVoucher, verifyStudentVoucher } from '@/lib/vouchers';
import { Learner } from '@/types';
import { 
  KeyRound, 
  Search, 
  ShieldCheck, 
  Lock, 
  Printer, 
  ArrowLeft, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar, 
  UserCheck, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  School,
  RotateCw,
  Sparkles,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export default function StudentPortalPage() {
  const { learners, term1Grades, attendance, schoolProfile, isHydrated } = useStore();

  // Authentication State
  const [lrnInput, setLrnInput] = useState('');
  const [voucherInput, setVoucherInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeLearner, setActiveLearner] = useState<Learner | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);

  // 3D Card Flip States
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayMode, setDisplayMode] = useState<'flip' | 'side-by-side'>('flip');

  // Keyboard shortcut to flip card (Space or 'F')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLearner) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLearner]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const verification = verifyStudentVoucher(lrnInput, voucherInput, learners);
    if (!verification.isValid || !verification.learner) {
      setAuthError(verification.message || 'Invalid LRN or Voucher Code. Please try again.');
      return;
    }

    setActiveLearner(verification.learner);
    setIsFlipped(false); // Start at Front side
  };

  const handleQuickDemoSelect = (learner: Learner) => {
    const voucher = getStudentVoucher(learner);
    setLrnInput(learner.lrn);
    setVoucherInput(voucher);
    setAuthError(null);
    setShowDemoModal(false);
  };

  const handleSignOut = () => {
    setActiveLearner(null);
    setLrnInput('');
    setVoucherInput('');
    setAuthError(null);
    setIsFlipped(false);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-300">Loading DepEd Grade Portal...</p>
        </div>
      </div>
    );
  }

  // If a student is authenticated, show their SF9 Report Card
  if (activeLearner) {
    const grades = term1Grades.find(g => g.learnerId === activeLearner.id);
    const att = attendance.find(a => a.learnerId === activeLearner.id);

    // Fallback safe values if not fully populated
    const q1Avg = grades ? grades.average : 85;
    const descriptor = grades ? grades.descriptor : 'Benchmarking';
    const honors = grades?.honors;

    // Reusable FRONT Face Content (Attendance & Core Values)
    const renderFrontContent = (isInteractive: boolean = false) => (
      <div className="p-6 md:p-8 space-y-6">
        {/* Interactive Flip Hint Banner */}
        {isInteractive && (
          <div className="no-print -mt-2 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2 text-xs text-blue-900">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span className="font-bold">Front Face:</span>
              <span className="text-blue-700">Learner Info, Attendance (SF2) & Core Values</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="flex items-center space-x-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip to Academic Grades →</span>
            </button>
          </div>
        )}

        {/* School Header */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-4 mb-2">
            <img src="/assets/image55.png" alt="DepEd Logo" className="h-14 w-14 object-contain" />
            <div>
              <div className="text-[11px] uppercase tracking-widest font-serif text-slate-600 font-bold">
                Republic of the Philippines • Department of Education
              </div>
              <div className="text-xs uppercase font-serif font-bold text-slate-700">
                {schoolProfile.region} • {schoolProfile.division}
              </div>
              <div className="text-base font-extrabold font-serif tracking-tight text-slate-900">
                {schoolProfile.schoolName}
              </div>
              <div className="text-[11px] text-slate-500 font-serif">
                {schoolProfile.schoolAddress}
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-300">
            <h2 className="text-sm font-black uppercase tracking-wider text-blue-950 font-serif">
              Learner's Progress Report Card (SF9-JHS)
            </h2>
            <p className="text-xs text-slate-600 font-serif">
              Revised MATATAG Curriculum • School Year {schoolProfile.schoolYear}
            </p>
          </div>
        </div>

        {/* Student Information Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500 text-[11px] font-medium">Learner Name:</span>
            <div className="font-extrabold text-slate-900 truncate">{activeLearner.name}</div>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] font-medium">12-Digit LRN:</span>
            <div className="font-mono font-bold text-blue-900">{activeLearner.lrn}</div>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] font-medium">Grade & Section:</span>
            <div className="font-bold text-slate-900">{schoolProfile.gradeLevel} - {schoolProfile.section}</div>
          </div>
          <div>
            <span className="text-slate-500 text-[11px] font-medium">Sex / Age:</span>
            <div className="font-bold text-slate-900">{activeLearner.sex === 'M' ? 'Male' : 'Female'} • {activeLearner.age} yrs old</div>
          </div>
        </div>

        {/* 2-Column Section: Attendance & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Record */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-900 text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Report on Attendance (SF2)</span>
              </span>
              <span className="text-[10px] text-blue-300 font-normal">S.Y. {schoolProfile.schoolYear}</span>
            </div>
            <table className="w-full text-center text-xs">
              <thead className="bg-slate-100 border-b border-slate-300 text-[10px] font-bold uppercase">
                <tr>
                  <th className="p-1.5 text-left pl-2">Month</th>
                  <th className="p-1.5">Days</th>
                  <th className="p-1.5">Present</th>
                  <th className="p-1.5">Absent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {att && att.monthly ? (
                  Object.entries(att.monthly).map(([month, data]) => (
                    <tr key={month} className="hover:bg-slate-50">
                      <td className="p-1.5 text-left pl-2 font-medium capitalize">{month}</td>
                      <td className="p-1.5 text-slate-600">{data.present + data.absent}</td>
                      <td className="p-1.5 font-bold text-emerald-700">{data.present}</td>
                      <td className="p-1.5 text-rose-600 font-semibold">{data.absent}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-3 text-slate-500 italic">No attendance logged</td>
                  </tr>
                )}
              </tbody>
              {att && (
                <tfoot className="bg-slate-100 font-extrabold border-t border-slate-300 text-xs">
                  <tr>
                    <td className="p-1.5 text-left pl-2">TOTAL</td>
                    <td className="p-1.5">{att.totalSchoolDays}</td>
                    <td className="p-1.5 text-emerald-700">{att.totalPresent}</td>
                    <td className="p-1.5 text-rose-600">{att.totalAbsent}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* Observed Core Values */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="bg-slate-900 text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Report on Observed Values</span>
              </div>
              <table className="w-full text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-[10px] font-bold uppercase">
                  <tr>
                    <th className="p-2 text-left pl-2.5">Core Values</th>
                    <th className="p-2 w-10 text-center">Q1</th>
                    <th className="p-2 w-10 text-center">Q2</th>
                    <th className="p-2 w-10 text-center">Q3</th>
                    <th className="p-2 w-10 text-center">Q4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  <tr>
                    <td className="p-2 font-medium">1. Maka-Diyos</td>
                    <td className="p-2 text-center font-bold text-blue-700">{grades?.coreValues?.makaDiyos || 'AO'}</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">2. Makatao</td>
                    <td className="p-2 text-center font-bold text-blue-700">{grades?.coreValues?.makatao || 'AO'}</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">3. Makakalikasan</td>
                    <td className="p-2 text-center font-bold text-blue-700">{grades?.coreValues?.makakalikasan || 'SO'}</td>
                    <td className="p-2 text-center font-bold text-blue-700">SO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium">4. Makabansa</td>
                    <td className="p-2 text-center font-bold text-blue-700">{grades?.coreValues?.makabansa || 'AO'}</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                    <td className="p-2 text-center font-bold text-blue-700">AO</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-600 grid grid-cols-2 gap-1 font-medium">
                <div>AO - Always Observed</div>
                <div>SO - Sometimes Observed</div>
                <div>RO - Rarely Observed</div>
                <div>NO - Not Observed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Turn Page Callout for Front Face */}
        {isInteractive && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(true);
            }}
            className="no-print w-full mt-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all group"
          >
            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Click to Flip Card & View Academic Grades (Back Face)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    );

    // Reusable BACK Face Content (Learning Areas, Grades & Signatures)
    const renderBackContent = (isInteractive: boolean = false) => (
      <div className="p-6 md:p-8 space-y-6">
        {/* Interactive Flip Hint Banner */}
        {isInteractive && (
          <div className="no-print -mt-2 mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2 text-xs text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span className="font-bold">Back Face:</span>
              <span className="text-amber-800">Learning Progress & Achievement (MATATAG Learning Areas)</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="flex items-center space-x-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm hover:shadow"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>← Flip to Front (Attendance)</span>
            </button>
          </div>
        )}

        <div className="text-center">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">
            Report on Learning Progress and Achievement
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Grading Scale: 90–100 (Advancing), 85–89 (Benchmarking), 80–84 (Connecting), 75–79 (Developing), Below 75 (Emerging)
          </p>
        </div>

        {/* Academic Grades Table */}
        <div className="border border-slate-300 rounded-xl overflow-hidden print:border-black">
          <table className="w-full text-xs">
            <thead className="bg-slate-800 text-white uppercase text-center font-bold print:bg-black">
              <tr>
                <th className="p-2.5 text-left pl-3">Learning Areas</th>
                <th className="p-2.5 w-12">Q1</th>
                <th className="p-2.5 w-12">Q2</th>
                <th className="p-2.5 w-12">Q3</th>
                <th className="p-2.5 w-12">Q4</th>
                <th className="p-2.5 w-16">Final</th>
                <th className="p-2.5 w-20">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {grades ? (
                <>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Filipino</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.filipino}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.filipino}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">English</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.english}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.english}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Mathematics</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.math}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.math}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Science</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.science}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.science}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Araling Panlipunan (AP)</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.ap}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.ap}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Edukasyon sa Pagpapakatao (Values)</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.values}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.values}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 pl-3">Technology and Livelihood Education (TLE)</td>
                    <td className="p-2.5 text-center font-bold">{grades.grades.tle}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.tle}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-2.5 pl-3">MAPEH</td>
                    <td className="p-2.5 text-center">{grades.grades.mapeh}</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center text-slate-400">—</td>
                    <td className="p-2.5 text-center font-extrabold text-blue-900">{grades.grades.mapeh}</td>
                    <td className="p-2.5 text-center text-emerald-600 font-bold">PASSED</td>
                  </tr>
                  <tr className="text-slate-600 text-[11px]">
                    <td className="py-1 pl-8">Music & Arts</td>
                    <td className="py-1 text-center">{grades.grades.music_arts}</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center">—</td>
                    <td className="py-1 text-center">—</td>
                  </tr>
                  <tr className="text-slate-600 text-[11px]">
                    <td className="py-1 pl-8">Physical Education & Health</td>
                    <td className="py-1 text-center">{grades.grades.pe_health}</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center text-slate-400">—</td>
                    <td className="py-1 text-center">—</td>
                    <td className="py-1 text-center">—</td>
                  </tr>
                </>
              ) : null}
            </tbody>
            <tfoot className="bg-slate-900 text-white font-black text-xs print:bg-black">
              <tr>
                <td className="p-3 pl-3">GENERAL AVERAGE</td>
                <td className="p-3 text-center text-amber-300 font-black">{q1Avg}</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-slate-400">—</td>
                <td className="p-3 text-center text-amber-300 font-black">{q1Avg}</td>
                <td className="p-3 text-center text-emerald-300 font-black">PASSED</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Descriptor & Honors Callout Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md print:bg-white print:text-black print:border print:border-black">
          <div>
            <span className="text-xs text-blue-200 uppercase tracking-wider font-semibold">Overall Performance Level:</span>
            <div className="text-lg font-black tracking-tight flex items-center space-x-2">
              <span>{descriptor} ({q1Avg}%)</span>
              {honors && (
                <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-full text-xs font-black uppercase">
                  ★ {honors}
                </span>
              )}
            </div>
          </div>
          <div className="text-xs text-blue-200 text-right">
            <span>Rank in Section: </span>
            <strong className="text-white text-sm font-black">#{grades?.rank || 1}</strong> of {learners.length} Students
          </div>
        </div>

        {/* Adviser's Observations & Feedback */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 print:bg-white print:border-black">
          <div className="text-xs font-bold uppercase text-slate-700 mb-1">
            Adviser's Feedback & Comments:
          </div>
          <p className="text-xs text-slate-600 italic">
            "{grades?.comment || 'Demonstrates exemplary discipline, active class participation, and steady academic dedication throughout the quarter.'}"
          </p>
        </div>

        {/* Official Signatures Row */}
        <div className="grid grid-cols-2 gap-8 pt-6 text-center text-xs">
          <div>
            <div className="border-b border-slate-400 pb-1 font-bold text-slate-900 uppercase">
              {schoolProfile.adviserName}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Class Adviser • {schoolProfile.adviserTitle}
            </div>
          </div>
          <div>
            <div className="border-b border-slate-400 pb-1 font-bold text-slate-900 uppercase">
              {schoolProfile.schoolHeadName}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Secondary School Principal IV
            </div>
          </div>
        </div>

        {/* Turn Page Callout for Back Face */}
        {isInteractive && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(false);
            }}
            className="no-print w-full mt-4 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer shadow-md transition-all group"
          >
            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Click to Flip Card & View Attendance & Core Values (Front Face)</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    );

    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
        {/* Top Floating App Bar */}
        <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/10 p-1 flex items-center justify-center shrink-0">
                <img src="/assets/image55.png" alt="KNCHS Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Learner Grade Portal
                </div>
                <div className="text-sm font-bold truncate max-w-[180px] sm:max-w-sm">
                  {activeLearner.name}
                </div>
              </div>
            </div>

            {/* Actions & Flip Controls */}
            <div className="flex items-center space-x-2">
              {/* 3D Flip Quick Action */}
              <button
                onClick={() => {
                  setDisplayMode('flip');
                  setIsFlipped(prev => !prev);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-black text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm group active:scale-95"
                title="Flip between Front and Back (Press 'Space' or 'F')"
              >
                <RotateCw className={`h-3.5 w-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180 text-amber-900' : 'text-amber-950'}`} />
                <span>{isFlipped ? 'Flip to Front' : 'Flip to Back'}</span>
              </button>

              {/* View Mode Selector */}
              <div className="hidden sm:flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => {
                    setDisplayMode('flip');
                    setIsFlipped(false);
                  }}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    displayMode === 'flip' && !isFlipped 
                      ? 'bg-white text-slate-900 font-bold shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => {
                    setDisplayMode('flip');
                    setIsFlipped(true);
                  }}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    displayMode === 'flip' && isFlipped 
                      ? 'bg-white text-slate-900 font-bold shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => setDisplayMode('side-by-side')}
                  className={`px-2.5 py-1 rounded font-medium transition-colors ${
                    displayMode === 'side-by-side' 
                      ? 'bg-white text-slate-900 font-bold shadow-xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Both
                </button>
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                title="Print DepEd SF9 Report Card"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print SF9</span>
              </button>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-500/20 rounded-lg border border-rose-500/30 transition-colors"
                title="Exit report card view"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Report Card Viewer Container */}
        <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
          {/* Welcome Alert Banner with 3D Flip Instruction */}
          <div className="no-print bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 mt-0.5 border border-blue-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-0.5 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 flex items-center space-x-2">
                  <span>Verified DepEd School Form 9 (SF9)</span>
                  <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-extrabold uppercase border border-emerald-200">
                    Active Roster
                  </span>
                </div>
                <p className="text-slate-600 text-xs">
                  Showing report card for <strong>{activeLearner.name}</strong> (LRN: {activeLearner.lrn}) • {schoolProfile.gradeLevel} - {schoolProfile.section}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  setDisplayMode('flip');
                  setIsFlipped(prev => !prev);
                }}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Flip Card ↺</span>
                <span className="text-[10px] bg-blue-200/80 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                  [Space]
                </span>
              </button>

              <Link
                href="/"
                className="text-xs font-bold text-slate-600 hover:text-blue-900 hover:underline px-2"
              >
                Adviser Portal →
              </Link>
            </div>
          </div>

          {/* SCREEN VIEW: 3D Animated Flip Card */}
          <div className="no-print">
            {displayMode === 'side-by-side' ? (
              /* Side-by-side / Stacked View */
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
                  {renderFrontContent(false)}
                </div>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
                  {renderBackContent(false)}
                </div>
              </div>
            ) : (
              /* 3D Flippable Container */
              <div className="perspective-1500 w-full py-2">
                <div 
                  className={`relative w-full transition-transform duration-700 ease-in-out preserve-3d ${
                    isFlipped ? 'rotate-y-180' : 'rotate-y-0'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* FRONT FACE (Attendance & Values) */}
                  <div 
                    className={`w-full bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden backface-hidden transition-all duration-300 ${
                      isFlipped ? 'pointer-events-none' : 'relative z-10'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      position: isFlipped ? 'absolute' : 'relative',
                      top: 0,
                      left: 0,
                      transform: 'rotateY(0deg)',
                      WebkitTransform: 'rotateY(0deg)'
                    }}
                  >
                    {renderFrontContent(true)}
                  </div>

                  {/* BACK FACE (Grades & Learning Areas) */}
                  <div 
                    className={`w-full bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden backface-hidden transition-all duration-300 ${
                      !isFlipped ? 'pointer-events-none' : 'relative z-10'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      position: !isFlipped ? 'absolute' : 'relative',
                      top: 0,
                      left: 0,
                      transform: 'rotateY(180deg)',
                      WebkitTransform: 'rotateY(180deg)'
                    }}
                  >
                    {renderBackContent(true)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* PRINT-ONLY VIEW: Flat sequential DepEd SF9 layout */}
          <div className="hidden print:block space-y-8">
            <div className="bg-white border-2 border-black p-4 page-break">
              {renderFrontContent(false)}
            </div>
            <div className="bg-white border-2 border-black p-4">
              {renderBackContent(false)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gateway / Login Screen: Enter LRN + Unique Voucher
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white/10 p-1 flex items-center justify-center shrink-0">
            <img src="/assets/image55.png" alt="KNCHS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
              DepEd Region XII • City of Koronadal
            </div>
            <h1 className="text-sm font-extrabold tracking-tight text-white sm:text-base">
              Koronadal National Comprehensive High School
            </h1>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-200 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg border border-white/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Adviser Portal</span>
        </Link>
      </div>

      {/* Main Authentication Box */}
      <div className="max-w-md mx-auto w-full my-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-1">
              <KeyRound className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Learner SF9 Grade Portal
            </h2>
            <p className="text-xs text-slate-400">
              Grade 7 - ROSAL • S.Y. {schoolProfile.schoolYear || '2024-2025'}
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>12-Digit Learner Reference Number (LRN)</span>
                <span className="text-[10px] text-slate-500">Required</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={12}
                  value={lrnInput}
                  onChange={(e) => setLrnInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 136452190313"
                  className="w-full pl-3.5 pr-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Found on your DepEd ID, previous report card, or registration slip.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Access Voucher Code</span>
                <span className="text-[10px] text-amber-400 font-medium">Provided by Adviser</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value.toUpperCase())}
                  placeholder="e.g. ROSAL-0313-AC"
                  className="w-full pl-3.5 pr-4 py-2.5 bg-slate-950/60 border border-slate-700 rounded-xl text-sm font-mono uppercase text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all tracking-wider"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Format: <code className="text-amber-300">ROSAL-[last4LRN]-[2LettersLastName]</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center space-x-2 mt-2"
            >
              <Lock className="w-4 h-4" />
              <span>View Official SF9 Report Card</span>
            </button>
          </form>

          {/* Quick Demo Helper for Adviser Testing */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
            >
              Need a demo code? Click here to test with any student
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500 pt-6 border-t border-white/10">
        <p>DepEd MATATAG Curriculum • School Form 9 (SF9) Official Verification System</p>
        <p className="text-[11px] text-slate-600 mt-1">Class Adviser: {schoolProfile.adviserName}</p>
      </div>

      {/* Demo Student Selector Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Select a Student for Demo</h3>
                <p className="text-xs text-slate-400">Picks a student and automatically fills their LRN & Voucher</p>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-slate-800 flex-1 space-y-1">
              {learners.map((learner) => {
                const voucher = getStudentVoucher(learner);
                return (
                  <button
                    key={learner.id}
                    onClick={() => handleQuickDemoSelect(learner)}
                    className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                        {learner.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        LRN: {learner.lrn} • Sex: {learner.sex}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
                        {voucher}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950/40 text-right">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

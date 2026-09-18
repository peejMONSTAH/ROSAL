'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Award, Printer } from 'lucide-react';

function CertificatesContent() {
  const searchParams = useSearchParams();
  const initialLearnerId = searchParams.get('learnerId') || '';
  const { term1Grades, attendance, schoolProfile } = useStore();

  const [certType, setCertType] = useState<'ACADEMIC' | 'ATTENDANCE'>('ACADEMIC');
  const [selectedTerm, setSelectedTerm] = useState<'TERM 1' | 'TERM 2' | 'TERM 3'>('TERM 1');

  // Academic awardees (Honors)
  const academicAwardees = term1Grades.filter(g => g.honors !== null);

  // Perfect attendance awardees (0 absences)
  const attendanceAwardees = attendance.filter(a => a.perfectAttendance.term1);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialLearnerId || (certType === 'ACADEMIC' ? academicAwardees[0]?.learnerId : attendanceAwardees[0]?.learnerId) || ''
  );

  const activeStudentGrade = term1Grades.find(g => g.learnerId === selectedStudentId) || academicAwardees[0];
  const activeAttendance = attendance.find(a => a.learnerId === selectedStudentId) || attendanceAwardees[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Control Bar */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <span>DepEd Awards &amp; Recognition</span>
            <span>•</span>
            <span>Official Certificates</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center space-x-2">
            <Award className="h-6 w-6 text-amber-500" />
            <span>Certificates Generator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate and print official KNCHS certificates with high-resolution seals and authentic formatting.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Cert Type Switcher */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                setCertType('ACADEMIC');
                if (academicAwardees.length > 0) setSelectedStudentId(academicAwardees[0].learnerId);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                certType === 'ACADEMIC' 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academic Excellence ({academicAwardees.length})
            </button>
            <button
              onClick={() => {
                setCertType('ATTENDANCE');
                if (attendanceAwardees.length > 0) setSelectedStudentId(attendanceAwardees[0].learnerId);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                certType === 'ATTENDANCE' 
                  ? 'bg-deped-blue text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Perfect Attendance ({attendanceAwardees.length})
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-deped-blue hover:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-900/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Recipient Selection Bar */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full max-w-lg">
          <span className="text-xs font-semibold text-slate-600 shrink-0">Select Recipient:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
          >
            {certType === 'ACADEMIC' ? (
              academicAwardees.map(a => (
                <option key={a.learnerId} value={a.learnerId}>
                  #{a.rank} {a.name} — {a.honors} (Avg: {a.average})
                </option>
              ))
            ) : (
              attendanceAwardees.map(a => (
                <option key={a.learnerId} value={a.learnerId}>
                  {a.name} — 0 Absences (100% Attendance)
                </option>
              ))
            )}
          </select>
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Grading Period: <strong>{selectedTerm}</strong>
        </span>
      </div>

      {/* ================= CERTIFICATE PRINT CANVAS ================= */}
      <div className="relative bg-white border-8 border-double border-slate-800 p-10 md:p-14 rounded-2xl shadow-2xl text-center max-w-4xl mx-auto print:border-8 print:p-8 print:shadow-none print:m-0 print:w-full">
        {/* Certificate Watermark / Corner Decorations */}
        <div className="absolute inset-2 border border-amber-600/40 pointer-events-none rounded" />
        <div className="absolute inset-3 border border-slate-300 pointer-events-none rounded" />

        {/* Certificate Header */}
        <div className="flex items-center justify-between mb-4">
          <img src="/assets/image56.png" alt="DepEd" className="h-20 w-20 object-contain" />
          <div className="space-y-0.5">
            <p className="text-xs font-serif uppercase tracking-widest text-slate-700">Republic of the Philippines</p>
            <h2 className="text-sm font-serif uppercase font-bold text-deped-blue tracking-wide">
              Department of Education
            </h2>
            <p className="text-[11px] font-serif uppercase text-slate-600 tracking-wider">
              Region XII • City Schools Division of Koronadal
            </p>
            <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-serif">
              {schoolProfile.schoolName}
            </h3>
            <p className="text-[10px] text-slate-500">{schoolProfile.schoolAddress}</p>
          </div>
          <img src="/assets/image55.png" alt="KNCHS" className="h-20 w-20 object-contain" />
        </div>

        {/* Certificate Title */}
        <div className="my-6">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-serif italic">awards this</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-slate-900 font-serif mt-2">
            {certType === 'ACADEMIC' ? 'Certificate of Recognition' : 'Certificate of Perfect Attendance'}
          </h1>
          <p className="text-xs uppercase tracking-widest text-slate-500 font-serif italic mt-2">to</p>
        </div>

        {/* Recipient Name */}
        <div className="my-6 border-b-2 border-slate-900 pb-2 inline-block min-w-[340px] max-w-xl">
          <h2 className="text-2xl md:text-3xl font-black tracking-wide text-slate-900 uppercase font-serif">
            {certType === 'ACADEMIC' ? activeStudentGrade?.name : activeAttendance?.name}
          </h2>
        </div>

        {/* Certificate Citation Text */}
        <div className="max-w-2xl mx-auto my-4 text-xs md:text-sm text-slate-700 font-serif leading-relaxed">
          {certType === 'ACADEMIC' ? (
            <p>
              For outstanding academic achievement as{' '}
              <strong className="text-amber-800 uppercase underline decoration-amber-500 decoration-2">
                {activeStudentGrade?.honors || 'With Honors'}
              </strong>{' '}
              with a general average of <strong>{activeStudentGrade?.average}%</strong> in Grade 7 -{' '}
              <strong>{schoolProfile.section}</strong> for the <strong>{selectedTerm}</strong> of School Year{' '}
              <strong>{schoolProfile.schoolYear}</strong>.
            </p>
          ) : (
            <p>
              For achieving a remarkable record of <strong>100% Perfect Attendance</strong> with zero absences in Grade 7 -{' '}
              <strong>{schoolProfile.section}</strong> for the <strong>{selectedTerm}</strong> of School Year{' '}
              <strong>{schoolProfile.schoolYear}</strong>.
            </p>
          )}
        </div>

        <p className="text-xs font-serif italic text-slate-500 my-6">
          Given this <strong>25th day of September, 2026</strong> at Koronadal National Comprehensive High School, City of Koronadal, South Cotabato.
        </p>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 pt-8 mt-6 border-t border-slate-200">
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 uppercase font-serif border-b border-slate-800 pb-1">
              {schoolProfile.adviserName}
            </p>
            <p className="text-[11px] text-slate-600 font-serif mt-1">
              {schoolProfile.adviserTitle} / Class Adviser
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 uppercase font-serif border-b border-slate-800 pb-1">
              {schoolProfile.schoolHeadName}
            </p>
            <p className="text-[11px] text-slate-600 font-serif mt-1">
              {schoolProfile.schoolHeadTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deped-blue"></div>
      </div>
    }>
      <CertificatesContent />
    </Suspense>
  );
}

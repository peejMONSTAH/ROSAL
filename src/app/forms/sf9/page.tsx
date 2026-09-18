'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Printer, Download, ArrowLeft, ArrowRight, UserCheck, BookOpen } from 'lucide-react';

export default function SF9Page() {
  const { learners, term1Grades, attendance, schoolProfile } = useStore();
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>(learners[0]?.id || '');
  const [viewSide, setViewSide] = useState<'both' | 'front' | 'back'>('both');

  const learner = learners.find(l => l.id === selectedLearnerId) || learners[0];
  const grades = term1Grades.find(g => g.learnerId === selectedLearnerId) || term1Grades[0];
  const att = attendance.find(a => a.learnerId === selectedLearnerId) || attendance[0];

  const currentIdx = learners.findIndex(l => l.id === selectedLearnerId);

  const prevLearner = () => {
    if (currentIdx > 0) setSelectedLearnerId(learners[currentIdx - 1].id);
  };

  const nextLearner = () => {
    if (currentIdx < learners.length - 1) setSelectedLearnerId(learners[currentIdx + 1].id);
  };

  if (!learner || !grades || !att) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Control Bar */}
      <div className="no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-deped-blue" />
            <span>School Form 9 (SF9) — Learner Progress Report Card</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            DepEd Order No. 10, s. 2024 (MATATAG Curriculum) • Ready for print
          </p>
        </div>

        {/* Student Selector & Print */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="flex items-center space-x-1">
            <button
              onClick={prevLearner}
              disabled={currentIdx === 0}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="Previous Student"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <select
              value={selectedLearnerId}
              onChange={(e) => setSelectedLearnerId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white max-w-[200px]"
            >
              {learners.map((l, i) => (
                <option key={l.id} value={l.id}>
                  {i + 1}. {l.name}
                </option>
              ))}
            </select>
            <button
              onClick={nextLearner}
              disabled={currentIdx === learners.length - 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              title="Next Student"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewSide('both')}
              className={`px-2.5 py-1 rounded font-medium ${viewSide === 'both' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
            >
              Both Sides
            </button>
            <button
              onClick={() => setViewSide('front')}
              className={`px-2.5 py-1 rounded font-medium ${viewSide === 'front' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
            >
              Front Only
            </button>
            <button
              onClick={() => setViewSide('back')}
              className={`px-2.5 py-1 rounded font-medium ${viewSide === 'back' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
            >
              Back Only
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-bold text-white bg-deped-blue hover:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-900/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report Card</span>
          </button>
        </div>
      </div>

      {/* Printable SF9 Document Container */}
      <div className="space-y-8">
        {/* ================= SF9 FRONT SIDE ================= */}
        {(viewSide === 'both' || viewSide === 'front') && (
          <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-lg text-slate-900 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
            {/* Header with DepEd & KNCHS Seals */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-4 text-center">
              <img src="/assets/image56.png" alt="DepEd Seal" className="h-16 w-16 object-contain" />
              <div className="space-y-0.5">
                <p className="text-[11px] uppercase tracking-wider font-semibold">Republic of the Philippines</p>
                <p className="text-[12px] uppercase font-bold text-deped-blue">Department of Education</p>
                <p className="text-[10px] uppercase font-semibold">{schoolProfile.region} • {schoolProfile.division}</p>
                <h2 className="text-sm font-black uppercase tracking-tight">{schoolProfile.schoolName}</h2>
                <p className="text-[10px] text-slate-600">{schoolProfile.schoolAddress}</p>
              </div>
              <img src="/assets/image55.png" alt="School Seal" className="h-16 w-16 object-contain" />
            </div>

            <div className="text-center mb-5">
              <span className="text-xs font-black uppercase tracking-widest bg-slate-900 text-white px-4 py-1 rounded">
                School Form 9 - Junior High School (SF9-JHS)
              </span>
              <p className="text-[11px] font-semibold text-slate-600 mt-1">PROGRESS REPORT CARD</p>
            </div>

            {/* Learner Info Block */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs border border-slate-800 p-3.5 rounded mb-6">
              <div><span className="font-bold">Name:</span> <span className="uppercase font-semibold">{learner.name}</span></div>
              <div><span className="font-bold">LRN:</span> <span className="font-mono font-semibold">{learner.lrn}</span></div>
              <div><span className="font-bold">Age:</span> {learner.age} | <span className="font-bold">Sex:</span> {learner.sex === 'M' ? 'Male' : 'Female'}</div>
              <div><span className="font-bold">Grade &amp; Section:</span> {schoolProfile.gradeLevel} - {schoolProfile.section}</div>
              <div><span className="font-bold">School Year:</span> {schoolProfile.schoolYear}</div>
              <div><span className="font-bold">Class Adviser:</span> {schoolProfile.adviserName}</div>
            </div>

            {/* Attendance Record Matrix */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-center border-b border-slate-800 pb-1 mb-2">
                Report on Attendance
              </h3>
              <table className="w-full text-center text-[10px] border-collapse border border-slate-800">
                <thead>
                  <tr className="bg-slate-100 font-bold border-b border-slate-800">
                    <th className="border border-slate-800 py-1.5 px-2 text-left">Month</th>
                    <th className="border border-slate-800 py-1 px-1">Jun</th>
                    <th className="border border-slate-800 py-1 px-1">Jul</th>
                    <th className="border border-slate-800 py-1 px-1">Aug</th>
                    <th className="border border-slate-800 py-1 px-1">Sep</th>
                    <th className="border border-slate-800 py-1 px-1">Oct</th>
                    <th className="border border-slate-800 py-1 px-1">Nov</th>
                    <th className="border border-slate-800 py-1 px-1">Dec</th>
                    <th className="border border-slate-800 py-1 px-1">Jan</th>
                    <th className="border border-slate-800 py-1 px-1">Feb</th>
                    <th className="border border-slate-800 py-1 px-1">Mar</th>
                    <th className="border border-slate-800 py-1 px-1">Apr</th>
                    <th className="border border-slate-800 py-1 px-1 font-black bg-slate-200">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-800 py-1 px-2 text-left font-semibold">No. of School Days</td>
                    <td className="border border-slate-800">16</td>
                    <td className="border border-slate-800">23</td>
                    <td className="border border-slate-800">20</td>
                    <td className="border border-slate-800">22</td>
                    <td className="border border-slate-800">22</td>
                    <td className="border border-slate-800">20</td>
                    <td className="border border-slate-800">14</td>
                    <td className="border border-slate-800">20</td>
                    <td className="border border-slate-800">20</td>
                    <td className="border border-slate-800">21</td>
                    <td className="border border-slate-800">6</td>
                    <td className="border border-slate-800 font-bold bg-slate-100">204</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-1 px-2 text-left font-semibold">No. of Days Present</td>
                    <td className="border border-slate-800">{att.monthly.june?.present ?? 16}</td>
                    <td className="border border-slate-800">{att.monthly.july?.present ?? 23}</td>
                    <td className="border border-slate-800">{att.monthly.aug?.present ?? 20}</td>
                    <td className="border border-slate-800">{att.monthly.sept?.present ?? 22}</td>
                    <td className="border border-slate-800">{att.monthly.oct?.present ?? 22}</td>
                    <td className="border border-slate-800">{att.monthly.nov?.present ?? 20}</td>
                    <td className="border border-slate-800">{att.monthly.dec?.present ?? 14}</td>
                    <td className="border border-slate-800">{att.monthly.jan?.present ?? 20}</td>
                    <td className="border border-slate-800">{att.monthly.feb?.present ?? 20}</td>
                    <td className="border border-slate-800">{att.monthly.mar?.present ?? 21}</td>
                    <td className="border border-slate-800">{att.monthly.apr?.present ?? 6}</td>
                    <td className="border border-slate-800 font-bold bg-slate-100">{att.totalPresent}</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-1 px-2 text-left font-semibold">No. of Days Absent</td>
                    <td className="border border-slate-800">{att.monthly.june?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.july?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.aug?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.sept?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.oct?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.nov?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.dec?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.jan?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.feb?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.mar?.absent ?? 0}</td>
                    <td className="border border-slate-800">{att.monthly.apr?.absent ?? 0}</td>
                    <td className="border border-slate-800 font-bold bg-slate-100">{att.totalAbsent}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Certificate of Transfer & Eligibility */}
            <div className="border border-slate-800 p-3 text-[11px] rounded space-y-2 mb-6">
              <h4 className="font-bold uppercase tracking-wider text-center border-b border-slate-400 pb-1">
                Certificate of Transfer
              </h4>
              <p>Admitted to Grade: <strong>Grade 7</strong> &nbsp;&nbsp;&nbsp;&nbsp; Section: <strong>{schoolProfile.section}</strong></p>
              <p>Eligible for Admission to Grade: <strong>Grade 8</strong></p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="text-center">
                  <div className="border-b border-slate-800 font-bold">{schoolProfile.adviserName}</div>
                  <span className="text-[10px] text-slate-600">Class Adviser</span>
                </div>
                <div className="text-center">
                  <div className="border-b border-slate-800 font-bold">{schoolProfile.schoolHeadName}</div>
                  <span className="text-[10px] text-slate-600">{schoolProfile.schoolHeadTitle}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SF9 BACK SIDE ================= */}
        {(viewSide === 'both' || viewSide === 'back') && (
          <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-lg text-slate-900 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 page-break">
            <div className="text-center border-b border-slate-800 pb-2 mb-4">
              <h2 className="text-sm font-black uppercase tracking-tight">Report on Learning Progress and Achievement</h2>
              <p className="text-[11px] font-semibold text-slate-600">Junior High School Curriculum (MATATAG)</p>
            </div>

            {/* Academic Grades Table */}
            <table className="w-full text-center text-[11px] border-collapse border border-slate-800 mb-5">
              <thead>
                <tr className="bg-slate-100 font-bold border-b border-slate-800">
                  <th className="border border-slate-800 py-2 px-3 text-left w-1/3">Learning Areas</th>
                  <th className="border border-slate-800 py-2 px-2 w-14">Term 1</th>
                  <th className="border border-slate-800 py-2 px-2 w-14">Term 2</th>
                  <th className="border border-slate-800 py-2 px-2 w-14">Term 3</th>
                  <th className="border border-slate-800 py-2 px-2 w-16 bg-slate-200">Final</th>
                  <th className="border border-slate-800 py-2 px-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Filipino</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.filipino}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.filipino}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">English</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.english}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.english}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Mathematics</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.math}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.math}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Science</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.science}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.science}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Araling Panlipunan (AP)</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.ap}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.ap}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Values Education</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.values}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.values}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1.5 px-3 text-left font-medium">Technology &amp; Livelihood Education (TLE)</td>
                  <td className="border border-slate-800 font-semibold">{grades.grades.tle}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-bold">{grades.grades.tle}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                {/* MAPEH Group */}
                <tr className="bg-blue-50/40">
                  <td className="border border-slate-800 py-1 px-3 text-left font-bold text-blue-900">
                    MAPEH
                  </td>
                  <td className="border border-slate-800 font-black text-blue-900">{grades.grades.mapeh}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-black">{grades.grades.mapeh}</td>
                  <td className="border border-slate-800 text-emerald-700 font-semibold">Passed</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1 px-6 text-left text-[10px] text-slate-600">Music &amp; Arts</td>
                  <td className="border border-slate-800 text-[10px]">{grades.grades.music_arts}</td>
                  <td className="border border-slate-800 text-[10px] text-slate-400">—</td>
                  <td className="border border-slate-800 text-[10px] text-slate-400">—</td>
                  <td className="border border-slate-800 text-[10px]">{grades.grades.music_arts}</td>
                  <td className="border border-slate-800 text-[10px]">—</td>
                </tr>
                <tr>
                  <td className="border border-slate-800 py-1 px-6 text-left text-[10px] text-slate-600">Physical Education &amp; Health</td>
                  <td className="border border-slate-800 text-[10px]">{grades.grades.pe_health}</td>
                  <td className="border border-slate-800 text-[10px] text-slate-400">—</td>
                  <td className="border border-slate-800 text-[10px] text-slate-400">—</td>
                  <td className="border border-slate-800 text-[10px]">{grades.grades.pe_health}</td>
                  <td className="border border-slate-800 text-[10px]">—</td>
                </tr>
                <tr className="bg-slate-100 font-black text-xs">
                  <td className="border border-slate-800 py-2 px-3 text-left uppercase">General Average</td>
                  <td className="border border-slate-800 font-black text-emerald-800">{grades.average}</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 text-slate-400">—</td>
                  <td className="border border-slate-800 font-black text-emerald-800">{grades.average}</td>
                  <td className="border border-slate-800 text-emerald-700">Passed</td>
                </tr>
              </tbody>
            </table>

            {/* Performance Descriptors Scale */}
            <div className="grid grid-cols-2 gap-4 text-[10px] border border-slate-800 p-2.5 rounded mb-5">
              <div>
                <span className="font-bold block uppercase border-b border-slate-300 pb-0.5 mb-1">Descriptors &amp; Grading Scale</span>
                <p><strong>Advancing (90-100)</strong> — Passed</p>
                <p><strong>Benchmarking (80-89)</strong> — Passed</p>
                <p><strong>Connecting (75-79)</strong> — Passed</p>
                <p><strong>Developing (65-74)</strong> — Failed</p>
                <p><strong>Emerging (0-64)</strong> — Failed</p>
              </div>
              <div>
                <span className="font-bold block uppercase border-b border-slate-300 pb-0.5 mb-1">Learner&apos;s Performance Level</span>
                <p className="text-xs font-bold text-deped-blue mt-1">
                  Current Descriptor: <span className="underline">{grades.descriptor}</span>
                </p>
                {grades.honors && (
                  <p className="text-xs font-bold text-amber-700 mt-1">
                    Honor Award: ★ {grades.honors}
                  </p>
                )}
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-center border-b border-slate-800 pb-1 mb-2">
                Report on Learner&apos;s Observed Values
              </h3>
              <table className="w-full text-center text-[10px] border-collapse border border-slate-800">
                <thead>
                  <tr className="bg-slate-100 font-bold border-b border-slate-800">
                    <th className="border border-slate-800 py-1 px-3 text-left">Core Values</th>
                    <th className="border border-slate-800 py-1 px-2 text-left">Behavior Statements</th>
                    <th className="border border-slate-800 py-1 px-2 w-12">T1</th>
                    <th className="border border-slate-800 py-1 px-2 w-12">T2</th>
                    <th className="border border-slate-800 py-1 px-2 w-12">T3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-800 py-1 px-3 font-semibold text-left">1. Maka-Diyos</td>
                    <td className="border border-slate-800 py-1 px-2 text-left">Expresses one&apos;s spiritual beliefs while respecting others.</td>
                    <td className="border border-slate-800 font-bold">AO</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-1 px-3 font-semibold text-left">2. Makatao</td>
                    <td className="border border-slate-800 py-1 px-2 text-left">Sensitive to individual social and cultural differences.</td>
                    <td className="border border-slate-800 font-bold">AO</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-1 px-3 font-semibold text-left">3. Makakalikasan</td>
                    <td className="border border-slate-800 py-1 px-2 text-left">Cares for the environment and utilizes resources wisely.</td>
                    <td className="border border-slate-800 font-bold">AO</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-800 py-1 px-3 font-semibold text-left">4. Makabansa</td>
                    <td className="border border-slate-800 py-1 px-2 text-left">Demonstrates pride in being a Filipino.</td>
                    <td className="border border-slate-800 font-bold">AO</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                    <td className="border border-slate-800 text-slate-400">—</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-[9px] text-slate-500 mt-1 italic text-center">
                Legend: AO - Always Observed | SO - Sometimes Observed | RO - Rarely Observed | NO - Not Observed
              </p>
            </div>

            {/* Teacher's Comments Block */}
            <div className="border border-slate-800 p-3 text-[11px] rounded space-y-2">
              <span className="font-bold uppercase tracking-wider block border-b border-slate-400 pb-0.5">
                Teacher&apos;s Comments / Remarks
              </span>
              <p className="italic text-slate-800">
                <strong>Term 1:</strong> &ldquo;{grades.comment || 'Has made good progress this term. More independent study and regular practice are encouraged.'}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 text-xs">
                <div>Parent / Guardian&apos;s Signature: _______________________</div>
                <div>Date: _________________</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { Printer, ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';

export default function SF10Page() {
  const { learners, term1Grades, schoolProfile } = useStore();
  const [selectedLearnerId, setSelectedLearnerId] = useState<string>(learners[0]?.id || '');

  const learner = learners.find(l => l.id === selectedLearnerId) || learners[0];
  const grades = term1Grades.find(g => g.learnerId === selectedLearnerId) || term1Grades[0];

  const currentIdx = learners.findIndex(l => l.id === selectedLearnerId);

  const prevLearner = () => {
    if (currentIdx > 0) setSelectedLearnerId(learners[currentIdx - 1].id);
  };

  const nextLearner = () => {
    if (currentIdx < learners.length - 1) setSelectedLearnerId(learners[currentIdx + 1].id);
  };

  if (!learner || !grades) return null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Control Bar */}
      <div className="no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center space-x-2">
            <FileCheck className="h-5 w-5 text-rose-600" />
            <span>School Form 10 (SF10-JHS) — Permanent Academic Record</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Revised 2025 based on DepEd Order No. 10, s. 2024 (Formerly Form 137)
          </p>
        </div>

        {/* Navigation & Print */}
        <div className="flex items-center space-x-2.5">
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

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-bold text-white bg-deped-blue hover:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-900/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print SF10</span>
          </button>
        </div>
      </div>

      {/* SF10 Document Sheet */}
      <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-lg text-slate-900 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* DepEd Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4 text-center">
          <img src="/assets/image56.png" alt="DepEd Seal" className="h-16 w-16 object-contain" />
          <div className="space-y-0.5">
            <p className="text-[11px] uppercase font-semibold">Republic of the Philippines</p>
            <p className="text-xs uppercase font-bold text-deped-blue">Department of Education</p>
            <h2 className="text-sm font-black uppercase tracking-tight">
              Learner Permanent Academic Record for Junior High School (SF10-JHS)
            </h2>
            <p className="text-[10px] text-slate-600 italic">(Formerly Form 137)</p>
          </div>
          <img src="/assets/image55.png" alt="KNCHS Seal" className="h-16 w-16 object-contain" />
        </div>

        {/* Section 1: Learner's Information */}
        <div className="border border-slate-800 mb-4 text-[11px]">
          <div className="bg-slate-100 font-bold px-3 py-1 border-b border-slate-800 uppercase tracking-wider text-[10px]">
            Learner&apos;s Information
          </div>
          <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div><span className="font-bold">LAST NAME:</span> {learner.lastName}</div>
            <div><span className="font-bold">FIRST NAME:</span> {learner.firstName}</div>
            <div><span className="font-bold">MIDDLE NAME:</span> {learner.middleName || '—'}</div>
            <div><span className="font-bold">NAME EXTN:</span> {learner.extensionName || 'N/A'}</div>
            <div><span className="font-bold">LRN:</span> <span className="font-mono font-bold">{learner.lrn}</span></div>
            <div><span className="font-bold">Birthdate:</span> {learner.birthdate}</div>
            <div><span className="font-bold">Sex:</span> {learner.sex === 'M' ? 'Male' : 'Female'}</div>
            <div><span className="font-bold">Age:</span> {learner.age}</div>
          </div>
        </div>

        {/* Section 2: Eligibility for JHS Enrolment */}
        <div className="border border-slate-800 mb-4 text-[11px]">
          <div className="bg-slate-100 font-bold px-3 py-1 border-b border-slate-800 uppercase tracking-wider text-[10px]">
            Eligibility for JHS Enrolment
          </div>
          <div className="p-3 space-y-1">
            <p className="font-semibold">
              ✔ Elementary School Completer &nbsp;&nbsp;&nbsp;&nbsp; General Average: <strong>89.5</strong>
            </p>
            <p className="text-slate-600 text-[10px]">
              Elementary School: <strong>Koronadal Central Elementary School-I (KCES-I)</strong> | School ID: <strong>131406</strong>
            </p>
          </div>
        </div>

        {/* Section 3: Scholastic Record */}
        <div className="border border-slate-800 mb-4 text-[11px]">
          <div className="bg-slate-100 font-bold px-3 py-1 border-b border-slate-800 uppercase tracking-wider text-[10px] flex items-center justify-between">
            <span>Scholastic Record — Grade 7</span>
            <span>SY {schoolProfile.schoolYear}</span>
          </div>
          <div className="p-3 border-b border-slate-400 grid grid-cols-3 gap-2 text-[10px]">
            <div><span className="font-bold">School:</span> {schoolProfile.schoolName}</div>
            <div><span className="font-bold">School ID:</span> {schoolProfile.schoolId}</div>
            <div><span className="font-bold">District:</span> {schoolProfile.district}</div>
            <div><span className="font-bold">Division:</span> {schoolProfile.division}</div>
            <div><span className="font-bold">Section:</span> {schoolProfile.section}</div>
            <div><span className="font-bold">Adviser:</span> {schoolProfile.adviserName}</div>
          </div>

          <table className="w-full text-center text-[10px] border-collapse">
            <thead>
              <tr className="bg-slate-50 font-bold border-b border-slate-800">
                <th className="py-1 px-3 text-left border-r border-slate-800 w-1/3">Learning Areas</th>
                <th className="py-1 px-2 border-r border-slate-800 w-14">T1</th>
                <th className="py-1 px-2 border-r border-slate-800 w-14">T2</th>
                <th className="py-1 px-2 border-r border-slate-800 w-14">T3</th>
                <th className="py-1 px-2 border-r border-slate-800 w-16 bg-slate-100">Final Rating</th>
                <th className="py-1 px-2">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Filipino</td>
                <td className="border-r border-slate-800">{grades.grades.filipino}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.filipino}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">English</td>
                <td className="border-r border-slate-800">{grades.grades.english}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.english}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Mathematics</td>
                <td className="border-r border-slate-800">{grades.grades.math}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.math}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Science</td>
                <td className="border-r border-slate-800">{grades.grades.science}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.science}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Araling Panlipunan (AP)</td>
                <td className="border-r border-slate-800">{grades.grades.ap}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.ap}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Values Education</td>
                <td className="border-r border-slate-800">{grades.grades.values}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.values}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr>
                <td className="py-1 px-3 text-left border-r border-slate-800">Technology &amp; Livelihood Education (TLE)</td>
                <td className="border-r border-slate-800">{grades.grades.tle}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.tle}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="py-1 px-3 text-left border-r border-slate-800 font-bold text-blue-900">MAPEH</td>
                <td className="border-r border-slate-800 font-bold text-blue-900">{grades.grades.mapeh}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-bold">{grades.grades.mapeh}</td>
                <td className="text-emerald-700 font-semibold">Passed</td>
              </tr>
              <tr className="bg-slate-100 font-bold">
                <td className="py-1 px-3 text-left border-r border-slate-800 uppercase">General Average</td>
                <td className="border-r border-slate-800 font-bold text-emerald-800">{grades.average}</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 text-slate-400">—</td>
                <td className="border-r border-slate-800 font-black text-emerald-800">{grades.average}</td>
                <td className="text-emerald-700 font-bold">Passed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Certification Block */}
        <div className="border border-slate-800 p-4 text-[11px] rounded space-y-3">
          <h4 className="font-bold uppercase tracking-wider text-center border-b border-slate-400 pb-1">
            Certification
          </h4>
          <p className="leading-relaxed">
            I CERTIFY that this is a true record of <strong>{learner.name}</strong> with LRN <strong>{learner.lrn}</strong> and that he/she is eligible for admission to Grade 8.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-8 text-center">
            <div>
              <div className="border-b border-slate-800 font-bold">{schoolProfile.adviserName}</div>
              <span className="text-[10px] text-slate-600">Class Adviser / Teacher</span>
            </div>
            <div>
              <div className="border-b border-slate-800 font-bold">{schoolProfile.schoolHeadName}</div>
              <span className="text-[10px] text-slate-600">{schoolProfile.schoolHeadTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

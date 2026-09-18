'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  KeyRound, 
  Search, 
  Copy, 
  Check, 
  Printer, 
  ExternalLink, 
  ShieldCheck, 
  Users, 
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { generateStudentVoucher } from '@/lib/vouchers';

export default function VouchersPage() {
  const { learners, schoolProfile } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'ALL' | 'M' | 'F'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate vouchers for all learners
  const learnersWithVouchers = useMemo(() => {
    return learners.map((learner) => {
      const voucher = generateStudentVoucher(learner);
      return {
        ...learner,
        voucher,
      };
    });
  }, [learners]);

  // Filtered list
  const filteredLearners = useMemo(() => {
    return learnersWithVouchers.filter((l) => {
      const matchesSearch = 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.lrn.includes(searchTerm) ||
        l.voucher.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = 
        genderFilter === 'ALL' || l.sex === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [learnersWithVouchers, searchTerm, genderFilter]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const exportVouchersCSV = () => {
    const headers = ['No.', 'Sex', 'LRN', 'Learner Name', 'Voucher Code', 'Direct Access URL'];
    const rows = learnersWithVouchers.map((l, index) => {
      const directUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/portal?lrn=${l.lrn}&voucher=${l.voucher}`
        : `/portal?lrn=${l.lrn}&voucher=${l.voucher}`;
      return [
        index + 1,
        l.sex === 'M' ? 'Male' : 'Female',
        `"${l.lrn}"`,
        `"${l.name}"`,
        `"${l.voucher}"`,
        `"${directUrl}"`
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ROSAL_Student_Vouchers_${schoolProfile.schoolYear || '2024-2025'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Printable Vouchers Slips (Visible only during print) */}
      <div className="hidden print:block space-y-6">
        <div className="text-center border-b pb-4 mb-6">
          <h2 className="text-xl font-bold uppercase">{schoolProfile.schoolName}</h2>
          <p className="text-xs text-slate-600">Department of Education • Region XII • Division of Koronadal City</p>
          <h3 className="text-sm font-semibold mt-1">OFFICIAL STUDENT & PARENT SF9 PORTAL ACCESS VOUCHERS</h3>
          <p className="text-xs text-slate-500">{schoolProfile.gradeLevel} - {schoolProfile.section} | S.Y. {schoolProfile.schoolYear}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {learnersWithVouchers.map((student, idx) => (
            <div key={student.id} className="border-2 border-dashed border-slate-400 p-4 rounded-lg flex flex-col justify-between text-xs page-break-inside-avoid">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                  <span className="font-bold text-[11px] text-blue-900 uppercase">KNCHS SF9 PORTAL SLIP</span>
                  <span className="text-[10px] text-slate-500">#{idx + 1}</span>
                </div>
                <div className="font-bold text-sm text-slate-900">{student.name}</div>
                <div className="text-[11px] text-slate-600 mb-2">
                  Grade & Section: <span className="font-semibold text-slate-800">{schoolProfile.gradeLevel} - {schoolProfile.section}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 my-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">LRN:</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider">{student.lrn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">ACCESS VOUCHER:</span>
                    <span className="font-mono font-extrabold text-blue-800 tracking-wider">{student.voucher}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-tight">
                  Instructions: Visit the KNCHS Student Portal at <strong className="text-slate-700">/portal</strong>. Enter your 12-digit LRN and Access Voucher code above to view and download your official DepEd SF9 Report Card.
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-200 flex justify-between items-center text-[10px]">
                <div>
                  <div className="font-semibold">{schoolProfile.adviserName}</div>
                  <div className="text-slate-500">Class Adviser</div>
                </div>
                <div className="text-right text-slate-400">
                  Confidential
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen View (Hidden when printing) */}
      <div className="no-print space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                <span>2-User Portal System • Security & Voucher Management</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Student & Parent Access Vouchers
              </h1>
              <p className="text-blue-200 text-sm leading-relaxed">
                Empower Grade 7 ROSAL students and parents to view their official <strong>DepEd School Form 9 (SF9) Report Cards</strong> securely. Each learner has a unique voucher code. Distribute voucher slips or copy codes for immediate access.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all shadow-md backdrop-blur-sm"
              >
                <Printer className="w-4 h-4 text-blue-300" />
                <span>Print Voucher Slips</span>
              </button>

              <button
                onClick={exportVouchersCSV}
                className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white transition-all shadow-md backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                <span>Export CSV</span>
              </button>

              <Link
                href="/portal"
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 rounded-xl text-xs font-extrabold transition-all shadow-lg hover:shadow-amber-500/25"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Student Portal</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-xs text-blue-300 font-medium">Total Enrolled</div>
              <div className="text-xl font-black text-white">{learners.length}</div>
            </div>
            <div>
              <div className="text-xs text-blue-300 font-medium">Vouchers Issued</div>
              <div className="text-xl font-black text-emerald-400">{learnersWithVouchers.length} Active</div>
            </div>
            <div>
              <div className="text-xs text-blue-300 font-medium">Grade & Section</div>
              <div className="text-xl font-black text-white">{schoolProfile.gradeLevel} - {schoolProfile.section}</div>
            </div>
            <div>
              <div className="text-xs text-blue-300 font-medium">Authentication Protocol</div>
              <div className="text-xs font-bold text-amber-300 mt-1">LRN + ROSAL Voucher</div>
            </div>
          </div>
        </div>

        {/* Security / Instructions Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">How the 2-User Portal Works:</span>
            <p className="text-amber-800 leading-relaxed">
              1. <strong>Class Adviser:</strong> Uses this dashboard to input quarterly grades, calculate general averages, and update attendance (SF2).<br />
              2. <strong>Student / Parent:</strong> Navigates to <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">/portal</code>, inputs their 12-digit LRN and confidential Voucher code below, and can instantly view, verify, and print their official DepEd MATATAG SF9 Report Card.
            </p>
          </div>
        </div>

        {/* Search, Filters, and Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student name, LRN, or voucher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-medium">Filter Sex:</span>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden bg-white p-0.5 text-xs">
                {(['ALL', 'M', 'F'] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender)}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      genderFilter === gender
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {gender === 'ALL' ? 'All' : gender === 'M' ? 'Male (24)' : 'Female (20)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 w-12 text-center">#</th>
                  <th className="py-3.5 px-4">Learner Name</th>
                  <th className="py-3.5 px-4">LRN (12-Digit)</th>
                  <th className="py-3.5 px-4">Sex</th>
                  <th className="py-3.5 px-4">Access Voucher</th>
                  <th className="py-3.5 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLearners.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      No learners found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLearners.map((student, idx) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center font-medium text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-400">Grade 7 - ROSAL</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                        {student.lrn}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          student.sex === 'M'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          {student.sex === 'M' ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center space-x-1.5 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1">
                          <KeyRound className="w-3 h-3 text-amber-600" />
                          <span className="font-mono font-bold text-slate-900 tracking-wider">
                            {student.voucher}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleCopy(student.voucher, student.id)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-blue-900 transition-colors"
                            title="Copy Voucher Code"
                          >
                            {copiedId === student.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-400" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          <Link
                            href={`/portal?lrn=${student.lrn}&voucher=${student.voucher}`}
                            target="_blank"
                            className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                            title="Test Portal View for this Student"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Preview SF9</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredLearners.length} of {learners.length} learners</span>
            <span className="text-[11px]">Voucher algorithm conforms to DepEd SF9 Learner Reference Number privacy guidelines.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

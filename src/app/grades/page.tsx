'use client';

import React, { useState, useMemo } from 'react';
import { useStore } from '@/lib/store';
import { TermGradeRecord, SubjectKey } from '@/types';
import { PillSearchBar } from '@/components/ui/pill-search-bar';
import { exportGradesToExcel } from '@/lib/excel-export';
import { 
  GraduationCap, 
  Download, 
  Edit3, 
  Award, 
  Check, 
  X, 
  MessageSquare, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { calculateMapeh, calculateAverage, getDescriptor, getHonors } from '@/lib/deped-calculations';

export default function GradesPage() {
  const { term1Grades, updateTerm1Grade, schoolProfile, commentsBank, learners } = useStore();

  const [activeTerm, setActiveTerm] = useState<'term1' | 'term2' | 'term3' | 'consol'>('term1');
  const [search, setSearch] = useState('');
  const [descriptorFilter, setDescriptorFilter] = useState('ALL');
  const [editingRecord, setEditingRecord] = useState<TermGradeRecord | null>(null);

  // Edit grade modal states
  const [tempGrades, setTempGrades] = useState({
    filipino: 85,
    english: 85,
    math: 85,
    science: 85,
    ap: 85,
    values: 85,
    tle: 85,
    music_arts: 85,
    pe_health: 85,
    comment: ''
  });

  const openEdit = (record: TermGradeRecord) => {
    setEditingRecord(record);
    setTempGrades({
      filipino: record.grades.filipino,
      english: record.grades.english,
      math: record.grades.math,
      science: record.grades.science,
      ap: record.grades.ap,
      values: record.grades.values,
      tle: record.grades.tle,
      music_arts: record.grades.music_arts,
      pe_health: record.grades.pe_health,
      comment: record.comment || ''
    });
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;

    updateTerm1Grade(editingRecord.learnerId, {
      filipino: Number(tempGrades.filipino),
      english: Number(tempGrades.english),
      math: Number(tempGrades.math),
      science: Number(tempGrades.science),
      ap: Number(tempGrades.ap),
      values: Number(tempGrades.values),
      tle: Number(tempGrades.tle),
      music_arts: Number(tempGrades.music_arts),
      pe_health: Number(tempGrades.pe_health),
      comment: tempGrades.comment,
    });

    setEditingRecord(null);
  };

  // Preview calculations in modal
  const modalMapeh = calculateMapeh(Number(tempGrades.music_arts) || 0, Number(tempGrades.pe_health) || 0);
  const modalAverage = calculateAverage({
    filipino: Number(tempGrades.filipino) || 0,
    english: Number(tempGrades.english) || 0,
    math: Number(tempGrades.math) || 0,
    science: Number(tempGrades.science) || 0,
    ap: Number(tempGrades.ap) || 0,
    values: Number(tempGrades.values) || 0,
    tle: Number(tempGrades.tle) || 0,
    mapeh: modalMapeh
  });
  const modalDescriptor = getDescriptor(modalAverage);
  const modalHonors = getHonors(modalAverage, [
    Number(tempGrades.filipino) || 0,
    Number(tempGrades.english) || 0,
    Number(tempGrades.math) || 0,
    Number(tempGrades.science) || 0,
    Number(tempGrades.ap) || 0,
    Number(tempGrades.values) || 0,
    Number(tempGrades.tle) || 0,
    modalMapeh
  ]);

  // Filtered rows
  const filteredGrades = useMemo(() => {
    return term1Grades.filter(g => {
      const term = search.toLowerCase();
      const matchesSearch = !term || g.name.toLowerCase().includes(term) || g.lrn.includes(term);
      const matchesDesc = descriptorFilter === 'ALL' || g.descriptor === descriptorFilter || (descriptorFilter === 'HONORS' && g.honors !== null);
      return matchesSearch && matchesDesc;
    });
  }, [term1Grades, search, descriptorFilter]);

  const handleExport = () => {
    const title = activeTerm === 'term1' ? 'Term 1' : activeTerm === 'term2' ? 'Term 2' : activeTerm === 'term3' ? 'Term 3' : 'Consolidated';
    exportGradesToExcel(term1Grades, schoolProfile, title);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <span>DepEd Grading System</span>
            <span>•</span>
            <span>MATATAG Curriculum</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Academic Grades Management
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Grade 7 - ROSAL | SY {schoolProfile.schoolYear} | Adviser: <strong>{schoolProfile.adviserName}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-sm"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            <span>Export Grades (.xlsx)</span>
          </button>
        </div>
      </div>

      {/* Term Selector Tabs & Filters */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Term Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTerm('term1')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTerm === 'term1' ? 'bg-deped-blue text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Term 1
          </button>
          <button
            onClick={() => setActiveTerm('term2')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTerm === 'term2' ? 'bg-deped-blue text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Term 2
          </button>
          <button
            onClick={() => setActiveTerm('term3')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTerm === 'term3' ? 'bg-deped-blue text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Term 3
          </button>
          <button
            onClick={() => setActiveTerm('consol')}
            className={`px-4 py-2 rounded-lg transition-all ${activeTerm === 'consol' ? 'bg-deped-blue text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Consolidated (Final)
          </button>
        </div>

        {/* User reference pill search bar */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <PillSearchBar
            value={search}
            onChangeValue={setSearch}
            placeholder="Search item number, position, LRN, learner..."
            wrapperClassName="w-full md:w-72"
          />

          <select
            value={descriptorFilter}
            onChange={(e) => setDescriptorFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-deped-blue/20 shrink-0"
          >
            <option value="ALL">All Levels</option>
            <option value="HONORS">★ Honor Awardees (17)</option>
            <option value="Advancing">Advancing (90-100)</option>
            <option value="Benchmarking">Benchmarking (80-89)</option>
            <option value="Connecting">Connecting (75-79)</option>
            <option value="Developing">Developing (65-74)</option>
          </select>
        </div>
      </div>

      {/* Main Grade Sheet Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3 text-center w-12">Rank</th>
                <th className="py-3 px-3">LRN</th>
                <th className="py-3 px-3.5 min-w-[200px]">Learner&apos;s Name</th>
                <th className="py-3 px-2 text-center">Sex</th>
                <th className="py-3 px-2 text-center" title="Filipino">FIL</th>
                <th className="py-3 px-2 text-center" title="English">ENG</th>
                <th className="py-3 px-2 text-center" title="Mathematics">MATH</th>
                <th className="py-3 px-2 text-center" title="Science">SCI</th>
                <th className="py-3 px-2 text-center" title="Araling Panlipunan">AP</th>
                <th className="py-3 px-2 text-center" title="Values Education">VE</th>
                <th className="py-3 px-2 text-center" title="Technology & Livelihood Education">TLE</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Music & Arts">M&amp;A</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Physical Education & Health">PE&amp;H</th>
                <th className="py-3 px-2 text-center bg-blue-100/70 font-black text-blue-900" title="Computed MAPEH">MAPEH</th>
                <th className="py-3 px-3 text-center bg-emerald-50 font-black text-emerald-900">AVG</th>
                <th className="py-3 px-3 text-center">Descriptor</th>
                <th className="py-3 px-3">Honors Award</th>
                <th className="py-3 px-3 text-right">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGrades.map((record) => {
                const isAwardee = record.honors !== null;
                return (
                  <tr 
                    key={record.learnerId} 
                    className={`hover:bg-blue-50/40 transition-colors ${isAwardee ? 'bg-amber-50/20' : ''}`}
                  >
                    <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                      #{record.rank}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                      {record.lrn}
                    </td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">
                      {record.name}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${record.sex === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                        {record.sex}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.filipino}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.english}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.math}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.science}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.ap}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.values}</td>
                    <td className="py-2.5 px-2 text-center font-medium">{record.grades.tle}</td>
                    <td className="py-2.5 px-2 text-center text-slate-600 bg-blue-50/30">{record.grades.music_arts}</td>
                    <td className="py-2.5 px-2 text-center text-slate-600 bg-blue-50/30">{record.grades.pe_health}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-900 bg-blue-100/50">
                      {record.grades.mapeh}
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-emerald-800 bg-emerald-50/70 text-sm">
                      {record.average}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        record.descriptor === 'Advancing' ? 'bg-emerald-100 text-emerald-800' :
                        record.descriptor === 'Benchmarking' ? 'bg-blue-100 text-blue-800' :
                        record.descriptor === 'Connecting' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.descriptor}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {record.honors ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          ★ {record.honors}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => openEdit(record)}
                        className="p-1.5 text-slate-500 hover:text-deped-blue hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Student Grades"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Descriptors & Legend Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-emerald-700 block">Advancing (90-100)</span>
            <span className="text-slate-500 text-[11px]">Exceeds core curriculum benchmarks</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-blue-700 block">Benchmarking (80-89)</span>
            <span className="text-slate-500 text-[11px]">Meets expected grade standard</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-amber-700 block">Connecting (75-79)</span>
            <span className="text-slate-500 text-[11px]">Developing grade competence</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-red-700 block">Developing/Emerging (&lt;75)</span>
            <span className="text-slate-500 text-[11px]">Requires targeted intervention</span>
          </div>
        </div>
      </div>

      {/* Edit Grade Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Update Grades — {editingRecord.name}
                </h2>
                <p className="text-xs text-slate-500">LRN: {editingRecord.lrn} | Grade 7 - ROSAL</p>
              </div>
              <button 
                onClick={() => setEditingRecord(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Filipino</label>
                  <input
                    type="number"
                    value={tempGrades.filipino}
                    onChange={(e) => setTempGrades({ ...tempGrades, filipino: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">English</label>
                  <input
                    type="number"
                    value={tempGrades.english}
                    onChange={(e) => setTempGrades({ ...tempGrades, english: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mathematics</label>
                  <input
                    type="number"
                    value={tempGrades.math}
                    onChange={(e) => setTempGrades({ ...tempGrades, math: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Science</label>
                  <input
                    type="number"
                    value={tempGrades.science}
                    onChange={(e) => setTempGrades({ ...tempGrades, science: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Araling Panlipunan</label>
                  <input
                    type="number"
                    value={tempGrades.ap}
                    onChange={(e) => setTempGrades({ ...tempGrades, ap: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Values Education</label>
                  <input
                    type="number"
                    value={tempGrades.values}
                    onChange={(e) => setTempGrades({ ...tempGrades, values: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">TLE</label>
                  <input
                    type="number"
                    value={tempGrades.tle}
                    onChange={(e) => setTempGrades({ ...tempGrades, tle: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div className="bg-blue-50/60 p-2 rounded-lg border border-blue-200">
                  <label className="block font-semibold text-blue-900 mb-1">Auto MAPEH</label>
                  <div className="text-lg font-black text-blue-900 text-center py-0.5">{modalMapeh}</div>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Music &amp; Arts</label>
                  <input
                    type="number"
                    value={tempGrades.music_arts}
                    onChange={(e) => setTempGrades({ ...tempGrades, music_arts: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">PE &amp; Health</label>
                  <input
                    type="number"
                    value={tempGrades.pe_health}
                    onChange={(e) => setTempGrades({ ...tempGrades, pe_health: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>
              </div>

              {/* Dynamic Live Result Bar */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-medium block">Computed General Average:</span>
                  <span className="text-2xl font-black text-emerald-700">{modalAverage}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-medium block">Performance Level:</span>
                  <span className="font-bold text-slate-800">{modalDescriptor}</span>
                  {modalHonors && (
                    <span className="block text-[11px] font-bold text-amber-700">★ {modalHonors}</span>
                  )}
                </div>
              </div>

              {/* Automated Comments Bank Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700">Teacher&apos;s Remarks / Comment</label>
                  <span className="text-[11px] text-slate-400">Select from DepEd comment bank or type custom</span>
                </div>
                <select
                  value={tempGrades.comment}
                  onChange={(e) => setTempGrades({ ...tempGrades, comment: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-deped-blue/20 mb-2"
                >
                  <option value="">-- Choose automated comment from bank --</option>
                  {commentsBank.map(c => (
                    <option key={c.id} value={c.text}>
                      [{c.tier}] {c.text}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={2}
                  value={tempGrades.comment}
                  onChange={(e) => setTempGrades({ ...tempGrades, comment: e.target.value })}
                  placeholder="Custom comments will appear in SF9 report card..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-deped-blue text-white hover:bg-blue-800 font-semibold shadow-md"
                >
                  Save &amp; Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

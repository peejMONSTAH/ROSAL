'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Learner } from '@/types';
import { PillSearchBar } from '@/components/ui/pill-search-bar';
import { exportSF1ToExcel } from '@/lib/excel-export';
import { 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  X
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { learnerSchema, LearnerFormData } from '@/lib/validations';

function MasterlistContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { learners, addLearner, updateLearner, deleteLearner, schoolProfile } = useStore();

  const [search, setSearch] = useState(initialQuery);
  const [sexFilter, setSexFilter] = useState<'ALL' | 'M' | 'F'>('ALL');
  const [modalityFilter, setModalityFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLearner, setEditingLearner] = useState<Learner | null>(null);

  // Synchronize initial query from URL
  useEffect(() => {
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LearnerFormData>({
    resolver: zodResolver(learnerSchema)
  });

  const openAddModal = () => {
    setEditingLearner(null);
    reset({
      lrn: '',
      lastName: '',
      firstName: '',
      middleName: '',
      extensionName: '',
      sex: 'M',
      birthdate: '2014-01-01',
      age: 12,
      motherTongue: 'Hiligaynon',
      religion: 'Christianity',
      street: '',
      barangay: 'Zone IV (Pob.)',
      city: 'City of Koronadal',
      province: 'South Cotabato',
      fatherName: '',
      motherName: '',
      guardianName: '',
      guardianRelationship: '',
      contactNumber: '09123456789',
      learningModality: 'Face to Face',
      remarks: 'Grade 7'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (learner: Learner) => {
    setEditingLearner(learner);
    reset({
      lrn: learner.lrn,
      lastName: learner.lastName,
      firstName: learner.firstName,
      middleName: learner.middleName,
      extensionName: learner.extensionName || '',
      sex: learner.sex,
      birthdate: learner.birthdate,
      age: learner.age,
      motherTongue: learner.motherTongue,
      religion: learner.religion,
      street: learner.street,
      barangay: learner.barangay,
      city: learner.city,
      province: learner.province,
      fatherName: learner.fatherName,
      motherName: learner.motherName,
      guardianName: learner.guardianName || '',
      guardianRelationship: learner.guardianRelationship || '',
      contactNumber: learner.contactNumber,
      learningModality: learner.learningModality,
      remarks: learner.remarks
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: LearnerFormData) => {
    const fullName = `${data.lastName}, ${data.firstName} ${data.middleName || ''}`.trim();
    if (editingLearner) {
      updateLearner(editingLearner.id, {
        ...data,
        name: fullName
      });
    } else {
      addLearner({
        ...data,
        name: fullName
      });
    }
    setIsModalOpen(false);
  };

  // Filtered learners
  const filteredLearners = useMemo(() => {
    return learners.filter(l => {
      const term = search.toLowerCase();
      const matchesSearch = 
        !term || 
        l.name.toLowerCase().includes(term) ||
        l.lrn.toLowerCase().includes(term) ||
        l.barangay.toLowerCase().includes(term) ||
        l.fatherName.toLowerCase().includes(term) ||
        l.motherName.toLowerCase().includes(term);

      const matchesSex = sexFilter === 'ALL' || l.sex === sexFilter;
      const matchesModality = modalityFilter === 'ALL' || l.learningModality === modalityFilter;

      return matchesSearch && matchesSex && matchesModality;
    });
  }, [learners, search, sexFilter, modalityFilter]);

  const maleCount = learners.filter(l => l.sex === 'M').length;
  const femaleCount = learners.filter(l => l.sex === 'F').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <span>School Form 1 (SF1)</span>
            <span>•</span>
            <span>School Register</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Learner Masterlist
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            {schoolProfile.schoolName} — <strong>{schoolProfile.gradeLevel} - {schoolProfile.section}</strong> (SY {schoolProfile.schoolYear})
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => exportSF1ToExcel(learners, schoolProfile)}
            className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-sm"
          >
            <Download className="h-4 w-4 text-emerald-600" />
            <span>Export SF1 (.xlsx)</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-deped-blue hover:bg-blue-800 rounded-xl transition-all shadow-md shadow-blue-900/20"
          >
            <Plus className="h-4 w-4" />
            <span>Add Learner</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* User reference pill search bar */}
        <div className="w-full md:w-96">
          <PillSearchBar
            value={search}
            onChangeValue={setSearch}
            placeholder="Search item number, position, LRN, learner..."
          />
        </div>

        {/* Filters */}
        <div className="flex items-center flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setSexFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${sexFilter === 'ALL' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              All ({learners.length})
            </button>
            <button
              onClick={() => setSexFilter('M')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${sexFilter === 'M' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-blue-600'}`}
            >
              Male ({maleCount})
            </button>
            <button
              onClick={() => setSexFilter('F')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${sexFilter === 'F' ? 'bg-pink-600 text-white shadow-sm' : 'text-slate-500 hover:text-pink-600'}`}
            >
              Female ({femaleCount})
            </button>
          </div>

          <select
            value={modalityFilter}
            onChange={(e) => setModalityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
          >
            <option value="ALL">All Modalities</option>
            <option value="Face to Face">Face to Face</option>
            <option value="Blended">Blended</option>
          </select>
        </div>
      </div>

      {/* Masterlist Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3.5 w-12 text-center">#</th>
                <th className="py-3 px-3.5">LRN</th>
                <th className="py-3 px-3.5">Learner&apos;s Full Name</th>
                <th className="py-3 px-2 text-center">Sex</th>
                <th className="py-3 px-3">Birthdate</th>
                <th className="py-3 px-2 text-center">Age</th>
                <th className="py-3 px-3">Address (Barangay, City)</th>
                <th className="py-3 px-3">Father&apos;s Name</th>
                <th className="py-3 px-3">Mother&apos;s Name</th>
                <th className="py-3 px-3">Modality</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    No learners found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLearners.map((l, index) => (
                  <tr key={l.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="py-3 px-3.5 text-center font-bold text-slate-400">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-slate-600 font-medium">
                      {l.lrn}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-slate-900">
                      {l.name}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${l.sex === 'M' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                        {l.sex}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {l.birthdate}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-700 font-medium">
                      {l.age}
                    </td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[160px]" title={`${l.barangay}, ${l.city}`}>
                      {l.barangay}, {l.city}
                    </td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[140px]" title={l.fatherName}>
                      {l.fatherName || '—'}
                    </td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[140px]" title={l.motherName}>
                      {l.motherName || '—'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {l.learningModality}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => openEditModal(l)}
                        className="p-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit Learner"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove ${l.name} from the masterlist?`)) {
                            deleteLearner(l.id);
                          }
                        }}
                        className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Learner"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredLearners.length} of {learners.length} enrolled learners</span>
          <span className="text-slate-400">Section: ROSAL</span>
        </div>
      </div>

      {/* Add / Edit Learner Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
              <h2 className="text-lg font-bold text-slate-800">
                {editingLearner ? 'Edit Learner Profile' : 'Register New Learner (SF1)'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Learner Reference Number (LRN)*</label>
                  <input
                    {...register('lrn')}
                    placeholder="12-digit DepEd LRN"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.lrn && <p className="text-red-500 text-[11px] mt-0.5">{errors.lrn.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Sex*</label>
                  <select
                    {...register('sex')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  >
                    <option value="M">Male (M)</option>
                    <option value="F">Female (F)</option>
                  </select>
                  {errors.sex && <p className="text-red-500 text-[11px] mt-0.5">{errors.sex.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name*</label>
                  <input
                    {...register('lastName')}
                    placeholder="e.g. ACIBAR"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.lastName && <p className="text-red-500 text-[11px] mt-0.5">{errors.lastName.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name*</label>
                  <input
                    {...register('firstName')}
                    placeholder="e.g. LOUIE JR."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.firstName && <p className="text-red-500 text-[11px] mt-0.5">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Middle Name</label>
                  <input
                    {...register('middleName')}
                    placeholder="e.g. LAGUNDAY"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Birthdate (YYYY-MM-DD)*</label>
                  <input
                    type="text"
                    {...register('birthdate')}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.birthdate && <p className="text-red-500 text-[11px] mt-0.5">{errors.birthdate.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age as of June*</label>
                  <input
                    type="number"
                    {...register('age')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.age && <p className="text-red-500 text-[11px] mt-0.5">{errors.age.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Barangay*</label>
                  <input
                    {...register('barangay')}
                    placeholder="e.g. Zone IV (Pob.)"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                  {errors.barangay && <p className="text-red-500 text-[11px] mt-0.5">{errors.barangay.message}</p>}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Father&apos;s Name</label>
                  <input
                    {...register('fatherName')}
                    placeholder="Last Name, First Name Middle"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mother&apos;s Maiden Name</label>
                  <input
                    {...register('motherName')}
                    placeholder="Last Name, First Name Middle"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Number</label>
                  <input
                    {...register('contactNumber')}
                    placeholder="0912..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Learning Modality</label>
                  <select
                    {...register('learningModality')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20"
                  >
                    <option value="Face to Face">Face to Face</option>
                    <option value="Blended">Blended</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-5 border-t border-slate-200 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-deped-blue text-white hover:bg-blue-800 font-semibold shadow-md transition-all"
                >
                  {editingLearner ? 'Save Changes' : 'Add Learner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MasterlistPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deped-blue"></div>
      </div>
    }>
      <MasterlistContent />
    </Suspense>
  );
}

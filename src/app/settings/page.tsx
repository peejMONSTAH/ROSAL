'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schoolProfileSchema, SchoolProfileFormData } from '@/lib/validations';
import { Settings, Save, RotateCcw, Database, ShieldCheck, Check, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { schoolProfile, updateSchoolProfile, isDbConnected, isSyncing, refreshFromDatabase, dbError } = useStore();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchoolProfileFormData>({
    resolver: zodResolver(schoolProfileSchema),
    defaultValues: schoolProfile,
  });

  const onSubmit = (data: SchoolProfileFormData) => {
    updateSchoolProfile(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
            <span>System Configuration</span>
            <span>•</span>
            <span>School Setup</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center space-x-2">
            <Settings className="h-6 w-6 text-slate-700" />
            <span>School Profile &amp; Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Customize official school names, signatories, and database parameters.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold animate-fade-in">
            <Check className="h-4 w-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Database & Cloud Platform Status */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-deped-blue flex items-center justify-center shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Database &amp; Cloud Connection</h3>
              <p className="text-xs text-slate-500">PostgreSQL (AWS Southeast Asia) + Supabase + Drizzle ORM</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => refreshFromDatabase()}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-deped-blue hover:bg-blue-50 border border-blue-200 rounded-xl transition-colors shadow-sm disabled:opacity-50"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync with Supabase'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Database Status:</span>
            {isDbConnected ? (
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Connected to Supabase PostgreSQL</span>
              </span>
            ) : dbError ? (
              <span className="inline-flex items-center space-x-1 text-rose-700 font-bold bg-rose-100 px-2.5 py-0.5 rounded-full">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Connection Error</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-amber-700 font-bold bg-amber-100 px-2.5 py-0.5 rounded-full">
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                <span>Connecting...</span>
              </span>
            )}
          </div>
          {dbError && (
            <div className="text-[11px] text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              <span className="font-semibold">Error: </span>{dbError}
            </div>
          )}
          <div className="text-[11px] text-slate-600 grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 border-t border-slate-200">
            <div>
              <span className="font-semibold text-slate-500">Project Endpoint: </span>
              <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">https://dsjjllgiozopdiklwypc.supabase.co</code>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Cluster Region: </span>
              <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">aws-0-ap-southeast-1 (Singapore)</code>
            </div>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed pt-1">
            All data is stored exclusively in your Supabase PostgreSQL database. Tables: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">learners</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">term_grades</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">attendances</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">school_profiles</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">comments_bank</code>.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-xs">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-200 pb-3">
          School &amp; Class Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">School Name*</label>
            <input
              {...register('schoolName')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
            {errors.schoolName && <p className="text-red-500 text-[11px] mt-0.5">{errors.schoolName.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">School ID*</label>
            <input
              {...register('schoolId')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
            {errors.schoolId && <p className="text-red-500 text-[11px] mt-0.5">{errors.schoolId.message}</p>}
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Region*</label>
            <input
              {...register('region')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Division*</label>
            <input
              {...register('division')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">District</label>
            <input
              {...register('district')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">School Year*</label>
            <input
              {...register('schoolYear')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Grade Level*</label>
            <input
              {...register('gradeLevel')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Section*</label>
            <input
              {...register('section')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-bold text-deped-blue"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-slate-700 mb-1">School Physical Address*</label>
            <input
              {...register('schoolAddress')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-800 border-b border-slate-200 pb-3 pt-2">
          Signatories &amp; Officials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Class Adviser Name*</label>
            <input
              {...register('adviserName')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Adviser Designation / Title</label>
            <input
              {...register('adviserTitle')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">School Head / Principal Name*</label>
            <input
              {...register('schoolHeadName')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">School Head Designation</label>
            <input
              {...register('schoolHeadTitle')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Department Head Name</label>
            <input
              {...register('departmentHeadName')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Department Head Designation</label>
            <input
              {...register('departmentHeadTitle')}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-deped-blue/20 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reload all data from the Supabase database? Any unsaved changes will be lost.')) {
                refreshFromDatabase();
              }
            }}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-deped-blue hover:bg-blue-50 border border-blue-200 font-semibold transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Reloading...' : 'Reload from Database'}</span>
          </button>

          <button
            type="submit"
            className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-deped-blue text-white hover:bg-blue-800 font-semibold shadow-md shadow-blue-900/20 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

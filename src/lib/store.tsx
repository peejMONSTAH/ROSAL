'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  Learner, 
  TermGradeRecord, 
  LearnerAttendance, 
  SchoolProfile, 
  CommentBankItem 
} from '@/types';
import { calculateAverage, calculateMapeh, getDescriptor, getHonors } from './deped-calculations';
import { 
  INITIAL_SCHOOL_PROFILE, 
  INITIAL_LEARNERS, 
  INITIAL_TERM1_GRADES, 
  INITIAL_ATTENDANCE, 
  INITIAL_COMMENTS_BANK 
} from '@/lib/seed-data';

// Empty defaults — all real data comes from the database
const EMPTY_PROFILE: SchoolProfile = {
  schoolName: '',
  schoolId: '',
  region: '',
  division: '',
  district: '',
  schoolYear: '',
  gradeLevel: '',
  section: '',
  adviserName: '',
  adviserTitle: '',
  schoolHeadName: '',
  schoolHeadTitle: '',
  departmentHeadName: '',
  departmentHeadTitle: '',
  schoolAddress: '',
};

interface StoreContextType {
  schoolProfile: SchoolProfile;
  setSchoolProfile: React.Dispatch<React.SetStateAction<SchoolProfile>>;
  updateSchoolProfile: (profile: Partial<SchoolProfile>) => void;

  learners: Learner[];
  addLearner: (learner: Omit<Learner, 'id'>) => void;
  updateLearner: (id: string, learner: Partial<Learner>) => void;
  deleteLearner: (id: string) => void;

  term1Grades: TermGradeRecord[];
  updateTerm1Grade: (learnerId: string, updates: Partial<TermGradeRecord['grades']> & { comment?: string }) => void;

  attendance: LearnerAttendance[];
  updateAttendanceMonth: (learnerId: string, month: string, present: number, absent: number) => void;

  commentsBank: CommentBankItem[];
  refreshFromDatabase: () => Promise<void>;
  isHydrated: boolean;
  isSyncing: boolean;
  isDbConnected: boolean;
  dbError: string | null;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true); // start as syncing
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(INITIAL_SCHOOL_PROFILE);
  const [learners, setLearners] = useState<Learner[]>(INITIAL_LEARNERS);
  const [term1Grades, setTerm1Grades] = useState<TermGradeRecord[]>(INITIAL_TERM1_GRADES);
  const [attendance, setAttendance] = useState<LearnerAttendance[]>(INITIAL_ATTENDANCE);
  const [commentsBank, setCommentsBank] = useState<CommentBankItem[]>(INITIAL_COMMENTS_BANK);

  // Fetch all data from Supabase via API routes, with graceful fallback to initial data
  const refreshFromDatabase = useCallback(async () => {
    try {
      setIsSyncing(true);
      setDbError(null);

      const [resLearners, resGrades, resAtt, resProfile, resComments] = await Promise.all([
        fetch('/api/learners').then(r => r.ok ? r.json() : INITIAL_LEARNERS).catch(() => INITIAL_LEARNERS),
        fetch('/api/grades').then(r => r.ok ? r.json() : INITIAL_TERM1_GRADES).catch(() => INITIAL_TERM1_GRADES),
        fetch('/api/attendance').then(r => r.ok ? r.json() : INITIAL_ATTENDANCE).catch(() => INITIAL_ATTENDANCE),
        fetch('/api/school-profile').then(r => r.ok ? r.json() : INITIAL_SCHOOL_PROFILE).catch(() => INITIAL_SCHOOL_PROFILE),
        fetch('/api/comments-bank').then(r => r.ok ? r.json() : INITIAL_COMMENTS_BANK).catch(() => INITIAL_COMMENTS_BANK),
      ]);

      if (Array.isArray(resLearners) && resLearners.length > 0) setLearners(resLearners);
      if (Array.isArray(resGrades) && resGrades.length > 0) setTerm1Grades(resGrades);
      if (Array.isArray(resAtt) && resAtt.length > 0) setAttendance(resAtt);
      if (resProfile && resProfile.schoolName) setSchoolProfile(resProfile);
      if (Array.isArray(resComments) && resComments.length > 0) setCommentsBank(resComments);

      setIsDbConnected(true);
    } catch (err: any) {
      console.warn('Database fetch encountered error, using offline initial records:', err);
      setIsDbConnected(false);
      setDbError(err.message || 'Running in offline mode');
      setLearners(prev => prev.length > 0 ? prev : INITIAL_LEARNERS);
      setTerm1Grades(prev => prev.length > 0 ? prev : INITIAL_TERM1_GRADES);
      setAttendance(prev => prev.length > 0 ? prev : INITIAL_ATTENDANCE);
      setSchoolProfile(prev => prev.schoolName ? prev : INITIAL_SCHOOL_PROFILE);
      setCommentsBank(prev => prev.length > 0 ? prev : INITIAL_COMMENTS_BANK);
    } finally {
      setIsSyncing(false);
      setIsHydrated(true);
    }
  }, []);

  // On mount: load everything from the database
  useEffect(() => {
    refreshFromDatabase();
  }, [refreshFromDatabase]);

  const updateSchoolProfile = (profile: Partial<SchoolProfile>) => {
    const updated = { ...schoolProfile, ...profile };
    setSchoolProfile(updated);

    // Persist to Supabase
    fetch('/api/school-profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch(err => console.error('Failed to save school profile:', err));
  };

  const addLearner = (newLearnerData: Omit<Learner, 'id'>) => {
    const id = `learner-${Date.now()}`;
    const newLearner: Learner = { ...newLearnerData, id };

    // Optimistic UI update
    setLearners(prev => [...prev, newLearner]);

    // Create default grade record
    const defaultGrades = {
      filipino: 85,
      english: 85,
      math: 85,
      science: 85,
      ap: 85,
      values: 85,
      tle: 85,
      music_arts: 85,
      pe_health: 85,
      mapeh: 85,
    };
    const avg = calculateAverage(defaultGrades);

    const newGrade: TermGradeRecord = {
      learnerId: id,
      lrn: newLearner.lrn,
      name: newLearner.name,
      sex: newLearner.sex,
      grades: defaultGrades,
      average: avg,
      rank: term1Grades.length + 1,
      descriptor: getDescriptor(avg),
      honors: getHonors(avg, Object.values(defaultGrades)),
      comment: 'Satisfactory academic progress.',
      coreValues: {
        makaDiyos: 'AO',
        makatao: 'AO',
        makakalikasan: 'AO',
        makabansa: 'AO',
      }
    };
    setTerm1Grades(prev => [...prev, newGrade]);

    // Create default attendance
    const defaultMonthly: Record<string, { present: number; absent: number }> = {
      june: { present: 0, absent: 0 },
      july: { present: 0, absent: 0 },
      aug: { present: 0, absent: 0 },
      sept: { present: 0, absent: 0 },
      oct: { present: 0, absent: 0 },
      nov: { present: 0, absent: 0 },
      dec: { present: 0, absent: 0 },
      jan: { present: 0, absent: 0 },
      feb: { present: 0, absent: 0 },
      mar: { present: 0, absent: 0 },
      apr: { present: 0, absent: 0 },
    };

    const newAttendanceRecord: LearnerAttendance = {
      learnerId: id,
      lrn: newLearner.lrn,
      name: newLearner.name,
      sex: newLearner.sex,
      monthly: defaultMonthly,
      totalSchoolDays: 0,
      totalPresent: 0,
      totalAbsent: 0,
      consecutiveAbsences: 0,
      interventionNeeded: false,
      perfectAttendance: {
        term1: true,
        term2: true,
        term3: true,
      }
    };

    setAttendance(prev => [...prev, newAttendanceRecord]);

    // Persist to Supabase
    fetch('/api/learners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLearner),
    }).catch(err => console.error('Failed to save new learner:', err));

    fetch('/api/grades', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGrade),
    }).catch(err => console.error('Failed to save initial grades:', err));

    fetch('/api/attendance', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAttendanceRecord),
    }).catch(err => console.error('Failed to save initial attendance:', err));
  };

  const updateLearner = (id: string, updates: Partial<Learner>) => {
    setLearners(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
    if (updates.name || updates.lrn || updates.sex) {
      setTerm1Grades(prev => prev.map(g => g.learnerId === id ? {
        ...g,
        name: updates.name || g.name,
        lrn: updates.lrn || g.lrn,
        sex: updates.sex || g.sex,
      } : g));
      setAttendance(prev => prev.map(a => a.learnerId === id ? {
        ...a,
        name: updates.name || a.name,
        lrn: updates.lrn || a.lrn,
        sex: updates.sex || a.sex,
      } : a));
    }

    // Persist to Supabase
    fetch(`/api/learners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    }).catch(err => console.error('Failed to save learner update:', err));
  };

  const deleteLearner = (id: string) => {
    setLearners(prev => prev.filter(l => l.id !== id));
    setTerm1Grades(prev => prev.filter(g => g.learnerId !== id));
    setAttendance(prev => prev.filter(a => a.learnerId !== id));

    // Persist to Supabase
    fetch(`/api/learners/${id}`, {
      method: 'DELETE',
    }).catch(err => console.error('Failed to delete learner:', err));
  };

  const updateTerm1Grade = (learnerId: string, updates: Partial<TermGradeRecord['grades']> & { comment?: string }) => {
    let updatedRecordToSync: TermGradeRecord | null = null;

    setTerm1Grades(prev => {
      const updated = prev.map(record => {
        if (record.learnerId !== learnerId) return record;

        const newGrades = { ...record.grades, ...updates };
        delete (newGrades as any).comment;

        // Auto-recalculate MAPEH
        if (updates.music_arts !== undefined || updates.pe_health !== undefined) {
          newGrades.mapeh = calculateMapeh(newGrades.music_arts, newGrades.pe_health);
        }

        const avg = calculateAverage(newGrades);
        const desc = getDescriptor(avg);
        const honors = getHonors(avg, [
          newGrades.filipino,
          newGrades.english,
          newGrades.math,
          newGrades.science,
          newGrades.ap,
          newGrades.values,
          newGrades.tle,
          newGrades.mapeh
        ]);

        const updatedRecord: TermGradeRecord = {
          ...record,
          grades: newGrades,
          average: avg,
          descriptor: desc,
          honors,
          comment: updates.comment !== undefined ? updates.comment : record.comment,
        };
        updatedRecordToSync = updatedRecord;
        return updatedRecord;
      });

      // Recalculate ranks
      const sorted = [...updated].sort((a, b) => b.average - a.average);
      const ranked = updated.map(record => {
        const rankIndex = sorted.findIndex(s => s.learnerId === record.learnerId);
        return { ...record, rank: rankIndex + 1 };
      });

      // Update sync payload with correct rank
      if (updatedRecordToSync) {
        const matching = ranked.find(r => r.learnerId === learnerId);
        if (matching) {
          updatedRecordToSync = matching;
        }
      }

      return ranked;
    });

    // Persist to Supabase
    if (updatedRecordToSync) {
      fetch('/api/grades', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecordToSync),
      }).catch(err => console.error('Failed to save grades:', err));
    }
  };

  const updateAttendanceMonth = (learnerId: string, month: string, present: number, absent: number) => {
    let updatedAttToSync: LearnerAttendance | null = null;

    setAttendance(prev => prev.map(rec => {
      if (rec.learnerId !== learnerId) return rec;

      const newMonthly = {
        ...rec.monthly,
        [month]: { present, absent }
      };

      let totPres = 0;
      let totAbs = 0;
      let totDays = 0;
      for (const m of Object.keys(newMonthly)) {
        totPres += newMonthly[m].present;
        totAbs += newMonthly[m].absent;
        totDays += (newMonthly[m].present + newMonthly[m].absent);
      }

      const t1Abs = (newMonthly['june']?.absent || 0) + (newMonthly['july']?.absent || 0) + (newMonthly['aug']?.absent || 0) + (newMonthly['sept']?.absent || 0);
      const t2Abs = (newMonthly['oct']?.absent || 0) + (newMonthly['nov']?.absent || 0) + (newMonthly['dec']?.absent || 0);
      const t3Abs = (newMonthly['jan']?.absent || 0) + (newMonthly['feb']?.absent || 0) + (newMonthly['mar']?.absent || 0) + (newMonthly['apr']?.absent || 0);

      const updatedRecord: LearnerAttendance = {
        ...rec,
        monthly: newMonthly,
        totalSchoolDays: totDays,
        totalPresent: totPres,
        totalAbsent: totAbs,
        consecutiveAbsences: totAbs >= 5 ? 5 : 0,
        interventionNeeded: totAbs >= 5,
        perfectAttendance: {
          term1: t1Abs === 0,
          term2: t2Abs === 0,
          term3: t3Abs === 0,
        }
      };
      updatedAttToSync = updatedRecord;
      return updatedRecord;
    }));

    // Persist to Supabase
    if (updatedAttToSync) {
      fetch('/api/attendance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAttToSync),
      }).catch(err => console.error('Failed to save attendance:', err));
    }
  };

  return (
    <StoreContext.Provider
      value={{
        schoolProfile,
        setSchoolProfile,
        updateSchoolProfile,
        learners,
        addLearner,
        updateLearner,
        deleteLearner,
        term1Grades,
        updateTerm1Grade,
        attendance,
        updateAttendanceMonth,
        commentsBank,
        refreshFromDatabase,
        isHydrated,
        isSyncing,
        isDbConnected,
        dbError,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

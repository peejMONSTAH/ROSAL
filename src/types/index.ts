export type Sex = 'M' | 'F';

export interface Learner {
  id: string;
  lrn: string;
  name: string;
  lastName: string;
  firstName: string;
  middleName: string;
  extensionName?: string;
  sex: Sex;
  birthdate: string;
  age: number;
  motherTongue: string;
  religion: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  fatherName: string;
  motherName: string;
  guardianName?: string;
  guardianRelationship?: string;
  contactNumber: string;
  learningModality: string;
  remarks: string;
}

export type SubjectKey = 
  | 'filipino'
  | 'english'
  | 'math'
  | 'science'
  | 'ap'
  | 'values'
  | 'tle'
  | 'music_arts'
  | 'pe_health'
  | 'mapeh';

export interface TermGradeRecord {
  learnerId: string;
  lrn: string;
  name: string;
  sex: Sex;
  grades: {
    filipino: number;
    english: number;
    math: number;
    science: number;
    ap: number;
    values: number;
    tle: number;
    music_arts: number;
    pe_health: number;
    mapeh: number;
  };
  average: number;
  rank: number;
  descriptor: 'Advancing' | 'Benchmarking' | 'Connecting' | 'Developing' | 'Emerging';
  honors?: 'With Honors' | 'With High Honors' | 'With Highest Honors' | null;
  comment?: string;
  coreValues?: {
    makaDiyos: 'AO' | 'SO' | 'RO' | 'NO';
    makatao: 'AO' | 'SO' | 'RO' | 'NO';
    makakalikasan: 'AO' | 'SO' | 'RO' | 'NO';
    makabansa: 'AO' | 'SO' | 'RO' | 'NO';
  };
}

export interface ConsolidatedGradeRecord {
  learnerId: string;
  lrn: string;
  name: string;
  sex: Sex;
  term1: TermGradeRecord;
  term2?: Partial<TermGradeRecord>;
  term3?: Partial<TermGradeRecord>;
  finalAverage: number;
  finalDescriptor: string;
  finalHonors?: string | null;
  promoted: boolean;
}

export interface MonthlyAttendanceRecord {
  month: string;
  monthIndex: number;
  schoolDays: number;
  present: number;
  absent: number;
  tardy?: number;
}

export interface LearnerAttendance {
  learnerId: string;
  lrn: string;
  name: string;
  sex: Sex;
  monthly: Record<string, { present: number; absent: number }>;
  totalSchoolDays: number;
  totalPresent: number;
  totalAbsent: number;
  consecutiveAbsences: number;
  interventionNeeded: boolean;
  perfectAttendance: {
    term1: boolean;
    term2: boolean;
    term3: boolean;
  };
}

export interface SchoolProfile {
  schoolName: string;
  schoolId: string;
  region: string;
  division: string;
  district: string;
  schoolYear: string;
  gradeLevel: string;
  section: string;
  adviserName: string;
  adviserTitle: string;
  schoolHeadName: string;
  schoolHeadTitle: string;
  departmentHeadName: string;
  departmentHeadTitle: string;
  schoolAddress: string;
}

export interface CommentBankItem {
  id: string;
  tier: 'Advancing' | 'Benchmarking' | 'Connecting' | 'Developing';
  text: string;
}

import { z } from 'zod';

export const learnerSchema = z.object({
  lrn: z.string().min(12, 'LRN must be at least 12 digits').max(12, 'LRN must be 12 digits'),
  lastName: z.string().min(1, 'Last name is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional().default(''),
  extensionName: z.string().optional().default(''),
  sex: z.enum(['M', 'F'], { required_error: 'Sex is required' }),
  birthdate: z.string().min(1, 'Birthdate is required'),
  age: z.coerce.number().min(5).max(25),
  motherTongue: z.string().default('Hiligaynon'),
  religion: z.string().default('Christianity'),
  street: z.string().optional().default(''),
  barangay: z.string().min(1, 'Barangay is required'),
  city: z.string().default('City of Koronadal'),
  province: z.string().default('South Cotabato'),
  fatherName: z.string().optional().default(''),
  motherName: z.string().optional().default(''),
  guardianName: z.string().optional().default(''),
  guardianRelationship: z.string().optional().default(''),
  contactNumber: z.string().optional().default(''),
  learningModality: z.string().default('Face to Face'),
  remarks: z.string().optional().default(''),
});

export type LearnerFormData = z.infer<typeof learnerSchema>;

export const gradeEntrySchema = z.object({
  learnerId: z.string(),
  filipino: z.coerce.number().min(60).max(100),
  english: z.coerce.number().min(60).max(100),
  math: z.coerce.number().min(60).max(100),
  science: z.coerce.number().min(60).max(100),
  ap: z.coerce.number().min(60).max(100),
  values: z.coerce.number().min(60).max(100),
  tle: z.coerce.number().min(60).max(100),
  music_arts: z.coerce.number().min(60).max(100),
  pe_health: z.coerce.number().min(60).max(100),
  comment: z.string().optional(),
});

export type GradeEntryFormData = z.infer<typeof gradeEntrySchema>;

export const schoolProfileSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  schoolId: z.string().min(1, 'School ID is required'),
  region: z.string().min(1, 'Region is required'),
  division: z.string().min(1, 'Division is required'),
  district: z.string().optional().default('District IX'),
  schoolYear: z.string().default('2026-2027'),
  gradeLevel: z.string().default('Grade 7'),
  section: z.string().default('ROSAL'),
  adviserName: z.string().min(1, 'Adviser name is required'),
  adviserTitle: z.string().default('Master Teacher II'),
  schoolHeadName: z.string().min(1, 'School head name is required'),
  schoolHeadTitle: z.string().default('Principal IV'),
  departmentHeadName: z.string().optional().default('Mark Anthony M. Ocampo'),
  departmentHeadTitle: z.string().optional().default('OIC, Araling Panlipunan Dept. Head'),
  schoolAddress: z.string().default('Rizal St., Brgy. Zone IV, City of Koronadal'),
});

export type SchoolProfileFormData = z.infer<typeof schoolProfileSchema>;

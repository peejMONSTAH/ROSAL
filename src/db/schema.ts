import { pgTable, text, integer, numeric, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const schoolProfiles = pgTable('school_profiles', {
  id: text('id').primaryKey(),
  schoolName: text('school_name').notNull(),
  schoolId: text('school_id').notNull(),
  region: text('region').notNull(),
  division: text('division').notNull(),
  district: text('district').notNull(),
  schoolYear: text('school_year').notNull(),
  gradeLevel: text('grade_level').notNull(),
  section: text('section').notNull(),
  adviserName: text('adviser_name').notNull(),
  adviserTitle: text('adviser_title').notNull(),
  schoolHeadName: text('school_head_name').notNull(),
  schoolHeadTitle: text('school_head_title').notNull(),
  departmentHeadName: text('department_head_name'),
  departmentHeadTitle: text('department_head_title'),
  schoolAddress: text('school_address').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const learners = pgTable('learners', {
  id: text('id').primaryKey(),
  lrn: text('lrn').notNull().unique(),
  name: text('name').notNull(),
  lastName: text('last_name').notNull(),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name'),
  extensionName: text('extension_name'),
  sex: text('sex').notNull(),
  birthdate: text('birthdate').notNull(),
  age: integer('age').notNull(),
  motherTongue: text('mother_tongue').default('Hiligaynon'),
  religion: text('religion').default('Christianity'),
  street: text('street'),
  barangay: text('barangay').notNull(),
  city: text('city').default('City of Koronadal'),
  province: text('province').default('South Cotabato'),
  fatherName: text('father_name'),
  motherName: text('mother_name'),
  guardianName: text('guardian_name'),
  guardianRelationship: text('guardian_relationship'),
  contactNumber: text('contact_number'),
  learningModality: text('learning_modality').default('Face to Face'),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const termGrades = pgTable('term_grades', {
  id: text('id').primaryKey(),
  learnerId: text('learner_id').references(() => learners.id, { onDelete: 'cascade' }),
  term: integer('term').notNull(),
  filipino: integer('filipino').notNull(),
  english: integer('english').notNull(),
  math: integer('math').notNull(),
  science: integer('science').notNull(),
  ap: integer('ap').notNull(),
  valuesGrade: integer('values_grade').notNull(),
  tle: integer('tle').notNull(),
  musicArts: integer('music_arts').notNull(),
  peHealth: integer('pe_health').notNull(),
  mapeh: integer('mapeh').notNull(),
  average: numeric('average').notNull(),
  rank: integer('rank'),
  descriptor: text('descriptor').notNull(),
  honors: text('honors'),
  comment: text('comment'),
  coreValues: jsonb('core_values'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const attendances = pgTable('attendances', {
  id: text('id').primaryKey(),
  learnerId: text('learner_id').references(() => learners.id, { onDelete: 'cascade' }),
  monthly: jsonb('monthly').notNull(),
  totalSchoolDays: integer('total_school_days').notNull(),
  totalPresent: integer('total_present').notNull(),
  totalAbsent: integer('total_absent').notNull(),
  consecutiveAbsences: integer('consecutive_absences').default(0),
  interventionNeeded: boolean('intervention_needed').default(false),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const learnersRelations = relations(learners, ({ one, many }) => ({
  grades: many(termGrades),
  attendance: one(attendances, {
    fields: [learners.id],
    references: [attendances.learnerId],
  }),
}));

export const termGradesRelations = relations(termGrades, ({ one }) => ({
  learner: one(learners, {
    fields: [termGrades.learnerId],
    references: [learners.id],
  }),
}));

export const attendancesRelations = relations(attendances, ({ one }) => ({
  learner: one(learners, {
    fields: [attendances.learnerId],
    references: [learners.id],
  }),
}));

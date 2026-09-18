const path = require('path');
const fs = require('fs');

// Load pg from local node_modules
const { Client } = require(path.join(__dirname, '../node_modules/pg'));

// Read database URL from .env.local
const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
let dbUrl = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('DATABASE_URL=')) {
    dbUrl = line.replace('DATABASE_URL=', '').trim();
  }
}

console.log('Connecting to Supabase PostgreSQL database...');

const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  console.log('Connected successfully to Supabase PostgreSQL!');

  // Create tables
  console.log('Creating tables...');
  await client.query(`
    CREATE TABLE IF NOT EXISTS school_profiles (
      id TEXT PRIMARY KEY,
      school_name TEXT NOT NULL,
      school_id TEXT NOT NULL,
      region TEXT NOT NULL,
      division TEXT NOT NULL,
      district TEXT NOT NULL,
      school_year TEXT NOT NULL,
      grade_level TEXT NOT NULL,
      section TEXT NOT NULL,
      adviser_name TEXT NOT NULL,
      adviser_title TEXT NOT NULL,
      school_head_name TEXT NOT NULL,
      school_head_title TEXT NOT NULL,
      department_head_name TEXT,
      department_head_title TEXT,
      school_address TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS learners (
      id TEXT PRIMARY KEY,
      lrn TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      first_name TEXT NOT NULL,
      middle_name TEXT,
      extension_name TEXT,
      sex TEXT NOT NULL,
      birthdate TEXT NOT NULL,
      age INTEGER NOT NULL,
      mother_tongue TEXT DEFAULT 'Hiligaynon',
      religion TEXT DEFAULT 'Christianity',
      street TEXT,
      barangay TEXT NOT NULL,
      city TEXT DEFAULT 'City of Koronadal',
      province TEXT DEFAULT 'South Cotabato',
      father_name TEXT,
      mother_name TEXT,
      guardian_name TEXT,
      guardian_relationship TEXT,
      contact_number TEXT,
      learning_modality TEXT DEFAULT 'Face to Face',
      remarks TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS term_grades (
      id TEXT PRIMARY KEY,
      learner_id TEXT REFERENCES learners(id) ON DELETE CASCADE,
      term INTEGER NOT NULL,
      filipino INTEGER NOT NULL,
      english INTEGER NOT NULL,
      math INTEGER NOT NULL,
      science INTEGER NOT NULL,
      ap INTEGER NOT NULL,
      values_grade INTEGER NOT NULL,
      tle INTEGER NOT NULL,
      music_arts INTEGER NOT NULL,
      pe_health INTEGER NOT NULL,
      mapeh INTEGER NOT NULL,
      average NUMERIC NOT NULL,
      rank INTEGER,
      descriptor TEXT NOT NULL,
      honors TEXT,
      comment TEXT,
      core_values JSONB,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS attendances (
      id TEXT PRIMARY KEY,
      learner_id TEXT REFERENCES learners(id) ON DELETE CASCADE,
      monthly JSONB NOT NULL,
      total_school_days INTEGER NOT NULL,
      total_present INTEGER NOT NULL,
      total_absent INTEGER NOT NULL,
      consecutive_absences INTEGER DEFAULT 0,
      intervention_needed BOOLEAN DEFAULT FALSE,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('Tables created or verified.');

  // Clear existing to prevent duplicate errors on fresh seed
  console.log('Seeding initial data...');
  await client.query('DELETE FROM term_grades');
  await client.query('DELETE FROM attendances');
  await client.query('DELETE FROM learners');
  await client.query('DELETE FROM school_profiles');

  // Insert school profile
  await client.query(`
    INSERT INTO school_profiles (
      id, school_name, school_id, region, division, district, school_year,
      grade_level, section, adviser_name, adviser_title, school_head_name,
      school_head_title, department_head_name, department_head_title, school_address
    ) VALUES (
      'primary',
      'Koronadal National Comprehensive High School',
      '304595',
      'Region XII (SOCCSKSARGEN)',
      'City Schools Division of Koronadal',
      'District IX',
      '2026-2027',
      'Grade 7',
      'ROSAL',
      'KATHY ARANDALLO GARCIA',
      'Master Teacher II',
      'MA. FE LITA S. YPARRAGUIRRE',
      'Principal IV',
      'MARK ANTHONY M. OCAMPO',
      'OIC, Araling Panlipunan Dept. Head',
      'Rizal St., Brgy. Zone IV, City of Koronadal'
    );
  `);

  // Read seed-data.ts directly
  const seedFile = fs.readFileSync(path.join(__dirname, '../src/lib/seed-data.ts'), 'utf8');
  
  // Extract json portions
  const learnersMatch = seedFile.match(/export const INITIAL_LEARNERS: Learner\[\] = (\[.*?\]);\n\nexport const INITIAL_TERM1_GRADES/s);
  const gradesMatch = seedFile.match(/export const INITIAL_TERM1_GRADES: TermGradeRecord\[\] = (\[.*?\]);\n\nexport const INITIAL_ATTENDANCE/s);
  const attendanceMatch = seedFile.match(/export const INITIAL_ATTENDANCE: LearnerAttendance\[\] = (\[.*?\]);\n\nexport const INITIAL_COMMENTS_BANK/s);

  const learners = JSON.parse(learnersMatch[1]);
  const grades = JSON.parse(gradesMatch[1]);
  const attendance = JSON.parse(attendanceMatch[1]);

  console.log(`Inserting ${learners.length} learners...`);
  for (const l of learners) {
    await client.query(`
      INSERT INTO learners (
        id, lrn, name, last_name, first_name, middle_name, extension_name,
        sex, birthdate, age, mother_tongue, religion, street, barangay,
        city, province, father_name, mother_name, guardian_name,
        guardian_relationship, contact_number, learning_modality, remarks
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20, $21, $22, $23
      )
    `, [
      l.id, l.lrn, l.name, l.lastName, l.firstName, l.middleName || '', l.extensionName || '',
      l.sex, l.birthdate, l.age, l.motherTongue, l.religion, l.street || '', l.barangay,
      l.city, l.province, l.fatherName || '', l.motherName || '', l.guardianName || '',
      l.guardianRelationship || '', l.contactNumber || '', l.learningModality, l.remarks || ''
    ]);
  }

  console.log(`Inserting ${grades.length} grade records...`);
  for (const g of grades) {
    await client.query(`
      INSERT INTO term_grades (
        id, learner_id, term, filipino, english, math, science, ap,
        values_grade, tle, music_arts, pe_health, mapeh, average,
        rank, descriptor, honors, comment, core_values
      ) VALUES (
        $1, $2, 1, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18
      )
    `, [
      `grade-${g.learnerId}-t1`,
      g.learnerId,
      g.grades.filipino,
      g.grades.english,
      g.grades.math,
      g.grades.science,
      g.grades.ap,
      g.grades.values,
      g.grades.tle,
      g.grades.music_arts,
      g.grades.pe_health,
      g.grades.mapeh,
      g.average,
      g.rank,
      g.descriptor,
      g.honors,
      g.comment || '',
      JSON.stringify(g.coreValues || {})
    ]);
  }

  console.log(`Inserting ${attendance.length} attendance records...`);
  for (const a of attendance) {
    await client.query(`
      INSERT INTO attendances (
        id, learner_id, monthly, total_school_days, total_present,
        total_absent, consecutive_absences, intervention_needed
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8
      )
    `, [
      `att-${a.learnerId}`,
      a.learnerId,
      JSON.stringify(a.monthly),
      a.totalSchoolDays,
      a.totalPresent,
      a.totalAbsent,
      a.consecutiveAbsences,
      a.interventionNeeded
    ]);
  }

  // Verification counts
  const resL = await client.query('SELECT COUNT(*) FROM learners');
  const resG = await client.query('SELECT COUNT(*) FROM term_grades');
  const resA = await client.query('SELECT COUNT(*) FROM attendances');
  const resP = await client.query('SELECT * FROM school_profiles LIMIT 1');

  console.log('\n=== SUPABASE DATABASE SEED COMPLETE ===');
  console.log('Learners in DB:', resL.rows[0].count);
  console.log('Grades in DB:', resG.rows[0].count);
  console.log('Attendances in DB:', resA.rows[0].count);
  console.log('School Profile in DB:', resP.rows[0].school_name, '—', resP.rows[0].section);

  await client.end();
}

run().catch(err => {
  console.error('Error during migration/seeding:', err);
  process.exit(1);
});

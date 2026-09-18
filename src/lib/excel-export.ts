import ExcelJS from 'exceljs';
import { Learner, TermGradeRecord, LearnerAttendance, SchoolProfile } from '@/types';

export async function exportSF1ToExcel(learners: Learner[], profile: SchoolProfile) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('SF1_School_Register');

  // Header Title
  sheet.mergeCells('A1:P1');
  sheet.getCell('A1').value = 'Republic of the Philippines - DEPARTMENT OF EDUCATION';
  sheet.getCell('A1').alignment = { horizontal: 'center' };
  sheet.getCell('A1').font = { bold: true, size: 14 };

  sheet.mergeCells('A2:P2');
  sheet.getCell('A2').value = 'School Form 1 (SF 1) School Register';
  sheet.getCell('A2').alignment = { horizontal: 'center' };
  sheet.getCell('A2').font = { bold: true, size: 12 };

  // Metadata block
  sheet.getCell('A4').value = `School Name: ${profile.schoolName}`;
  sheet.getCell('E4').value = `School ID: ${profile.schoolId}`;
  sheet.getCell('H4').value = `District: ${profile.district}`;
  sheet.getCell('K4').value = `Division: ${profile.division}`;
  sheet.getCell('N4').value = `Region: ${profile.region}`;

  sheet.getCell('A5').value = `Grade Level: ${profile.gradeLevel}`;
  sheet.getCell('E5').value = `Section: ${profile.section}`;
  sheet.getCell('H5').value = `School Year: ${profile.schoolYear}`;
  sheet.getCell('K5').value = `Adviser: ${profile.adviserName}`;

  // Column Headers
  const headers = [
    'LRN',
    'Learner Name (Last, First, Middle)',
    'Sex',
    'Birthdate',
    'Age',
    'Mother Tongue',
    'Religion',
    'Barangay',
    'Municipality/City',
    'Province',
    'Father Name',
    'Mother Name',
    'Guardian',
    'Contact Number',
    'Modality',
    'Remarks'
  ];

  const headerRow = sheet.getRow(7);
  headerRow.values = headers;
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0B3B70' } // DepEd Blue
  };

  // Add Male learners
  const males = learners.filter(l => l.sex === 'M');
  const females = learners.filter(l => l.sex === 'F');

  let currentRowIdx = 8;
  const maleSubheader = sheet.getRow(currentRowIdx++);
  maleSubheader.getCell(2).value = '=== MALE ===';
  maleSubheader.font = { bold: true, italic: true };

  for (const m of males) {
    const row = sheet.getRow(currentRowIdx++);
    row.values = [
      m.lrn,
      m.name,
      m.sex,
      m.birthdate,
      m.age,
      m.motherTongue,
      m.religion,
      m.barangay,
      m.city,
      m.province,
      m.fatherName,
      m.motherName,
      m.guardianName || '',
      m.contactNumber,
      m.learningModality,
      m.remarks
    ];
  }

  const femaleSubheader = sheet.getRow(currentRowIdx++);
  femaleSubheader.getCell(2).value = '=== FEMALE ===';
  femaleSubheader.font = { bold: true, italic: true };

  for (const f of females) {
    const row = sheet.getRow(currentRowIdx++);
    row.values = [
      f.lrn,
      f.name,
      f.sex,
      f.birthdate,
      f.age,
      f.motherTongue,
      f.religion,
      f.barangay,
      f.city,
      f.province,
      f.fatherName,
      f.motherName,
      f.guardianName || '',
      f.contactNumber,
      f.learningModality,
      f.remarks
    ];
  }

  // Adjust column widths
  sheet.columns.forEach(col => {
    col.width = 18;
  });
  sheet.getColumn(2).width = 35; // Name column wider

  // Export buffer & download
  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(buffer, `SF1_${profile.section}_${profile.schoolYear}.xlsx`);
}

export async function exportGradesToExcel(
  grades: TermGradeRecord[], 
  profile: SchoolProfile, 
  termTitle: string
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(termTitle);

  // Title
  sheet.mergeCells('A1:O1');
  sheet.getCell('A1').value = `${profile.schoolName} - ${termTitle.toUpperCase()} GRADES`;
  sheet.getCell('A1').alignment = { horizontal: 'center' };
  sheet.getCell('A1').font = { bold: true, size: 14 };

  sheet.getCell('A3').value = `Grade & Section: ${profile.gradeLevel} - ${profile.section}`;
  sheet.getCell('E3').value = `SY: ${profile.schoolYear}`;
  sheet.getCell('I3').value = `Adviser: ${profile.adviserName}`;

  const headers = [
    'Rank',
    'LRN',
    "Learner's Name",
    'Sex',
    'Filipino',
    'English',
    'Math',
    'Science',
    'AP',
    'Values Ed',
    'TLE',
    'Music & Arts',
    'PE & Health',
    'MAPEH',
    'Average',
    'Descriptor',
    'Academic Honors',
    "Teacher's Remarks"
  ];

  const headerRow = sheet.getRow(5);
  headerRow.values = headers;
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0B3B70' }
  };

  let rowIdx = 6;
  for (const g of grades) {
    const row = sheet.getRow(rowIdx++);
    row.values = [
      g.rank,
      g.lrn,
      g.name,
      g.sex,
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
      g.descriptor,
      g.honors || '',
      g.comment || ''
    ];
  }

  sheet.columns.forEach(col => {
    col.width = 14;
  });
  sheet.getColumn(3).width = 32; // Name column wider
  sheet.getColumn(18).width = 45; // Comments column wider

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(buffer, `${termTitle}_${profile.section}_Grades.xlsx`);
}

function downloadBlob(buffer: ExcelJS.Buffer, filename: string) {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

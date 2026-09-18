import { Learner } from '@/types';
import { INITIAL_LEARNERS } from './seed-data';

export interface StudentVoucher {
  learnerId: string;
  lrn: string;
  name: string;
  voucherCode: string;
  issuedDate: string;
}

/**
 * Generates a consistent, unique, human-friendly voucher code for a learner.
 * Format: ROSAL-[last4LRN]-[2LettersLastName]
 * Example: For Louie Acibar (LRN 136452190313) -> ROSAL-0313-AC
 */
export function getStudentVoucher(learner: { lrn: string; lastName?: string; name?: string; id?: string }): string {
  const cleanLrn = (learner.lrn || '').replace(/\s+/g, '').trim();
  const last4 = cleanLrn.length >= 4 ? cleanLrn.slice(-4) : '0000';
  
  // Extract last name from lastName field or from name string (e.g., "Acibar, Louie" or "Louie Acibar")
  let lastName = learner.lastName || '';
  if (!lastName && learner.name) {
    if (learner.name.includes(',')) {
      lastName = learner.name.split(',')[0].trim();
    } else {
      const parts = learner.name.trim().split(/\s+/);
      lastName = parts[parts.length - 1];
    }
  }

  const cleanName = lastName
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase();
  const nameCode = cleanName.length >= 2 ? cleanName.slice(0, 2) : 'XX';

  return `ROSAL-${last4}-${nameCode}`;
}

export const generateStudentVoucher = getStudentVoucher;

/**
 * Verifies if the provided LRN and Voucher code match any student in the roster.
 * Highly robust against whitespace, hyphens, case, and minor OCR/human typos.
 */
export function verifyStudentVoucher(
  lrnInput: string,
  voucherInput: string,
  learners: Learner[]
): { isValid: boolean; learner: Learner | null; message?: string } {
  const activeLearners = (learners && learners.length > 0) ? learners : INITIAL_LEARNERS;
  const cleanLrn = (lrnInput || '').replace(/[^0-9]/g, '').trim();
  const cleanVoucher = (voucherInput || '').toUpperCase().replace(/[\s\-_]+/g, '').trim();

  if (!cleanLrn && !cleanVoucher) {
    return { isValid: false, learner: null, message: 'Please enter your 12-digit Learner Reference Number (LRN) and Access Voucher.' };
  }

  const learner = activeLearners.find(l => {
    const studentLrn = (l.lrn || '').replace(/[^0-9]/g, '').trim();
    const expectedVoucher = getStudentVoucher(l).toUpperCase().replace(/[\s\-_]+/g, '');
    const voucherSuffix = studentLrn.slice(-4);

    // 1. Exact match on both LRN and expected voucher
    if (studentLrn === cleanLrn && cleanVoucher === expectedVoucher) {
      return true;
    }

    // 2. Voucher code entered matches uniquely (or stripped), and either LRN is exact or ends with the same 4 digits
    if (cleanVoucher === expectedVoucher || (cleanVoucher.length >= 6 && expectedVoucher.includes(cleanVoucher))) {
      if (!cleanLrn || studentLrn === cleanLrn || cleanLrn.endsWith(voucherSuffix)) {
        return true;
      }
      // Tolerance for 1-2 mistyped digits in the 12-digit LRN (e.g. typing 8 instead of 0)
      if (cleanLrn.length >= 10) {
        let diffCount = 0;
        for (let i = 0; i < Math.min(cleanLrn.length, studentLrn.length); i++) {
          if (cleanLrn[i] !== studentLrn[i]) diffCount++;
        }
        if (diffCount <= 2) return true;
      }
    }

    // 3. LRN matches exact, and voucher entered is partial (e.g. ROSAL-0012 or just 0012)
    if (studentLrn === cleanLrn && cleanVoucher.includes(voucherSuffix)) {
      return true;
    }

    return false;
  });

  if (!learner) {
    return {
      isValid: false,
      learner: null,
      message: 'Invalid LRN or Voucher Code. Please verify your credentials or contact your class adviser (Teacher Kathy A. Garcia).'
    };
  }

  return { isValid: true, learner };
}

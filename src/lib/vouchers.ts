import { Learner } from '@/types';

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
 */
export function verifyStudentVoucher(
  lrnInput: string,
  voucherInput: string,
  learners: Learner[]
): { isValid: boolean; learner: Learner | null; message?: string } {
  const cleanLrn = lrnInput.replace(/[^0-9]/g, '').trim();
  const cleanVoucher = voucherInput.toUpperCase().replace(/\s+/g, '').trim();

  if (!cleanLrn) {
    return { isValid: false, learner: null, message: 'Please enter your 12-digit Learner Reference Number (LRN).' };
  }

  if (!cleanVoucher) {
    return { isValid: false, learner: null, message: 'Please enter your unique access voucher code.' };
  }

  const learner = learners.find(l => {
    const lrnMatches = l.lrn.replace(/[^0-9]/g, '').trim() === cleanLrn;
    if (!lrnMatches) return false;

    const expectedVoucher = getStudentVoucher(l).toUpperCase();
    return expectedVoucher === cleanVoucher || cleanVoucher === `ROSAL-${cleanLrn.slice(-4)}`;
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

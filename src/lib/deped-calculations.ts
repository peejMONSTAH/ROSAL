import { TermGradeRecord } from '@/types';

export function calculateMapeh(musicArts: number, peHealth: number): number {
  return Math.round((musicArts + peHealth) / 2);
}

export function calculateAverage(grades: {
  filipino: number;
  english: number;
  math: number;
  science: number;
  ap: number;
  values: number;
  tle: number;
  mapeh: number;
}): number {
  const sum = 
    grades.filipino + 
    grades.english + 
    grades.math + 
    grades.science + 
    grades.ap + 
    grades.values + 
    grades.tle + 
    grades.mapeh;
  return Math.round((sum / 8) * 100) / 100;
}

export function getDescriptor(avg: number): 'Advancing' | 'Benchmarking' | 'Connecting' | 'Developing' | 'Emerging' {
  const rounded = Math.round(avg);
  if (rounded >= 90) return 'Advancing';
  if (rounded >= 80) return 'Benchmarking';
  if (rounded >= 75) return 'Connecting';
  if (rounded >= 65) return 'Developing';
  return 'Emerging';
}

export function getHonors(avg: number, allGrades: number[]): 'With Honors' | 'With High Honors' | 'With Highest Honors' | null {
  // Candidate must have no failing grade (< 75) in any subject
  const hasFailing = allGrades.some(g => g < 75);
  if (hasFailing) return null;

  const rounded = Math.round(avg);
  if (rounded >= 98 && rounded <= 100) return 'With Highest Honors';
  if (rounded >= 95 && rounded <= 97) return 'With High Honors';
  if (rounded >= 90 && rounded <= 94) return 'With Honors';
  return null;
}

export function getRecommendedComment(avg: number, commentsBank: { tier: string; text: string }[]): string {
  const desc = getDescriptor(avg);
  const matched = commentsBank.filter(c => c.tier.toLowerCase() === desc.toLowerCase());
  if (matched.length > 0) {
    return matched[0].text;
  }
  return 'Has made good academic progress this term.';
}

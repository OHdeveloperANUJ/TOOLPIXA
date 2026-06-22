export type GradingScale = 'US_4_0' | 'INDIA_10_O' | 'INDIA_10_S';

export interface Course {
  id?: string;
  name?: string;
  credits: number;
  grade: string;
  isAudit?: boolean;
}

export interface GPAResult {
  totalCredits: number;
  totalGradePoints: number;
  gpa: number;
}

export const scaleMaps: Record<GradingScale, Record<string, number>> = {
  'US_4_0': {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  },
  'INDIA_10_O': {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'P': 4, 'F': 0
  },
  'INDIA_10_S': {
    'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
  }
};

export function calculateGPA(courses: Course[], scale: GradingScale = 'US_4_0'): GPAResult {
  const gradeMap = scaleMaps[scale];
  if (!gradeMap) {
    throw new Error(`Unsupported grading scale: ${scale}`);
  }

  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const course of courses) {
    if (course.isAudit) continue;
    if (course.credits < 0) throw new Error("Credits cannot be negative.");

    const normalizedGrade = course.grade.trim().toUpperCase();
    if (!normalizedGrade) continue; // Skip empty grades

    const gradePoint = gradeMap[normalizedGrade];

    if (gradePoint === undefined) {
      // Ignore invalid grades during calculation so user can type
      continue;
    }

    totalCredits += course.credits;
    totalGradePoints += gradePoint * course.credits;
  }

  const gpa = totalCredits === 0 ? 0 : totalGradePoints / totalCredits;

  return {
    totalCredits,
    totalGradePoints,
    gpa: Math.round(gpa * 100) / 100
  };
}

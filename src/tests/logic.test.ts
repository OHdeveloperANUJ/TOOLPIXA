import { describe, it, expect } from 'vitest';
import { calculateHealthMetrics } from '../utils/bmiLogic';
import { calculateGPA } from '../utils/gpaLogic';
import { processJSON } from '../utils/jsonLogic';
import { convertValue, CATEGORIES } from '../utils/converterLogic';

function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
  if (annualRate === 0) return principal / (tenureYears * 12);
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

function calculateSIP(monthlyInvestment: number, annualRate: number, years: number) {
  const P = monthlyInvestment;
  const r = annualRate / 100 / 12;
  const n = Math.round(years * 12);
  if (P <= 0 || annualRate < 0 || years <= 0) return 0;
  if (r === 0) return P * n;
  const val = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return Math.round(val);
}

function calculateFD(principal: number, annualRate: number, years: number) {
  const P = principal;
  const r = annualRate / 100;
  const t = years;
  const n = 4;
  if (P <= 0 || r < 0 || t <= 0) return 0;
  const val = P * Math.pow(1 + r / n, n * t);
  return Math.round(val);
}

describe('Core Calculator & Utility Logic Suite', () => {
  it('calculates Home & Personal Loan EMI accurately', () => {
    expect(calculateEMI(1000000, 10, 5)).toBe(21247);
    expect(calculateEMI(50000, 12, 2)).toBe(2354);
    expect(calculateEMI(120000, 0, 1)).toBe(10000);
  });

  it('calculates SIP maturity value accurately', () => {
    expect(calculateSIP(5000, 12, 10)).toBe(1161695);
    expect(calculateSIP(10000, 15, 20)).toBe(15159550);
  });

  it('calculates Fixed Deposit quarterly compounding accurately', () => {
    expect(calculateFD(100000, 7, 5)).toBe(141478);
    expect(calculateFD(10000, 6.5, 1)).toBe(10666);
  });

  it('calculates BMI and Health metrics accurately', () => {
    const res = calculateHealthMetrics({
      heightCm: 175,
      weightKg: 70,
      age: 30,
      gender: 'male',
      activityLevel: 1.55,
    });
    expect(res).not.toBeNull();
    expect(res?.bmi).toBe(22.9);
    expect(res?.bmiCategory).toBe('Normal');
  });

  it('calculates GPA accurately', () => {
    const res = calculateGPA([
      { grade: 'A', credits: 4 },
      { grade: 'B', credits: 3 },
    ]);
    expect(res.gpa).toBe(3.57);
    expect(res.totalCredits).toBe(7);
  });

  it('formats JSON cleanly', () => {
    const formatted = processJSON('{"a":1}');
    expect(formatted.isValid).toBe(true);
    expect(formatted.formatted).toContain('"a": 1');
  });

  it('converts Length units accurately', () => {
    const mUnit = CATEGORIES.Length.find((u) => u.id === 'm')!;
    const ftUnit = CATEGORIES.Length.find((u) => u.id === 'ft')!;
    const metersToFeet = convertValue(1, mUnit, ftUnit, 'Length');
    expect(Math.abs(metersToFeet - 3.28084)).toBeLessThan(0.001);
  });
});

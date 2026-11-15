import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateHealthMetrics } from '../utils/bmiLogic';
import { calculateGPA } from '../utils/gpaLogic';
import { processJSON } from '../utils/jsonLogic';
import { convertValue, CATEGORIES } from '../utils/converterLogic';

// Financial math functions
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

test('Home & Personal Loan EMI calculation accuracy', () => {
  assert.equal(calculateEMI(1000000, 10, 5), 21247);
  assert.equal(calculateEMI(50000, 12, 2), 2354);
  assert.equal(calculateEMI(120000, 0, 1), 10000);
});

test('SIP maturity value calculation accuracy', () => {
  assert.equal(calculateSIP(5000, 12, 10), 1161695);
  assert.equal(calculateSIP(10000, 15, 20), 15159550);
});

test('Fixed Deposit (quarterly compounding) calculation accuracy', () => {
  assert.equal(calculateFD(100000, 7, 5), 141478);
  assert.equal(calculateFD(10000, 6.5, 1), 10666);
});

test('BMI and Health metrics utility calculation accuracy', () => {
  const res = calculateHealthMetrics({
    heightCm: 175,
    weightKg: 70,
    age: 30,
    gender: 'male',
    activityLevel: 1.55,
  });
  assert.ok(res !== null);
  assert.equal(res.bmi, 22.9);
  assert.equal(res.bmiCategory, 'Normal');
});

test('GPA utility calculation accuracy', () => {
  const res = calculateGPA([
    { grade: 'A', credits: 4 },
    { grade: 'B', credits: 3 },
  ]);
  assert.equal(res.gpa, 3.57);
  assert.equal(res.totalCredits, 7);
});

test('JSON formatter utility', () => {
  const formatted = processJSON('{"a":1}');
  assert.equal(formatted.isValid, true);
  assert.ok(formatted.formatted?.includes('"a": 1'));
});

test('Unit converter utility', () => {
  const mUnit = CATEGORIES.Length.find((u) => u.id === 'm')!;
  const ftUnit = CATEGORIES.Length.find((u) => u.id === 'ft')!;
  const metersToFeet = convertValue(1, mUnit, ftUnit, 'Length');
  assert.ok(Math.abs(metersToFeet - 3.28084) < 0.001);
});

import { describe, it, expect } from 'vitest';

// 1. Equated Monthly Installment (EMI) Formula
function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
  if (annualRate === 0) return principal / (tenureYears * 12);
  const r = annualRate / 12 / 100;
  const n = tenureYears * 12;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

// 2. Systematic Investment Plan (SIP) Formula
function calculateSIP(monthlyInvestment: number, annualRate: number, years: number) {
  const P = monthlyInvestment;
  const r = annualRate / 100 / 12;
  const n = Math.round(years * 12);
  if (P <= 0 || annualRate < 0 || years <= 0) return 0;
  if (r === 0) return P * n;
  const val = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return Math.round(val);
}

// 3. Fixed Deposit (FD) Formula (Quarterly Compounding)
function calculateFD(principal: number, annualRate: number, years: number) {
  const P = principal;
  const r = annualRate / 100;
  const t = years;
  const n = 4; // Quarterly compounding
  if (P <= 0 || r < 0 || t <= 0) return 0;
  const val = P * Math.pow(1 + r / n, n * t);
  return Math.round(val);
}

// 4. Recurring Deposit (RD) Formula
function calculateRD(monthlyInvestment: number, annualRate: number, years: number) {
  const R = monthlyInvestment;
  const r = annualRate / 100;
  const t = years;
  const i = r / 12;
  const months = t * 12;
  if (R <= 0 || r < 0 || t <= 0) return 0;
  if (i === 0) return R * months;
  const val = R * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  return Math.round(val);
}

// 5. Public Provident Fund (PPF) Formula
function calculatePPF(yearlyInvestment: number, years: number) {
  const P = yearlyInvestment;
  const r = 7.1 / 100; // Fixed PPF rate
  const n = years;
  if (P <= 0 || n <= 0) return 0;
  const val = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  return Math.round(val);
}

// 6. Step-Up SIP Calculation
function calculateStepUpSIP(monthlySIP: number, annualRate: number, years: number, stepUpPercent: number) {
  const P_init = monthlySIP;
  const step = stepUpPercent / 100;
  const r = annualRate / 100 / 12;
  const totalYears = Math.ceil(years);
  
  if (P_init <= 0 || annualRate < 0 || years <= 0) return 0;
  
  let balance = 0;
  for (let y = 1; y <= totalYears; y++) {
    const monthlyContribution = P_init * Math.pow(1 + step, y - 1);
    for (let m = 1; m <= 12; m++) {
      if ((y - 1) * 12 + m > years * 12) break;
      balance = (balance + monthlyContribution) * (1 + r);
    }
  }
  return Math.round(balance);
}

// 7. SIP Delay Cost Calculation
function calculateSIPDelay(monthlySIP: number, annualRate: number, duration: number, delayYears: number) {
  const original = calculateSIP(monthlySIP, annualRate, duration);
  const delayed = calculateSIP(monthlySIP, annualRate, Math.max(0, duration - delayYears));
  return {
    original: Math.round(original),
    delayed: Math.round(delayed),
    cost: Math.round(Math.max(0, original - delayed))
  };
}

// 8. Direct vs Regular Mutual Fund Comparison
function calculateDirectVsRegular(monthlySIP: number, years: number, baseReturn: number, directExpense: number, regularExpense: number) {
  const directRate = baseReturn - directExpense;
  const regularRate = baseReturn - regularExpense;
  
  const directVal = calculateSIP(monthlySIP, directRate, years);
  const regularVal = calculateSIP(monthlySIP, regularRate, years);
  
  return {
    direct: Math.round(directVal),
    regular: Math.round(regularVal),
    difference: Math.round(Math.max(0, directVal - regularVal))
  };
}

describe('Financial Math Verification Suite', () => {
  it('should correctly calculate Home/Personal Loan EMI', () => {
    expect(calculateEMI(1000000, 10, 5)).toBe(21247);
    expect(calculateEMI(50000, 12, 2)).toBe(2354);
    expect(calculateEMI(120000, 0, 1)).toBe(10000);
  });

  it('should correctly calculate SIP Maturity Value', () => {
    expect(calculateSIP(5000, 12, 10)).toBe(1161695);
    expect(calculateSIP(10000, 15, 20)).toBe(15159550);
  });

  it('should correctly calculate FD Maturity Value (Quarterly Compounding)', () => {
    expect(calculateFD(100000, 7, 5)).toBe(141478);
    expect(calculateFD(10000, 6.5, 1)).toBe(10666);
  });

  it('should correctly calculate RD Maturity Value', () => {
    expect(calculateRD(5000, 7, 5)).toBe(360053);
    expect(calculateRD(1000, 6, 2)).toBe(25559);
  });

  it('should correctly calculate PPF Maturity Value', () => {
    expect(calculatePPF(150000, 15)).toBe(4068209);
    expect(calculatePPF(50000, 15)).toBe(1356070);
  });

  it('should correctly calculate Step-Up SIP Maturity Value', () => {
    // 5000 monthly, 12% returns, 10 years, 10% annual step-up
    expect(calculateStepUpSIP(5000, 12, 10, 10)).toBe(1687163);
    // 10000 monthly, 15% returns, 5 years, 5% annual step-up
    expect(calculateStepUpSIP(10000, 15, 5, 5)).toBe(976867);
  });

  it('should correctly calculate SIP Delay impact', () => {
    const res = calculateSIPDelay(5000, 12, 20, 2);
    expect(res.original).toBe(4995740);
    expect(res.delayed).toBe(3827196);
    expect(res.cost).toBe(1168544);
  });

  it('should correctly calculate Direct vs Regular mutual fund wealth gap', () => {
    const res = calculateDirectVsRegular(5000, 20, 12, 0.2, 1.2);
    expect(res.direct).toBe(4862379);
    expect(res.regular).toBe(4253361);
    expect(res.difference).toBe(609018);
  });
});

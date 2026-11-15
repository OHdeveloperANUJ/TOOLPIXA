import React from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/data/toolsRegistry';

const BASE_URL = 'https://www.toolpixa.space';

export interface ComparisonConfig {
  title1: string;
  title2: string;
  seoTitle?: string;
  seoDescription?: string;
  slug1: string;
  slug2: string;
  subtitle1: string;
  subtitle2: string;
  rows: { label: string; icon: string; val1: string; sub1?: string; val2: string; sub2?: string }[];
  verdict1: string;
  verdict2: string;
  faqs?: { q: string; a: string }[];
}

export const PRESET_COMPARISONS: Record<string, ComparisonConfig> = {
  'home-loan-emi-vs-personal-loan-emi': {
    title1: 'Home Loan EMI',
    title2: 'Personal Loan EMI',
    seoTitle: 'Home Loan vs Personal Loan EMI (2026 Rates, Tax Rules & Calculator)',
    seoDescription: 'Compare Home Loan vs Personal Loan interest rates (8.35% vs 11.5%), maximum tenure, Section 24b/80C tax deductions, and monthly EMI tables on ToolPixa.',
    slug1: 'home-loan-emi-calculator',
    slug2: 'personal-loan-emi-calculator',
    subtitle1: 'Secured Long-Term Asset Financing',
    subtitle2: 'Unsecured Rapid Liquidity',
    rows: [
      { label: 'Typical Interest Rate (2026)', icon: 'trending_up', val1: '8.30% – 9.25% p.a.', sub1: 'Lower rate backed by property collateral', val2: '10.75% – 18.00% p.a.', sub2: 'Unsecured credit carries higher risk premium' },
      { label: 'EMI per ₹10 Lakh (5Y vs 20Y)', icon: 'payments', val1: '₹8,584 / month (20Y @ 8.35%)', val2: '₹21,618 / month (5Y @ 10.75%)' },
      { label: 'Maximum Tenure', icon: 'event', val1: 'Up to 30 Years', val2: 'Up to 5 – 7 Years' },
      { label: 'Income Tax Benefits', icon: 'account_balance_wallet', val1: 'Sec 80C (₹1.5L) & Sec 24b (₹2L)', sub1: 'Under Old Tax Regime', val2: 'No standard deduction', sub2: 'Unless used for business/home renovation' },
      { label: 'Processing & Prepayment', icon: 'receipt_long', val1: '0% Foreclosure Fee on Floating Rate', val2: '2% – 4% Foreclosure Penalty' },
    ],
    verdict1: 'Choose a Home Loan or Top-Up Home Loan whenever financing property or home renovation—RBI zero-prepayment rules and 8.35% rates save lakhs in interest.',
    verdict2: 'Choose a Personal Loan only for urgent short-term expenses when collateral is unavailable and you can repay within 12–36 months.',
  },
  'sip-vs-lumpsum': {
    title1: 'Monthly SIP',
    title2: 'Lumpsum Investment',
    seoTitle: 'SIP vs Lumpsum Calculator & 10-15-20 Year Return Comparison (2026)',
    seoDescription: 'Compare ₹10,000 Monthly SIP vs ₹12 Lakh Lumpsum investment across 10, 15, and 20 years at 12%–15% CAGR. See exact rupee-cost averaging vs compounding math.',
    slug1: 'sip-calculator',
    slug2: 'mutual-fund-lumpsum',
    subtitle1: 'Systematic Rupee-Cost Averaging',
    subtitle2: 'Immediate Full-Capital Compounding',
    rows: [
      { label: 'Capital Deployment', icon: 'payments', val1: '₹10,000 / month (₹12L over 10Y)', sub1: 'Automated salary discipline', val2: '₹12,00,000 Day-1 Lumpsum', sub2: '100% capital compounds from Day 1' },
      { label: '10-Year Maturity @ 12% CAGR', icon: 'trending_up', val1: '₹23,23,391', sub1: '₹11.23L wealth gain', val2: '₹37,27,018', sub2: '₹25.27L wealth gain' },
      { label: '15-Year Maturity @ 12% CAGR', icon: 'analytics', val1: '₹50,45,760 (₹18L invested)', val2: '₹65,68,279 (₹12L invested)' },
      { label: '20-Year Maturity @ 12% CAGR', icon: 'monitoring', val1: '₹99,91,479 (₹24L invested)', val2: '₹1,15,75,552 (₹12L invested)' },
      { label: 'Crash Protection', icon: 'security', val1: 'High — buys more units when Nifty drops', val2: 'Low — vulnerable to Day-1 market peaks' },
    ],
    verdict1: 'Choose SIP (or Step-Up SIP) for monthly salary income or when Nifty 50 P/E > 22, deploying windfalls via a 6-month STP.',
    verdict2: 'Choose Lumpsum when you already hold idle cash (bonus/FD maturity), have a 7+ year horizon, and market valuations have corrected 10%+.',
  },
  'ppf-vs-fd': {
    title1: 'Public Provident Fund (PPF)',
    title2: 'Bank Fixed Deposit (FD)',
    seoTitle: 'PPF vs FD Calculator 2026: Post-Tax Returns (7.1% EEE vs Bank FD)',
    seoDescription: 'Compare PPF (7.1% tax-free EEE) vs Bank FD (7.25% taxable) post-tax maturity values for 30% tax bracket investors over 5, 10, and 15 years.',
    slug1: 'ppf-calculator',
    slug2: 'fd-calculator',
    subtitle1: 'Sovereign Tax-Free EEE Compounding',
    subtitle2: 'Flexible Tenure Bank Guarantee',
    rows: [
      { label: 'Headline Interest Rate', icon: 'percent', val1: '7.10% p.a. (Compounded Annually)', val2: '6.75% – 7.40% p.a. (Compounded Quarterly)' },
      { label: 'Effective Post-Tax Yield (30% Slab)', icon: 'account_balance', val1: '7.10% p.a. (100% Tax-Free EEE)', sub1: 'Equivalent to 10.32% pre-tax bank FD', val2: '4.98% p.a. after 31.2% tax', sub2: 'Interest taxed every financial year' },
      { label: '₹1.5L/Yr for 15 Years Maturity', icon: 'payments', val1: '₹40,68,209 (Tax-Free)', val2: '₹33,14,500 (Post-Tax in 30% slab)' },
      { label: 'Lock-in & Liquidity', icon: 'event', val1: '15 Years (partial withdrawal after Yr 7)', val2: '7 Days to 10 Years (instant break with 0.5–1% penalty)' },
      { label: 'Capital Guarantee', icon: 'security', val1: '100% Govt of India Sovereign Guarantee', val2: 'RBI DICGC insured up to ₹5 Lakh per bank' },
    ],
    verdict1: 'Choose PPF for 15-year debt allocation if you are in the 20% or 30% income tax slab—7.1% tax-free beats every taxable bank FD.',
    verdict2: 'Choose Bank FDs for your 6-month emergency fund and short-term 1–3 year goals where instant liquidity is essential.',
  },
  'old-tax-regime-vs-new-tax-regime': {
    title1: 'Old Tax Regime',
    title2: 'New Tax Regime (FY 2025–26)',
    seoTitle: 'Old vs New Tax Regime Calculator FY 2025-26 (₹12.75L Zero Tax Table)',
    seoDescription: 'Compare Old vs New Income Tax Regime for FY 2025-26 (AY 2026-27). See exact tax at ₹10L, ₹12.75L, ₹15L, ₹20L, and ₹25L salary with breakeven deduction math.',
    slug1: 'income-tax-calculator',
    slug2: 'salary-calculator',
    subtitle1: 'Deduction-Driven Tax Optimization',
    subtitle2: '₹12.75L Zero-Tax Salaried Rebate',
    rows: [
      { label: 'Zero-Tax Salaried Limit', icon: 'payments', val1: 'Up to ₹5.50 Lakh gross salary', val2: 'Up to ₹12.75 Lakh gross salary', sub2: '₹12L Sec 87A rebate + ₹75,000 Std Deduction' },
      { label: 'Tax on ₹12.0 Lakh Salary (No 80C)', icon: 'receipt', val1: '₹1,63,800', val2: '₹0 (100% Rebate under Sec 87A)' },
      { label: 'Tax on ₹15.0 Lakh Salary', icon: 'calculate', val1: '₹1,48,200 (with ₹2.5L 80C+80D+HRA)', val2: '₹97,500 (with zero deductions required)' },
      { label: 'Tax on ₹20.0 Lakh Salary', icon: 'analytics', val1: '₹2,73,000 (with ₹3.5L deductions)', val2: '₹1,95,000 (with ₹75k Std Deduction)' },
      { label: 'Breakeven Deduction Needed', icon: 'account_balance_wallet', val1: 'Wins only if deductions > ₹5.25L – ₹6.50L', val2: 'Wins for 90%+ of salaried taxpayers' },
    ],
    verdict1: 'Choose the Old Tax Regime only if you pay high rent (claiming ₹3L+ HRA) PLUS max out 80C (₹1.5L), 80D (₹50k), and Home Loan 24b (₹2L).',
    verdict2: 'Choose the New Tax Regime for FY 2025–26 if your total deductions are below ₹5.5 Lakh—you pay ₹0 tax up to ₹12.75L salaried income.',
  },
  'sbi-vs-hdfc-home-loan-emi': {
    title1: 'SBI Home Loan EMI',
    title2: 'HDFC Home Loan EMI',
    seoTitle: 'SBI vs HDFC Home Loan EMI & Interest Rate Comparison (2026)',
    seoDescription: 'Compare SBI Home Loan (8.35% EBLR) vs HDFC Bank Home Loan (8.45% RLLR) EMI per lakh, processing fees, MaxGain overdraft, and ₹50L 20-year interest cost.',
    slug1: 'home-loan-emi-calculator',
    slug2: 'home-loan-emi-calculator',
    subtitle1: 'Repo-Linked EBLR + MaxGain Overdraft',
    subtitle2: 'Fast Private-Sector Disbursement',
    rows: [
      { label: 'Starting Interest Rate (CIBIL 780+)', icon: 'percent', val1: '8.35% – 9.15% p.a. (EBLR)', val2: '8.40% – 9.30% p.a. (RLLR)' },
      { label: 'EMI per ₹1 Lakh (20 Years)', icon: 'payments', val1: '₹858 / month', val2: '₹861 / month' },
      { label: '₹50 Lakh Loan EMI (20 Years)', icon: 'home_work', val1: '₹42,918 / month (Total Int: ₹53.00L)', val2: '₹43,075 / month (Total Int: ₹53.38L)' },
      { label: 'Overdraft / Saver Facility', icon: 'account_balance_wallet', val1: 'SBI MaxGain (Above ₹20L)', sub1: 'Park surplus cash to cut daily interest', val2: 'HDFC TruFixed / Standard Floating' },
      { label: 'Online Partial Prepayment', icon: 'bolt', val1: 'Instant via SBI YONO (₹0 charge)', val2: 'Via portal/branch request (₹0 charge)' },
    ],
    verdict1: 'Choose SBI if your CIBIL score is 775+ and you want instant ₹0-fee online part-prepayments via YONO or the SBI MaxGain overdraft account.',
    verdict2: 'Choose HDFC if you need faster doorstep legal/technical property verification for builder under-construction projects.',
  },
  '50-lakh-home-loan-emi-10-15-20-years': {
    title1: '₹50 Lakh Loan (15 Years)',
    title2: '₹50 Lakh Loan (20 Years)',
    seoTitle: '50 Lakh Home Loan EMI for 10, 15, 20 & 25 Years (2026 SBI/HDFC Table)',
    seoDescription: 'Exact monthly EMI and total interest for a ₹50 Lakh Home Loan across 10, 15, 20, and 25 years at 8.35%, 8.50%, and 9.00% interest rates.',
    slug1: 'home-loan-emi-calculator',
    slug2: 'sip-calculator',
    subtitle1: 'Save ₹16.2 Lakh in Interest',
    subtitle2: 'Lower Monthly Cashflow Commitment',
    rows: [
      { label: '10-Year Tenure (@ 8.50%)', icon: 'timer', val1: 'EMI: ₹61,993 / month', sub1: 'Total Interest: ₹24,39,141', val2: 'Total Payable: ₹74,39,141', sub2: 'Lowest total interest cost' },
      { label: '15-Year Tenure (@ 8.50%)', icon: 'event', val1: 'EMI: ₹49,237 / month', sub1: 'Total Interest: ₹38,62,656', val2: 'Total Payable: ₹88,62,656', sub2: 'Sweet spot of EMI vs Interest' },
      { label: '20-Year Tenure (@ 8.50%)', icon: 'payments', val1: 'EMI: ₹43,391 / month', sub1: 'Total Interest: ₹54,13,879', val2: 'Total Payable: ₹1,04,13,879', sub2: 'Interest exceeds ₹50L principal!' },
      { label: '25-Year Tenure (@ 8.50%)', icon: 'trending_up', val1: 'EMI: ₹40,261 / month', sub1: 'Total Interest: ₹70,78,408', val2: 'Total Payable: ₹1,20,78,408', sub2: 'Pay 141% extra in interest' },
      { label: '1 Extra EMI/Yr Prepayment Trick', icon: 'bolt', val1: '20Y loan closes in 15Y 10M', val2: 'Saves ₹12,68,000 in interest' },
    ],
    verdict1: 'Choose the 15-Year tenure (₹49,237/mo) if your monthly take-home pay exceeds ₹1.25 Lakh—you save ₹15.51 Lakh in interest compared to 20 years.',
    verdict2: 'Choose the 20-Year tenure (₹43,391/mo) for lower mandatory EMI, and pay 1 extra EMI every year to close the loan in under 16 years.',
  },
  '30-lakh-home-loan-emi-calculator': {
    title1: '₹30 Lakh Loan (15 Years)',
    title2: '₹30 Lakh Loan (20 Years)',
    seoTitle: '30 Lakh Home Loan EMI for 10, 15 & 20 Years (2026 Bank Rate Table)',
    seoDescription: 'Calculate exact monthly EMI for a ₹30 Lakh Home Loan for 10, 15, 20, and 25 years at 8.35%–9.00% interest. Includes prepayment savings breakdown.',
    slug1: 'home-loan-emi-calculator',
    slug2: 'personal-loan-emi-calculator',
    subtitle1: 'Fast Debt-Free Ownership',
    subtitle2: 'Affordable ₹26,035/mo Installment',
    rows: [
      { label: '10-Year Tenure (@ 8.50%)', icon: 'timer', val1: 'EMI: ₹37,196 / month', sub1: 'Total Interest: ₹14,63,485', val2: 'Total Payable: ₹44,63,485' },
      { label: '15-Year Tenure (@ 8.50%)', icon: 'event', val1: 'EMI: ₹29,542 / month', sub1: 'Total Interest: ₹23,17,594', val2: 'Total Payable: ₹53,17,594' },
      { label: '20-Year Tenure (@ 8.50%)', icon: 'payments', val1: 'EMI: ₹26,035 / month', sub1: 'Total Interest: ₹32,48,327', val2: 'Total Payable: ₹62,48,327' },
      { label: '25-Year Tenure (@ 8.50%)', icon: 'trending_up', val1: 'EMI: ₹24,157 / month', sub1: 'Total Interest: ₹42,47,045', val2: 'Total Payable: ₹72,47,045' },
      { label: 'Minimum Salary Needed (50% FOIR)', icon: 'account_balance_wallet', val1: '₹59,000 / month net salary', val2: '₹52,000 / month net salary' },
    ],
    verdict1: 'Picking a 15-Year tenure on ₹30 Lakh costs only ₹3,507/month more than 20 years but saves you ₹9,30,733 in total bank interest.',
    verdict2: 'Pick a 20-Year tenure (₹26,035/mo) if you want maximum cashflow flexibility and invest ₹3,500/month in a 12% Equity SIP alongside.',
  },
  'direct-vs-regular-mutual-fund': {
    title1: 'Direct Mutual Fund Plan',
    title2: 'Regular Mutual Fund Plan',
    seoTitle: 'Direct vs Regular Mutual Fund Calculator: How 1% Commission Costs ₹28 Lakhs',
    seoDescription: 'See how a 1% expense ratio difference between Direct and Regular Mutual Funds reduces your ₹15,000/month SIP corpus by ₹28.4 Lakhs over 20 years.',
    slug1: 'direct-vs-regular-calculator',
    slug2: 'sip-calculator',
    subtitle1: 'Zero Distributor Commission (0.4% TER)',
    subtitle2: 'Trailing Broker Commission (1.5% TER)',
    rows: [
      { label: 'Annual Expense Ratio (TER)', icon: 'percent', val1: '0.35% – 0.65% p.a.', val2: '1.45% – 2.10% p.a.' },
      { label: 'Effective Net CAGR (Gross 13%)', icon: 'trending_up', val1: '12.50% Net CAGR', val2: '11.40% Net CAGR' },
      { label: '₹15,000/mo SIP for 15 Years', icon: 'payments', val1: '₹79,84,210', val2: '₹71,12,450 (Lose ₹8.71 Lakhs)' },
      { label: '₹15,000/mo SIP for 20 Years', icon: 'analytics', val1: '₹1,64,18,900', val2: '₹1,39,82,110 (Lose ₹24.36 Lakhs)' },
      { label: 'Portfolio Portfolio Manager & Stocks', icon: 'verified', val1: '100% Identical Fund Manager & Stocks', val2: '100% Identical Fund Manager & Stocks' },
    ],
    verdict1: 'Always invest in Direct Plans via zero-commission platforms—the underlying stocks and fund manager are 100% identical to Regular plans.',
    verdict2: 'Switch existing Regular Mutual Fund units to Direct systematically using the ₹1.25 Lakh annual LTCG tax-free harvesting limit.',
  },
  '12-lakh-15-lakh-20-lakh-in-hand-salary': {
    title1: '₹12L – ₹15L CTC In-Hand',
    title2: '₹20L – ₹25L CTC In-Hand',
    seoTitle: '12 Lakh, 15 Lakh, 20 Lakh CTC to In-Hand Salary Calculator (FY 2025-26)',
    seoDescription: 'Exact monthly take-home (in-hand) salary for ₹12 Lakh, ₹15 Lakh, ₹20 Lakh, and ₹25 Lakh CTC under the FY 2025-26 New Tax Regime after PF & Professional Tax.',
    slug1: 'salary-calculator',
    slug2: 'income-tax-calculator',
    subtitle1: 'Zero / Low Tax Bracket (New Regime)',
    subtitle2: '20% – 30% Marginal Slab Bracket',
    rows: [
      { label: '₹12.0 Lakh CTC Monthly In-Hand', icon: 'payments', val1: '₹94,200 – ₹96,200 / month', sub1: '₹0 Income Tax (New Regime 87A Rebate)', val2: 'Deductions: ₹3,600 PF + ₹200 PT/mo' },
      { label: '₹15.0 Lakh CTC Monthly In-Hand', icon: 'account_balance_wallet', val1: '₹1,11,500 – ₹1,14,800 / month', sub1: 'Annual Tax: ₹97,500 (₹8,125/mo TDS)', val2: 'Effective Tax Rate: only 6.50%' },
      { label: '₹20.0 Lakh CTC Monthly In-Hand', icon: 'calculate', val1: '₹1,44,800 – ₹1,48,200 / month', sub1: 'Annual Tax: ₹1,95,000 (₹16,250/mo TDS)', val2: 'Effective Tax Rate: only 9.75%' },
      { label: '₹25.0 Lakh CTC Monthly In-Hand', icon: 'trending_up', val1: '₹1,73,500 – ₹1,78,000 / month', sub1: 'Annual Tax: ₹3,35,400 (₹27,950/mo TDS)', val2: 'Effective Tax Rate: 13.41%' },
      { label: 'Employer NPS (Sec 80CCD(2))', icon: 'verified', val1: 'Up to 14% of Basic tax-free in New Regime', val2: 'Saves ₹40,000 – ₹85,000 extra tax/yr' },
    ],
    verdict1: 'At ₹12L–₹12.75L taxable salary, you pay ₹0 income tax under the FY 2025–26 New Regime—taking home nearly 95% of your cash salary.',
    verdict2: 'At ₹15L–₹25L CTC, ask HR to enable Corporate NPS under Sec 80CCD(2) (up to 14% of Basic) to legally reduce tax even inside the New Tax Regime.',
  },
  'vtu-anna-sppu-cbse-cgpa-to-percentage': {
    title1: 'University CGPA Formula',
    title2: 'Equivalent Percentage',
    seoTitle: 'CGPA to Percentage Calculator & Formula Table (CBSE, VTU, Anna, SPPU, GTU)',
    seoDescription: 'Official CGPA to Percentage conversion formulas and 6.0 to 9.5 CGPA reference table for CBSE (×9.5), VTU ((CGPA-0.75)×10), SPPU, Anna University, GTU & Mumbai University.',
    slug1: 'gpa-calculator',
    slug2: 'percentage-calculator',
    subtitle1: 'Official AICTE / University Equations',
    subtitle2: '8.0 CGPA Conversion Examples',
    rows: [
      { label: 'CBSE / Delhi University / UGC Default', icon: 'school', val1: 'Percentage = CGPA × 9.5', val2: '8.0 CGPA = 76.00% | 9.0 CGPA = 85.50%' },
      { label: 'VTU (Visvesvaraya Tech University)', icon: 'calculate', val1: 'Percentage = (CGPA − 0.75) × 10', val2: '8.0 CGPA = 72.50% | 8.75 CGPA = 80.00%' },
      { label: 'GTU / AICTE Standard Formula', icon: 'verified', val1: 'Percentage = (CGPA − 0.50) × 10', val2: '8.0 CGPA = 75.00% | 8.5 CGPA = 80.00%' },
      { label: 'SPPU (Pune University)', icon: 'analytics', val1: 'Percentage = CGPA × 8.8 (or scale table)', val2: '8.0 CGPA = 70.40% – 74.00%' },
      { label: 'Anna University / IITs / NITs', icon: 'star', val1: 'Percentage = CGPA × 10', val2: '8.0 CGPA = 80.00% | 9.2 CGPA = 92.00%' },
    ],
    verdict1: 'Always check the back of your official university transcript—if no formula is printed, AICTE and PSU recruitment boards use Percentage = (CGPA − 0.5) × 10 or × 9.5.',
    verdict2: 'Use our interactive CGPA & Percentage Calculators below to convert semester SGPA, forecast target grades, and verify placement cutoffs.',
  },
  'ssc-upsc-neet-photo-signature-size-20kb-50kb': {
    title1: 'Passport Photo Spec',
    title2: 'Signature & PDF Spec',
    seoTitle: 'SSC, UPSC, IBPS, NEET & JEE Photo & Signature Size (20KB, 50KB, 100KB) Guide',
    seoDescription: 'Official 2026 image KB size, pixel dimensions, and DPI rules for SSC CGL, UPSC IAS, IBPS PO, SBI, NEET, JEE Main, and PAN/Aadhaar uploads with instant resizer tools.',
    slug1: 'compress-image-to-20kb',
    slug2: 'compress-image-to-50kb',
    subtitle1: 'Exact KB & Pixel Dimensions',
    subtitle2: 'Signature & Document Limits',
    rows: [
      { label: 'SSC CGL / CHSL / MTS (2026)', icon: 'photo_size_select_large', val1: 'Photo: 20 KB – 50 KB (3.5cm × 4.5cm)', val2: 'Signature: 10 KB – 20 KB (4.0cm × 2.0cm)' },
      { label: 'UPSC CSE /NDA / CDS', icon: 'verified_user', val1: 'Photo: 20 KB – 300 KB (350×350 to 1000×1000 px)', val2: 'Signature: 20 KB – 300 KB | ID PDF: < 300 KB' },
      { label: 'IBPS PO / Clerk & SBI PO', icon: 'account_balance', val1: 'Photo: 20 KB – 50 KB (200 × 230 pixels)', val2: 'Signature: 10 KB – 20 KB (140 × 60 pixels)' },
      { label: 'NTA NEET UG & JEE Main', icon: 'school', val1: 'Passport Photo: 10 KB – 200 KB (JPG)', val2: 'Signature: 4 KB – 30 KB | Category PDF: 50–300 KB' },
      { label: 'NSDL / UTI PAN Card Portal', icon: 'badge', val1: 'Photo: Under 50 KB (213 × 213 px, 300 DPI)', val2: 'Signature: Under 50 KB (400 × 200 px, 600 DPI)' },
    ],
    verdict1: 'Use our Compress Image to 20KB tool for signatures and IBPS/SSC uploads—100% browser-based so your personal ID photos never leave your device.',
    verdict2: 'Use our Compress Image to 50KB and Compress PDF to 200KB tools for UPSC, NEET, JEE, and PAN portal document submissions.',
  },
  'gold-loan-vs-personal-loan-emi': {
    title1: 'Gold Loan EMI',
    title2: 'Personal Loan EMI',
    seoTitle: 'Gold Loan vs Personal Loan EMI (2026 Interest Rates, RBI 75% LTV & Charges)',
    seoDescription: 'Compare Gold Loan (8.85%–12% interest, RBI 75% LTV, bullet repayment) vs Personal Loan (10.75%–18% interest). Find out which saves more for ₹2L–₹10L borrowing.',
    slug1: 'gold-loan-emi-calculator',
    slug2: 'personal-loan-emi-calculator',
    subtitle1: '22K Gold Collateral (75% RBI LTV)',
    subtitle2: 'No Collateral Required',
    rows: [
      { label: 'Interest Rate Range', icon: 'percent', val1: '8.85% – 13.50% p.a.', sub1: 'Lower rate backed by 22K gold ornaments', val2: '10.75% – 22.00% p.a.', sub2: 'Depends heavily on CIBIL & employer category' },
      { label: 'CIBIL Score Requirement', icon: 'verified', val1: 'None / Low CIBIL accepted', val2: 'Strict 750+ CIBIL required for best rates' },
      { label: 'Repayment Flexibility', icon: 'payments', val1: 'Monthly EMI or Interest-Only Bullet Payment', val2: 'Mandatory fixed monthly EMI only' },
      { label: 'Disbursement Speed', icon: 'bolt', val1: '30 – 45 Minutes at branch after purity check', val2: 'Instant to 48 Hours online' },
      { label: 'Foreclosure Charges', icon: 'receipt_long', val1: '0% after 3–6 months at most banks', val2: '2% – 4% + GST on remaining principal' },
    ],
    verdict1: 'Choose a Bank Gold Loan if you have idle gold jewelry—you get 8.85%–10.5% interest, zero CIBIL hurdles, and zero foreclosure penalty.',
    verdict2: 'Choose a Personal Loan if you do not wish to pledge family gold and have a 760+ credit score with a corporate salary account.',
  },
};

export async function generateStaticParams() {
  return Object.keys(PRESET_COMPARISONS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const preset = PRESET_COMPARISONS[slug.toLowerCase()];
  const title = preset?.seoTitle || (preset
    ? `${preset.title1} vs ${preset.title2} — Side-by-Side Comparison`
    : slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
  const description = preset?.seoDescription || `Compare ${title} side by side: interest rates, formulas, tax benefits, and interactive calculators on ToolPixa.`;
  const canonicalUrl = `${BASE_URL}/compare/${slug.toLowerCase()}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'ToolPixa',
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const preset = PRESET_COMPARISONS[normalizedSlug];

  const rawParts = slug.split('-vs-');
  const slug1 = preset?.slug1 || (toolsRegistry[rawParts[0]] ? rawParts[0] : 'home-loan-emi-calculator');
  const slug2 = preset?.slug2 || (toolsRegistry[rawParts[1]] ? rawParts[1] : 'personal-loan-emi-calculator');

  const tool1 = preset?.title1 || toolsRegistry[slug1]?.title || (rawParts[0] || 'Tool 1').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const tool2 = preset?.title2 || toolsRegistry[slug2]?.title || (rawParts[1] || 'Tool 2').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const rows = preset?.rows || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].rows;
  const verdict1 = preset?.verdict1 || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].verdict1;
  const verdict2 = preset?.verdict2 || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].verdict2;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${BASE_URL}/sitemap` },
          { '@type': 'ListItem', position: 3, name: `${tool1} vs ${tool2}`, item: `${BASE_URL}/compare/${normalizedSlug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Which is better: ${tool1} or ${tool2}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${verdict1} ${verdict2}`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the main difference between ${tool1} and ${tool2}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: rows.map((r) => `${r.label}: ${tool1} offers ${r.val1} whereas ${tool2} offers ${r.val2}.`).join(' '),
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-28 pb-xxxl px-margin max-w-7xl mx-auto">
        <nav className="font-label-md text-xs text-text-secondary mb-md flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/sitemap" className="hover:text-primary transition-colors">Comparisons</Link>
          <span>/</span>
          <span className="text-text-primary">{tool1} vs {tool2}</span>
        </nav>

        <section className="mb-xxl text-left relative">
          <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-text-primary mb-sm leading-tight text-balance">
            {preset?.seoTitle || `${tool1} vs ${tool2}`}
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl">
            {preset?.seoDescription || 'Side-by-side analysis of rates, formulas, tax rules, and best use cases. Make data-driven decisions with instant calculators.'}
          </p>
        </section>

        <section className="mb-xxl overflow-x-auto">
          <div className="min-w-[720px] grid grid-cols-3 gap-px bg-glass-border rounded-2xl border border-glass-border overflow-hidden">
            <div className="bg-surface-container-high p-md flex items-center font-headline-md text-text-primary font-bold">
              Benchmark Parameter
            </div>
            <div className="bg-surface-container-high p-md">
              <h2 className="font-headline-md text-lg font-bold text-primary">{tool1}</h2>
              <p className="text-xs font-label-md text-text-secondary mt-0.5">{preset?.subtitle1 || 'Primary Option'}</p>
            </div>
            <div className="bg-surface-container-high p-md">
              <h2 className="font-headline-md text-lg font-bold text-secondary">{tool2}</h2>
              <p className="text-xs font-label-md text-text-secondary mt-0.5">{preset?.subtitle2 || 'Alternative Option'}</p>
            </div>

            {rows.map((row, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-surface-container p-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-text-secondary text-sm">{row.icon}</span>
                  <span className="font-body-md text-text-primary font-medium">{row.label}</span>
                </div>
                <div className="bg-surface-container-low p-md">
                  <span className="font-code-sm text-text-primary font-semibold text-base tabular-nums">{row.val1}</span>
                  {row.sub1 && <p className="text-xs text-text-secondary mt-1">{row.sub1}</p>}
                </div>
                <div className="bg-surface-container-low p-md">
                  <span className="font-code-sm text-text-primary font-semibold text-base tabular-nums">{row.val2}</span>
                  {row.sub2 && <p className="text-xs text-text-secondary mt-1">{row.sub2}</p>}
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mb-xxl">
          <div className="glass-card p-xl rounded-2xl border border-glass-border">
            <div className="text-xs font-label-md text-primary uppercase tracking-widest mb-2 text-center">
              Precision Verdict &amp; Interactive Calculators
            </div>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-text-primary mb-lg text-center">
              Which Option Saves You More?
            </h2>
            <div className="grid md:grid-cols-2 gap-lg text-left">
              <div className="p-lg bg-surface-container rounded-xl border border-glass-border flex flex-col justify-between">
                <div>
                  <h3 className="text-primary font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span> {tool1}
                  </h3>
                  <p className="text-body-md text-text-secondary leading-relaxed mb-6">
                    {verdict1}
                  </p>
                </div>
                <Link
                  href={`/tools/${slug1}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-all"
                >
                  Open {toolsRegistry[slug1]?.title || tool1} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="p-lg bg-surface-container rounded-xl border border-glass-border flex flex-col justify-between">
                <div>
                  <h3 className="text-secondary font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">bolt</span> {tool2}
                  </h3>
                  <p className="text-body-md text-text-secondary leading-relaxed mb-6">
                    {verdict2}
                  </p>
                </div>
                <Link
                  href={`/tools/${slug2}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-text-primary border border-glass-border font-bold text-sm hover:border-primary transition-all"
                >
                  Open {toolsRegistry[slug2]?.title || tool2} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-Links to All 12 High-Intent Comparison Guides */}
        <section className="pt-xl border-t border-glass-border">
          <h2 className="font-headline-md text-2xl font-bold text-text-primary mb-md">
            More High-Demand Comparisons &amp; Reference Tables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {Object.entries(PRESET_COMPARISONS)
              .filter(([key]) => key !== normalizedSlug)
              .map(([key, item]) => (
                <Link
                  key={key}
                  href={`/compare/${key}`}
                  className="glass-card p-md rounded-xl border border-glass-border hover:border-primary transition-all flex items-center justify-between gap-3 group"
                >
                  <div>
                    <h3 className="font-headline-sm text-sm font-bold text-text-primary group-hover:text-primary transition-colors">
                      {item.title1} vs {item.title2}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
                      {item.subtitle1} · {item.subtitle2}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-primary shrink-0">arrow_forward</span>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}

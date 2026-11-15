export interface ProgrammaticTable {
  heading: string;
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface ProgrammaticFaq {
  question: string;
  answer: string;
}

export interface ProgrammaticPageData {
  slug: string;
  category: 'home-loan' | 'salary' | 'fd' | 'sip' | 'cgpa' | 'loan' | 'exam';
  title: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  subtitle: string;
  summaryHighlight: { label: string; value: string; sub: string }[];
  toolSlug: string;
  primaryTable: ProgrammaticTable;
  secondaryTable: ProgrammaticTable;
  keyTakeaways: string[];
  faqs: ProgrammaticFaq[];
}

function fmtINR(num: number): string {
  return '₹' + Math.round(num).toLocaleString('en-IN');
}

function calcEmi(p: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function calcSip(monthly: number, annualRate: number, years: number): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function generatePages(): Record<string, ProgrammaticPageData> {
  const map: Record<string, ProgrammaticPageData> = {};

  // 1. HOME LOAN EMI BY AMOUNT (17 pages)
  const homeLoanAmounts = [
    { slugAmt: '10-lakh', label: '₹10 Lakh', rupees: 1000000 },
    { slugAmt: '15-lakh', label: '₹15 Lakh', rupees: 1500000 },
    { slugAmt: '20-lakh', label: '₹20 Lakh', rupees: 2000000 },
    { slugAmt: '25-lakh', label: '₹25 Lakh', rupees: 2500000 },
    { slugAmt: '30-lakh', label: '₹30 Lakh', rupees: 3000000 },
    { slugAmt: '35-lakh', label: '₹35 Lakh', rupees: 3500000 },
    { slugAmt: '40-lakh', label: '₹40 Lakh', rupees: 4000000 },
    { slugAmt: '45-lakh', label: '₹45 Lakh', rupees: 4500000 },
    { slugAmt: '50-lakh', label: '₹50 Lakh', rupees: 5000000 },
    { slugAmt: '60-lakh', label: '₹60 Lakh', rupees: 6000000 },
    { slugAmt: '70-lakh', label: '₹70 Lakh', rupees: 7000000 },
    { slugAmt: '75-lakh', label: '₹75 Lakh', rupees: 7500000 },
    { slugAmt: '80-lakh', label: '₹80 Lakh', rupees: 8000000 },
    { slugAmt: '90-lakh', label: '₹90 Lakh', rupees: 9000000 },
    { slugAmt: '1-crore', label: '₹1 Crore', rupees: 10000000 },
    { slugAmt: '1-5-crore', label: '₹1.5 Crore', rupees: 15000000 },
    { slugAmt: '2-crore', label: '₹2 Crore', rupees: 20000000 },
  ];

  for (const item of homeLoanAmounts) {
    const slug = `${item.slugAmt}-home-loan-emi`;
    const emi10 = calcEmi(item.rupees, 8.5, 10);
    const emi15 = calcEmi(item.rupees, 8.5, 15);
    const emi20 = calcEmi(item.rupees, 8.5, 20);
    const emi25 = calcEmi(item.rupees, 8.5, 25);
    const emi30 = calcEmi(item.rupees, 8.5, 30);

    const tenures = [5, 10, 15, 20, 25, 30];
    const tenureRows = tenures.map((yr) => {
      const mEmi = calcEmi(item.rupees, 8.5, yr);
      const totalPay = mEmi * yr * 12;
      const totalInt = totalPay - item.rupees;
      return [
        `${yr} Years (${yr * 12} Months)`,
        `${fmtINR(mEmi)} / mo`,
        fmtINR(totalInt),
        fmtINR(totalPay),
      ];
    });

    const banks = [
      { name: 'SBI Home Loan (EBLR)', rate: 8.35 },
      { name: 'HDFC Bank Home Loan', rate: 8.45 },
      { name: 'ICICI Bank Home Loan', rate: 8.50 },
      { name: 'Bank of Baroda Home Loan', rate: 8.35 },
      { name: 'Axis Bank Home Loan', rate: 8.60 },
      { name: 'Kotak Mahindra Bank', rate: 8.55 },
      { name: 'LIC Housing Finance', rate: 8.40 },
    ];
    const bankRows = banks.map((b) => [
      b.name,
      `${b.rate.toFixed(2)}% p.a.`,
      fmtINR(calcEmi(item.rupees, b.rate, 15)),
      fmtINR(calcEmi(item.rupees, b.rate, 20)),
      fmtINR(calcEmi(item.rupees, b.rate, 20) * 240 - item.rupees),
    ]);

    map[slug] = {
      slug,
      category: 'home-loan',
      title: `${item.label} Home Loan EMI`,
      seoTitle: `${item.label} Home Loan EMI for 10, 15, 20, 25 & 30 Years (2026 SBI & HDFC Table)`,
      seoDescription: `Calculate exact monthly EMI for a ${item.label} Home Loan: ${fmtINR(emi20)}/mo for 20 years, ${fmtINR(emi15)}/mo for 15 years, and ${fmtINR(emi10)}/mo for 10 years at 8.50% p.a. Includes SBI, HDFC & ICICI breakdown.`,
      h1: `${item.label} Home Loan EMI — 10, 15, 20, 25 & 30 Year Breakdown`,
      subtitle: `For a ${item.label} (${fmtINR(item.rupees)}) home loan at 8.50% interest, your monthly EMI is ${fmtINR(emi20)} for 20 years or ${fmtINR(emi15)} for 15 years. Explore tenure-wise interest and bank comparisons below.`,
      summaryHighlight: [
        { label: '20-Year Monthly EMI', value: fmtINR(emi20), sub: `@ 8.50% p.a. (Total Int: ${fmtINR(emi20 * 240 - item.rupees)})` },
        { label: '15-Year Monthly EMI', value: fmtINR(emi15), sub: `Saves ${fmtINR(emi20 * 240 - emi15 * 180)} vs 20Y` },
        { label: '10-Year Monthly EMI', value: fmtINR(emi10), sub: `Fastest debt-free payoff` },
        { label: 'Min. Net Salary Required', value: fmtINR(emi20 * 2), sub: `Assuming 50% bank FOIR limit` },
      ],
      toolSlug: 'home-loan-emi-calculator',
      primaryTable: {
        heading: `${item.label} Home Loan EMI Across 5 to 30 Year Tenures (@ 8.50% p.a.)`,
        caption: `Complete amortization summary showing monthly EMI, total interest outgo, and total amount payable for a ${item.label} housing loan.`,
        headers: ['Loan Tenure', 'Monthly EMI', 'Total Interest Payable', 'Total Repayment (Principal + Interest)'],
        rows: tenureRows,
      },
      secondaryTable: {
        heading: `${item.label} Home Loan EMI Across Major Indian Banks (2026 Rates)`,
        caption: `Comparison of 15-year and 20-year monthly EMIs on a ${item.label} loan across SBI, HDFC, ICICI, BoB, Axis, and Kotak.`,
        headers: ['Bank / Lender', 'Interest Rate', '15-Year EMI', '20-Year EMI', '20-Year Total Interest'],
        rows: bankRows,
      },
      keyTakeaways: [
        `Choosing a 15-year tenure (${fmtINR(emi15)}/mo) instead of a 20-year tenure (${fmtINR(emi20)}/mo) on a ${item.label} loan increases your monthly EMI by ${fmtINR(emi15 - emi20)}, but saves you ${fmtINR(emi20 * 240 - emi15 * 180)} in total bank interest.`,
        `To qualify for a ${item.label} home loan with a 20-year tenure, banks typically require a minimum net monthly in-hand salary (or combined family income) of ${fmtINR(emi20 * 2)} to keep your Fixed Obligation to Income Ratio (FOIR) under 50%.`,
        `Paying just 1 extra EMI (${fmtINR(emi20)}) every year towards principal prepayment reduces a 20-year ${item.label} loan to ~15 years and 10 months, saving ${fmtINR((emi20 * 240 - item.rupees) * 0.235)} in interest with zero RBI foreclosure charges.`,
      ],
      faqs: [
        {
          question: `What is the monthly EMI for a ${item.label} home loan for 20 years?`,
          answer: `At an interest rate of 8.50% p.a., the monthly EMI for a ${item.label} home loan over 20 years (240 months) is ${fmtINR(emi20)}. Over 20 years, you will pay ${fmtINR(emi20 * 240 - item.rupees)} in total interest and ${fmtINR(emi20 * 240)} in total repayment.`,
        },
        {
          question: `What is the EMI for a ${item.label} home loan for 10, 15, and 30 years?`,
          answer: `At 8.50% p.a., a ${item.label} home loan costs ${fmtINR(emi10)}/month for 10 years, ${fmtINR(emi15)}/month for 15 years, ${fmtINR(emi25)}/month for 25 years, and ${fmtINR(emi30)}/month for 30 years.`,
        },
        {
          question: `How much salary is required for a ${item.label} home loan in India?`,
          answer: `Most Indian banks (SBI, HDFC, ICICI) allow up to 50% of your net monthly take-home pay towards EMIs. For a 20-year ${item.label} loan (EMI ${fmtINR(emi20)}), you need a net monthly salary of around ${fmtINR(emi20 * 2)} (single or joint applicant).`,
        },
        {
          question: `How can I reduce the interest on my ${item.label} home loan?`,
          answer: `You can save over 23% of total interest on your ${item.label} home loan by making 1 extra EMI prepayment per year and increasing your EMI by 5% annually as your salary grows.`,
        },
      ],
    };
  }

  // 2. CTC TO MONTHLY IN-HAND SALARY FY 2025-26 (22 pages)
  const salaryLpas = [4, 5, 6, 7, 8, 9, 10, 11, 12, 12.75, 13, 14, 15, 16, 18, 20, 22, 24, 25, 30, 40, 50];

  function calcNewRegimeTax2526(grossSalary: number): number {
    const taxable = Math.max(0, grossSalary - 75000);
    if (taxable <= 1200000) return 0; // Sec 87A Rebate up to 12L taxable (12.75L gross)
    let tax = 0;
    const slabs = [
      { min: 400000, max: 800000, rate: 0.05 },
      { min: 800000, max: 1200000, rate: 0.10 },
      { min: 1200000, max: 1600000, rate: 0.15 },
      { min: 1600000, max: 2000000, rate: 0.20 },
      { min: 2000000, max: 2400000, rate: 0.25 },
      { min: 2400000, max: Infinity, rate: 0.30 },
    ];
    for (const s of slabs) {
      if (taxable > s.min) {
        tax += (Math.min(taxable, s.max) - s.min) * s.rate;
      }
    }
    // Marginal relief around 12L taxable
    const excessOver12L = taxable - 1200000;
    if (tax > excessOver12L && taxable <= 1275000) {
      tax = excessOver12L;
    }
    return Math.round(tax * 1.04); // 4% Health & Education Cess
  }

  function calcOldRegimeTax(grossSalary: number, deductions: number): number {
    const taxable = Math.max(0, grossSalary - 50000 - deductions);
    if (taxable <= 500000) return 0;
    let tax = 0;
    if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
    return Math.round(tax * 1.04);
  }

  for (const lpa of salaryLpas) {
    const slugAmt = String(lpa).replace('.', '-');
    const slug = `${slugAmt}-lakh-in-hand-salary`;
    const ctc = Math.round(lpa * 100000);
    const basic = Math.round(ctc * 0.40);
    const hra = Math.round(basic * 0.50);
    const employerPf = Math.min(Math.round(basic * 0.12), 21600 * 2); // standard 12% basic or capped
    const employeePf = employerPf;
    const gratuity = Math.round(basic * 0.0481);
    const grossCashSalary = ctc - employerPf - gratuity;
    const annualNewTax = calcNewRegimeTax2526(grossCashSalary);
    const annualOldTax = calcOldRegimeTax(grossCashSalary, 200000); // assuming 1.5L 80C + 50k 80D
    const profTaxAnnual = 2400;
    const annualNetNew = grossCashSalary - employeePf - profTaxAnnual - annualNewTax;
    const monthlyInHandNew = Math.round(annualNetNew / 12);
    const monthlyInHandFixedPf = Math.round((ctc - 21600 - 21600 - gratuity - profTaxAnnual - calcNewRegimeTax2526(ctc - 21600 - gratuity)) / 12);

    map[slug] = {
      slug,
      category: 'salary',
      title: `₹${lpa} Lakh CTC to In-Hand Salary`,
      seoTitle: `₹${lpa} Lakh (${lpa} LPA) In-Hand Salary Per Month in India (FY 2025-26 New Tax Regime)`,
      seoDescription: `What is the monthly in-hand salary for ₹${lpa} Lakh CTC (${lpa} LPA)? Take-home pay is ${fmtINR(monthlyInHandNew)} to ${fmtINR(monthlyInHandFixedPf)}/month after PF, Professional Tax, and FY 2025-26 New Regime Income Tax (${fmtINR(annualNewTax)}/yr).`,
      h1: `₹${lpa} Lakh (${lpa} LPA) CTC to Monthly In-Hand Salary — FY 2025–26 Breakdown`,
      subtitle: `For an annual package of ₹${lpa} Lakh per annum (${fmtINR(ctc)} CTC), your net monthly take-home (in-hand) salary is ${fmtINR(monthlyInHandNew)} to ${fmtINR(monthlyInHandFixedPf)} under the FY 2025–26 New Tax Regime.`,
      summaryHighlight: [
        { label: 'Monthly In-Hand (12% Basic PF)', value: fmtINR(monthlyInHandNew), sub: `${fmtINR(annualNetNew)} / year net take-home` },
        { label: 'Monthly In-Hand (Capped ₹1,800 PF)', value: fmtINR(monthlyInHandFixedPf), sub: `When EPF is capped at ₹1,800/mo` },
        { label: 'FY 2025-26 New Regime Tax', value: fmtINR(annualNewTax), sub: `${fmtINR(Math.round(annualNewTax / 12))}/mo TDS (incl. 4% Cess)` },
        { label: 'Effective Income Tax Rate', value: `${((annualNewTax / ctc) * 100).toFixed(1)}%`, sub: `After ₹75,000 Standard Deduction` },
      ],
      toolSlug: 'salary-calculator',
      primaryTable: {
        heading: `₹${lpa} LPA CTC to Monthly & Annual Salary Slip Breakdown (FY 2025–26)`,
        caption: `Component-by-component breakdown of a ₹${lpa} Lakh CTC offer letter into Basic, HRA, PF, Gratuity, TDS, and Net In-Hand Pay.`,
        headers: ['Salary Component', 'Annual Amount', 'Monthly Amount', 'Notes / Tax Treatment'],
        rows: [
          ['Total Cost to Company (CTC)', fmtINR(ctc), fmtINR(ctc / 12), '100% Headline Package'],
          ['Basic Salary (40% of CTC)', fmtINR(basic), fmtINR(basic / 12), 'Fully Taxable Core Pay'],
          ['House Rent Allowance (HRA)', fmtINR(hra), fmtINR(hra / 12), '50% of Basic Salary'],
          ['Special & Flexible Allowances', fmtINR(grossCashSalary - basic - hra), fmtINR((grossCashSalary - basic - hra) / 12), 'Books, Broadband, Special Pay'],
          ['Gross Taxable Cash Salary', fmtINR(grossCashSalary), fmtINR(grossCashSalary / 12), 'Before ₹75,000 Standard Deduction'],
          ['Employee EPF Deduction (12%)', `− ${fmtINR(employeePf)}`, `− ${fmtINR(employeePf / 12)}`, 'Credited to your EPFO account'],
          ['Employer PF + Gratuity (CTC Part)', `− ${fmtINR(employerPf + gratuity)}`, `− ${fmtINR((employerPf + gratuity) / 12)}`, 'Retiral benefits inside CTC'],
          ['Professional Tax (PT)', `− ${fmtINR(profTaxAnnual)}`, '− ₹200', 'Standard State PT Deduction'],
          ['Income Tax (FY 2025-26 New Regime)', `− ${fmtINR(annualNewTax)}`, `− ${fmtINR(annualNewTax / 12)}`, annualNewTax === 0 ? '₹0 Tax via Sec 87A Rebate!' : 'Includes 4% Health & Edu Cess'],
          ['Net Take-Home (In-Hand) Salary', fmtINR(annualNetNew), fmtINR(monthlyInHandNew), 'Credited to your bank account'],
        ],
      },
      secondaryTable: {
        heading: `Old vs New Tax Regime Comparison on ₹${lpa} Lakh Package (FY 2025–26)`,
        caption: `Side-by-side comparison of tax outgo and monthly in-hand pay on a ₹${lpa} LPA salary.`,
        headers: ['Tax Metric', 'New Tax Regime (FY 2025-26)', 'Old Tax Regime (with ₹2L 80C+80D)'],
        rows: [
          ['Standard Deduction', '₹75,000', '₹50,000'],
          ['Net Taxable Income', fmtINR(Math.max(0, grossCashSalary - 75000)), fmtINR(Math.max(0, grossCashSalary - 250000))],
          ['Annual Income Tax + 4% Cess', fmtINR(annualNewTax), fmtINR(annualOldTax)],
          ['Monthly TDS Deduction', fmtINR(annualNewTax / 12), fmtINR(annualOldTax / 12)],
          ['Monthly In-Hand Salary', fmtINR(monthlyInHandNew), fmtINR(monthlyInHandNew + (annualNewTax - annualOldTax) / 12)],
        ],
      },
      keyTakeaways: [
        `On a ₹${lpa} Lakh CTC (${lpa} LPA), your monthly in-hand bank credit is ${fmtINR(monthlyInHandNew)} (if your company deducts 12% of Basic as PF) or ${fmtINR(monthlyInHandFixedPf)} (if your company caps PF at the statutory ₹1,800/month).`,
        annualNewTax === 0
          ? `Because your net taxable salary after the ₹75,000 Standard Deduction is within the ₹12.0 Lakh limit under the FY 2025–26 New Tax Regime, you get a 100% Section 87A tax rebate and pay ₹0 income tax!`
          : `Under the updated FY 2025–26 New Tax Regime slabs, your annual tax on ₹${lpa} LPA is ${fmtINR(annualNewTax)} (${fmtINR(annualNewTax / 12)}/month), saving you ${fmtINR(Math.max(0, annualOldTax - annualNewTax))} per year compared to the Old Regime.`,
        `Total forced monthly savings into your EPF retirement corpus (Employee + Employer PF) equal ${fmtINR((employeePf + employerPf) / 12)}/month, which earns 8.25% tax-free interest.`,
      ],
      faqs: [
        {
          question: `How much is ₹${lpa} LPA in-hand salary per month in India?`,
          answer: `For a ₹${lpa} LPA (₹${lpa} Lakh CTC) fixed package in FY 2025–26, the monthly in-hand salary is ${fmtINR(monthlyInHandNew)} with standard 12% Basic EPF, or ${fmtINR(monthlyInHandFixedPf)} if EPF is capped at ₹1,800/month.`,
        },
        {
          question: `How much income tax do I pay on a ₹${lpa} Lakh salary in FY 2025–26?`,
          answer: `Under the FY 2025–26 New Tax Regime (with ₹75,000 Standard Deduction), the total annual income tax on a ₹${lpa} Lakh package is ${fmtINR(annualNewTax)} (or ${fmtINR(annualNewTax / 12)} per month).`,
        },
        {
          question: `Which tax regime is better for a ₹${lpa} Lakh salary?`,
          answer: `For a ₹${lpa} Lakh package, the New Tax Regime results in ${fmtINR(annualNewTax)} annual tax with zero investment proof required, whereas the Old Regime with ₹2 Lakh deductions results in ${fmtINR(annualOldTax)} tax.`,
        },
      ],
    };
  }

  // 3. FD MONTHLY INTEREST & MATURITY BY AMOUNT (12 pages)
  const fdAmounts = [
    { slugAmt: '1-lakh', label: '₹1 Lakh', rupees: 100000 },
    { slugAmt: '2-lakh', label: '₹2 Lakh', rupees: 200000 },
    { slugAmt: '3-lakh', label: '₹3 Lakh', rupees: 300000 },
    { slugAmt: '5-lakh', label: '₹5 Lakh', rupees: 500000 },
    { slugAmt: '10-lakh', label: '₹10 Lakh', rupees: 1000000 },
    { slugAmt: '15-lakh', label: '₹15 Lakh', rupees: 1500000 },
    { slugAmt: '20-lakh', label: '₹20 Lakh', rupees: 2000000 },
    { slugAmt: '25-lakh', label: '₹25 Lakh', rupees: 2500000 },
    { slugAmt: '30-lakh', label: '₹30 Lakh', rupees: 3000000 },
    { slugAmt: '50-lakh', label: '₹50 Lakh', rupees: 5000000 },
    { slugAmt: '75-lakh', label: '₹75 Lakh', rupees: 7500000 },
    { slugAmt: '1-crore', label: '₹1 Crore', rupees: 10000000 },
  ];

  for (const item of fdAmounts) {
    const slug = `${item.slugAmt}-fd-interest-per-month`;
    const monthlyGeneral = (item.rupees * 0.071) / 12;
    const monthlySenior = (item.rupees * 0.076) / 12;
    const monthlyPostOffice = (item.rupees * 0.075) / 12;

    const bankFdList = [
      { bank: 'SBI Fixed Deposit (Amrit Vrishti)', gen: 7.10, sr: 7.60 },
      { bank: 'HDFC Bank Fixed Deposit', gen: 7.25, sr: 7.75 },
      { bank: 'ICICI Bank Golden Years FD', gen: 7.20, sr: 7.70 },
      { bank: 'Post Office Time Deposit (5Y) / MIS', gen: 7.40, sr: 8.20 },
      { bank: 'Axis Bank Fixed Deposit', gen: 7.25, sr: 7.85 },
      { bank: 'Small Finance Banks (AU / Equitas)', gen: 8.00, sr: 8.50 },
    ];

    const bankFdRows = bankFdList.map((b) => [
      b.bank,
      `${b.gen.toFixed(2)}% / ${b.sr.toFixed(2)}%`,
      `${fmtINR((item.rupees * (b.gen / 100)) / 12)} / mo`,
      `${fmtINR((item.rupees * (b.sr / 100)) / 12)} / mo`,
      fmtINR(item.rupees * Math.pow(1 + b.gen / 400, 4)),
    ]);

    const tenureFdRows = [1, 2, 3, 5, 10].map((yr) => {
      const matGen = item.rupees * Math.pow(1 + 0.071 / 4, 4 * yr);
      const matSr = item.rupees * Math.pow(1 + 0.076 / 4, 4 * yr);
      return [
        `${yr} ${yr === 1 ? 'Year' : 'Years'}`,
        fmtINR(matGen - item.rupees),
        fmtINR(matGen),
        fmtINR(matSr - item.rupees),
        fmtINR(matSr),
      ];
    });

    map[slug] = {
      slug,
      category: 'fd',
      title: `${item.label} FD Interest Per Month`,
      seoTitle: `${item.label} FD Interest Per Month in SBI, HDFC, Post Office & Senior Citizen (2026)`,
      seoDescription: `How much monthly interest do you get on a ${item.label} Fixed Deposit (FD)? Earn ${fmtINR(monthlyGeneral)}/month (General @ 7.10%) to ${fmtINR(monthlySenior)}/month (Senior Citizen @ 7.60%). Compare SBI, HDFC, ICICI & Post Office rates.`,
      h1: `${item.label} FD Interest Per Month — SBI, HDFC, ICICI & Post Office (2026 Table)`,
      subtitle: `A ${item.label} (${fmtINR(item.rupees)}) Fixed Deposit pays ${fmtINR(monthlyGeneral)} per month for regular citizens (@ 7.10% p.a.) and ${fmtINR(monthlySenior)} per month for senior citizens (@ 7.60% p.a.).`,
      summaryHighlight: [
        { label: 'Monthly Payout (Regular)', value: fmtINR(monthlyGeneral), sub: `@ 7.10% p.a. (${fmtINR(monthlyGeneral * 12)}/yr)` },
        { label: 'Monthly Payout (Senior Citizen)', value: fmtINR(monthlySenior), sub: `@ 7.60% p.a. (${fmtINR(monthlySenior * 12)}/yr)` },
        { label: 'Post Office / SCSS Monthly', value: fmtINR((item.rupees * 0.082) / 12), sub: `@ 8.20% p.a. Senior Citizen Scheme` },
        { label: '5-Year Compounded Maturity', value: fmtINR(item.rupees * Math.pow(1 + 0.071 / 4, 20)), sub: `Quarterly compounding @ 7.10%` },
      ],
      toolSlug: 'fd-calculator',
      primaryTable: {
        heading: `${item.label} FD Monthly Interest Payout Across Top Indian Banks (2026)`,
        caption: `Monthly non-cumulative interest income and 1-year cumulative maturity for a ${item.label} FD.`,
        headers: ['Bank / Scheme', 'Rate (General / Senior)', 'Monthly Interest (General)', 'Monthly Interest (Senior)', '1-Year Maturity Value'],
        rows: bankFdRows,
      },
      secondaryTable: {
        heading: `${item.label} Cumulative FD Maturity Value (1 to 10 Years)`,
        caption: `Quarterly compounded maturity corpus when reinvesting interest on a ${item.label} FD.`,
        headers: ['FD Tenure', 'General Interest (7.10%)', 'General Maturity Value', 'Senior Interest (7.60%)', 'Senior Maturity Value'],
        rows: tenureFdRows,
      },
      keyTakeaways: [
        `For a ${item.label} Fixed Deposit, choosing a Monthly Interest Payout (non-cumulative) gives you ${fmtINR(monthlyGeneral)}/month (General) or ${fmtINR(monthlySenior)}/month (Senior Citizen) directly into your savings account.`,
        item.rupees * 0.071 > 50000
          ? `Because your annual FD interest (${fmtINR(item.rupees * 0.071)}/yr) exceeds ₹50,000 (₹1,00,000 for Senior Citizens), banks deduct 10% TDS unless your total taxable income is below the basic exemption limit and you submit Form 15G / Form 15H.`
          : `Because your annual FD interest (${fmtINR(item.rupees * 0.071)}/yr) is below the ₹50,000 threshold, no bank TDS is deducted on this ${item.label} FD!`,
        `Reinvesting the interest in a 5-year Cumulative FD grows your ${item.label} deposit to ${fmtINR(item.rupees * Math.pow(1 + 0.071 / 4, 20))} through quarterly compounding.`,
      ],
      faqs: [
        {
          question: `How much interest will I get on ${item.label} FD per month in SBI?`,
          answer: `At SBI's 7.10% p.a. rate (7.60% for Senior Citizens), a ${item.label} FD pays approximately ${fmtINR(monthlyGeneral)} per month for regular citizens and ${fmtINR(monthlySenior)} per month for senior citizens.`,
        },
        {
          question: `What is the 1-year and 5-year maturity amount for a ${item.label} FD?`,
          answer: `With quarterly compounding at 7.10% p.a., a ${item.label} FD grows to ${fmtINR(item.rupees * Math.pow(1 + 0.071 / 4, 4))} in 1 year and ${fmtINR(item.rupees * Math.pow(1 + 0.071 / 4, 20))} in 5 years.`,
        },
        {
          question: `Is TDS deducted on a ${item.label} Fixed Deposit?`,
          answer: `Banks deduct 10% TDS only if your total FD interest in a bank exceeds ₹50,000 per financial year (₹1,00,000 for senior citizens). Eligible savers can submit Form 15G/15H to avoid TDS.`,
        },
      ],
    };
  }

  // 4. MONTHLY SIP MATURITY BY AMOUNT (12 pages)
  const sipAmounts = [
    { slugAmt: '1000', label: '₹1,000', rupees: 1000 },
    { slugAmt: '2000', label: '₹2,000', rupees: 2000 },
    { slugAmt: '3000', label: '₹3,000', rupees: 3000 },
    { slugAmt: '5000', label: '₹5,000', rupees: 5000 },
    { slugAmt: '7500', label: '₹7,500', rupees: 7500 },
    { slugAmt: '10000', label: '₹10,000', rupees: 10000 },
    { slugAmt: '12000', label: '₹12,000', rupees: 12000 },
    { slugAmt: '15000', label: '₹15,000', rupees: 15000 },
    { slugAmt: '20000', label: '₹20,000', rupees: 20000 },
    { slugAmt: '25000', label: '₹25,000', rupees: 25000 },
    { slugAmt: '30000', label: '₹30,000', rupees: 30000 },
    { slugAmt: '50000', label: '₹50,000', rupees: 50000 },
  ];

  for (const item of sipAmounts) {
    const slug = `${item.slugAmt}-per-month-sip-calculator`;
    const sip10 = calcSip(item.rupees, 12, 10);
    const sip15 = calcSip(item.rupees, 12, 15);
    const sip20 = calcSip(item.rupees, 12, 20);
    const sip25 = calcSip(item.rupees, 12, 25);

    const sipYears = [5, 10, 15, 20, 25, 30];
    const sipRows = sipYears.map((yr) => {
      const inv = item.rupees * 12 * yr;
      const mat12 = calcSip(item.rupees, 12, yr);
      const mat15 = calcSip(item.rupees, 15, yr);
      return [
        `${yr} Years`,
        fmtINR(inv),
        fmtINR(mat12 - inv),
        fmtINR(mat12),
        fmtINR(mat15),
      ];
    });

    map[slug] = {
      slug,
      category: 'sip',
      title: `${item.label}/Month SIP Calculator`,
      seoTitle: `${item.label} Per Month SIP for 5, 10, 15, 20 & 25 Years — Maturity Table`,
      seoDescription: `See how a ${item.label} per month SIP grows to ${fmtINR(sip10)} in 10 years, ${fmtINR(sip15)} in 15 years, and ${fmtINR(sip20)} in 20 years at 12% CAGR. Includes 15% Small/Mid-Cap and Step-Up SIP tables.`,
      h1: `${item.label} Per Month SIP Returns for 5, 10, 15, 20 & 25 Years`,
      subtitle: `Investing ${item.label} every month via Mutual Fund SIP at 12% annual return builds ${fmtINR(sip10)} in 10 years, ${fmtINR(sip15)} in 15 years, and ${fmtINR(sip20)} in 20 years.`,
      summaryHighlight: [
        { label: '10-Year SIP Corpus', value: fmtINR(sip10), sub: `Invested: ${fmtINR(item.rupees * 120)} (@ 12% CAGR)` },
        { label: '15-Year SIP Corpus', value: fmtINR(sip15), sub: `Invested: ${fmtINR(item.rupees * 180)} (@ 12% CAGR)` },
        { label: '20-Year SIP Corpus', value: fmtINR(sip20), sub: `Invested: ${fmtINR(item.rupees * 240)} (@ 12% CAGR)` },
        { label: '25-Year SIP Corpus', value: fmtINR(sip25), sub: `4.9x wealth multiplier between Yr 15 & Yr 25` },
      ],
      toolSlug: 'sip-calculator',
      primaryTable: {
        heading: `${item.label}/Month SIP Growth Table Across 5 to 30 Years`,
        caption: `Comparison of total invested capital, compounding gains, and final maturity value at 12% (Index/Flexi-Cap) and 15% (Mid/Small-Cap) CAGR.`,
        headers: ['SIP Duration', 'Total Amount Invested', 'Wealth Gained (@ 12%)', 'Maturity Value (@ 12%)', 'Maturity Value (@ 15%)'],
        rows: sipRows,
      },
      secondaryTable: {
        heading: `Regular SIP vs 10% Annual Step-Up SIP on ${item.label}/Month`,
        caption: `Increasing your ${item.label}/month SIP by just 10% every year nearly doubles your 20-year wealth.`,
        headers: ['Horizon', 'Flat SIP (@ 12%)', '10% Step-Up SIP (@ 12%)', 'Extra Wealth Created'],
        rows: [
          ['10 Years', fmtINR(sip10), fmtINR(sip10 * 1.44), `+ ${fmtINR(sip10 * 0.44)}`],
          ['15 Years', fmtINR(sip15), fmtINR(sip15 * 1.68), `+ ${fmtINR(sip15 * 0.68)}`],
          ['20 Years', fmtINR(sip20), fmtINR(sip20 * 1.98), `+ ${fmtINR(sip20 * 0.98)}`],
        ],
      },
      keyTakeaways: [
        `In a 20-year ${item.label}/month SIP (${fmtINR(sip20)} total corpus), only ${fmtINR(item.rupees * 240)} (24%) is your pocket money—the remaining ${fmtINR(sip20 - item.rupees * 240)} (76%) is pure compound interest!`,
        `Adding a 10% annual Step-Up to your ${item.label}/month SIP boosts your 20-year maturity from ${fmtINR(sip20)} to nearly ${fmtINR(sip20 * 1.98)}.`,
        `Always choose Direct Growth mutual fund plans over Regular plans to save 1% annual commission and retain an extra 18%–22% corpus over 20 years.`,
      ],
      faqs: [
        {
          question: `What is the return of a ${item.label} per month SIP for 10 and 20 years?`,
          answer: `At a 12% annual return, a ${item.label}/month SIP grows to ${fmtINR(sip10)} in 10 years (on ${fmtINR(item.rupees * 120)} invested) and ${fmtINR(sip20)} in 20 years (on ${fmtINR(item.rupees * 240)} invested).`,
        },
        {
          question: `How much will ${item.label} per month SIP become in 15 years at 15% return?`,
          answer: `At 15% CAGR, a ${item.label} monthly SIP for 15 years compounds to ${fmtINR(calcSip(item.rupees, 15, 15))} against a total investment of ${fmtINR(item.rupees * 180)}.`,
        },
      ],
    };
  }

  // 5. EXACT CGPA TO PERCENTAGE CONVERSIONS (16 pages)
  const cgpaList = [6.0, 6.5, 7.0, 7.2, 7.5, 7.8, 8.0, 8.2, 8.4, 8.5, 8.6, 8.8, 9.0, 9.2, 9.5, 9.8];

  for (const cgpa of cgpaList) {
    const slugVal = cgpa.toFixed(1).replace('.', '-');
    const slug = `${slugVal}-cgpa-in-percentage`;
    const cbse = (cgpa * 9.5).toFixed(2);
    const aicte = ((cgpa - 0.5) * 10).toFixed(2);
    const vtu = ((cgpa - 0.75) * 10).toFixed(2);
    const direct10 = (cgpa * 10).toFixed(2);
    const sppu = (cgpa * 8.8).toFixed(2);
    const usGpa = ((cgpa / 10) * 4).toFixed(2);

    map[slug] = {
      slug,
      category: 'cgpa',
      title: `${cgpa.toFixed(1)} CGPA in Percentage`,
      seoTitle: `${cgpa.toFixed(1)} CGPA in Percentage (${cbse}% CBSE, ${vtu}% VTU, ${aicte}% AICTE/GTU)`,
      seoDescription: `Convert ${cgpa.toFixed(1)} CGPA to Percentage instantly: ${cgpa.toFixed(1)} CGPA is ${cbse}% in CBSE/UGC (×9.5), ${vtu}% in VTU, ${aicte}% in AICTE/GTU, and ${direct10}% in Anna University/IITs.`,
      h1: `${cgpa.toFixed(1)} CGPA in Percentage — CBSE, VTU, Anna, SPPU & AICTE Conversion`,
      subtitle: `Under the standard CBSE & UGC 9.5 multiplier formula, ${cgpa.toFixed(1)} CGPA equals ${cbse}%. Check your exact university-specific percentage equivalent in the table below.`,
      summaryHighlight: [
        { label: 'CBSE / DU / UGC (× 9.5)', value: `${cbse}%`, sub: `${cgpa.toFixed(1)} × 9.5 standard formula` },
        { label: 'AICTE / GTU ((CGPA−0.5)×10)', value: `${aicte}%`, sub: `(${cgpa.toFixed(1)} − 0.5) × 10` },
        { label: 'VTU Formula ((CGPA−0.75)×10)', value: `${vtu}%`, sub: `(${cgpa.toFixed(1)} − 0.75) × 10` },
        { label: 'US 4.0 GPA Equivalent', value: `${usGpa} / 4.0`, sub: `Standard WES / International scale` },
      ],
      toolSlug: 'gpa-calculator',
      primaryTable: {
        heading: `${cgpa.toFixed(1)} CGPA to Percentage Across Indian Universities & Boards`,
        caption: `Official university conversion formulas applied to a ${cgpa.toFixed(1)} CGPA score.`,
        headers: ['Board / University', 'Official Formula', `Calculation for ${cgpa.toFixed(1)} CGPA`, 'Final Percentage'],
        rows: [
          ['CBSE Class 10 / 12 & UGC Default', 'CGPA × 9.5', `${cgpa.toFixed(1)} × 9.5`, `${cbse}%`],
          ['AICTE / GTU / MAKAUT', '(CGPA − 0.50) × 10', `(${cgpa.toFixed(1)} − 0.50) × 10`, `${aicte}%`],
          ['VTU (Visvesvaraya Tech University)', '(CGPA − 0.75) × 10', `(${cgpa.toFixed(1)} − 0.75) × 10`, `${vtu}%`],
          ['Anna University / IITs / NITs', 'CGPA × 10', `${cgpa.toFixed(1)} × 10`, `${direct10}%`],
          ['SPPU (Savitribai Phule Pune Univ)', 'CGPA × 8.8', `${cgpa.toFixed(1)} × 8.8`, `${sppu}%`],
          ['Mumbai University (Engineering)', '(7.1 × CGPA) + 11', `(7.1 × ${cgpa.toFixed(1)}) + 11`, `${(7.1 * cgpa + 11).toFixed(2)}%`],
        ],
      },
      secondaryTable: {
        heading: `Nearby CGPA to Percentage Quick Lookup Table (Around ${cgpa.toFixed(1)} CGPA)`,
        caption: `Compare decimal steps around ${cgpa.toFixed(1)} CGPA across CBSE, AICTE, and VTU scales.`,
        headers: ['CGPA Score', 'CBSE (× 9.5)', 'AICTE ((CGPA−0.5)×10)', 'VTU ((CGPA−0.75)×10)'],
        rows: [-0.2, -0.1, 0, 0.1, 0.2].map((delta) => {
          const val = Math.min(10, Math.max(4, +(cgpa + delta).toFixed(1)));
          return [
            `${val.toFixed(1)} CGPA`,
            `${(val * 9.5).toFixed(2)}%`,
            `${((val - 0.5) * 10).toFixed(2)}%`,
            `${((val - 0.75) * 10).toFixed(2)}%`,
          ];
        }),
      },
      keyTakeaways: [
        `In CBSE, Delhi University, and standard UGC guidelines, ${cgpa.toFixed(1)} CGPA converts to ${cbse}% (${cgpa.toFixed(1)} × 9.5).`,
        `For engineering graduates under VTU (CBCS scheme), ${cgpa.toFixed(1)} CGPA equals ${vtu}%, while under AICTE/GTU rules it equals ${aicte}%.`,
        parseFloat(cbse) >= 60
          ? `A ${cgpa.toFixed(1)} CGPA (${cbse}%) comfortably clears the 60% (First Class) eligibility cutoff required by most IT placements, GATE, CAT, and PSU exams.`
          : `A ${cgpa.toFixed(1)} CGPA (${cbse}%) is classified as Second Class on the 9.5 scale; check our GPA Forecaster below to see what SGPA you need next semester to cross 6.5+ CGPA (61.75%).`,
      ],
      faqs: [
        {
          question: `How much percentage is ${cgpa.toFixed(1)} CGPA in CBSE and UGC?`,
          answer: `Multiplying ${cgpa.toFixed(1)} CGPA by the official 9.5 factor gives ${cbse}% (${cgpa.toFixed(1)} × 9.5 = ${cbse}%).`,
        },
        {
          question: `What is ${cgpa.toFixed(1)} CGPA in percentage for VTU and GTU?`,
          answer: `In VTU, Percentage = (${cgpa.toFixed(1)} − 0.75) × 10 = ${vtu}%. In GTU and AICTE, Percentage = (${cgpa.toFixed(1)} − 0.50) × 10 = ${aicte}%.`,
        },
      ],
    };
  }

  // 6. PERSONAL LOAN & CAR LOAN EMI BY AMOUNT (14 pages)
  const personalLoans = [1, 2, 3, 5, 7, 10, 15, 20];
  for (const lakh of personalLoans) {
    const slug = `${lakh}-lakh-personal-loan-emi`;
    const rupees = lakh * 100000;
    const emi3 = calcEmi(rupees, 11.0, 3);
    const emi5 = calcEmi(rupees, 11.0, 5);

    map[slug] = {
      slug,
      category: 'loan',
      title: `₹${lakh} Lakh Personal Loan EMI`,
      seoTitle: `₹${lakh} Lakh Personal Loan EMI for 1, 2, 3, 4 & 5 Years (2026 Bank Rates)`,
      seoDescription: `Calculate monthly EMI for a ₹${lakh} Lakh Personal Loan: ${fmtINR(emi5)}/mo for 5 years and ${fmtINR(emi3)}/mo for 3 years at 11.00% p.a. Compare HDFC, SBI, ICICI & Axis Bank rates.`,
      h1: `₹${lakh} Lakh Personal Loan EMI for 1, 2, 3, 4 & 5 Years`,
      subtitle: `For a ₹${lakh} Lakh (${fmtINR(rupees)}) personal loan at 11.00% p.a., your monthly EMI is ${fmtINR(emi3)} for 3 years or ${fmtINR(emi5)} for 5 years.`,
      summaryHighlight: [
        { label: '3-Year Monthly EMI', value: fmtINR(emi3), sub: `@ 11.00% p.a. (Total Int: ${fmtINR(emi3 * 36 - rupees)})` },
        { label: '5-Year Monthly EMI', value: fmtINR(emi5), sub: `@ 11.00% p.a. (Total Int: ${fmtINR(emi5 * 60 - rupees)})` },
        { label: '2-Year Monthly EMI', value: fmtINR(calcEmi(rupees, 11.0, 2)), sub: `Lowest interest outgo` },
        { label: '1-Year Monthly EMI', value: fmtINR(calcEmi(rupees, 11.0, 1)), sub: `12 monthly installments` },
      ],
      toolSlug: 'personal-loan-emi-calculator',
      primaryTable: {
        heading: `₹${lakh} Lakh Personal Loan EMI Schedule (1 to 6 Years @ 11.00% p.a.)`,
        caption: `Monthly installment and total interest payable on a ₹${lakh} Lakh personal loan across tenures.`,
        headers: ['Tenure', 'Monthly EMI (@ 11%)', 'Total Interest Payable', 'Total Repayment'],
        rows: [1, 2, 3, 4, 5, 6].map((yr) => {
          const m = calcEmi(rupees, 11.0, yr);
          return [`${yr} ${yr === 1 ? 'Year' : 'Years'} (${yr * 12} mo)`, fmtINR(m), fmtINR(m * yr * 12 - rupees), fmtINR(m * yr * 12)];
        }),
      },
      secondaryTable: {
        heading: `₹${lakh} Lakh Personal Loan EMI by Interest Rate (10.5% to 16%)`,
        caption: `How your CIBIL score and interest rate affect a ₹${lakh} Lakh loan EMI over 3 and 5 years.`,
        headers: ['Interest Rate', '3-Year EMI', '5-Year EMI', '5-Year Total Interest'],
        rows: [10.5, 11.0, 12.0, 13.5, 15.0, 16.0].map((r) => [
          `${r.toFixed(2)}% p.a.`,
          fmtINR(calcEmi(rupees, r, 3)),
          fmtINR(calcEmi(rupees, r, 5)),
          fmtINR(calcEmi(rupees, r, 5) * 60 - rupees),
        ]),
      },
      keyTakeaways: [
        `Choosing a 3-year tenure (${fmtINR(emi3)}/mo) over a 5-year tenure (${fmtINR(emi5)}/mo) on a ₹${lakh} Lakh personal loan saves you ${fmtINR(emi5 * 60 - emi3 * 36)} in interest.`,
        `If you own gold jewelry or have an existing home loan, consider a Gold Loan (8.85%–10%) or Top-Up Home Loan (8.60%) instead of a high-rate personal loan.`,
      ],
      faqs: [
        {
          question: `What is the EMI for a ₹${lakh} Lakh personal loan for 5 years in SBI and HDFC?`,
          answer: `At 11.00% p.a., the 5-year monthly EMI for a ₹${lakh} Lakh personal loan is ${fmtINR(emi5)}, with total interest of ${fmtINR(emi5 * 60 - rupees)}.`,
        },
        {
          question: `What is the EMI for a ₹${lakh} Lakh personal loan for 3 years?`,
          answer: `For a 3-year (36-month) tenure at 11.00% p.a., the monthly EMI on ₹${lakh} Lakh is ${fmtINR(emi3)}.`,
        },
      ],
    };
  }

  const carLoans = [5, 8, 10, 12, 15, 20];
  for (const lakh of carLoans) {
    const slug = `${lakh}-lakh-car-loan-emi`;
    const rupees = lakh * 100000;
    const emi5 = calcEmi(rupees, 9.0, 5);
    const emi7 = calcEmi(rupees, 9.0, 7);

    map[slug] = {
      slug,
      category: 'loan',
      title: `₹${lakh} Lakh Car Loan EMI`,
      seoTitle: `₹${lakh} Lakh Car Loan EMI for 3, 4, 5 & 7 Years (2026 SBI & HDFC Auto Loan)`,
      seoDescription: `Calculate exact monthly EMI for a ₹${lakh} Lakh Car Loan: ${fmtINR(emi5)}/mo for 5 years and ${fmtINR(emi7)}/mo for 7 years at 9.00% p.a. Includes 3 to 7 year auto loan amortization table.`,
      h1: `₹${lakh} Lakh Car Loan EMI — 3, 4, 5 & 7 Year Auto Loan Table`,
      subtitle: `Financing a ₹${lakh} Lakh car loan at 9.00% p.a. costs ${fmtINR(emi5)}/month over 5 years or ${fmtINR(emi7)}/month over 7 years.`,
      summaryHighlight: [
        { label: '5-Year Car Loan EMI', value: fmtINR(emi5), sub: `@ 9.00% p.a. (Total Int: ${fmtINR(emi5 * 60 - rupees)})` },
        { label: '7-Year Car Loan EMI', value: fmtINR(emi7), sub: `@ 9.00% p.a. (Total Int: ${fmtINR(emi7 * 84 - rupees)})` },
        { label: '4-Year Car Loan EMI', value: fmtINR(calcEmi(rupees, 9.0, 4)), sub: `Recommended 20/4/10 auto rule` },
        { label: '3-Year Car Loan EMI', value: fmtINR(calcEmi(rupees, 9.0, 3)), sub: `Lowest total interest cost` },
      ],
      toolSlug: 'car-loan-calculator',
      primaryTable: {
        heading: `₹${lakh} Lakh Car Loan EMI Across 1 to 7 Years (@ 9.00% p.a.)`,
        caption: `Monthly installment and total interest outgo for a ₹${lakh} Lakh auto loan.`,
        headers: ['Tenure', 'Monthly EMI (@ 9.0%)', 'Total Interest Cost', 'Total On-Road Loan Cost'],
        rows: [2, 3, 4, 5, 6, 7].map((yr) => {
          const m = calcEmi(rupees, 9.0, yr);
          return [`${yr} Years (${yr * 12} mo)`, fmtINR(m), fmtINR(m * yr * 12 - rupees), fmtINR(m * yr * 12)];
        }),
      },
      secondaryTable: {
        heading: `₹${lakh} Lakh Car Loan Bank Comparison (SBI, HDFC, ICICI, Canara)`,
        caption: `5-Year and 7-Year monthly EMIs across top car loan lenders in 2026.`,
        headers: ['Bank', 'Auto Loan Rate', '5-Year EMI', '7-Year EMI'],
        rows: [
          ['SBI Car Loan', '8.85% p.a.', fmtINR(calcEmi(rupees, 8.85, 5)), fmtINR(calcEmi(rupees, 8.85, 7))],
          ['Canara / PNB Car Loan', '8.75% p.a.', fmtINR(calcEmi(rupees, 8.75, 5)), fmtINR(calcEmi(rupees, 8.75, 7))],
          ['HDFC Bank New Car Loan', '9.10% p.a.', fmtINR(calcEmi(rupees, 9.10, 5)), fmtINR(calcEmi(rupees, 9.10, 7))],
          ['ICICI Bank Car Loan', '9.15% p.a.', fmtINR(calcEmi(rupees, 9.15, 5)), fmtINR(calcEmi(rupees, 9.15, 7))],
        ],
      },
      keyTakeaways: [
        `For a depreciating asset like a car, financial planners recommend the 20/4/10 rule: 20% down payment, maximum 4-year tenure (${fmtINR(calcEmi(rupees, 9.0, 4))}/mo on ₹${lakh}L), and EMI under 10% of monthly income.`,
        `A 5-year tenure (${fmtINR(emi5)}/mo) saves ${fmtINR(emi7 * 84 - emi5 * 60)} in interest compared to a 7-year car loan.`,
      ],
      faqs: [
        {
          question: `What is the 5-year EMI for a ₹${lakh} Lakh car loan?`,
          answer: `At 9.00% p.a., the monthly EMI for a ₹${lakh} Lakh car loan over 5 years (60 months) is ${fmtINR(emi5)}.`,
        },
        {
          question: `What is the 7-year EMI for a ₹${lakh} Lakh car loan?`,
          answer: `Over 7 years (84 months) at 9.00% p.a., a ₹${lakh} Lakh car loan costs ${fmtINR(emi7)} per month.`,
        },
      ],
    };
  }

  // 7. INDIAN EXAM PHOTO, SIGNATURE & PDF SIZE GUIDES (12 pages)
  const exams = [
    { slug: 'ssc-cgl-chsl-photo-signature-size-20kb-50kb', name: 'SSC CGL, CHSL & MTS', photoKb: '20 KB – 50 KB', photoDim: '3.5 cm × 4.5 cm (200×230 px)', sigKb: '10 KB – 20 KB', sigDim: '4.0 cm × 2.0 cm (140×60 px)', pdfKb: 'Under 200 KB', tool: 'compress-image-to-20kb' },
    { slug: 'upsc-ias-cse-photo-signature-pdf-size', name: 'UPSC CSE (IAS / IPS / NDA / CDS)', photoKb: '20 KB – 300 KB', photoDim: '350×350 px to 1000×1000 px', sigKb: '20 KB – 300 KB', sigDim: '350×350 px to 1000×1000 px', pdfKb: '20 KB – 300 KB (ID Proof)', tool: 'compress-image-to-50kb' },
    { slug: 'neet-ug-photo-postcard-signature-pdf-size', name: 'NTA NEET UG 2026', photoKb: '10 KB – 200 KB', photoDim: 'Passport (2×2 in) & Postcard (4×6 in)', sigKb: '4 KB – 30 KB', sigDim: 'Running hand on white paper', pdfKb: '50 KB – 300 KB (Certificates)', tool: 'compress-image-to-50kb' },
    { slug: 'jee-main-advanced-photo-signature-pdf-size', name: 'NTA JEE Main & JEE Advanced', photoKb: '10 KB – 200 KB', photoDim: '3.5 cm × 4.5 cm (JPG/JPEG)', sigKb: '4 KB – 30 KB', sigDim: '3.5 cm × 1.5 cm (JPG)', pdfKb: '50 KB – 300 KB (Category PDF)', tool: 'compress-image-to-20kb' },
    { slug: 'ibps-po-clerk-photo-signature-thumb-size', name: 'IBPS PO, Clerk, SO & RRB', photoKb: '20 KB – 50 KB', photoDim: '200 × 230 pixels (4.5×3.5 cm)', sigKb: '10 KB – 20 KB', sigDim: '140 × 60 pixels (Black Ink)', pdfKb: '50 KB – 100 KB (Handwritten Decl.)', tool: 'compress-image-to-20kb' },
    { slug: 'sbi-po-clerk-photo-signature-size-compressor', name: 'SBI PO & SBI Junior Associates (Clerk)', photoKb: '20 KB – 50 KB', photoDim: '200 × 230 pixels (200 DPI)', sigKb: '10 KB – 20 KB', sigDim: '140 × 60 pixels (No Capitals)', pdfKb: 'Under 500 KB (ID/Resume PDF)', tool: 'compress-image-to-20kb' },
    { slug: 'rrb-ntpc-group-d-alp-photo-signature-size', name: 'Railway RRB NTPC, Group D & ALP', photoKb: '30 KB – 70 KB', photoDim: '35 mm × 45 mm (320×240 px)', sigKb: '30 KB – 70 KB', sigDim: '50 mm × 20 mm (140×60 px)', pdfKb: '50 KB – 500 KB (SC/ST Cert PDF)', tool: 'compress-image-to-50kb' },
    { slug: 'gate-exam-photo-signature-pdf-size', name: 'GATE 2026 (GOAPS Portal)', photoKb: '5 KB – 100 KB', photoDim: '3.5 cm × 4.5 cm (200×260 to 530×690 px)', sigKb: '5 KB – 150 KB', sigDim: '1:2.75 to 1:3.75 Aspect Ratio', pdfKb: '10 KB – 300 KB (Photo ID PDF)', tool: 'compress-image-to-50kb' },
    { slug: 'cat-exam-iim-photo-signature-size', name: 'IIM CAT Exam Registration', photoKb: 'Under 1 MB (30–200 KB ideal)', photoDim: '35 mm × 45 mm (1200 × 1200 DPI)', sigKb: 'Under 80 KB', sigDim: '80 mm × 35 mm (150 DPI)', pdfKb: '100 KB – 500 KB (EWS/NC-OBC PDF)', tool: 'compress-image-to-100kb' },
    { slug: 'cuet-ug-pg-photo-signature-pdf-size', name: 'NTA CUET UG & CUET PG', photoKb: '10 KB – 200 KB', photoDim: 'Passport Size (80% face visibility)', sigKb: '4 KB – 30 KB', sigDim: 'Clear signature in black ballpen', pdfKb: '50 KB – 300 KB (Certificate PDF)', tool: 'compress-image-to-20kb' },
    { slug: 'pan-card-nsdl-uti-photo-signature-pdf-size', name: 'PAN Card Online (Protean NSDL & UTIITSL)', photoKb: 'Under 50 KB', photoDim: '3.5 cm × 2.5 cm (213 × 213 px @ 300 DPI)', sigKb: 'Under 50 KB', sigDim: '2.0 cm × 4.5 cm (@ 600 DPI)', pdfKb: 'Under 300 KB (Aadhaar/Address PDF)', tool: 'compress-image-to-50kb' },
    { slug: 'aadhaar-card-update-document-pdf-size-limit', name: 'UIDAI myAadhaar Online Update', photoKb: 'Under 100 KB', photoDim: 'Standard JPEG / PNG', sigKb: 'Under 50 KB', sigDim: 'Self-attested supporting form', pdfKb: 'Under 2 MB (200 KB – 500 KB ideal)', tool: 'compress-pdf-to-200kb' },
  ];

  for (const ex of exams) {
    map[ex.slug] = {
      slug: ex.slug,
      category: 'exam',
      title: `${ex.name} Photo & Signature Size`,
      seoTitle: `${ex.name} Photo, Signature & PDF Size (${ex.photoKb} / ${ex.sigKb}) Resizer`,
      seoDescription: `Official ${ex.name} photo size (${ex.photoKb}, ${ex.photoDim}), signature size (${ex.sigKb}, ${ex.sigDim}), and PDF limit (${ex.pdfKb}). Resize and compress online 100% free in your browser.`,
      h1: `${ex.name} — Official Photo, Signature & PDF Size Specifications + Instant Resizer`,
      subtitle: `Uploading your application form for ${ex.name}? Your photograph must be ${ex.photoKb} (${ex.photoDim}), signature ${ex.sigKb}, and supporting PDF ${ex.pdfKb}. Compress your files instantly below.`,
      summaryHighlight: [
        { label: 'Photograph KB Limit', value: ex.photoKb, sub: ex.photoDim },
        { label: 'Signature KB Limit', value: ex.sigKb, sub: ex.sigDim },
        { label: 'Document PDF Limit', value: ex.pdfKb, sub: 'PDF / A4 Scanned Copy' },
        { label: 'Privacy Guarantee', value: '100% Local', sub: 'Zero server upload of ID docs' },
      ],
      toolSlug: ex.tool,
      primaryTable: {
        heading: `${ex.name} Upload Specifications (Photo, Signature & PDF)`,
        caption: `Official portal validation rules for ${ex.name} online registration.`,
        headers: ['Upload Field', 'Allowed File Size', 'Dimensions / Aspect Ratio', 'Allowed Format'],
        rows: [
          ['Passport Photograph', ex.photoKb, ex.photoDim, 'JPG / JPEG (White/Light Background)'],
          ['Candidate Signature', ex.sigKb, ex.sigDim, 'JPG / JPEG (Black/Blue Ink on White Paper)'],
          ['Left Thumb / Declaration (if applicable)', '10 KB – 50 KB', '240 × 240 px (200 DPI)', 'JPG / JPEG'],
          ['ID Proof / Category Certificate', ex.pdfKb, 'A4 Portrait (150–200 DPI)', 'PDF Document'],
        ],
      },
      secondaryTable: {
        heading: `Common Portal Rejection Reasons & Instant Fixes for ${ex.name}`,
        caption: `Avoid application form rejection during final scrutiny with this checklist.`,
        headers: ['Portal Error Message', 'Why It Happens', 'Instant ToolPixa Solution'],
        rows: [
          ['"File size exceeds maximum limit"', `Smartphone photos are 3 MB – 8 MB instead of ${ex.photoKb}`, 'Use the Compressor below to hit exact KB'],
          ['"Invalid file extension (.HEIC / .WEBP)"', 'iPhone or WhatsApp images are not standard JPEG', 'Automatically converts output to standard .JPG'],
          ['"Signature in Capital Letters / Blurry"', 'Signing in block letters or low contrast scan', 'Sign in running hand on plain white paper'],
        ],
      },
      keyTakeaways: [
        `For ${ex.name}, ensure your photograph is strictly within ${ex.photoKb} (${ex.photoDim}) with both ears visible and no spectacles glare.`,
        `Your signature must be between ${ex.sigKb} (${ex.sigDim}) signed in running hand (never in ALL CAPS, which portals reject).`,
        `All image and PDF compression below runs 100% inside your browser—your Aadhaar, PAN, photo, and signature are never uploaded to any external server.`,
      ],
      faqs: [
        {
          question: `What is the required photo and signature size for ${ex.name}?`,
          answer: `For ${ex.name}, the photograph size must be ${ex.photoKb} (${ex.photoDim}) in JPG/JPEG format, and the signature size must be ${ex.sigKb} (${ex.sigDim}).`,
        },
        {
          question: `How do I compress my photo to ${ex.photoKb} for ${ex.name} on mobile?`,
          answer: `Upload your photo into the interactive compressor right on this page, select your target KB size, and download the compliant JPG file instantly to your phone.`,
        },
      ],
    };
  }

  return map;
}

export const programmaticPages: Record<string, ProgrammaticPageData> = generatePages();
export const programmaticSlugs: string[] = Object.keys(programmaticPages);

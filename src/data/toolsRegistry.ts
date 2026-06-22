import React from 'react';

export interface ToolFaq {
  question: string;
  answer: React.ReactNode;
}

export interface ToolFormulaItem {
  label: string;
  desc: string;
}

export interface ToolMetadata {
  id: string;
  slug?: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  description: string;
  icon?: string;
  formulaTitle?: string;
  formula?: string;
  formulaLegend?: ToolFormulaItem[];
  faqs: ToolFaq[];
  category: string;
}

export const toolsRegistry: Record<string, ToolMetadata> = {
  'attendance-calculator': {
    id: 'attendance-calculator',
    slug: 'attendance-calculator',
    title: 'Attendance Calculator',
    description: 'Calculate attendance percentage',
    category: 'student',
    icon: 'school',
    faqs: []
  },
  'student-loan-calculator': {
    id: 'student-loan-calculator',
    slug: 'student-loan-calculator',
    title: 'Student Loan Calculator',
    description: 'Calculate student loan EMI',
    category: 'student',
    icon: 'school',
    faqs: []
  },
  'pomodoro-timer': {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    description: 'Study using the Pomodoro technique',
    category: 'student',
    icon: 'timer',
    faqs: []
  },
  'reading-speed-calculator': {
    id: 'reading-speed-calculator',
    slug: 'reading-speed-calculator',
    title: 'Reading Speed Calculator',
    description: 'Estimate reading time based on WPM',
    category: 'student',
    icon: 'menu_book',
    faqs: []
  },
  'gpa-forecaster': {
    id: 'gpa-forecaster',
    slug: 'gpa-forecaster',
    title: 'GPA Forecaster',
    description: 'Forecast future GPA requirements',
    category: 'student',
    icon: 'school',
    faqs: []
  },
  'thesis-generator': {
    id: 'thesis-generator',
    slug: 'thesis-generator',
    title: 'Thesis Generator',
    description: 'Generate a structured thesis statement',
    category: 'student',
    icon: 'edit_document',
    faqs: []
  },
  'essay-length-estimator': {
    id: 'essay-length-estimator',
    slug: 'essay-length-estimator',
    title: 'Essay Length Estimator',
    description: 'Estimate essay pages from word count',
    category: 'student',
    icon: 'description',
    faqs: []
  },
  'percentage-delta-calculator': {
    id: 'percentage-delta-calculator',
    slug: 'percentage-delta-calculator',
    title: 'Percentage Change Calculator',
    description: 'Calculate percentage increase or decrease',
    category: 'student',
    icon: 'percent',
    faqs: []
  },
  'scientific-notation-converter': {
    id: 'scientific-notation-converter',
    slug: 'scientific-notation-converter',
    title: 'Scientific Notation Converter',
    description: 'Convert to/from scientific notation',
    category: 'student',
    icon: 'science',
    faqs: []
  },
  'rule-of-72-calculator': {
    id: 'rule-of-72-calculator',
    slug: 'rule-of-72-calculator',
    title: 'Rule of 72 Calculator',
    description: 'Estimate investment doubling time',
    category: 'student',
    icon: 'calculate',
    faqs: []
  },
  'length-converter': {
    id: 'length-converter',
    slug: 'length-converter',
    title: 'Length Converter',
    description: 'Convert meters, feet, miles, etc.',
    category: 'converter',
    icon: 'straighten',
    faqs: []
  },
  'weight-converter': {
    id: 'weight-converter',
    slug: 'weight-converter',
    title: 'Weight Converter',
    description: 'Convert kilograms, pounds, ounces',
    category: 'converter',
    icon: 'scale',
    faqs: []
  },
  'temperature-converter': {
    id: 'temperature-converter',
    slug: 'temperature-converter',
    title: 'Temperature Converter',
    description: 'Convert Celsius, Fahrenheit, Kelvin',
    category: 'converter',
    icon: 'device_thermostat',
    faqs: []
  },
  'speed-converter': {
    id: 'speed-converter',
    slug: 'speed-converter',
    title: 'Speed Converter',
    description: 'Convert km/h, mph, knots',
    category: 'converter',
    icon: 'speed',
    faqs: []
  },
  'volume-converter': {
    id: 'volume-converter',
    slug: 'volume-converter',
    title: 'Volume Converter',
    description: 'Convert liters, gallons, cups',
    category: 'converter',
    icon: 'water_drop',
    faqs: []
  },
  'area-converter': {
    id: 'area-converter',
    slug: 'area-converter',
    title: 'Area Converter',
    description: 'Convert square meters, acres, sq ft',
    category: 'converter',
    icon: 'aspect_ratio',
    faqs: []
  },
  'time-converter': {
    id: 'time-converter',
    slug: 'time-converter',
    title: 'Time Converter',
    description: 'Convert seconds, hours, days',
    category: 'converter',
    icon: 'schedule',
    faqs: []
  },
  'roman-numeral-converter': {
    id: 'roman-numeral-converter',
    slug: 'roman-numeral-converter',
    title: 'Roman Numeral Converter',
    description: 'Convert integers to Roman numerals',
    category: 'converter',
    icon: 'format_list_numbered',
    faqs: []
  },
  'unix-timestamp-converter': {
    id: 'unix-timestamp-converter',
    slug: 'unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    description: 'Convert dates to Unix epoch',
    category: 'converter',
    icon: 'history',
    faqs: []
  },
  'number-base-converter': {
    id: 'number-base-converter',
    slug: 'number-base-converter',
    title: 'Number Base Converter',
    description: 'Convert binary, hex, decimal',
    category: 'converter',
    icon: '123',
    faqs: []
  },
  'final-grade-calculator': {
    id: 'final-grade-calculator',
    slug: 'final-grade-calculator',
    title: 'Final Grade Calculator',
    description: 'Final Grade Calculator',
    category: 'education',
    icon: 'build',
    faqs: []
  },
  'body-fat-calculator': {
    id: 'body-fat-calculator',
    slug: 'body-fat-calculator',
    title: 'Body Fat Calculator',
    description: 'Body Fat Calculator',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'study-time-estimator': {
    id: 'study-time-estimator',
    slug: 'study-time-estimator',
    title: 'Study Time Estimator',
    description: 'Study Time Estimator',
    category: 'education',
    icon: 'build',
    faqs: []
  },
  'macro-nutrient-calculator': {
    id: 'macro-nutrient-calculator',
    slug: 'macro-nutrient-calculator',
    title: 'Macro Nutrient Calculator',
    description: 'Macro Nutrient Calculator',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'words-to-pages-converter': {
    id: 'words-to-pages-converter',
    slug: 'words-to-pages-converter',
    title: 'Words To Pages Converter',
    description: 'Words To Pages Converter',
    category: 'education',
    icon: 'build',
    faqs: []
  },
  'net-worth-calculator': {
    id: 'net-worth-calculator',
    slug: 'net-worth-calculator',
    title: 'Net Worth Calculator',
    description: 'Net Worth Calculator',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'water-intake-calculator': {
    id: 'water-intake-calculator',
    slug: 'water-intake-calculator',
    title: 'Water Intake Calculator',
    description: 'Water Intake Calculator',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'percentage-calculator': {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Percentage Calculator',
    category: 'math',
    icon: 'build',
    faqs: []
  },
  'one-rep-max-calculator': {
    id: 'one-rep-max-calculator',
    slug: 'one-rep-max-calculator',
    title: 'One Rep Max Calculator',
    description: 'One Rep Max Calculator',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'ppf-calculator': {
    id: 'ppf-calculator',
    slug: 'ppf-calculator',
    title: 'PPF Calculator',
    description: 'PPF Calculator',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'roi-calculator': {
    id: 'roi-calculator',
    slug: 'roi-calculator',
    title: 'ROI Calculator',
    description: 'Return on Investment Calculator',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'margin-calculator': {
    id: 'margin-calculator',
    slug: 'margin-calculator',
    title: 'Margin Calculator',
    description: 'Profit Margin Calculator',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'discount-calculator': {
    id: 'discount-calculator',
    slug: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Calculate final price after discount',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'inflation-calculator': {
    id: 'inflation-calculator',
    slug: 'inflation-calculator',
    title: 'Inflation Calculator',
    description: 'Calculate the historical effect of inflation',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'car-loan-calculator': {
    id: 'car-loan-calculator',
    slug: 'car-loan-calculator',
    title: 'Car Loan Calculator',
    description: 'Calculate auto loan EMIs',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'break-even-calculator': {
    id: 'break-even-calculator',
    slug: 'break-even-calculator',
    title: 'Break-Even Calculator',
    description: 'Calculate break even point for your business',
    category: 'finance',
    icon: 'build',
    faqs: []
  },
  'lean-body-mass-calculator': {
    id: 'lean-body-mass-calculator',
    slug: 'lean-body-mass-calculator',
    title: 'Lean Body Mass Calculator',
    description: 'Calculate LBM based on height, weight, and gender',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'ideal-weight-calculator': {
    id: 'ideal-weight-calculator',
    slug: 'ideal-weight-calculator',
    title: 'Ideal Weight Calculator',
    description: 'Find your optimal body weight',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'target-heart-rate-calculator': {
    id: 'target-heart-rate-calculator',
    slug: 'target-heart-rate-calculator',
    title: 'Target Heart Rate',
    description: 'Calculate training heart rate zones',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'pregnancy-due-date-calculator': {
    id: 'pregnancy-due-date-calculator',
    slug: 'pregnancy-due-date-calculator',
    title: 'Pregnancy Due Date',
    description: 'Calculate your estimated due date',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'blood-alcohol-calculator': {
    id: 'blood-alcohol-calculator',
    slug: 'blood-alcohol-calculator',
    title: 'Blood Alcohol Calculator',
    description: 'Estimate your BAC level',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'sleep-cycle-calculator': {
    id: 'sleep-cycle-calculator',
    slug: 'sleep-cycle-calculator',
    title: 'Sleep Cycle Calculator',
    description: 'Calculate the best times to sleep or wake up',
    category: 'health',
    icon: 'build',
    faqs: []
  },
  'base64-encoder': {
    id: 'base64-encoder',
    slug: 'base64-encoder',
    title: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'url-encoder': {
    id: 'url-encoder',
    slug: 'url-encoder',
    title: 'URL Encoder/Decoder',
    description: 'URL encode or decode strings',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'password-generator': {
    id: 'password-generator',
    slug: 'password-generator',
    title: 'Secure Password Generator',
    description: 'Generate strong, secure passwords',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'markdown-converter': {
    id: 'markdown-converter',
    slug: 'markdown-converter',
    title: 'Markdown to HTML',
    description: 'Convert Markdown text to raw HTML',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'text-case-converter': {
    id: 'text-case-converter',
    slug: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text to uppercase, lowercase, camelCase, etc.',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'word-counter': {
    id: 'word-counter',
    slug: 'word-counter',
    title: 'Word & Character Counter',
    description: 'Count words, characters, and reading time',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'fraction-calculator': {
    id: 'fraction-calculator',
    slug: 'fraction-calculator',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'scientific-calculator': {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Advanced mathematical operations',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'standard-deviation-calculator': {
    id: 'standard-deviation-calculator',
    slug: 'standard-deviation-calculator',
    title: 'Standard Deviation Calculator',
    description: 'Calculate variance and SD of a dataset',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'quadratic-equation-solver': {
    id: 'quadratic-equation-solver',
    slug: 'quadratic-equation-solver',
    title: 'Quadratic Equation Solver',
    description: 'Solve ax^2 + bx + c = 0',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'probability-calculator': {
    id: 'probability-calculator',
    slug: 'probability-calculator',
    title: 'Probability Calculator',
    description: 'Calculate outcomes of multiple events',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'z-score-calculator': {
    id: 'z-score-calculator',
    slug: 'z-score-calculator',
    title: 'Z-Score Calculator',
    description: 'Calculate Z-score for standard normal distribution',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'uuid-generator': {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    title: 'UUID/GUID Generator',
    description: 'Generate random version 4 UUIDs',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'color-converter': {
    id: 'color-converter',
    slug: 'color-converter',
    title: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'qr-code-generator': {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Generate downloadable QR codes',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'hash-generator': {
    id: 'hash-generator',
    slug: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 hashes',
    category: 'developer',
    icon: 'build',
    faqs: []
  },
  'read-time-calculator': {
    id: 'read-time-calculator',
    slug: 'read-time-calculator',
    title: 'Reading Time Calculator',
    description: 'Calculate estimated reading time for a text',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'morse-code-translator': {
    id: 'morse-code-translator',
    slug: 'morse-code-translator',
    title: 'Morse Code Translator',
    description: 'Translate text to and from Morse code',
    category: 'calculators',
    icon: 'build',
    faqs: []
  },
  'home-loan-emi': {
    id: 'home-loan-emi',
    title: 'Home Loan EMI Calculator',
    seoTitle: 'Home Loan EMI Calculator - Plan Your EMI Perfectly | ToolPixa',
    seoDescription: 'Calculate your exact Home Loan EMI instantly. View detailed amortization schedules and plan your dream home budget perfectly bas ek click mein.',
    description: 'Calculate your exact monthly installments instantly. E.g. If Rahul from Mumbai takes a ₹50L loan at 8.5% for 20 years, his EMI is ₹43,391. Plan your dream home budget perfectly bas ek click mein.',
    icon: 'home_work',
    formulaTitle: 'The EMI Formula',
    formula: 'EMI = [P x R x (1+R)^N] / [(1+R)^N-1]',
    formulaLegend: [
      { label: 'P', desc: 'Principal Loan Amount' },
      { label: 'R', desc: 'Monthly Interest Rate' },
      { label: 'N', desc: 'Number of Months (Tenure)' }
    ],
    faqs: [
      { question: "What exactly is a Home Loan EMI?", answer: "EMI (Equated Monthly Installment) is a fixed monthly payment made to your bank. It covers both the principal and the interest so that by the end of your tenure, the loan is fully paid off. Zero tension." },
      { question: "How does the interest rate affect my EMI?", answer: "A higher interest rate increases your EMI amount. For example, a ₹50L loan at 8.5% vs 9.0% makes a difference of thousands of rupees over 20 years. Always negotiate a lower rate!" },
      { question: "Can I reduce my Home Loan EMI?", answer: "Yes! You can lower your EMI by making a larger down payment, opting for a longer tenure, or prepaying a lump sum amount whenever you get a bonus." },
      { question: "Should I choose a fixed or floating interest rate?", answer: "Floating rates are generally cheaper but fluctuate with RBI repo rates. Fixed rates provide certainty but are usually 1-2% more expensive. Floating is better for long-term home loans." },
      { question: "Are there tax benefits on Home Loan EMIs in India?", answer: "Absolutely. Under Section 80C, you can claim up to ₹1.5 Lakhs on principal repayment, and under Section 24(b), up to ₹2 Lakhs on interest paid. It's a massive tax saver!" }
    ],
    category: 'finance'
  },
  'income-tax-calculator': {
    id: 'income-tax-calculator',
    title: 'Income Tax Calculator (FY 2024-25)',
    seoTitle: 'Income Tax Calculator India FY 2024-25 - Old vs New Regime | ToolPixa',
    seoDescription: 'Instantly calculate your Indian income tax. Compare Old vs New Tax Regimes side-by-side to find the maximum tax savings for FY 2024-25. Accurate & secure.',
    description: 'Calculate your income tax liability in seconds. Compare Old vs New regimes to see which one saves you more. E.g. Neha from Bengaluru earning ₹12L saves ₹33,800 by switching to the New Regime!',
    icon: 'account_balance',
    formulaTitle: 'Tax Slabs & Surcharge',
    formula: 'Computed Tax + (Surcharge) + 4% Health & Education Cess',
    formulaLegend: [
      { label: 'Standard Deduction', desc: '₹75,000 for New Regime, ₹50,000 for Old Regime' },
      { label: 'Section 87A', desc: 'Rebate up to ₹25,000 in New Regime (income up to ₹7L)' }
    ],
    faqs: [
      { question: "Which regime is better: Old or New Tax Regime?", answer: "For FY 2024-25, if your deductions (like 80C, HRA, Medical) are less than ₹3.75 Lakhs, the New Regime is generally better. If you have heavy deductions, the Old Regime might save you more tax." },
      { question: "What is the new standard deduction for FY 2024-25?", answer: "The standard deduction in the New Regime was increased to ₹75,000 for salaried employees. It remains ₹50,000 in the Old Regime." },
      { question: "Do I have to pay tax on exactly ₹7 Lakhs salary?", answer: "No! Under the New Regime, if your taxable income is up to ₹7 Lakhs, you get a full Section 87A rebate, meaning zero tax to pay." },
      { question: "Can I claim HRA and 80C under the New Tax Regime?", answer: "No, the New Tax Regime offers lower slab rates but you must forgo major deductions like HRA, LTA, and Section 80C investments." },
      { question: "Can I switch between the old and new tax regimes?", answer: "Salaried individuals without business income can switch regimes every year. Those with business income can only switch back to the old regime once in their lifetime." }
    ],
    category: 'finance'
  },
  'gpa-calculator': {
    id: 'gpa-calculator',
    title: 'College GPA Calculator',
    description: 'Calculate your college GPA using US 4.0 or Indian 10.0 grading scales. Plan your target grades and track your academic standing.',
    icon: 'school',
    formulaTitle: 'GPA Formula',
    formula: 'GPA = Σ (Course Credits × Grade Points) / Σ (Course Credits)',
    formulaLegend: [
      { label: 'Grade Points', desc: 'The numerical value of your letter grade (e.g., A = 4.0, O = 10.0)' },
      { label: 'Credits', desc: 'The weight of the course, typically 1 to 4.' }
    ],
    faqs: [
      { question: "What is a GPA and why is it important?", answer: "Grade Point Average (GPA) is a standard way of measuring academic achievement. It is used by universities for admissions, scholarships, and honors, and by employers to gauge academic consistency." },
      { question: "How do you calculate your college GPA?", answer: "GPA is calculated by dividing the total number of grade points earned by the total number of credit hours attempted. Your grade points for a class equal the grade value multiplied by the class credits." },
      { question: "What is the difference between cumulative GPA and semester GPA?", answer: "Semester GPA is the average of your grades for a single term. Cumulative GPA is the overall average of all your grades across all semesters in your degree." },
      { question: "Do Audit or Pass/Fail courses affect my GPA?", answer: "No. Audit courses and Pass/Fail classes that do not grant letter grades should not be included in your GPA calculation." },
      { question: "How does a withdrawal (W) affect my GPA?", answer: "A standard Withdrawal (W) does not affect your GPA because it carries zero grade points and zero credits attempted. However, a Withdrawal Failing (WF) usually counts as an F." },
      { question: "What is a good GPA in college?", answer: "A 'good' GPA depends on your major and goals. Generally, a 3.0 to 3.5 is considered good, while a 3.5 to 4.0 is excellent and qualifies for Dean's List or Latin Honors." },
      { question: "How do I convert an Indian 10.0 CGPA to a US 4.0 GPA?", answer: "Conversion isn't an exact science, as US universities evaluate Indian transcripts holistically. However, a common rough estimate is dividing your Indian CGPA by 10 and multiplying by 4, or using WES credential evaluation." },
      { question: "What is the difference between the 10.0 scales in India?", answer: "Different universities assign different letter grades to 10 points. For example, Mumbai University uses an 'O' for 10 points, while VTU uses an 'S' for 10 points. Our tool lets you toggle between them!" },
      { question: "Does retaking a class replace the old grade in my GPA?", answer: "It depends on your university's policy. Some schools replace the old grade entirely (grade forgiveness), while others average the two grades or keep both on your transcript." },
      { question: "Does transferring schools reset my GPA?", answer: "Typically, yes. When you transfer, your credits usually transfer over, but your GPA at the new institution starts fresh at 0.0. Your overall 'cumulative' GPA across institutions is only calculated for grad school apps." }
    ],
    category: 'student'
  },
  'bmi-calculator': {
    id: 'bmi-calculator',
    title: 'Advanced BMI & BMR Calculator',
    description: 'Calculate your Body Mass Index (BMI), Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE) to plan your fitness goals.',
    icon: 'favorite',
    formulaTitle: 'Metabolic Formulas',
    formula: 'BMR (Men) = (10 × weight) + (6.25 × height) - (5 × age) + 5',
    formulaLegend: [
      { label: 'BMI', desc: 'Body Mass Index: Weight(kg) / Height(m)²' },
      { label: 'BMR', desc: 'Mifflin-St Jeor Equation for daily resting calories' },
      { label: 'TDEE', desc: 'BMR × Activity Level Multiplier' }
    ],
    faqs: [
      { question: "What is BMI and how is it calculated?", answer: "Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m², where kg is a person's weight in kilograms and m² is their height in metres squared." },
      { question: "What is BMR (Basal Metabolic Rate)?", answer: "BMR is the total number of calories that your body needs to perform basic, life-sustaining functions. These basal functions include breathing, circulation, and cell production." },
      { question: "What is TDEE (Total Daily Energy Expenditure)?", answer: "TDEE is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by multiplying your BMR by an activity multiplier." },
      { question: "Is BMI an accurate measure of health?", answer: "BMI is a useful population-level screening tool, but it doesn't measure body fat directly. It doesn't account for muscle mass, bone density, or overall body composition." },
      { question: "How is the Mifflin-St Jeor equation different from Harris-Benedict?", answer: "The Mifflin-St Jeor equation, introduced in 1990, has been proven to be more accurate than the older Harris-Benedict equation (created in 1919) which tends to overestimate calorie needs by about 5%." },
      { question: "What are the WHO BMI categories?", answer: "According to the World Health Organization (WHO): Under 18.5 is Underweight, 18.5 to 24.9 is Normal, 25 to 29.9 is Overweight, and 30 or greater is Obese." },
      { question: "Do I need a different BMI calculator if I'm muscular?", answer: "If you have high muscle mass, BMI might classify you as 'Overweight' or 'Obese' because muscle is denser than fat. In such cases, measuring body fat percentage is more accurate than BMI." },
      { question: "How many calories should I eat to lose weight?", answer: "To lose weight safely, you should consume fewer calories than your TDEE. A common deficit is 500 calories below your TDEE per day, which typically results in about 0.5 kg (1 lb) of weight loss per week." },
      { question: "Does age affect my BMR?", answer: "Yes, as you age, your muscle mass tends to decrease and fat accounts for a greater proportion of your weight. This slows down your metabolism, which is why BMR decreases with age." },
      { question: "Can I calculate BMI using imperial measurements (feet and pounds)?", answer: "Yes, the imperial formula is BMI = [weight (lb) / height (in)²] × 703. Most modern calculators, including ours, handle the conversion automatically." }
    ],
    category: 'health'
  },
  'json-formatter': {
    id: 'json-formatter',
    title: 'JSON Formatter & Validator',
    description: 'A developer-first tool to format, validate, and minify JSON payloads. Quickly debug parsing errors with exact line numbers.',
    icon: 'data_object',
    formulaTitle: 'Validation Rules',
    formula: 'JSON must use double quotes (") for keys and strings, and avoid trailing commas.',
    formulaLegend: [
      { label: 'Format', desc: 'Indents your JSON with 2 spaces for readability.' },
      { label: 'Minify', desc: 'Removes all whitespace to reduce payload size.' },
      { label: 'Validate', desc: 'Checks for syntax errors and points out exact lines.' }
    ],
    faqs: [
      { question: "What is a JSON Formatter?", answer: "A JSON formatter takes raw, unreadable or minified JSON data and 'prettifies' it by adding appropriate indentation, line breaks, and spacing, making it easy for humans to read and debug." },
      { question: "How do I validate my JSON?", answer: "Simply paste your JSON into our tool. If it is valid, the status bar will show a green 'Valid JSON'. If there are syntax errors, it will highlight the exact line and column where the error occurred." },
      { question: "What makes a JSON file invalid?", answer: "Common causes of invalid JSON include missing quotation marks around keys, using single quotes (') instead of double quotes (\"), missing commas between properties, and trailing commas at the end of objects or arrays." },
      { question: "How to minify JSON?", answer: "Click the 'Minify' button in our tool. Minification strips all unnecessary whitespace, tabs, and newlines from the JSON string to reduce its file size, which is ideal for API responses and network transfers." },
      { question: "Why is JSON used for APIs?", answer: "JSON (JavaScript Object Notation) is lightweight, text-based, language-independent, and easy for both humans to read/write and machines to parse/generate, making it the standard for REST APIs." },
      { question: "Can JSON handle comments?", answer: "No. The official JSON specification does not support comments (like // or /* */). If you have comments in your JSON, standard parsers like JSON.parse() will throw a syntax error." },
      { question: "What data types does JSON support?", answer: "JSON supports Strings, Numbers, Booleans (true/false), Arrays, Objects, and null. It does not natively support undefined, Functions, or Date objects." },
      { question: "How to convert JSON to a JavaScript object?", answer: "In JavaScript, you can convert a valid JSON string into a native JavaScript object by passing it to the built-in function `JSON.parse(jsonString)`." },
      { question: "Is JSON exactly the same as a JavaScript object?", answer: "No. While JSON is derived from JavaScript object syntax, JSON requires double quotes around all keys, whereas JavaScript allows unquoted or single-quoted keys. Furthermore, JSON cannot contain functions." },
      { question: "How to fix a 'Unexpected token' JSON parse error?", answer: "This usually means there is a typo. Check the line number provided by our validator. Look for missing quotes, trailing commas, or missing brackets near that exact position." }
    ],
    category: 'developer'
  },
  'unit-converter': {
    id: 'unit-converter',
    title: 'Smart Unit Converter',
    description: 'A dynamic unit converter with country-aware default units. Easily convert length, weight, area, volume, and temperature across metric and imperial systems.',
    icon: 'swap_calls',
    formulaTitle: 'Unit Conversion Principles',
    formula: 'Conversions multiply a value by the base factor of the original unit and divide by the factor of the target unit.',
    formulaLegend: [
      { label: 'Factor', desc: 'The ratio to the base unit (e.g., 1 km = 1000 m).' },
      { label: 'Offset', desc: 'Used primarily in temperature scales to align zeros.' }
    ],
    faqs: [
      { question: 'How do you convert Celsius to Fahrenheit?', answer: 'Multiply the Celsius temperature by 9/5 (or 1.8) and add 32. For example, 0°C is 32°F, and 100°C is 212°F.' },
      { question: 'What is a Bigha?', answer: 'Bigha is a traditional unit of measurement for land in South Asia, particularly India. The exact size varies by region, but a typical standardized Bigha is often considered around 2529 square meters or 0.625 acres.' },
      { question: 'Is US Gallon the same as UK Gallon?', answer: 'No. A US liquid gallon is approximately 3.785 liters, while a UK (Imperial) gallon is about 4.546 liters. Our converter defaults to the US Gallon.' }
    ],
    category: 'calculators'
  },
  'sip-calculator': {
    id: 'sip-calculator',
    title: 'SIP Return Calculator',
    seoTitle: 'SIP Return Calculator - Plan Your Mutual Fund SIPs | ToolPixa',
    seoDescription: 'Calculate your Mutual Fund SIP returns instantly. See the magic of compounding with area charts and build wealth effortlessly. Start your SIP planning today.',
    description: 'Visualize the power of compounding over time. E.g. If you invest ₹5,000 every month for 20 years at 12% return, your wealth grows to ₹50 Lakhs! Calculate your exact returns now.',
    icon: 'trending_up',
    formulaTitle: 'SIP Compounding Formula',
    formula: 'FV = P × ({[1 + i]^n - 1} / i) × (1 + i)',
    formulaLegend: [
      { label: 'P', desc: 'Monthly investment amount' },
      { label: 'i', desc: 'Monthly expected return rate (Annual Rate / 12)' },
      { label: 'n', desc: 'Total number of months' }
    ],
    faqs: [
      { question: "What exactly is an SIP?", answer: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (e.g., monthly) in Mutual Funds. It's the most disciplined way to build long-term wealth without timing the market." },
      { question: "How does the power of compounding work in SIP?", answer: "Compounding means you earn returns not just on your principal but also on your past returns. Over 15-20 years, this 'snowball effect' grows your money exponentially!" },
      { question: "Is SIP better than a Lumpsum investment?", answer: "SIP is generally safer for volatile markets because of 'Rupee Cost Averaging'. You buy more units when markets fall and fewer when they rise. Lumpsum is better only if you invest at the absolute market bottom." },
      { question: "Can I stop my SIP anytime?", answer: "Yes! SIPs are highly flexible. You can pause, stop, or increase your SIP amount at any time with zero penalties (unless you invest in 3-year lock-in ELSS funds)." },
      { question: "What is a realistic expected return for SIPs in India?", answer: "Historically, Equity Mutual Funds in India have delivered around 10-12% average annualized returns over a 10+ year period. However, market returns are never guaranteed." }
    ],
    category: 'finance'
  },
  'compound-interest': {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    seoTitle: 'Compound Interest Calculator - See Your Wealth Grow | ToolPixa',
    seoDescription: 'Calculate compound interest daily, monthly, or yearly. Visualize how compounding accelerates your wealth over time. Start calculating your returns now.',
    description: 'Discover the 8th wonder of the world! E.g. If you invest ₹1 Lakh at 10% interest for 10 years, compounding makes it ₹2.59 Lakhs! See the magic unfold.',
    category: 'finance',
    icon: 'trending_up',
    formulaTitle: 'Compound Interest Formula',
    formula: 'A = P(1 + r/n)^(nt)',
    formulaLegend: [
      { label: 'A', desc: 'Total maturity amount' },
      { label: 'P', desc: 'Principal investment amount' },
      { label: 'r', desc: 'Annual interest rate (decimal)' },
      { label: 'n', desc: 'Compounding frequency per year' },
      { label: 't', desc: 'Time in years' }
    ],
    faqs: [
      { question: 'What exactly is compound interest?', answer: 'Compound interest means you earn interest not only on your initial investment (principal) but also on the interest you accumulated in previous years. Yeh paise se paisa kamane ka sabse powerful tarika hai!' },
      { question: 'How does compounding frequency affect my returns?', answer: 'The more often your interest is compounded (like daily vs. yearly), the faster your money grows. For example, monthly compounding yields slightly more than annual compounding for the same rate.' },
      { question: 'What is the Rule of 72?', answer: 'The Rule of 72 is a quick mental math trick. If you divide 72 by your annual interest rate, you get the approximate number of years it takes for your money to double. (E.g., 72 / 12% = 6 years).' },
      { question: 'What is the difference between Simple Interest and Compound Interest?', answer: 'Simple interest is only calculated on the original principal. Compound interest is calculated on the principal PLUS the past accumulated interest, leading to exponential growth over time.' },
      { question: 'Which investments offer compound interest in India?', answer: 'Many Indian investments offer compounding, such as Public Provident Fund (PPF), Fixed Deposits (if interest is reinvested), National Savings Certificate (NSC), and Mutual Funds (Growth option).' }
    ]
  },
  'fd-rd-calculator': {
    id: 'fd-rd-calculator',
    slug: 'fd-rd-calculator',
    title: 'FD / RD Calculator',
    description: 'Calculate maturity values, total investment, and total interest earned for your Fixed Deposits (FD) and Recurring Deposits (RD).',
    category: 'finance',
    icon: 'savings',
    faqs: []
  },
  'bmr-tdee-calculator': {
    id: 'bmr-tdee-calculator',
    slug: 'bmr-tdee-calculator',
    title: 'BMR & TDEE Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to understand your body\'s energy needs and metabolism at different activity levels.',
    category: 'health',
    icon: 'monitor_heart',
    faqs: [
      { question: 'What is BMR?', answer: 'BMR stands for Basal Metabolic Rate. It is the number of calories your body burns at rest to perform basic life-sustaining functions such as breathing, circulation, and cell production.' },
      { question: 'What is TDEE?', answer: 'TDEE stands for Total Daily Energy Expenditure. It represents the total number of calories you burn in a day, combining your BMR with your daily physical activity and exercise.' },
      { question: 'How accurate are these calculations?', answer: 'We use the Mifflin-St Jeor equation, which is widely considered the most accurate formula for calculating BMR. However, everyone\'s metabolism is unique, so these numbers should be used as a starting point.' }
    ]
  },
  'calorie-deficit-surplus-calculator': {
    id: 'calorie-deficit-surplus-calculator',
    slug: 'calorie-deficit-surplus-calculator',
    title: 'Calorie Deficit / Surplus Calculator',
    description: 'Calculate your optimal daily calorie targets and macro splits for losing weight (deficit) or gaining muscle (surplus) based on your maintenance calories (TDEE).',
    category: 'health',
    icon: 'set_meal',
    faqs: [
      { question: 'What is a calorie deficit?', answer: 'A calorie deficit occurs when you consume fewer calories than your body burns in a day. It is the fundamental requirement for weight loss.' },
      { question: 'How large should my deficit be?', answer: 'A moderate deficit of 500 calories per day is generally recommended for sustainable weight loss of about 1 lb (0.5 kg) per week. Extreme deficits can lead to muscle loss and nutritional deficiencies.' },
      { question: 'What is the best macro split?', answer: 'The ideal macro split depends on your goals. A common balanced approach is 30% Protein, 30% Fat, and 40% Carbohydrates, but athletes or those on specific diets may adjust this.' }
    ]
  },
  'mutual-fund-lumpsum': {
    id: 'mutual-fund-lumpsum',
    slug: 'mutual-fund-lumpsum',
    title: 'Mutual Fund Lumpsum Calculator',
    description: 'Calculate the estimated returns and total value of your lumpsum mutual fund investments over time.',
    category: 'finance',
    icon: 'briefcase',
    faqs: []
  },
  'salary-calculator': {
    id: 'salary-calculator',
    slug: 'salary-calculator',
    title: 'Salary / Take-Home Pay Calculator',
    description: 'Calculate your net take-home pay after taxes and deductions from your gross salary.',
    category: 'finance',
    icon: 'account_balance_wallet',
    faqs: []
  },
  'gst-vat-calculator': {
    id: 'gst-vat-calculator',
    slug: 'gst-vat-calculator',
    title: 'GST / VAT Calculator',
    description: 'Easily calculate Goods and Services Tax (GST) or Value Added Tax (VAT) for inclusive or exclusive prices.',
    category: 'finance',
    icon: 'receipt',
    faqs: []
  },
  'retirement-calculator': {
    id: 'retirement-calculator',
    slug: 'retirement-calculator',
    title: 'Retirement Corpus Calculator',
    description: 'Plan your future and determine the exact retirement corpus needed to sustain your lifestyle post-retirement.',
    category: 'finance',
    icon: 'park',
    faqs: []
  },
  'image-size-reducer': {
    id: 'image-size-reducer',
    title: 'Image Size Reducer',
    description: 'Reduce Image File Size Easily.',
    icon: 'Image',
    category: 'Image',
    faqs: [
      { question: "What is the Image Size Reducer?", answer: "Reduce Image File Size Easily." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'bulk-image-compressor': {
    id: 'bulk-image-compressor',
    title: 'Bulk Image Compressor',
    description: 'Compress Multiple Images at Once.',
    icon: 'Images',
    category: 'Image',
    faqs: [
      { question: "What is the Bulk Image Compressor?", answer: "Compress Multiple Images at Once." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-image-to-20kb': {
    id: 'compress-image-to-20kb',
    title: 'Compress Image to 20KB',
    description: 'Compress your images to under 20KB quickly.',
    icon: 'Minimize',
    category: 'Image',
    faqs: [
      { question: "What is the Compress Image to 20KB?", answer: "Compress your images to under 20KB quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-image-to-50kb': {
    id: 'compress-image-to-50kb',
    title: 'Compress Image to 50KB',
    description: 'Compress your images to under 50KB quickly.',
    icon: 'Minimize',
    category: 'Image',
    faqs: [
      { question: "What is the Compress Image to 50KB?", answer: "Compress your images to under 50KB quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-image-to-100kb': {
    id: 'compress-image-to-100kb',
    title: 'Compress Image to 100KB',
    description: 'Compress your images to under 100KB quickly.',
    icon: 'Minimize',
    category: 'Image',
    faqs: [
      { question: "What is the Compress Image to 100KB?", answer: "Compress your images to under 100KB quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-image-to-200kb': {
    id: 'compress-image-to-200kb',
    title: 'Compress Image to 200KB',
    description: 'Compress your images to under 200KB quickly.',
    icon: 'Minimize',
    category: 'Image',
    faqs: [
      { question: "What is the Compress Image to 200KB?", answer: "Compress your images to under 200KB quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'resize-image-to-300kb': {
    id: 'resize-image-to-300kb',
    title: 'Resize Image to 300KB',
    description: 'Compress your images to under 300KB quickly.',
    icon: 'Maximize',
    category: 'Image',
    faqs: [
      { question: "What is the Resize Image to 300KB?", answer: "Compress your images to under 300KB quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'resize-image-for-passport': {
    id: 'resize-image-for-passport',
    title: 'Resize Image for Passport Size',
    description: 'Resize your any image to passport size quickly.',
    icon: 'Crop',
    category: 'Image',
    faqs: [
      { question: "What is the Resize Image for Passport Size?", answer: "Resize your any image to passport size quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'jpg-to-png-converter': {
    id: 'jpg-to-png-converter',
    title: 'JPG to PNG Converter',
    description: 'Convert your JPG file to PNG file quickly.',
    icon: 'FileImage',
    category: 'Image',
    faqs: [
      { question: "What is the JPG to PNG Converter?", answer: "Convert your JPG file to PNG file quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'png-to-jpg-converter': {
    id: 'png-to-jpg-converter',
    title: 'PNG to JPG Converter',
    description: 'Convert your PNG file to JPG file quickly.',
    icon: 'FileImage',
    category: 'Image',
    faqs: [
      { question: "What is the PNG to JPG Converter?", answer: "Convert your PNG file to JPG file quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'text-to-qr-code-generator': {
    id: 'text-to-qr-code-generator',
    title: 'Text to QR Code Generator',
    description: 'Generate QR Code from your text quickly.',
    icon: 'QrCode',
    category: 'Utility',
    faqs: [
      { question: "What is the Text to QR Code Generator?", answer: "Generate QR Code from your text quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'url-to-qr-code-generator': {
    id: 'url-to-qr-code-generator',
    title: 'URL to QR Code Generator',
    description: 'Generate QR Code from any link/URL quickly.',
    icon: 'QrCode',
    category: 'Utility',
    faqs: [
      { question: "What is the URL to QR Code Generator?", answer: "Generate QR Code from any link/URL quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'flip-image': {
    id: 'flip-image',
    title: 'Flip image',
    description: 'Flip your any image online quickly.',
    icon: 'FlipHorizontal',
    category: 'Image',
    faqs: [
      { question: "What is the Flip image?", answer: "Flip your any image online quickly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'rotate-image': {
    id: 'rotate-image',
    title: 'Rotate Image',
    description: 'Rotate any image instantly online.',
    icon: 'RotateCw',
    category: 'Image',
    faqs: [
      { question: "What is the Rotate Image?", answer: "Rotate any image instantly online." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'image-grid-maker': {
    id: 'image-grid-maker',
    title: 'Image Grid Maker',
    description: 'Create Drawing Grids Instantly on Images.',
    icon: 'Grid',
    category: 'Image',
    faqs: [
      { question: "What is the Image Grid Maker?", answer: "Create Drawing Grids Instantly on Images." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'youtube-thumbnail-downloader': {
    id: 'youtube-thumbnail-downloader',
    title: 'YouTube Thumbnail Downloader',
    description: 'Download YouTube Thumbnail.',
    icon: 'Youtube',
    category: 'Video',
    faqs: [
      { question: "What is the YouTube Thumbnail Downloader?", answer: "Download YouTube Thumbnail." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-pdf': {
    id: 'compress-pdf',
    title: 'Compress PDF',
    description: 'Compress PDF File, Reduce PDF Size free.',
    icon: 'FileArchive',
    category: 'PDF',
    faqs: [
      { question: "What is the Compress PDF?", answer: "Compress PDF File, Reduce PDF Size free." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-pdf-to-200kb': {
    id: 'compress-pdf-to-200kb',
    title: 'Compress PDF to 200kb',
    description: 'Compress PDF File Size to 200kb free.',
    icon: 'FileArchive',
    category: 'PDF',
    faqs: [
      { question: "What is the Compress PDF to 200kb?", answer: "Compress PDF File Size to 200kb free." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-pdf-to-500kb': {
    id: 'compress-pdf-to-500kb',
    title: 'Compress PDF to 500kb',
    description: 'Compress PDF File Size to 500kb free.',
    icon: 'FileArchive',
    category: 'PDF',
    faqs: [
      { question: "What is the Compress PDF to 500kb?", answer: "Compress PDF File Size to 500kb free." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'compress-pdf-to-1mb': {
    id: 'compress-pdf-to-1mb',
    title: 'Compress PDF to 1MB',
    description: 'Compress PDF File Size to 1MB free.',
    icon: 'FileArchive',
    category: 'PDF',
    faqs: [
      { question: "What is the Compress PDF to 1MB?", answer: "Compress PDF File Size to 1MB free." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'jpg-to-pdf': {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG images to PDF instantly.',
    icon: 'FileText',
    category: 'PDF',
    faqs: [
      { question: "What is the JPG to PDF?", answer: "Convert JPG images to PDF instantly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'pdf-to-jpg': {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert PDF to JPG images instantly.',
    icon: 'FileImage',
    category: 'PDF',
    faqs: [
      { question: "What is the PDF to JPG?", answer: "Convert PDF to JPG images instantly." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'merge-pdf': {
    id: 'merge-pdf',
    title: 'Merge PDF',
    description: 'Merging multiple PDF files into a single PDF.',
    icon: 'CopyPlus',
    category: 'PDF',
    faqs: [
      { question: "What is the Merge PDF?", answer: "Merging multiple PDF files into a single PDF." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'split-pdf': {
    id: 'split-pdf',
    title: 'Split PDF',
    description: 'Separate smaller files or extract specific pages.',
    icon: 'Scissors',
    category: 'PDF',
    faqs: [
      { question: "What is the Split PDF?", answer: "Separate smaller files or extract specific pages." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'delete-pdf-pages': {
    id: 'delete-pdf-pages',
    title: 'Delete PDF Pages',
    description: 'Remove Unwanted Pages from PDF.',
    icon: 'FileMinus',
    category: 'PDF',
    faqs: [
      { question: "What is the Delete PDF Pages?", answer: "Remove Unwanted Pages from PDF." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'add-page-numbers-to-pdf': {
    id: 'add-page-numbers-to-pdf',
    title: 'Add Page Numbers to PDF',
    description: 'Easily Add page numbers into any PDF file.',
    icon: 'ListOrdered',
    category: 'PDF',
    faqs: [
      { question: "What is the Add Page Numbers to PDF?", answer: "Easily Add page numbers into any PDF file." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'rotate-pdf': {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate PDF the way you need them.',
    icon: 'RotateCcw',
    category: 'PDF',
    faqs: [
      { question: "What is the Rotate PDF?", answer: "Rotate PDF the way you need them." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'word-to-pdf-converter': {
    id: 'word-to-pdf-converter',
    title: 'Word to PDF Converter',
    description: 'Quickly convert DOCX files into PDF documents.',
    icon: 'FileText',
    category: 'PDF',
    faqs: [
      { question: "What is the Word to PDF Converter?", answer: "Quickly convert DOCX files into PDF documents." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'pdf-to-text-converter': {
    id: 'pdf-to-text-converter',
    title: 'PDF to Text Converter',
    description: 'Quickly extract text from PDF files.',
    icon: 'FileType2',
    category: 'PDF',
    faqs: [
      { question: "What is the PDF to Text Converter?", answer: "Quickly extract text from PDF files." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
  'pdf-to-word-converter': {
    id: 'pdf-to-word-converter',
    title: 'PDF to Word Converter',
    description: 'Easily Convert PDF files into DOC format.',
    icon: 'FileEdit',
    category: 'PDF',
    faqs: [
      { question: "What is the PDF to Word Converter?", answer: "Easily Convert PDF files into DOC format." },
      { question: "Is this tool free?", answer: "Yes, it is completely free to use." }
    ]
  },
};

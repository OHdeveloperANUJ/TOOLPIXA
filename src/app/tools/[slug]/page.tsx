import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import FaqAccordion from '@/components/FaqAccordion';
import CurrencySymbol from '@/components/CurrencySymbol';
import { toolsRegistry } from '@/data/toolsRegistry';
import { programmaticPages } from '@/data/programmaticSeo';
import ShareButton from '@/components/ShareButton';
import ToolCard from '@/components/ToolCard';


const amazonSearchMap: Record<string, string> = {
  'bmi-calculator': 'digital+weighing+scale',
  'calorie-calculator': 'kitchen+food+weighing+scale',
  'water-intake-calculator': 'water+bottle+1+litre',
  'sip-calculator': 'mutual+fund+investment+book',
  'home-loan-emi-calculator': 'home+loan+guide+book',
  'car-loan-emi-calculator': 'car+accessories',
  'cgpa-to-percentage-calculator': 'engineering+exam+books',
  'grade-calculator': 'study+planner+notebook',
  'scientific-calculator': 'casio+fx+991+calculator',
  'pregnancy-due-date-calculator': 'pregnancy+guide+book',
  'body-fat-calculator': 'fitness+equipment',
  'bmr-calculator': 'protein+supplement',
  'target-heart-rate-calculator': 'fitness+band+smartwatch',
  'ideal-weight-calculator': 'weighing+machine+digital',
  'json-formatter': 'programming+books+javascript',
  'password-generator': 'usb+security+key',
  'discount-calculator': 'shopping+deals',
  'compound-interest-calculator': 'personal+finance+book',
  'inflation-calculator': 'investment+planning+book',
  'retirement-calculator': 'retirement+planning+book'
};

const categoryFallback: Record<string, string> = {
  'finance': 'personal+finance+books',
  'student': 'competitive+exam+preparation+books',
  'health': 'health+fitness+equipment',
  'developer': 'programming+books',
  'converter': 'digital+measuring+tools',
  'image': 'external+hard+drive',
  'video': 'external+hard+drive',
  'pdf': 'office+productivity+software'
};


const getExternalLink = (category: string) => {
  const cat = category.toLowerCase();
  if (cat === 'finance') return { name: 'Groww', url: 'https://app.groww.in/v3cO/edi2uad9', icon: 'monitoring', color: 'from-[#00d09c] to-[#00b386]' };
  if (cat === 'health') return { name: 'HealthifyMe', url: 'https://www.healthifyme.com/', icon: 'favorite', color: 'from-[#ff4b4b] to-[#e63946]' };
  if (cat === 'student') return { name: 'Coursera', url: 'https://www.coursera.org/', icon: 'school', color: 'from-[#0056D2] to-[#00419e]' };
  if (cat === 'developer') return { name: 'DigitalOcean', url: 'https://www.digitalocean.com/', icon: 'dns', color: 'from-[#0069ff] to-[#0054cc]' };
  return { name: 'ClearTax', url: 'https://cleartax.in/', icon: 'receipt_long', color: 'from-[#3b82f6] to-[#2563eb]' };
};

const getRelatedBlog = (slug: string, category: string) => {
  const cat = category.toLowerCase();
  
  if (cat === 'finance') {
    if (slug === 'sip-calculator') {
      return { title: 'SIP vs Lumpsum: Which Investment Strategy is Better?', slug: 'sip-vs-lumpsum-investment-guide' };
    }
    if (slug === 'home-loan-emi-calculator') {
      return { title: 'The Secret to Home Loan Prepayment: Save Millions in Interest', slug: 'home-loan-prepayment-strategy' };
    }
    if (slug === 'car-loan-calculator') {
      return { title: 'The Ultimate Guide to Car Loan EMIs and Hidden Charges', slug: 'car-loan-emi-hidden-charges' };
    }
    if (slug === 'ppf-calculator' || slug === 'fd-calculator' || slug === 'rd-calculator') {
      return { title: 'PPF vs FD vs RD: Safe Investments to Grow Your Wealth', slug: 'ppf-vs-fd-vs-rd-safe-investments-2026' };
    }
    if (slug === 'inflation-calculator') {
      return { title: 'Is Inflation Destroying Your Savings? How to Fight Back', slug: 'inflation-destroying-savings-fight-back' };
    }
    if (slug === 'gst-calculator' || slug === 'vat-calculator') {
      return { title: 'How to Calculate GST for Your Freelance or Small Business', slug: 'calculate-gst-freelance-business' };
    }
    return { title: 'Old vs New Tax Regime 2025-26: Which Saves You More Money?', slug: 'old-vs-new-tax-regime-2025-26' };
  }
  
  if (cat === 'health') {
    if (slug === 'bmi-calculator' || slug === 'ideal-weight-calculator') {
      return { title: 'BMI for Indian Body Types: The Truth You Need to Know', slug: 'bmi-for-indian-body-types-truth' };
    }
    if (slug === 'bmr-calculator' || slug === 'calorie-deficit-surplus-calculator' || slug === 'tdee-calculator') {
      return { title: 'BMR Secret: The Missing Key to Weight Management', slug: 'bmr-secret-weight-management' };
    }
    if (slug === 'water-intake-calculator') {
      return { title: 'How Much Water Should You Drink Daily? The Science-Backed Truth', slug: 'how-much-water-daily-intake' };
    }
    if (slug === 'target-heart-rate-calculator') {
      return { title: 'Understanding Your Target Heart Rate for Maximum Fat Burn', slug: 'target-heart-rate-fat-burn' };
    }
    return { title: 'The Ultimate Guide to Healthy Weight Loss in 2026 (Plus Diet Myths)', slug: 'healthy-weight-loss-guide-2026' };
  }
  
  if (cat === 'student') {
    if (slug === 'gpa-calculator' || slug === 'gpa-forecaster') {
      return { title: 'CGPA vs Percentage: The Complete Guide Nobody Gave You Before You Needed It', slug: 'cgpa-vs-percentage-guide-2026' };
    }
    return { title: "The Student's Guide to Scoring a 9.0+ CGPA", slug: 'student-guide-high-cgpa' };
  }
  
  if (cat === 'developer') {
    if (slug === 'json-formatter') {
      return { title: 'Demystifying JSON: The Backbone of the Web', slug: 'demystifying-json-backbone-web' };
    }
    if (slug === 'base64-encoder') {
      return { title: 'How Base64 Encoding Works (And When to Use It)', slug: 'how-base64-encoding-works' };
    }
    if (slug === 'color-converter') {
      return { title: 'Hex to RGB: A Designer\'s Guide to Color Spaces', slug: 'hex-to-rgb-designers-guide' };
    }
    if (slug === 'password-generator') {
      return { title: 'The Math Behind Password Strength: How Secure is Your Password?', slug: 'math-behind-password-strength' };
    }
  }
  
  return { title: 'Mastering Financial Modeling for Startups', slug: 'mastering-financial-modeling-for-startups' };
};

const getAmazonSearchQuery = (slug: string, category: string): string => {
  if (amazonSearchMap[slug]) return amazonSearchMap[slug];
  if (categoryFallback[category.toLowerCase()]) return categoryFallback[category.toLowerCase()];
  return 'useful+tools';
};

const calculators = {
  'attendance-calculator': dynamic(() => import('@/components/tools/AttendanceCalculator')),
  'student-loan-calculator': dynamic(() => import('@/components/tools/StudentLoanCalculator')),
  'pomodoro-timer': dynamic(() => import('@/components/tools/PomodoroTimer')),
  'reading-speed-calculator': dynamic(() => import('@/components/tools/ReadingSpeedCalculator')),
  'gpa-forecaster': dynamic(() => import('@/components/tools/GpaForecaster')),
  'thesis-generator': dynamic(() => import('@/components/tools/ThesisGenerator')),
  'essay-length-estimator': dynamic(() => import('@/components/tools/EssayLengthEstimator')),
  'percentage-delta-calculator': dynamic(() => import('@/components/tools/PercentageDeltaCalculator')),
  'scientific-notation-converter': dynamic(() => import('@/components/tools/ScientificNotationConverter')),
  'rule-of-72-calculator': dynamic(() => import('@/components/tools/RuleOf72Calculator')),
  'length-converter': dynamic(() => import('@/components/tools/LengthConverter')),
  'weight-converter': dynamic(() => import('@/components/tools/WeightConverter')),
  'temperature-converter': dynamic(() => import('@/components/tools/TemperatureConverter')),
  'speed-converter': dynamic(() => import('@/components/tools/SpeedConverter')),
  'volume-converter': dynamic(() => import('@/components/tools/VolumeConverter')),
  'area-converter': dynamic(() => import('@/components/tools/AreaConverter')),
  'time-converter': dynamic(() => import('@/components/tools/TimeConverter')),
  'roman-numeral-converter': dynamic(() => import('@/components/tools/RomanNumeralConverter')),
  'unix-timestamp-converter': dynamic(() => import('@/components/tools/UnixTimestampConverter')),
  'number-base-converter': dynamic(() => import('@/components/tools/NumberBaseConverter')),
  'final-grade-calculator': dynamic(() => import('@/components/tools/FinalGradeCalculator')),
  'body-fat-calculator': dynamic(() => import('@/components/tools/BodyFatCalculator')),
  'study-time-estimator': dynamic(() => import('@/components/tools/StudyTimeEstimator')),
  'macro-nutrient-calculator': dynamic(() => import('@/components/tools/MacroNutrientCalculator')),
  'words-to-pages-converter': dynamic(() => import('@/components/tools/WordsToPagesConverter')),
  'net-worth-calculator': dynamic(() => import('@/components/tools/NetWorthCalculator')),
  'water-intake-calculator': dynamic(() => import('@/components/tools/WaterIntakeCalculator')),
  'percentage-calculator': dynamic(() => import('@/components/tools/PercentageCalculator')),
  'one-rep-max-calculator': dynamic(() => import('@/components/tools/OneRepMaxCalculator')),
  'ppf-calculator': dynamic(() => import('@/components/tools/PpfCalculator')),
  'roi-calculator': dynamic(() => import('@/components/tools/ROICalculator')),
  'margin-calculator': dynamic(() => import('@/components/tools/MarginCalculator')),
  'discount-calculator': dynamic(() => import('@/components/tools/DiscountCalculator')),
  'inflation-calculator': dynamic(() => import('@/components/tools/InflationCalculator')),
  'car-loan-calculator': dynamic(() => import('@/components/tools/CarLoanCalculator')),
  'break-even-calculator': dynamic(() => import('@/components/tools/BreakEvenCalculator')),
  'lean-body-mass-calculator': dynamic(() => import('@/components/tools/LeanBodyMassCalculator')),
  'ideal-weight-calculator': dynamic(() => import('@/components/tools/IdealWeightCalculator')),
  'target-heart-rate-calculator': dynamic(() => import('@/components/tools/TargetHeartRateCalculator')),
  'pregnancy-due-date-calculator': dynamic(() => import('@/components/tools/PregnancyDueDateCalculator')),
  'blood-alcohol-calculator': dynamic(() => import('@/components/tools/BloodAlcoholCalculator')),
  'sleep-cycle-calculator': dynamic(() => import('@/components/tools/SleepCycleCalculator')),
  'base64-encoder': dynamic(() => import('@/components/tools/Base64Encoder')),
  'url-encoder': dynamic(() => import('@/components/tools/URLEncoder')),
  'password-generator': dynamic(() => import('@/components/tools/PasswordGenerator')),
  'markdown-converter': dynamic(() => import('@/components/tools/MarkdownConverter')),
  'text-case-converter': dynamic(() => import('@/components/tools/TextCaseConverter')),
  'word-counter': dynamic(() => import('@/components/tools/WordCounter')),
  'fraction-calculator': dynamic(() => import('@/components/tools/FractionCalculator')),
  'scientific-calculator': dynamic(() => import('@/components/tools/ScientificCalculator')),
  'standard-deviation-calculator': dynamic(() => import('@/components/tools/StandardDeviationCalculator')),
  'quadratic-equation-solver': dynamic(() => import('@/components/tools/QuadraticEquationSolver')),
  'probability-calculator': dynamic(() => import('@/components/tools/ProbabilityCalculator')),
  'z-score-calculator': dynamic(() => import('@/components/tools/ZScoreCalculator')),
  'uuid-generator': dynamic(() => import('@/components/tools/UUIDGenerator')),
  'color-converter': dynamic(() => import('@/components/tools/ColorConverter')),
  'qr-code-generator': dynamic(() => import('@/components/tools/QrCodeGenerator')),
  'hash-generator': dynamic(() => import('@/components/tools/HashGenerator')),
  'read-time-calculator': dynamic(() => import('@/components/tools/ReadTimeCalculator')),
  'morse-code-translator': dynamic(() => import('@/components/tools/MorseCodeTranslator')),
  'gold-loan-emi-calculator': dynamic(() => import('@/components/tools/GoldLoanEmiCalculator')),
  'personal-loan-emi-calculator': dynamic(() => import('@/components/tools/PersonalLoanEmi')),
  'bike-loan-emi-calculator': dynamic(() => import('@/components/tools/BikeLoanEmi')),
  'education-loan-emi-calculator': dynamic(() => import('@/components/tools/EducationLoanEmi')),

  'home-loan-emi-calculator': dynamic(() => import('@/components/tools/HomeLoanEmi')),
  'income-tax-calculator': dynamic(() => import('@/components/tools/IncomeTaxCalculator')),
  'gpa-calculator': dynamic(() => import('@/components/tools/GpaCalculator')),
  'bmi-calculator': dynamic(() => import('@/components/tools/BmiCalculator')),
  'json-formatter': dynamic(() => import('@/components/tools/JsonFormatter')),
  'unit-converter': dynamic(() => import('@/components/tools/UnitConverter')),
  'sip-calculator': dynamic(() => import('@/components/tools/SipCalculator')),
  'step-up-sip-calculator': dynamic(() => import('@/components/tools/StepUpSipCalculator')),
  'sip-delay-calculator': dynamic(() => import('@/components/tools/SipDelayCalculator')),
  'direct-vs-regular-calculator': dynamic(() => import('@/components/tools/DirectVsRegularCalculator')),
  'compound-interest-calculator': dynamic(() => import('@/components/tools/CompoundInterestCalculator')),
  'fd-calculator': dynamic(() => import('@/components/tools/FdCalculator')),
  'rd-calculator': dynamic(() => import('@/components/tools/RdCalculator')),
  'bmr-calculator': dynamic(() => import('@/components/tools/BmrCalculator')),
  'tdee-calculator': dynamic(() => import('@/components/tools/TdeeCalculator')),
  'calorie-deficit-surplus-calculator': dynamic(() => import('@/components/tools/CalorieDeficitCalculator')),
  'mutual-fund-lumpsum': dynamic(() => import('@/components/tools/MutualFundLumpsumCalculator')),
  'salary-calculator': dynamic(() => import('@/components/tools/SalaryCalculator')),
  'gst-calculator': dynamic(() => import('@/components/tools/GstCalculator')),
  'vat-calculator': dynamic(() => import('@/components/tools/VatCalculator')),
  'retirement-calculator': dynamic(() => import('@/components/tools/RetirementCalculator')),
  'image-size-reducer': dynamic(() => import('@/components/tools/ImageSizeReducer')),
  'bulk-image-compressor': dynamic(() => import('@/components/tools/BulkImageCompressor')),
  'compress-image-to-20kb': dynamic(() => import('@/components/tools/CompressImageTo20Kb')),
  'compress-image-to-50kb': dynamic(() => import('@/components/tools/CompressImageTo50Kb')),
  'compress-image-to-100kb': dynamic(() => import('@/components/tools/CompressImageTo100Kb')),
  'compress-image-to-200kb': dynamic(() => import('@/components/tools/CompressImageTo200Kb')),
  'resize-image-to-300kb': dynamic(() => import('@/components/tools/ResizeImageTo300Kb')),
  'resize-image-for-passport': dynamic(() => import('@/components/tools/ResizeImageForPassport')),
  'jpg-to-png-converter': dynamic(() => import('@/components/tools/JpgToPngConverter')),
  'png-to-jpg-converter': dynamic(() => import('@/components/tools/PngToJpgConverter')),
  'text-to-qr-code-generator': dynamic(() => import('@/components/tools/TextToQrCodeGenerator')),
  'url-to-qr-code-generator': dynamic(() => import('@/components/tools/UrlToQrCodeGenerator')),
  'flip-image': dynamic(() => import('@/components/tools/FlipImage')),
  'rotate-image': dynamic(() => import('@/components/tools/RotateImage')),
  'image-grid-maker': dynamic(() => import('@/components/tools/ImageGridMaker')),
  'youtube-thumbnail-downloader': dynamic(() => import('@/components/tools/YoutubeThumbnailDownloader')),
  'compress-pdf': dynamic(() => import('@/components/tools/CompressPdf')),
  'compress-pdf-to-200kb': dynamic(() => import('@/components/tools/CompressPdfTo200Kb')),
  'compress-pdf-to-500kb': dynamic(() => import('@/components/tools/CompressPdfTo500Kb')),
  'compress-pdf-to-1mb': dynamic(() => import('@/components/tools/CompressPdfTo1Mb')),
  'jpg-to-pdf': dynamic(() => import('@/components/tools/JpgToPdf')),
  'pdf-to-jpg': dynamic(() => import('@/components/tools/PdfToJpg')),
  'merge-pdf': dynamic(() => import('@/components/tools/MergePdf')),
  'split-pdf': dynamic(() => import('@/components/tools/SplitPdf')),
  'delete-pdf-pages': dynamic(() => import('@/components/tools/DeletePdfPages')),
  'add-page-numbers-to-pdf': dynamic(() => import('@/components/tools/AddPageNumbersToPdf')),
  'rotate-pdf': dynamic(() => import('@/components/tools/RotatePdf')),
  'word-to-pdf-converter': dynamic(() => import('@/components/tools/WordToPdfConverter')),
  'pdf-to-text-converter': dynamic(() => import('@/components/tools/PdfToTextConverter')),
  'pdf-to-word-converter': dynamic(() => import('@/components/tools/PdfToWordConverter')),
};

export async function generateStaticParams() {
  return Object.keys(toolsRegistry).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toolData = toolsRegistry[slug];
  if (!toolData) return {};
  
  const baseUrl = 'https://www.toolpixa.space';
  const fullTitle = toolData.seoTitle || `${toolData.title} — Free Online ${toolData.category.charAt(0).toUpperCase() + toolData.category.slice(1)} Tool | ToolPixa`;
  const title = fullTitle.replace(/\s*\|\s*ToolPixa$/i, '');
  const description = toolData.seoDescription || toolData.description;
  const canonicalUrl = `${baseUrl}/tools/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'ToolPixa',
      images: [
        {
          url: '/assets/sip_vs_lumpsum_cover.png',
          width: 1200,
          height: 630,
          alt: toolData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/assets/sip_vs_lumpsum_cover.png'],
    },
  };
}

function getCompetitorLabel(category: string): string {
  const cat = category.toLowerCase();
  if (cat === 'finance') return 'Bank Portals / Broker Sites';
  if (cat === 'pdf') return 'Smallpdf / iLovePDF (Free Tier)';
  if (cat === 'image') return 'Cloud Image Compressors';
  if (cat === 'health') return 'Generic Fitness Portals';
  if (cat === 'student') return 'University Web Calculators';
  if (cat === 'developer') return 'Ad-Heavy Dev Utilities';
  return 'Traditional Online Tools';
}

interface RefTableData {
  heading: string;
  caption: string;
  headers: string[];
  rows: string[][];
}

function getQuickReferenceTable(slug: string, category: string, title: string): RefTableData {
  const cat = category.toLowerCase();
  if (slug.includes('car-loan') || slug.includes('bike-loan') || slug.includes('personal-loan') || slug.includes('gold-loan')) {
    return {
      heading: `${title} — Short-Tenure Installment Table (1 to 7 Years)`,
      caption: 'Estimated monthly EMIs across shorter consumer, auto, and gold loan tenures.',
      headers: ['Loan Amount', '1 Year (@ 10.5%)', '3 Years (@ 10.5%)', '5 Years (@ 10.5%)', '7 Years (@ 10.5%)'],
      rows: [
        ['₹1,00,000 (₹1 Lakh)', '₹8,815 / mo', '₹3,250 / mo', '₹2,149 / mo', '₹1,686 / mo'],
        ['₹3,00,000 (₹3 Lakh)', '₹26,445 / mo', '₹9,751 / mo', '₹6,448 / mo', '₹5,058 / mo'],
        ['₹5,00,000 (₹5 Lakh)', '₹44,074 / mo', '₹16,251 / mo', '₹10,747 / mo', '₹8,430 / mo'],
        ['₹10,00,000 (₹10 Lakh)', '₹88,149 / mo', '₹32,502 / mo', '₹21,494 / mo', '₹16,861 / mo'],
        ['₹15,00,000 (₹15 Lakh)', '₹1,32,223 / mo', '₹48,754 / mo', '₹32,241 / mo', '₹25,291 / mo'],
      ],
    };
  }
  if (slug.includes('loan') || slug.includes('emi')) {
    return {
      heading: `${title} — Quick Reference EMI Table (@ 8.50% p.a.)`,
      caption: 'Pre-calculated monthly EMI installments across standard long-term loan amounts and tenures.',
      headers: ['Loan Principal', '5 Years EMI', '10 Years EMI', '15 Years EMI', '20 Years EMI'],
      rows: [
        ['₹5,00,000 (₹5 Lakh)', '₹10,258 / mo', '₹6,199 / mo', '₹4,924 / mo', '₹4,339 / mo'],
        ['₹10,00,000 (₹10 Lakh)', '₹20,517 / mo', '₹12,399 / mo', '₹9,847 / mo', '₹8,678 / mo'],
        ['₹20,00,000 (₹20 Lakh)', '₹41,033 / mo', '₹24,797 / mo', '₹19,695 / mo', '₹17,356 / mo'],
        ['₹30,00,000 (₹30 Lakh)', '₹61,550 / mo', '₹37,196 / mo', '₹29,542 / mo', '₹26,035 / mo'],
        ['₹50,00,000 (₹50 Lakh)', '₹1,02,583 / mo', '₹61,993 / mo', '₹49,237 / mo', '₹43,391 / mo'],
        ['₹1,00,00,000 (₹1 Crore)', '₹2,05,165 / mo', '₹1,23,986 / mo', '₹98,474 / mo', '₹86,782 / mo'],
      ],
    };
  }
  if (slug.includes('tax') || slug.includes('salary')) {
    return {
      heading: `${title} — FY 2025–26 Salaried Tax & In-Hand Reference Table`,
      caption: 'Annual tax liability and monthly take-home pay under the FY 2025–26 New Tax Regime (with ₹75,000 Standard Deduction).',
      headers: ['Annual Gross Salary (CTC)', 'Taxable Income', 'New Regime Tax (FY 25-26)', 'Approx. Monthly In-Hand'],
      rows: [
        ['₹8,00,000 (₹8 Lakh)', '₹7,25,000', '₹0 (Sec 87A Rebate)', '₹63,800 / mo'],
        ['₹10,00,000 (₹10 Lakh)', '₹9,25,000', '₹0 (Sec 87A Rebate)', '₹79,500 / mo'],
        ['₹12,75,000 (₹12.75 Lakh)', '₹12,00,000', '₹0 (Sec 87A Rebate)', '₹1,01,200 / mo'],
        ['₹15,00,000 (₹15 Lakh)', '₹14,25,000', '₹97,500 (incl. 4% Cess)', '₹1,12,800 / mo'],
        ['₹20,00,000 (₹20 Lakh)', '₹19,25,000', '₹1,95,000 (incl. 4% Cess)', '₹1,46,200 / mo'],
        ['₹25,00,000 (₹25 Lakh)', '₹24,25,000', '₹3,35,400 (incl. 4% Cess)', '₹1,75,500 / mo'],
      ],
    };
  }
  if (slug.includes('ppf') || slug.includes('fd') || slug.includes('rd')) {
    return {
      heading: `${title} — Safe Fixed-Income Maturity Benchmarks (2026)`,
      caption: 'Projected tax-free PPF (@ 7.1%) and taxable Bank FD (@ 7.25%) outcomes across multi-year horizons.',
      headers: ['Instrument & Rate', '5 Years Horizon', '10 Years Horizon', '15 Years Horizon', 'Tax Treatment'],
      rows: [
        ['PPF (₹1.5L/yr @ 7.10%)', '₹9,30,104', '₹22,12,069', '₹40,68,209', 'EEE (100% Tax-Free)'],
        ['Bank FD (₹10L @ 7.25%)', '₹14,32,262', '₹20,51,375', '₹29,38,108', 'Taxed at Slab Rate'],
        ['Post Office RD (₹10k/mo @ 6.7%)', '₹7,13,659', '₹17,08,546', '—', 'Taxed at Slab Rate'],
        ['Senior Citizen SCSS (₹15L @ 8.2%)', '₹30,750 / quarter payout', 'Renewable 3-Yr Block', '—', 'Sec 80TTB ₹50k Exempt'],
      ],
    };
  }
  if (slug.includes('inflation') || slug.includes('retirement') || slug.includes('rule-of-72')) {
    return {
      heading: `${title} — Inflation Erosion & Rule of 72 Benchmarks`,
      caption: 'How 6%–7% inflation reduces purchasing power and the years needed to double wealth.',
      headers: ['Annual Rate (%)', 'Years to Double (Rule of 72)', 'Value of ₹10 Lakh in 10 Yrs', 'Value of ₹10 Lakh in 20 Yrs'],
      rows: [
        ['6.0% Annual', '12.0 Years', '₹17,90,848 (or ₹5.58L purchasing power)', '₹32,07,135 (or ₹3.12L real)'],
        ['7.0% Annual', '10.3 Years', '₹19,67,151 (or ₹5.08L purchasing power)', '₹38,69,684 (or ₹2.58L real)'],
        ['10.0% Annual', '7.2 Years', '₹25,93,742 nominal corpus', '₹67,27,500 nominal corpus'],
        ['12.0% Annual', '6.0 Years', '₹31,05,848 nominal corpus', '₹96,46,293 nominal corpus'],
      ],
    };
  }
  if (slug.includes('margin') || slug.includes('roi') || slug.includes('break-even') || slug.includes('discount')) {
    return {
      heading: `${title} — Markup vs Gross Margin & Discount Benchmarks`,
      caption: 'Quick reference converting cost-plus markup percentages into true revenue gross margins.',
      headers: ['Cost-Plus Markup', 'Gross Margin on Selling Price', 'Selling Price (Cost = ₹1,000)', 'Net Profit Earned'],
      rows: [
        ['20% Markup', '16.67% Gross Margin', '₹1,200', '₹200'],
        ['25% Markup', '20.00% Gross Margin', '₹1,250', '₹250'],
        ['50% Markup', '33.33% Gross Margin', '₹1,500', '₹500'],
        ['100% Markup (2×)', '50.00% Gross Margin', '₹2,000', '₹1,000'],
      ],
    };
  }
  if (cat === 'finance') {
    return {
      heading: `${title} — Compounding Wealth Reference Table (@ 12% p.a.)`,
      caption: 'Projected maturity corpus across monthly investment levels and multi-year horizons.',
      headers: ['Monthly Investment', '5 Years Corpus', '10 Years Corpus', '15 Years Corpus', '20 Years Corpus'],
      rows: [
        ['₹2,000 / month', '₹1,64,973', '₹4,64,678', '₹10,09,152', '₹19,98,296'],
        ['₹5,000 / month', '₹4,12,432', '₹11,61,695', '₹25,22,880', '₹49,95,740'],
        ['₹10,000 / month', '₹8,24,864', '₹23,23,391', '₹50,45,760', '₹99,91,479'],
        ['₹25,000 / month', '₹20,62,159', '₹58,08,477', '₹1,26,14,400', '₹2,49,78,698'],
        ['₹50,000 / month', '₹41,24,318', '₹1,16,16,954', '₹2,52,28,800', '₹4,99,57,396'],
      ],
    };
  }
  if (slug.includes('attendance')) {
    return {
      heading: `${title} — College 75% Mandatory Attendance Buffer Table`,
      caption: 'Classes you must attend consecutively or can skip safely to maintain 75% eligibility.',
      headers: ['Current Attendance %', 'Total Held Classes', 'Classes Attended', 'Action Required for 75%'],
      rows: [
        ['85% Safe Buffer', '100 Classes', '85 Attended', 'Can skip next 13 classes safely'],
        ['80% Safe Buffer', '100 Classes', '80 Attended', 'Can skip next 6 classes safely'],
        ['75% Borderline', '100 Classes', '75 Attended', '0 skips left — attend next class'],
        ['70% Shortfall', '100 Classes', '70 Attended', 'Attend next 20 classes continuously'],
      ],
    };
  }
  if (cat === 'student') {
    return {
      heading: `${title} — CGPA to Percentage & Grade Reference Table`,
      caption: 'Standard academic conversion benchmarks across CBSE, UGC, VTU, AICTE, and 4.0 GPA scales.',
      headers: ['10-Point CGPA', 'CBSE / UGC (× 9.5)', 'AICTE / GTU ((CGPA−0.5)×10)', 'VTU ((CGPA−0.75)×10)', 'US 4.0 GPA Scale'],
      rows: [
        ['6.5 CGPA', '61.75%', '60.00%', '57.50%', '2.60 GPA (B−)'],
        ['7.0 CGPA', '66.50%', '65.00%', '62.50%', '2.80 GPA (B)'],
        ['7.5 CGPA', '71.25%', '70.00%', '67.50%', '3.00 GPA (B)'],
        ['8.0 CGPA', '76.00%', '75.00%', '72.50%', '3.20 GPA (B+)'],
        ['8.5 CGPA', '80.75%', '80.00%', '77.50%', '3.40 GPA (A−)'],
        ['9.0 CGPA', '85.50%', '85.00%', '82.50%', '3.65 GPA (A)'],
      ],
    };
  }
  if (slug.includes('compress-image') || slug.includes('resize-image')) {
    return {
      heading: `${title} — Official Indian Exam Photo & Signature Specs (2026)`,
      caption: 'Required KB file sizes and pixel dimensions for SSC, UPSC, IBPS, NEET, and PAN portals.',
      headers: ['Exam / Portal Name', 'Photo Size Limit', 'Dimensions (Width × Height)', 'Signature Size Limit'],
      rows: [
        ['SSC CGL / CHSL / MTS', '20 KB – 50 KB JPEG', '3.5 cm × 4.5 cm (200×230 px)', '10 KB – 20 KB JPEG'],
        ['UPSC CSE / NDA / CDS', '20 KB – 300 KB JPEG', '350×350 px to 1000×1000 px', '20 KB – 300 KB JPEG'],
        ['IBPS PO / Clerk & SBI PO', '20 KB – 50 KB JPEG', '200 × 230 pixels', '10 KB – 20 KB (140×60 px)'],
        ['NTA NEET UG & JEE Main', '10 KB – 200 KB JPEG', 'Passport 3.5 × 4.5 cm', '4 KB – 30 KB JPEG'],
        ['PAN Card (NSDL / UTIITSL)', 'Under 50 KB JPEG', '213 × 213 px @ 300 DPI', 'Under 50 KB (400×200 px)'],
      ],
    };
  }
  if (cat === 'image' || cat === 'video') {
    return {
      heading: `${title} — Standard Web, Print & 16:9 Media Resolution Guide`,
      caption: 'Exact pixel dimensions, aspect ratios, and format trade-offs for browser media tools.',
      headers: ['Format / Preset', 'Pixel Dimensions', 'Aspect Ratio', 'Best Use Case'],
      rows: [
        ['4K UHD / YouTube Max', '3840 × 2160 px', '16:9', '4K displays & high-DPI archival'],
        ['Full HD Thumbnail', '1280 × 720 px', '16:9', 'YouTube maxresdefault thumbnails'],
        ['Passport Photo (300 DPI)', '413 × 531 px (3.5×4.5 cm)', '7:9', 'Indian Govt & Visa applications'],
        ['JPEG vs PNG', 'Lossy vs Lossless Alpha', 'Any', 'Photos (JPEG) vs Transparent Logos (PNG)'],
      ],
    };
  }
  if (cat === 'pdf') {
    return {
      heading: `${title} — Government & Portal PDF Upload Specifications`,
      caption: 'Standard A4 print dimensions and PDF file size caps used across Indian portals.',
      headers: ['Portal / Document Type', 'Max PDF File Size', 'Recommended Page Spec', 'Processing Engine'],
      rows: [
        ['SSC / UPSC ID & Certificates', '50 KB – 300 KB', 'A4 (210×297 mm), 150 DPI', 'Client-side PDF-Lib'],
        ['NTA NEET / JEE Documents', '50 KB – 300 KB', 'Single or Multi-Page PDF', '100% Local RAM'],
        ['NSDL PAN Supporting Proof', 'Under 300 KB – 1 MB', 'A4 Readable Scan (200 DPI)', 'Zero Server Upload'],
        ['Passport / EPFO / DigiLocker', '500 KB – 2 MB', 'Standard A4 Portrait', 'Instant Browser Export'],
      ],
    };
  }
  if (slug.includes('bmr') || slug.includes('tdee') || slug.includes('calorie') || slug.includes('macro') || slug.includes('water')) {
    return {
      heading: `${title} — Daily Energy, Activity Multiplier & Hydration Benchmarks`,
      caption: 'Standard Harris-Benedict / Mifflin-St Jeor activity factors and protein/water daily targets.',
      headers: ['Activity Level', 'TDEE Multiplier (× BMR)', 'Fat Loss Deficit Target', 'Daily Protein & Hydration'],
      rows: [
        ['Sedentary (Desk Job)', '1.20 × BMR', '−300 to −400 kcal / day', '1.2 g/kg protein · 35 ml/kg water'],
        ['Lightly Active (1–3d/wk)', '1.375 × BMR', '−400 to −500 kcal / day', '1.5 g/kg protein · +400 ml water'],
        ['Moderately Active (3–5d/wk)', '1.55 × BMR', '−500 kcal / day', '1.8 g/kg protein · +600 ml water'],
        ['Very Active (6–7d/wk)', '1.725 × BMR', '−500 to −600 kcal / day', '2.0 g/kg protein · +800 ml water'],
      ],
    };
  }
  if (cat === 'health') {
    return {
      heading: `${title} — Clinical WHO vs Asian-Indian Health Thresholds`,
      caption: 'Comparison of WHO International and ICMR Asian-Indian clinical reference brackets.',
      headers: ['Classification', 'WHO Global BMI Range', 'Asian-Indian (ICMR) Range', 'Recommended Action'],
      rows: [
        ['Underweight', 'Below 18.5 kg/m²', 'Below 18.5 kg/m²', '+300 to +500 kcal/day nutrient surplus'],
        ['Normal / Healthy Weight', '18.5 – 24.9 kg/m²', '18.5 – 22.9 kg/m²', 'Maintenance TDEE + 150 min/wk movement'],
        ['Overweight / At-Risk', '25.0 – 29.9 kg/m²', '23.0 – 24.9 kg/m²', '−300 kcal/day + resistance exercise'],
        ['Obesity Class I+', '30.0+ kg/m²', '25.0+ kg/m²', 'Structured −500 kcal deficit + medical check'],
      ],
    };
  }
  if (cat === 'developer') {
    return {
      heading: `${title} — Developer Encoding, Entropy & Standards Benchmark`,
      caption: 'Technical specification constants enforced inside ToolPixa browser developer tools.',
      headers: ['Standard / Metric', 'Key Parameter', 'Bit / Size Capacity', 'Compliance'],
      rows: [
        ['UTF-8 / Base64 Encoding', '3 Raw Bytes → 4 ASCII Chars', '~33% Payload Expansion', 'RFC 4648 Standard'],
        ['UUID v4 / CSPRNG Password', 'crypto.getRandomValues()', '122–128 Bits Entropy', 'RFC 4122 / NIST SP 800-63B'],
        ['JSON / Color Spaces', 'HEX (#RRGGBB) ↔ RGB / HSL', '24-bit True Color (16.7M)', 'RFC 8259 / W3C CSS Color'],
        ['QR Error Correction', 'Levels L (7%) to H (30%)', 'Up to 4,296 Alphanumeric Chars', 'ISO/IEC 18004'],
      ],
    };
  }
  return {
    heading: `${title} — Precision Conversion & Benchmark Reference`,
    caption: 'Exact NIST, BIPM, and ISO reference equivalents used by this browser utility.',
    headers: ['Measurement Domain', 'Metric / SI Reference', 'Imperial / Alternate Equivalent', 'Standard'],
    rows: [
      ['Length & Area', '1 m = 100 cm · 1 Acre = 4,046.86 m²', '1 ft = 0.3048 m · 1 Acre = 43,560 sq ft', 'NIST Exact Constant'],
      ['Mass & Volume', '1 kg = 1,000 g · 1 L = 1,000 mL', '1 lb = 0.453592 kg · 1 US Gal = 3.7854 L', 'BIPM International System'],
      ['Temperature & Speed', '0 °C = 32 °F = 273.15 K', '100 km/h = 62.137 mph = 27.778 m/s', 'ITS-90 / SI Derived'],
      ['Time & Number Base', '1 Day = 86,400 Seconds', 'Binary (Base 2) ↔ Hex (Base 16)', 'IEEE 754 Double Precision'],
    ],
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toolData = toolsRegistry[slug];

  if (!toolData) {
    notFound();
  }

  const catLower = toolData.category.toLowerCase();
  const isCalculatorCategory = ['finance', 'health', 'student'].includes(catLower);
  const displayHeading =
    isCalculatorCategory &&
    !toolData.title.toLowerCase().includes('calculator') &&
    !toolData.title.toLowerCase().includes('timer') &&
    !toolData.title.toLowerCase().includes('generator') &&
    !toolData.title.toLowerCase().includes('estimator') &&
    !toolData.title.toLowerCase().includes('forecaster') &&
    !toolData.title.toLowerCase().includes('converter') &&
    !toolData.title.toLowerCase().includes('solver')
      ? `${toolData.title} Calculator`
      : toolData.title;

  let faqs = toolData.faqs || [];
  if (faqs.length < 3) {
    const defaultFaqs = [
      { question: `What is the ${toolData.title} and what does it calculate?`, answer: `${toolData.description} It uses ${toolData.formulaTitle || 'verified mathematical models'} so you can evaluate scenarios instantaneously in your browser.` },
      { question: `Is the ${toolData.title} completely free to use?`, answer: `Yes, the ${toolData.title} on ToolPixa is 100% free with zero daily usage caps, watermarks, or registration walls.` },
      { question: `How accurate is the ${toolData.title}?`, answer: `The ${toolData.title} implements the ${toolData.formulaTitle || 'standard industry equation'} (${toolData.formula || 'IEEE 754 double-precision math'}) for exact, reproducible results.` },
      { question: `Does my data stay private when using ${toolData.title}?`, answer: `Yes. Every calculation and file operation in ${toolData.title} runs locally inside your browser's JavaScript engine. Your inputs and files are never uploaded to an external server.` }
    ];
    const newFaqs = [...faqs];
    for (let i = 0; newFaqs.length < 4 && i < defaultFaqs.length; i++) {
      if (!newFaqs.find(f => f.question === defaultFaqs[i].question)) {
        newFaqs.push(defaultFaqs[i]);
      }
    }
    faqs = newFaqs;
  }

  const ToolComponent = calculators[slug as keyof typeof calculators];

  if (!ToolComponent) {
    return <div className="p-xl text-center">Tool under construction</div>;
  }

  const baseUrl = 'https://www.toolpixa.space';
  const competitorLabel = getCompetitorLabel(toolData.category);
  const relatedBlog = getRelatedBlog(slug, toolData.category);
  const legendItems = toolData.formulaLegend || [];

  // Generate JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': baseUrl },
          { '@type': 'ListItem', 'position': 2, 'name': toolData.category, 'item': `${baseUrl}/category/${catLower}` },
          { '@type': 'ListItem', 'position': 3, 'name': toolData.title, 'item': `${baseUrl}/tools/${slug}` }
        ]
      },
      {
        '@type': 'WebApplication',
        'name': toolData.title,
        'description': toolData.seoDescription || toolData.description,
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'url': `${baseUrl}/tools/${slug}`,
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'INR'
        }
      },
      ...(faqs.length > 0 ? [{
        '@type': 'FAQPage',
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': typeof faq.answer === 'string' ? faq.answer : toolData.description
          }
        }))
      }] : [])
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-xxl pb-xxxl">
        <section className="max-w-7xl mx-auto px-margin items-start">
          {/* Breadcrumb Navigation */}
          <nav className="text-sm font-label-md text-text-secondary mb-md flex items-center gap-xs">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href={`/category/${catLower}`} className="hover:text-primary transition-colors capitalize">{toolData.category}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-text-primary capitalize">{toolData.title}</span>
          </nav>
          
          <div className="fade-in-up mb-xl flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-md flex-1">
              <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
                {displayHeading}
              </h1>
              <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl">{toolData.description}</p>
            </div>
            <div className="shrink-0 pt-2">
              <ShareButton title={toolData.title} />
            </div>
          </div>
          
          <ToolComponent />

          {/* Monetization & Cross-Pollination Banner */}
          <div className="mt-xl grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Amazon Affiliate */}
            <div className="glass-card rounded-2xl p-lg flex flex-col justify-between border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent hover:border-orange-500/40 transition-all">
              <div>
                <h2 className="font-headline-sm text-text-primary mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-400">shopping_bag</span>
                  Recommended Books & Gear for {toolData.title}
                </h2>
                <p className="text-text-secondary text-sm mb-4">Explore top-rated reference guides and tools on Amazon related to {toolData.title.toLowerCase()}.</p>
              </div>
              <a 
                href={`https://www.amazon.in/s?k=${getAmazonSearchQuery(slug, toolData.category)}&tag=toolpixa-21`}
                target="_blank" 
                rel="sponsored noopener"
                className="amazon-affiliate-link w-full py-3 bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-black font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Shop on Amazon <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>

            {/* External Authority Affiliate */}
            <div className="glass-card rounded-2xl p-lg flex flex-col justify-between border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/40 transition-all">
              <div>
                <h2 className="font-headline-sm text-text-primary mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400">{getExternalLink(toolData.category).icon}</span>
                  Recommended {toolData.category.charAt(0).toUpperCase() + toolData.category.slice(1)} Partner
                </h2>
                <p className="text-text-secondary text-sm mb-4">Take the next step after using {toolData.title} with {getExternalLink(toolData.category).name}&apos;s specialized platform.</p>
              </div>
              <a 
                href={getExternalLink(toolData.category).url}
                target="_blank" 
                rel="sponsored noopener"
                className={`w-full py-3 bg-gradient-to-r ${getExternalLink(toolData.category).color} text-white font-bold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
              >
                Visit {getExternalLink(toolData.category).name} <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-margin mt-xxl space-y-xxl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
            <div className="lg:col-span-2 space-y-lg">
              <h2 className="font-headline-lg text-headline-lg text-text-primary">
                How the {toolData.title} Works &amp; Methodology
              </h2>
              <div className="prose dark:prose-invert max-w-none space-y-md">
                <p className="font-body-lg text-body-lg text-text-secondary leading-relaxed">
                  {catLower === 'pdf' 
                    ? `The ${toolData.title} processes your PDF documents 100% locally inside your web browser using WebAssembly and the PDF-Lib document engine. When you select a file, the tool parses the internal page tree and byte streams directly in your device's RAM without uploading your sensitive files to any cloud server. Whether you are working with legal contracts, bank statements, or academic papers, ${toolData.title} delivers instant output with zero privacy risk.`
                    : catLower === 'image'
                    ? `The ${toolData.title} utilizes your browser's hardware-accelerated HTML5 Canvas and Web Worker APIs to transform image pixels directly on your device. By decoding the source bitmap in memory and applying target compression, dimension scaling, or color-space conversion algorithms locally, ${toolData.title} achieves exact file-size and resolution targets without server queues or quality loss.`
                    : `The ${toolData.title} is built around the ${toolData.formulaTitle || 'standard mathematical model'} (${toolData.formula || 'exact floating-point computation'}). As you adjust the input parameters${legendItems.length > 0 ? ` — such as ${legendItems.map(l => `${l.desc} (${l.label})`).join(', ')} —` : ''}, the engine recalculates the output in real time so you can compare multiple scenarios side by side without page reloads.`}
                </p>

                <div className="glass-card p-lg rounded-xl border border-glass-border space-y-3">
                  <h3 className="font-headline-md text-lg font-bold text-text-primary">
                    Step-by-Step Guide to Using {toolData.title}
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-text-secondary font-body-md">
                    <li>
                      <strong className="text-text-primary">Enter Your Inputs:</strong>{' '}
                      {legendItems.length > 0
                        ? `Provide values for ${legendItems.map(l => l.desc.toLowerCase()).join(', ')} in the interactive fields above.`
                        : `Select your source file or enter your input values into the ${toolData.title} workspace above.`}
                    </li>
                    <li>
                      <strong className="text-text-primary">Review Real-Time Output:</strong>{' '}
                      The {toolData.title} immediately applies the {toolData.formulaTitle || 'underlying algorithm'} and updates all summary cards, breakdowns, and visual charts.
                    </li>
                    <li>
                      <strong className="text-text-primary">Compare, Save, or Export:</strong>{' '}
                      Adjust parameters to test edge cases, save the calculation to your browser history, or share/download the output for your records.
                    </li>
                  </ol>
                </div>

                {legendItems.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-2">
                    {legendItems.map((legend, idx) => (
                      <div key={idx} className="glass-card p-md rounded-lg border border-glass-border">
                        <h3 className="font-headline-md text-headline-md text-primary mb-xs font-mono">{legend.label}</h3>
                        <p className="font-body-md text-body-md text-text-secondary">{legend.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {toolData.formula && (
              <div className="glass-card p-lg rounded-xl flex flex-col justify-center border border-glass-border">
                <h2 className="font-headline-md text-headline-md text-text-primary mb-md">{toolData.formulaTitle || 'Mathematical Formula'}</h2>
                <div className="bg-surface-container-lowest p-md rounded-lg border border-glass-border">
                  <p className="font-code-sm text-code-sm text-primary mb-md text-center py-sm break-words">{toolData.formula}</p>
                  <ul className="space-y-xs font-body-md text-body-md text-text-secondary">
                    {legendItems.map((legend, idx) => (
                      <li key={idx}><span className="font-bold text-text-primary font-mono">{legend.label}:</span> {legend.desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Pre-Calculated Quick Reference Table for Featured Snippets */}
          {(() => {
            const refTable = getQuickReferenceTable(slug, toolData.category, toolData.title);
            return (
              <div className="glass-card rounded-xl p-xl border border-glass-border">
                <h2 className="font-headline-md text-headline-md text-text-primary mb-1">
                  {refTable.heading}
                </h2>
                <p className="font-body-md text-text-secondary mb-lg">
                  {refTable.caption}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-glass-border bg-surface-container-high/50">
                        {refTable.headers.map((h, i) => (
                          <th key={i} className="py-3 px-4 font-headline-sm text-text-primary font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {refTable.rows.map((r, rIdx) => (
                        <tr key={rIdx} className="border-b border-glass-border/50 last:border-0 hover:bg-surface-container/40 transition-colors">
                          {r.map((cell, cIdx) => (
                            <td key={cIdx} className={`py-3 px-4 tabular-nums ${cIdx === 0 ? 'font-bold text-text-primary' : 'text-text-secondary font-mono'}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          <div className="space-y-lg">
            <h2 className="font-headline-lg text-headline-lg text-text-primary">
              Frequently Asked Questions About {toolData.title}
            </h2>
            <FaqAccordion faqs={faqs.map(faq => ({ question: faq.question, answer: <p>{faq.answer}</p> }))} />
          </div>

          {/* Category-Aware Comparison Box */}
          <div className="mt-xxl glass-card rounded-xl p-xl border border-glass-border">
            <h2 className="font-headline-md text-headline-md text-text-primary mb-md">
              Why Use ToolPixa&apos;s {toolData.title} vs. {competitorLabel}?
            </h2>
            <p className="font-body-md text-text-secondary mb-lg">
              Most online {catLower} utilities either lock features behind a paywall, upload your private data to remote servers, or clutter the screen with pop-ups. Here is how the ToolPixa {toolData.title} compares:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="py-3 px-4 font-headline-sm text-text-primary">Capability</th>
                    <th className="py-3 px-4 font-headline-sm text-primary">ToolPixa {toolData.title}</th>
                    <th className="py-3 px-4 font-headline-sm text-text-secondary">{competitorLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">Execution &amp; Data Privacy</td>
                    <td className="py-3 px-4 text-emerald-500 font-medium">100% Client-Side Browser Processing</td>
                    <td className="py-3 px-4 text-rose-400">Server Uploads &amp; Lead Tracking</td>
                  </tr>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">Formula Transparency</td>
                    <td className="py-3 px-4 text-emerald-500 font-medium">{toolData.formulaTitle || 'Open Verified Equations'}</td>
                    <td className="py-3 px-4 text-rose-400">Black-Box Calculation</td>
                  </tr>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">Account / Paywall Limits</td>
                    <td className="py-3 px-4 text-emerald-500 font-medium">Unlimited &amp; Free Forever</td>
                    <td className="py-3 px-4 text-rose-400">Daily Task Caps / Sign-Up Required</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-secondary">Speed &amp; Responsiveness</td>
                    <td className="py-3 px-4 text-emerald-500 font-medium">Instant Real-Time Recalculation</td>
                    <td className="py-3 px-4 text-rose-400">Slow Page Reloads</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Internal Blog Cross-Pollination */}
          <div className="mt-xl glass-card rounded-xl p-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50">
                <span className="material-symbols-outlined text-primary">auto_stories</span>
              </div>
              <div>
                <h3 className="font-headline-md text-text-primary mb-1">Deep Dive: {relatedBlog.title}</h3>
                <p className="font-body-sm text-text-secondary">Read our comprehensive guide and step-by-step strategies related to {toolData.title}.</p>
              </div>
            </div>
            <Link 
              href={`/blog/${relatedBlog.slug}`}
              className="mt-2 md:mt-0 shrink-0 px-6 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all font-label-md font-semibold"
            >
              Read Article
            </Link>
          </div>
          
          {/* Pre-Calculated Exact Amount & Exam Lookup Tables */}
          {(() => {
            const directMatches = Object.values(programmaticPages).filter((p) => p.toolSlug === slug);
            const fallbackMatches = Object.values(programmaticPages).filter((p) => {
              if (catLower === 'finance') return ['home-loan', 'salary', 'fd', 'sip', 'loan'].includes(p.category);
              if (catLower === 'student') return p.category === 'cgpa' || p.category === 'exam';
              if (catLower === 'image' || catLower === 'pdf') return p.category === 'exam';
              return true;
            });
            const tablesToShow = (directMatches.length > 0 ? directMatches : fallbackMatches).slice(0, 12);

            return (
              <div className="mt-xxl glass-card rounded-2xl p-lg border border-glass-border">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-md border-b border-glass-border pb-3">
                  <div>
                    <h2 className="font-headline-md text-xl font-bold text-text-primary">
                      Exact Pre-Calculated Reference Tables &amp; Schedules
                    </h2>
                    <p className="text-xs text-text-secondary">
                      Instant lookup tables for popular loan amounts, CTC packages, SIP goals, and exam dimensions:
                    </p>
                  </div>
                  <Link href="/calculate" className="text-xs font-label-md text-primary hover:underline shrink-0">
                    All 105 Reference Tables →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {tablesToShow.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/calculate/${item.slug}`}
                      className="p-3 rounded-xl bg-surface-container border border-glass-border hover:border-primary text-xs font-medium text-text-secondary hover:text-text-primary transition-colors truncate"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Related Tools */}
          <div className="mt-xxxl pt-xl border-t border-glass-border">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-display-sm text-3xl font-bold text-text-primary capitalize">More {toolData.category} Tools</h2>
              <Link href={`/category/${catLower}`} className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
                View All {toolData.category} Tools <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
              {Object.entries(toolsRegistry)
                .filter(([key, t]) => t.category.toLowerCase() === catLower && key !== slug)
                .slice(0, 8)
                .map(([toolSlug, tool]) => (
                  <ToolCard
                    key={toolSlug}
                    tool={{...tool, id: toolSlug}}
                  />
                ))}
            </div>
          </div>

        </section>
      </main>
    </>
  );
}

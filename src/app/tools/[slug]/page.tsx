import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import FaqAccordion from '@/components/FaqAccordion';
import CurrencySymbol from '@/components/CurrencySymbol';
import { toolsRegistry } from '@/data/toolsRegistry';
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
  'gpa-forecaster': dynamic(() => import('@/components/tools/GpaCalculator')),
  'thesis-generator': dynamic(() => import('@/components/tools/ThesisGenerator')),
  'essay-length-estimator': dynamic(() => import('@/components/tools/EssayLengthEstimator')),
  'percentage-delta-calculator': dynamic(() => import('@/components/tools/PercentageCalculator')),
  'scientific-notation-converter': dynamic(() => import('@/components/tools/ScientificCalculator')),
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toolData = toolsRegistry[slug];
  if (!toolData) return {};
  
  const title = toolData.seoTitle || `${toolData.title} - Free Online ${toolData.category.charAt(0).toUpperCase() + toolData.category.slice(1)} Tool | ToolPixa`;
  const description = toolData.seoDescription || toolData.description;
  const canonicalUrl = `https://toolpixa.space/tools/${slug}`;

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
      type: 'website',
      siteName: 'ToolPixa',
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const toolData = toolsRegistry[slug];

  if (!toolData) {
    notFound();
  }


  let faqs = toolData.faqs || [];
  if (faqs.length < 7) {
    const defaultFaqs = [
      { question: `What is the ${toolData.title}?`, answer: `The ${toolData.title} is a precision tool designed to calculate and analyze relevant data accurately and instantly.` },
      { question: `Is the ${toolData.title} free to use?`, answer: `Yes, our ${toolData.title} is 100% free with no hidden charges, sign-ups, or subscriptions required.` },
      { question: `How accurate is the ${toolData.title}?`, answer: `We use industry-standard algorithms and precise mathematical formulas to ensure that the ${toolData.title} provides the highest level of accuracy.` },
      { question: `Can I use the ${toolData.title} on my mobile device?`, answer: `Absolutely! The ${toolData.title} is fully responsive and works seamlessly across all devices, including smartphones, tablets, and desktops.` },
      { question: `Do you save any of my data?`, answer: `No, all calculations and processing for the ${toolData.title} are performed directly in your browser. We do not store or track any of your personal input data.` },
      { question: `Who can benefit from using the ${toolData.title}?`, answer: `Anyone looking for quick, accurate results can use this tool. It's built for professionals, students, and everyday users who need reliable calculations without the hassle.` },
      { question: `How often is the ${toolData.title} updated?`, answer: `We regularly review and update all our tools, including the ${toolData.title}, to ensure formulas remain aligned with the latest standards and best practices.` },
      { question: `Is my input data secure?`, answer: `Yes, all inputs are completely secure because the computation happens locally on your device. We do not transmit or save your data to any external server.` },
      { question: `Can I share the results of the ${toolData.title}?`, answer: `Yes, you can easily copy your results or take a screenshot to share with your colleagues or friends.` },
      { question: `Are there any limitations to the ${toolData.title}?`, answer: `Our tool is built to handle standard inputs effectively. For extremely large or complex edge cases, always consult with a professional in the respective field.` }
    ];
    const newFaqs = [...faqs];
    for (let i = 0; newFaqs.length < 10 && i < defaultFaqs.length; i++) {
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

  
  // Generate JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://toolpixa.space' },
          { '@type': 'ListItem', 'position': 2, 'name': toolData.category, 'item': `https://toolpixa.space/category/${toolData.category.toLowerCase()}` },
          { '@type': 'ListItem', 'position': 3, 'name': toolData.title, 'item': `https://toolpixa.space/tools/${slug}` }
        ]
      },
      {
        '@type': 'WebApplication',
        'name': toolData.title,
        'description': toolData.description,
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'All',
        'url': `https://toolpixa.space/tools/${slug}`
      },
      ...(toolData.faqs && toolData.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        'mainEntity': toolData.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
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
            <Link href={`/category/${toolData.category.toLowerCase()}`} className="hover:text-primary transition-colors capitalize">{toolData.category}</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-text-primary capitalize">{toolData.title}</span>
          </nav>
          
          <div className="fade-in-up mb-xl flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-md flex-1">
              <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
                {toolData.title}{toolData.title.toLowerCase().includes('calculator') ? '' : ' Calculator'}
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
                  Shop Related Products
                </h2>
                <p className="text-text-secondary text-sm mb-4">Find top-rated equipment on Amazon India to support your needs.</p>
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
                  Recommended Platform
                </h2>
                <p className="text-text-secondary text-sm mb-4">Take the next step with {getExternalLink(toolData.category).name}'s specialized services.</p>
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
              <h2 className="font-headline-lg text-headline-lg text-text-primary">How it Works</h2>
              <div className="prose prose-invert max-w-none space-y-md">
                <p className="font-body-lg text-body-lg text-text-secondary">
                  {toolData.category.toLowerCase() === 'pdf' 
                    ? `The ${toolData.title} operates entirely client-side in your web browser. When you select a PDF document, our client-side processing script reads the file structure directly on your device, applies the requested actions (such as combining pages, splitting sheets, or compression), and generates a new download link. Since no files are sent to external servers, your data remains 100% secure and private.`
                    : toolData.category.toLowerCase() === 'image'
                    ? `The ${toolData.title} uses modern browser canvas and rendering APIs to process your graphics. When you load an image, it is drawn into an in-memory canvas element. The tool then applies mathematical transformations to compress, resize, flip, or rotate the pixels, and outputs the result in your requested format—all happening in real-time right on your computer.`
                    : `The ${toolData.title} uses verified algorithms and industry-standard equations to analyze your inputs. Adjust the sliders or fill in the input fields above, and the tool will instantly recalculate the values and update the visualizations, charts, or detailed schedules in real-time.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {toolData.formulaLegend?.map((legend, idx) => (
                    <div key={idx} className="glass-card p-md rounded-lg">
                      <h3 className="font-headline-md text-headline-md text-primary mb-xs">{legend.label}</h3>
                      <p className="font-body-md text-body-md text-text-secondary">{legend.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {toolData.formula && (
              <div className="glass-card p-lg rounded-xl flex flex-col justify-center">
                <h2 className="font-headline-md text-headline-md text-text-primary mb-md">{toolData.formulaTitle || 'The Formula'}</h2>
                <div className="bg-surface-container-lowest p-md rounded-lg border border-glass-border">
                  <p className="font-code-sm text-code-sm text-primary mb-md text-center py-sm">{toolData.formula}</p>
                  <ul className="space-y-xs font-body-md text-body-md text-text-secondary">
                    {toolData.formulaLegend?.map((legend, idx) => (
                      <li key={idx}><span className="font-bold text-text-primary">{legend.label}:</span> {legend.desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-lg">
            <h2 className="font-headline-lg text-headline-lg text-text-primary">Frequently Asked Questions</h2>
            <FaqAccordion faqs={faqs.map(faq => ({ question: faq.question, answer: <p>{faq.answer}</p> }))} />
          </div>

          {/* SEO Competitor Box */}
          <div className="mt-xxl glass-card rounded-xl p-xl border border-glass-border">
            <h3 className="font-headline-md text-headline-md text-text-primary mb-md">Why ToolPixa is the Best Choice</h3>
            <p className="font-body-md text-text-secondary mb-lg">
              When it comes to financial, educational, or utility planning, precision is key. Unlike alternatives from Groww, ClearTax, or generic ad-filled sites, the ToolPixa {toolData.title} is designed specifically for performance and privacy.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass-border">
                    <th className="py-3 px-4 font-headline-sm text-text-primary">Feature</th>
                    <th className="py-3 px-4 font-headline-sm text-primary">ToolPixa</th>
                    <th className="py-3 px-4 font-headline-sm text-text-secondary">Groww / Others</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">No Intrusive Ads</td>
                    <td className="py-3 px-4 text-green-400 font-medium">Yes (Clean Layout)</td>
                    <td className="py-3 px-4 text-red-400">Intrusive Pop-ups / Banners</td>
                  </tr>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">Data Privacy</td>
                    <td className="py-3 px-4 text-green-400 font-medium">Local Browser Only</td>
                    <td className="py-3 px-4 text-red-400">Stored on Servers</td>
                  </tr>
                  <tr className="border-b border-glass-border/50">
                    <td className="py-3 px-4 text-text-secondary">Sign-ups Required?</td>
                    <td className="py-3 px-4 text-green-400 font-medium">No</td>
                    <td className="py-3 px-4 text-red-400">Yes (Lead Capture)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-text-secondary">Speed & UI</td>
                    <td className="py-3 px-4 text-green-400 font-medium">Instant / Glassmorphic</td>
                    <td className="py-3 px-4 text-red-400">Slow / Generic</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Internal Blog Cross-Pollination */}
          <div className="mt-xl glass-card rounded-xl p-lg border border-primary/30 bg-gradient-to-r from-primary/10 to-transparent flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/50">
                <span className="material-symbols-outlined text-primary">auto_stories</span>
              </div>
              <div>
                <h3 className="font-headline-md text-text-primary mb-1">Deep Dive: {getRelatedBlog(slug, toolData.category).title}</h3>
                <p className="font-body-sm text-text-secondary">Read our comprehensive guide and strategies related to this calculator.</p>
              </div>
            </div>
            <a 
              href={`/blog/${getRelatedBlog(slug, toolData.category).slug}`}
              className="mt-4 md:mt-0 shrink-0 px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all font-label-md"
            >
              Read Article
            </a>
          </div>
          
          {/* Related Tools */}
          <div className="mt-xxxl pt-xl border-t border-glass-border">
            <h2 className="font-display-sm text-3xl font-bold text-text-primary mb-lg">More {toolData.category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
              {Object.entries(toolsRegistry)
                .filter(([key, t]) => t.category === toolData.category && key !== slug)
                .slice(0, 4)
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

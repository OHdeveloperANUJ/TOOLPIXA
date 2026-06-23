---
name: ToolPixa Master Build Skill
description: Read this before building or modifying ANY tool, page, or blog on ToolPixa. Single source of truth.
---

# ToolPixa Master Build Skill
# Antigravity reads this before building ANYTHING on ToolPixa
# Version 1.0 — Single source of truth — never contradict this file

---

## WHO YOU ARE BUILDING FOR

Site: toolpixa.space
Stack: Next.js (TypeScript, TSX)
Purpose: Free online calculator and tool hub
Audience: Indian users primarily, global secondary
Monetization: Affiliate links (Groww, Amazon, BankBazaar, PolicyBazaar)
Ad network: Adsterra (when connected)
Amazon tag: toolpixa-21

---

## ABSOLUTE RULES — NEVER VIOLATE THESE

### Rule 1 — Tool count claim
NEVER write "600+ tools" or any specific number in title tags or hero text.
The count changes as tools are added. Use: "Free Online Calculators & Tools"
If a count must appear, read it dynamically from the tools registry.

### Rule 2 — Ad-free claim
NEVER write "Ad-Free Experience: Yes" or "100% Clean" anywhere.
The site has affiliate links and will have display ads.
This claim is false and destroys credibility.
Allowed: "No signup required" and "Free to use"

### Rule 3 — Title tags
EVERY tool page must have a UNIQUE title tag.
Format: "[Specific Tool Name] - Free Online [Type] | ToolPixa"
Examples:
  CORRECT: "Home Loan EMI Calculator - Free Online Loan Tool | ToolPixa"
  WRONG:   "ToolPixa | 600+ Precision Calculators & Tools"
No two pages on the site should ever share the same title tag.

### Rule 4 — Footer links
NEVER use href="#" for navigation links in the footer.
If a tool page does not exist yet, omit the link entirely.
Do not add placeholder links. Only link to pages that actually exist.

### Rule 5 — No boilerplate content
NEVER use generic filler content like:
  "A [Tool Name] consists of components defined by its mathematical formula."
  "This tool automates complex calculations so you can focus on learning."
  "Enter your values and click calculate to see results."
Every "How it Works" section must explain THIS specific tool's logic.
Every FAQ must answer questions specific to THIS tool, not generic calculators.

### Rule 6 — Female formulas
When building any health tool that uses BMR, calorie, or body composition:
ALWAYS include BOTH male and female formulas.
Mifflin-St Jeor BMR:
  Men:   (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
  Women: (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
Never show only the male formula.

### Rule 7 — Currency default
Default currency is always ₹ (INR) for all Indian financial tools.
USD or other currencies only appear if user explicitly selects them.
The currency selector must default to INR on page load.

### Rule 8 — Blog to tool linking
Blog articles linked from a tool page must be topically relevant.
A health tool (BMI, Calorie) links only to health/fitness blog articles.
A finance tool (EMI, SIP) links only to finance blog articles.
Never auto-assign blog links without checking topic match.

---

## EVERY TOOL PAGE — REQUIRED STRUCTURE

Build every tool page in this exact order.
Do not add sections. Do not remove sections. Do not reorder.

```
1. BREADCRUMB
   Home > [Category] > [Tool Name]
   All three levels are clickable links.
   Breadcrumb schema included in JSON-LD.

2. H1 — Tool name only
   One H1 per page. Matches the tool's primary search keyword.
   Example: "Home Loan EMI Calculator"

3. ONE-LINE DESCRIPTION
   What this tool calculates and who it's for.
   Example: "Calculate your monthly home loan EMI instantly. 
   Enter loan amount, interest rate, and tenure."

4. THE CALCULATOR (above fold — user must not scroll to reach it)
   - Input fields with floating labels
   - inputmode="decimal" on all number fields
   - Calculation fires on every input change (no submit button)
   - Result card shows immediately
   - Primary result in large bold text
   - 2-3 secondary results below
   - Chart if the tool has 3+ result components

5. ACTION ROW (directly below result)
   - Copy Result button → copies to clipboard → shows "Copied ✓" for 2s
   - WhatsApp Share button → opens pre-formatted message
   - Reset button → clears all fields and results
   - PDF Download button (on EMI and finance tools)

6. HOW IT WORKS — 3 numbered steps
   Step 1: What the user enters
   Step 2: What the formula does with it
   Step 3: How to read the result
   Must be specific to THIS tool. No generic text.

7. FORMULA BOX
   Show the actual mathematical formula used.
   Show variable definitions.
   For health tools: show BOTH male and female versions.
   Cite the source (e.g. "Formula per RBI reducing balance method")

8. REAL INDIAN EXAMPLE
   One complete worked example with:
   - A real Indian first name
   - A real Indian city
   - Realistic numbers (not round numbers like 100000)
   - The complete calculation shown step by step
   - The final result clearly stated
   This example must be UNIQUE — not reused from any other tool.

9. AMORTIZATION TABLE (EMI tools only)
   Show month-by-month breakdown:
   Month | Payment | Principal | Interest | Balance
   Show first 12 months by default.
   "Show All Months" button to expand.
   "Download CSV" button.

10. FAQ SECTION
    Minimum 5 questions. Maximum 10.
    Rules for FAQ content:
    - At least 1 question phrased exactly as Indians type it in Google
    - At least 1 question about the formula or calculation method
    - At least 1 question about the tool's limitations or accuracy
    - No question can be answered with "yes" or "no" only
    - No generic answers like "this tool helps you calculate things"
    FAQPage JSON-LD schema required for all FAQ questions and answers.

11. RELATED TOOLS (4 tools only)
    Must be genuinely related by topic, not just same category.
    All 4 links must point to pages that actually exist.
    No href="#" links.

12. AFFILIATE CTA (where applicable — see affiliate rules below)
    Only on tools where a natural match exists.
    Use rel="sponsored noopener" on all affiliate links.
    Never describe affiliate links as "recommendations" without disclosure.

13. DISCLAIMER (finance and health tools only)
    One line, below affiliate CTA:
    "Results are estimates only. Consult a qualified financial advisor 
    / doctor before making decisions based on these calculations."
```

---

## SEO REQUIREMENTS — EVERY TOOL PAGE

### Title Tag
Format: "[Tool Name] - Free Online [Type] | ToolPixa"
Length: 50-60 characters
Must include primary keyword
Must be unique across all pages

### Meta Description
Length: 140-155 characters exactly
Must include: tool name, what it calculates, "free", "no signup"
Must be unique across all pages
Example: "Free Home Loan EMI Calculator. Calculate monthly EMI 
instantly with amortization table. No signup needed. Works in 
Hindi and English."

### Canonical URL
Format: https://toolpixa.space/tools/[tool-slug]
Always use the production domain, never the Vercel preview URL.

### Schema Markup (JSON-LD in <head>)
Required on every tool page:
1. WebApplication schema
2. FAQPage schema (using actual FAQ content)
3. BreadcrumbList schema

### H1, H2, H3 hierarchy
H1: Tool name (one per page)
H2: "How it Works", "Formula", "Example", "FAQ", "Related Tools"
H3: Individual FAQ questions
Never skip heading levels.

### Open Graph Tags
og:title — same as title tag
og:description — same as meta description
og:url — canonical URL
og:type — website
og:site_name — ToolPixa

---

## CALCULATOR BEHAVIOR REQUIREMENTS

### Input Fields
- inputmode="decimal" on all numeric inputs
- Minimum and maximum values set on every field
- Placeholder shows realistic example value
- Label floats above field when focused
- Error state shows friendly message, never technical error
- Empty field: show placeholder, not error

### Results
- Never show NaN, undefined, Infinity, or blank result
- Zero result: explain why (e.g. "Enter values above to see result")
- Negative result: show warning if not expected
- Very large numbers: format with Indian number system (₹1,00,00,000)
- Results update live on every keystroke — no submit button

### Error Messages (friendly, specific)
- Empty field: "Please enter your [field name]"
- Negative number: "[Field name] cannot be negative"
- Value too large: "Maximum [field name] is [limit]"
- Invalid format: "Please enter numbers only"
Never show: "Invalid input", "Error", "NaN", "undefined"

### Mobile Requirements
- Tool visible without scrolling on 375px width screen
- No horizontal scroll at any screen width
- All touch targets minimum 48px height
- Sliders work with thumb drag
- Font minimum 16px (prevents iOS auto-zoom)
- Test on actual mobile device before marking done

---

## ANIMATION REQUIREMENTS

Apply these to every tool page. Never skip.

### Number Counter
When result appears or updates:
Count up from 0 to final value over 800ms
Use easing: ease-out
Do not apply to input fields, only result displays

### Button States
Every button must have three states:
- Default: base style
- Hover: slight brightness increase + scale 1.02
- Active/Press: scale 0.96 (press down feel)
- Disabled: reduced opacity 0.5, no hover effects

### Result Card
When result appears for first time:
Fade in + slide up 8px over 300ms
On subsequent updates: number counter only, no re-animation

### Input Focus
On focus: soft glow border in brand color
On invalid: shake animation left-right 3 times over 300ms

### Slider Track Fill
Behind range slider thumb:
Filled portion = brand color
Empty portion = grey
Updates live as thumb moves

---

## AFFILIATE PLACEMENT RULES

### BankBazaar (bankbazaar.com affiliate link)
Place on: ALL EMI tools, ALL loan tools
CTA text: "Compare loan rates from 15+ banks free — no spam calls"
Button: "Check on BankBazaar →"
Position: Below result card, above "How it Works"
rel="sponsored noopener"

### Groww (groww.in referral link)
Place on: SIP Calculator, Lumpsum Calculator, Mutual Fund Calculator,
          SIP Delay Calculator, CAGR Calculator, Stock Average Calculator,
          Retirement Calculator, NPS Calculator
CTA text: "Ready to start investing? Open free Groww account in 2 minutes"
Button: "Start Investing on Groww →"
Position: Below result card, above "How it Works"
rel="sponsored noopener"

### Amazon (tag: toolpixa-21)
URL format: https://www.amazon.in/s?k=[search+term]&tag=toolpixa-21
NEVER use a specific product URL — always use search page URL
Search terms by tool:
  bmi-calculator → digital+weighing+scale+india
  calorie-calculator → kitchen+food+weighing+scale
  water-intake-calculator → water+bottle+1+litre+bpa+free
  scientific-calculator → casio+fx+991+calculator
  cgpa-to-percentage → engineering+placement+books
  pregnancy-due-date → pregnancy+guide+book+india
  target-heart-rate → fitness+band+smartwatch+india
  body-fat-calculator → fitness+equipment+india
  grade-calculator → study+planner+notebook
  word-counter → writing+tools+india
CTA text: "Shop related products on Amazon"
Button: "View on Amazon →"
Position: Below FAQ section
rel="sponsored noopener"

### PolicyBazaar (policybazaar affiliate link)
Place on: BMI Calculator, Calorie Calculator, Retirement Calculator,
          Income Tax Calculator, Body Fat Calculator
CTA text: "Protect your health with the right insurance plan"
Button: "Compare Plans Free →"
Position: Below result card
rel="sponsored noopener"

### DO NOT place any affiliate link on:
JSON Formatter, Base64 Encoder, URL Encoder, XML Formatter,
Markdown Converter, Text Diff Finder, Cron Generator,
LCM GCD Calculator, Prime Checker, Matrix Calculator,
Quadratic Calculator, Standard Deviation, Trigonometry,
Random Number Generator, UUID Generator, Hash Generator
These are utility tools with no natural affiliate match.
AdSense/Adsterra handles these automatically.

---

## WHATSAPP SHARE FORMAT

Every tool's WhatsApp share must use this exact format:

```
📊 [Tool Name] Result — ToolPixa

[Label 1]: [Value 1]
[Label 2]: [Value 2]
[Label 3]: [Value 3]
─────────────────────
🔗 Calculate free: toolpixa.space/tools/[slug]

#ToolPixa #[RelevantHashtag]
```

Example for EMI Calculator:
```
📊 Home Loan EMI Result — ToolPixa

Loan Amount: ₹50,00,000
Monthly EMI: ₹43,391
Total Interest: ₹54,13,840
─────────────────────
🔗 Calculate free: toolpixa.space/tools/home-loan-emi-calculator

#ToolPixa #HomeLoan #EMICalculator
```

---

## CURRENCY LOCALIZATION

Detect user country on page load using ipapi.co free API.
Default to INR if detection fails or takes more than 2 seconds.
Store preference in localStorage after first detection.
Show currency selector that user can manually override.

Currency map:
  IN  → ₹ INR (en-IN locale)
  US  → $ USD (en-US locale)
  GB  → £ GBP (en-GB locale)
  AE  → AED   (ar-AE locale)
  CA  → CA$   (en-CA locale)
  AU  → A$    (en-AU locale)
  SG  → S$    (en-SG locale)
All others → ₹ INR

Format numbers using Intl.NumberFormat with detected locale.
Indian numbers: 1,00,000 not 100,000

---

## TAGS.JSON REQUIREMENT

After building any tool, ALWAYS update tags.json.
Every tool must have 2-4 tags from the approved list below.
This is not optional — it powers Related Tools and category filters.

Approved tags:
loans, investments, tax-planning, salary-hr, savings,
real-estate, business, crypto, student-grades, attendance,
exam-prep, student-finance, body-composition, nutrition,
fitness, health-metrics, wellness, length-converter,
weight-converter, area-converter, temperature-converter,
time-date, currency, code-formatting, encoding, security,
color-tools, seo-tools, text-tools, number-theory,
algebra, geometry, statistics, physics, food-cooking,
travel, home-utilities, personal-finance, shopping,
productivity, environment, ai-tools, creator-tools,
startup-tools, agriculture, legal

tags.json format:
{
  "[tag-name]": ["tool-slug-1", "tool-slug-2", ...]
}

---

## STANDARD QUALITY GATES

Before marking any tool as complete, verify ALL of these:

### Gate 1 — Kill Criteria (all must pass or do not publish)
[ ] Title tag is unique and tool-specific
[ ] No "ad-free" or false claims anywhere on page
[ ] No href="#" links in footer or related tools
[ ] Calculator produces mathematically correct result
[ ] Result never shows NaN, undefined, or blank

### Gate 2 — Content Quality (must score 80%+)
[ ] H1 matches primary search keyword
[ ] Meta description is unique and 140-155 chars
[ ] "How it Works" is specific to THIS tool (not generic)
[ ] All FAQ answers are specific to THIS tool
[ ] At least 5 FAQ questions with schema markup
[ ] Real Indian example with name, city, realistic numbers
[ ] Formula shown with both male/female if health tool
[ ] Disclaimer present on finance and health tools

### Gate 3 — Technical (all must pass)
[ ] Tool works on 375px mobile without horizontal scroll
[ ] All inputs open numeric keyboard on mobile
[ ] Calculation fires live without submit button
[ ] Copy button works and shows "Copied ✓"
[ ] WhatsApp share opens correct pre-formatted message
[ ] All 4 related tools link to existing pages
[ ] tags.json updated with this tool's tags
[ ] Canonical URL set to production domain
[ ] WebApplication + FAQPage + BreadcrumbList schema present
[ ] Amazon affiliate uses search URL with tag=toolpixa-21

### Gate 4 — Visual (all must pass)
[ ] Result counter animation (0 to value) on calculation
[ ] Button press animation (scale 0.96)
[ ] Input focus glow effect
[ ] Slider track fill color updates live
[ ] Tool above fold without scrolling on mobile

---

## BLOG STANDARDS

When building blog pages:

### Dates
NEVER set future dates on blog posts.
If a publish date is not specified, use today's actual date.
All dates in same format: YYYY-MM-DD

### Length
Minimum 800 words per post.
Finance and health posts: minimum 1200 words.
No word count padding — every sentence must add information.

### Structure
H1: Post title (includes primary keyword)
H2: Major sections
H3: Subsections
One real Indian example with name, city, numbers.
2-3 internal links to relevant ToolPixa tools.
No links to health/finance posts from unrelated tool pages.

### Affiliate in blogs
Finance blog → BankBazaar or Groww link naturally within content
Health blog → PolicyBazaar link naturally within content
Student blog → Amazon book link naturally within content
Never force an affiliate link that doesn't fit the topic.

---

## THINGS THAT WILL GET THE SITE PENALIZED — NEVER DO THESE

1. Same title tag on multiple pages
2. "Ad-free" claim while running ads or affiliate links
3. Generic boilerplate "How it Works" copied across tools
4. Footer links pointing to href="#"
5. Future dates on blog posts
6. BMR formula shown for men only on health tools
7. Amazon links pointing to specific product pages (go stale)
8. Affiliate links without rel="sponsored"
9. FAQ answers that don't answer the specific question
10. Publishing a tool before running the 5 Gate checks above
11. Linking a health tool's "related blog" to a finance article
12. Canonical URL pointing to Vercel preview instead of production
13. NaN or undefined appearing in any result field
14. Tool count ("600+") hardcoded instead of dynamic
15. Any tool page without unique meta description

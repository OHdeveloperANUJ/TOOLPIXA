import os

base_dir = r'C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\.agents\skills'

skills = {
    'html-css-js-static-site': {
        'name': 'HTML/CSS/JS Static Site',
        'desc': 'Enforces the vanilla tech stack, spacing scale, and UI rules for building tools.',
        'content': '''# HTML/CSS/JS Static Site Rules

When generating code for tools or UI components, you MUST adhere to the following stack and design rules:

1. **Exact Stack**: 
   - No frameworks (No React, Vue, Svelte, etc.)
   - No backend (Must be purely static)
   - Vanilla JS only
   *(Note: If building within an existing Next.js wrapper, ensure the core logic is as framework-agnostic/vanilla as possible within the component).*
2. **Spacing Scale**: Strictly use an 8px spacing scale (e.g., 8px, 16px, 24px, 32px, 40px, 48px).
3. **Icons**: Use Lucide icons only.
4. **Language**: Only one language must be visible at a time on the UI.
'''
    },
    'seo-optimization': {
        'name': 'SEO Optimization',
        'desc': 'Enforces SEO requirements like title tags, meta descriptions, schemas, and canonicals.',
        'content': '''# SEO Requirements

Every tool page must strictly implement these SEO standards:

1. **Title Tag Format**: `[Tool Name] - [Primary Benefit/Action] | ToolPixa` (Maximum 60 characters).
2. **Meta Description**: Must be exactly between 150-160 characters, containing the primary keywords naturally.
3. **Canonical URL Pattern**: `https://toolpixa.com/tools/[tool-slug]`
4. **Structured Data**:
   - Must include `FAQPage` JSON-LD schema for all FAQs.
   - Must include `WebApplication` JSON-LD schema defining the calculator/tool.
5. **Breadcrumb Structure**: Must include structured breadcrumb navigation (Home > Tools > Category > Tool Name).
'''
    },
    'calculator-logic': {
        'name': 'Calculator Logic',
        'desc': 'Rules for calculator interactivity, results, and sharing features.',
        'content': '''# Calculator Logic Rules

When building any interactive calculator, you must implement the following behaviors:

1. **Live Calculation**: Calculations must trigger automatically on input change (`input` or `change` events).
2. **No Submit Buttons**: Do not use a Submit or Calculate button unless absolutely necessary for external API calls. Everything should be reactive.
3. **Result Card Structure**: Results must be displayed in a clearly defined, visually prominent "Result Card" structure.
4. **Copy Button**: Include a button to copy the final results to the clipboard.
5. **WhatsApp Share**: Include a WhatsApp share feature. (See Result Sharing Skill for exact format).
'''
    },
    'content-writing': {
        'name': 'Content Writing',
        'desc': 'Guidelines for writing tool descriptions, examples, and FAQs.',
        'content': '''# Content Writing Rules

When generating textual content (descriptions, guides, FAQs) for tools:

1. **Examples**: Use real, highly specific Indian and global examples with actual names and cities.
   *Example*: "Rahul from Mumbai buying a ₹50L flat in Andheri..." or "Sarah from New York saving for..."
2. **No Generic Filler**: Every sentence must provide direct value. Cut out any fluff.
3. **FAQs**: You must generate a minimum of 5 Highly-Relevant FAQs per tool.
4. **Tone**: Use Hinglish phrasing where it feels natural and relatable (e.g., "Plan your EMI perfectly bas ek click mein.") to connect with the Indian demographic, balanced with professional English.
'''
    },
    'affiliate-placement': {
        'name': 'Affiliate Placement',
        'desc': 'Rules for injecting affiliate CTAs into specific tool categories.',
        'content': '''# Affiliate Placement Rules

You must inject specific affiliate calls-to-action (CTAs) based on the tool's category.

**Placement Mapping:**
- **EMI / Loan Tools**: BankBazaar
- **SIP / Investment Tools**: Groww
- **Health / Insurance Tools**: PolicyBazaar
- **Specific Physical Product Tools**: Amazon

**Exact HTML Template for CTA Box:**
Use the following structure for the affiliate box:
```html
<div class="affiliate-cta-box" style="margin-top: 24px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
  <h4 style="margin-bottom: 8px; font-weight: 600;">Sponsored Recommendation</h4>
  <p style="margin-bottom: 16px;">[Engaging copy related to the affiliate partner]</p>
  <a href="[AFFILIATE_LINK]" rel="sponsored noopener noreferrer" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #2563eb; color: white; border-radius: 4px; text-decoration: none;">
    Explore on [Partner Name]
  </a>
</div>
```
Ensure `rel="sponsored"` is ALWAYS present.
'''
    },
    'tags-json-update': {
        'name': 'Tags JSON Update',
        'desc': 'Mandatory rule to update tags.json when creating new tools.',
        'content': '''# tags.json Update Rule

**CRITICAL MANDATORY STEP:**
Every single time a new tool is built or generated, you MUST automatically add the tool's details (name, slug) to the correct category arrays in `tags.json`.

**Enforcement:**
Do not skip this step. If you create a tool, your very next action must be modifying `tags.json` to include it.
'''
    },
    'micro-animation': {
        'name': 'Micro-Animation',
        'desc': 'Rules for interactive moments and UI feedback.',
        'content': '''# Micro-Animation Rules

Every interactive moment must feel responsive and polished:

1. **Number Counters**: Numbers must animate from 0 to the result over 800ms.
2. **Invalid Input**: Inputs must trigger a shake animation on invalid entry.
3. **Result Card**: Result cards must fade in smoothly, never popping instantly.
4. **Buttons**: Buttons must have a press-down scale effect (e.g., scale to 0.96 on active).
5. **Sliders**: Sliders must show a colored fill track that moves with the thumb.
6. **Copy Button**: Upon clicking, the copy button text must change to "Copied ✓" for exactly 2 seconds before reverting.
'''
    },
    'data-visualization': {
        'name': 'Data Visualization',
        'desc': 'Rules for rendering charts across tools.',
        'content': '''# Data Visualization Rules

Rules for every chart rendered in a tool:

1. **Animation**: Charts must draw themselves smoothly upon appearance (not instant).
2. **When to show**: Always show a chart when a result has 3 or more components.
3. **Finance Tools**: Use a donut chart for breakdowns and a bar chart for year-by-year projections.
4. **Health Tools**: Use gauge/meter style charts for ranges (e.g. BMI).
5. **Color Palette**: Fix the color palette across all charts; never randomize colors.
6. **Responsiveness**: Charts must be fully readable on mobile screens without requiring the user to zoom.
'''
    },
    'empty-error-states': {
        'name': 'Empty State & Error State',
        'desc': 'Rules for handling empty inputs and calculation errors.',
        'content': '''# Empty State & Error State Rules

What makes tools feel polished vs cheap:

1. **Pre-filled Defaults**: Before the user enters anything, show a helpful placeholder example pre-filled in the inputs.
2. **Invalid Input**: Show a friendly message. The words "NaN" or "undefined" must NEVER appear on screen.
3. **Zero Result**: If the result is 0, explain why (e.g., "Increase your deposit to see growth"), don't just show ₹0.
4. **Edge Cases**: All edge cases must be handled gracefully: empty fields, negative numbers, extremely large numbers.
'''
    },
    'mobile-first-input': {
        'name': 'Mobile-First Input',
        'desc': 'Rules for mobile-optimized user inputs.',
        'content': '''# Mobile-First Input Rules

1. **Numeric Keyboards**: Number fields must open the numeric keyboard on mobile devices (`inputmode="decimal"`).
2. **Touch Targets**: All clickable elements must have a minimum 48px height.
3. **Sliders**: Sliders must be fully functional with thumb dragging, not just clicking.
4. **No Horizontal Scroll**: Ensure absolute zero horizontal scroll on the entire page.
5. **Font Size**: Font size must be a minimum of 16px to prevent iOS auto-zoom.
6. **Label Placement**: Labels must never overlap inputs on small screens.
'''
    },
    'result-sharing': {
        'name': 'Result Sharing',
        'desc': 'Rules for formatting WhatsApp shares and PDF exports.',
        'content': '''# Result Sharing Rules

1. **WhatsApp Share Message Format (pre-formatted)**:
```
📊 [Tool Name] Result — ToolPixa
[Label]: [Value]
[Label]: [Value]
[Label]: [Value]
─────────────────
Try free: toolpixa.com/tools/[slug]
```

2. **PDF Export**:
   - Clean single-page layout.
   - Must include the ToolPixa logo, current date, inputs summary, results, and a "Generated by ToolPixa" line.
'''
    },
    'amortization-table': {
        'name': 'Amortization & Breakdown Table',
        'desc': 'Rules for generating financial tables in EMI and savings tools.',
        'content': '''# Amortization Table Skill

For all EMI and savings tools specifically:

1. **Table Placement**: Place a month-by-month table below the main result.
2. **Columns**: The table must have exactly: `Period | Payment | Principal | Interest | Balance`.
3. **Pagination**: The table must be paginated (show 12 rows initially with a "Show all" button).
4. **Download**: The table data must be downloadable as CSV.
5. **Highlighting**: Highlight the row for the current month if the user enters their loan start date.
'''
    },
    'comparison-mode': {
        'name': 'Comparison Mode',
        'desc': 'Rules for tools where users compare multiple scenarios.',
        'content': '''# Comparison Mode Rules

For tools where users compare scenarios (e.g., Loan A vs Loan B):

1. **Add Scenario**: An "Add Scenario" button must duplicate inputs side by side.
2. **Live Updates**: Results must update live for both scenarios simultaneously.
3. **Difference Display**: Show the exact difference clearly (e.g., "Scenario B saves you ₹X").
4. **Limit**: Enforce a maximum of 2 scenarios (3 becomes confusing on mobile).
'''
    },
    'trust-signals': {
        'name': 'Trust Signals',
        'desc': 'Rules for building trust in financial and health tools.',
        'content': '''# Trust Signal Rules

What makes users trust a financial/health tool:

1. **Formula Citation**: The formula source must be cited (e.g., "Formula per RBI reducing balance method" or "Mifflin-St Jeor Equation").
2. **Last Updated**: Include a "Last updated" date on the tool page.
3. **Disclaimer**: Include a subtle (not alarming) disclaimer: "Results are estimates. Consult a CA/doctor before decisions."
4. **No Dark Patterns**: Absolutely no fake urgency elements and no misleading defaults.
'''
    }
}

for folder, data in skills.items():
    dir_path = os.path.join(base_dir, folder)
    os.makedirs(dir_path, exist_ok=True)
    
    yaml_frontmatter = f"""---
name: {data['name']}
description: {data['desc']}
---

"""
    
    with open(os.path.join(dir_path, 'SKILL.md'), 'w', encoding='utf-8') as f:
        f.write(yaml_frontmatter + data['content'])

print(f'All {len(skills)} skills created successfully.')

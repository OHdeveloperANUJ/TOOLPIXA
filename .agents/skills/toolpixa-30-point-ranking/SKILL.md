---
name: toolpixa-30-point-ranking
description: >
  Enforces the 30-point quality check standard for all calculators and tools on ToolPixa (toolpixa.space).
  Use this skill to audit, scan, build, or verify any page or tool component in the project.
---

# ToolPixa 30-Point Ranking Skill Guide

This skill guide outlines the strict 30-point checklist that every tool on ToolPixa must pass.

---

## THE 30 CHECKS

### GROUP 1: SEO (Checks 1–7)
1. **Title Tag**: `[Tool Name] - Free Online [Type] | ToolPixa` (Under 60 chars, keyword-focused, brand last).
2. **Meta Description**: 150–158 characters exactly. Includes tool name, what it does, "free", "no signup", and one benefit.
3. **Canonical URL**: `https://toolpixa.space/tools/[tool-slug]` (No trailing slashes).
4. **H1 Tag**: Exactly one H1 per page, containing the tool name only.
5. **FAQ Schema**: Minimum 5 FAQs in JSON-LD. At least 1 Hinglish question Indians actually search (e.g. `"SIP me kitna return milega 10 saal mein?"`).
6. **WebApplication Schema**: JSON-LD with fields: name, description, url, applicationCategory, operatingSystem: "Web", offers.price: "0".
7. **Breadcrumb**: Home > [Category] > [Tool Name] with working links and schema.

### GROUP 2: CONTENT (Checks 8–14)
8. **Unique Indian Example**: One real example with a unique Indian name and city (e.g., "Priya from Pune").
9. **Formula Box**: LaTeX formatted equation, citing sources, and explaining all variables.
10. **How It Works**: Exactly 3 numbered steps, each under 15 words.
11. **No Boilerplate**: Ban AI slop phrases ("In today's fast-paced world", "a few clicks", etc.).
12. **Related Tools**: Exactly 4 related links in the same category.
13. **Affiliate CTA**: Category-based CTAs (EMI -> BankBazaar; SIP -> Groww; Health -> PolicyBazaar; Physical -> Amazon; Dev/Math -> AdSense only).
14. **No False Claims**: Ban "100% accurate" or "free forever". Replace with estimates disclaimer.

### GROUP 3: TOOL FUNCTIONALITY (Checks 15–21)
15. **Live Calculation**: Instant updates on slider/input change. No NaN/Infinity.
16. **Input Validation**: Clean error handling, default placeholders, negative value blocks.
17. **Mobile Keyboard**: Use `inputmode="decimal"` on number inputs (forces numeric layout on Android). Avoid plain `type="number"`.
18. **Result Card**: Labeled bold output, chart if 3+ components, Copy button ("Copied ✓"), WhatsApp share, and Reset.
19. **WhatsApp Share Format**:
    ```
    📊 [Tool Name] Result — ToolPixa
    [Label]: [Value]
    [Label]: [Value]
    ─────────────────
    Try free: toolpixa.space/tools/[slug]
    ```
20. **Female Formula**: Health tools must include both Male and Female Mifflin-St Jeor BMR/body-fat formulas with gender selectors.
21. **Amortization Table**: Monthly table with expand button and CSV download for EMI tools.

### GROUP 4: TECHNICAL (Checks 22–27)
22. **Page Load Speed**: Fast performance, no CDNs except essential charts, pre-set image dimensions.
23. **Mobile Layout**: Responsive at 375px width. Touch targets >= 48px, fonts >= 16px.
24. **No Broken Links**: Verify all related, breadcrumb, and footer links.
25. **Dark Mode**: Toggle state persistence, readable text, styled chart variables.
26. **Offline PWA**: Service worker caching and offline tool support.
27. **Currency Detection**: Auto-detect country (IN -> ₹, US -> $) with override dropdown.

### GROUP 5: FINAL QUALITY GATES (Checks 28–30)
28. **Competitor Test**: Faster than top result, above fold on mobile, extra unique feature.
29. **NaN Test**: Input validation for empty, zero, letters, and huge values.
30. **5-Second Test**: Fast load and calculation on mobile devices.

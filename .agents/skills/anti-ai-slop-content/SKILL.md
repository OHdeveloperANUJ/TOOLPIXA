---
name: Anti-AI Slop Content Quality
description: Enforce standards for human-sounding, expert copywriting, detailed math walkthroughs, and case studies to eliminate generic AI-written fluff.
---

# Anti-AI Slop Content Quality Standards

This skill defines the requirements for writing tool descriptions, user guides, calculations walkthroughs, and FAQs. We must avoid generic, repetitive, or obvious AI-generated content (known as "AI slop").

---

## 1. DETECTING & BANNING "AI SLOP" PATTERNS

We ban the following common AI writing behaviors:
- **Generic Enticements**: "In today's fast-paced world...", "Are you struggling to manage...", "Introducing the ultimate calculator...".
- **Defining the Obvious**: Explaining what an EMI is in 3 different sections, or saying "interest is the cost of borrowing."
- **Fluff & Filler**: Paragraphs of text that repeat inputs without giving new insight.
- **Generic FAQs**: "What is this tool?", "Is this calculator free?", "How do I use this?". Replace these with complex, real-world scenario questions.

---

## 2. HOW TO WRITE LIKE A HUMAN EXPERT

- **Get Straight to the Point**: Start with a value-added hook. E.g., "Choosing between a 3-month moratorium and immediate repayment can save you up to ₹1.5L in interest. Here is how the math works..."
- **Provide Actionable Insights**: Give strategies. E.g., explain how paying just 1 extra EMI per year reduces a 20-year loan to 15 years.
- **Deep Tax Rules**: Connect tools to local regulations (e.g., Section 80E tax deductions for education loans, Section 24b for home loans, Standard Deductions).
- **Relatable Scenarios**: Instead of generic examples, create rich personas:
  - *Example*: "Aditya (26, Software Engineer from Bangalore) takes a ₹25 Lakh loan at 9.5% interest for his MS in Germany, with a 2-year moratorium. Here's how interest accrues..."

---

## 3. RIGOROUS STEP-BY-STEP MATH BREAKDOWNS

Every calculator page must contain a dedicated, readable section titled **"How the Calculation Works (With Math Formula)"**.
- **Display the Formula**: Use LaTeX notation or structured plain text:
  \[EMI = P \times r \times \frac{(1 + r)^n}{(1 + r)^n - 1}\]
- **Break Down the Variables**: Explicitly define what each letter stands for (e.g. \(P = \text{Principal}\), \(r = \text{monthly interest rate}\), \(n = \text{tenure in months}\)).
- **Walk Through a Manual Example**:
  - Show the values input.
  - Show the intermediate numbers (e.g. \(1 + r = 1.0075\), \(1.0075^{120} = 2.451\)).
  - Compute the final result showing the math step-by-step. This proves the calculator's math is authentic and lets the user double check.

---

## 4. PREMIUM FAQ STRATEGY

Provide at least 5 highly specific FAQs that address edge cases, tax rules, and user anxieties:
- *Bad FAQ*: "Can I use this for home loans?"
- *Good FAQ*: "How does the moratorium period affect my total outstanding loan principal when EMI payments begin?"
- *Good FAQ*: "Can I claim a tax deduction under Section 80E on the interest paid during the moratorium period?"
- Add clear, expert answers with bulleted comparisons and bold highlights.

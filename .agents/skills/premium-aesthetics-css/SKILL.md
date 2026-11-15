---
name: Premium Aesthetics & Tailwind Styling
description: Absolute guidelines for modern, high-end, visual design (glassmorphism, gradients, transitions, and typography) to prevent generic or cheap-looking UI.
---

# Premium Aesthetics & Tailwind Styling Standards

This skill defines the requirements for making every tool page look premium, modern, and visually stunning. Simple white cards, flat single-color buttons, and browser-default inputs are prohibited.

---

## 1. BRAND STYLE & PALETTES

Never use raw Tailwind colors directly without a styling plan. Use the following palette tokens:

- **Primary Brand Accent**:
  - Light mode: Emerald-to-Teal gradient (`from-emerald-500 to-teal-600`) or Royal Blue-to-Indigo (`from-blue-600 to-indigo-700`).
  - Dark mode: Neon Cyan-to-Blue (`from-cyan-400 to-blue-500`) or Violet-to-Purple (`from-violet-400 to-purple-600`).
- **Surface Cards**:
  - Light mode: Solid white with 1px border (`border-slate-100/80`) and a soft shadow (`shadow-xl shadow-slate-200/50`).
  - Dark mode: Semi-transparent dark slate (`bg-slate-900/85 backdrop-blur-md`) with subtle border (`border-slate-800/80`) and deep ambient shadow (`shadow-2xl shadow-black/40`).
- **Interactive States**:
  - Smooth transitions on all hover actions: `transition-all duration-300 ease-in-out`.
  - Hover highlights: slight translation upward (`group-hover:-translate-y-0.5`), scale-up, or background opacity shifts.

---

## 2. CARD DESIGN & GLASSMORPHISM

To create high-end visual layers, style result cards and dashboards with glassmorphism characteristics:

```tsx
// Example of a Premium Result Card (React/Tailwind)
<div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white/70 p-6 shadow-xl shadow-slate-200/30 backdrop-blur-md transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
  {/* Decorative Gradient Glow behind card */}
  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-500/0 blur-2xl dark:from-cyan-500/10" />
  
  <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
    Monthly EMI
  </h3>
  <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
    {formattedEMI}
  </p>
</div>
```

---

## 3. FORM INPUTS & INTERACTION DESIGN

Generic browser inputs look amateur. Apply custom designs to all text and number inputs:

- **Floating Labels**: Place labels above the inputs or use CSS floating label styles.
- **Focus States**: Highlighting input fields on focus:
  - Add a soft shadow glow: `focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500`.
  - Transition border color smoothly: `transition-colors duration-200`.
- **Validation feedback**:
  - When invalid, show a soft red border: `border-red-400 ring-4 ring-red-500/10`.
  - Add helper text that slides down smoothly.

```tsx
// Example of a Premium Input Group
<div className="relative flex flex-col gap-1.5">
  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
    Interest Rate (% p.a.)
  </label>
  <div className="relative rounded-xl shadow-sm">
    <input
      type="number"
      inputMode="decimal"
      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-800 font-medium transition-all focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500/15"
      placeholder="8.5"
    />
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
      %
    </div>
  </div>
</div>
```

---

## 4. BUTTONS & ACTIVE PRESS STATES

Every action button must feel tactile. Standard flat buttons must be replaced with styled actions:

- **Primary CTA**: Deep rich gradient with subtle shadow (`bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 shadow-md shadow-emerald-500/20`).
- **Interactive Scales**: Use `active:scale-[0.97]` to make buttons physically press down when clicked.
- **Loading states**: Add a spinner element rather than static text.

```tsx
<button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:translate-y-[-1px] hover:brightness-105 active:scale-[0.97]">
  <span>Check eligibility</span>
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
</button>
```

---

## 5. TYPOGRAPHY & SPACING

- Use **Outfit** or **Inter** as the primary font families. Do not use generic sans-serif.
- **Heading styles**: Use tracking-tight (`tracking-tight`) and font-extrabold for H1 and H2.
- **Letter spacing**: Small caps or uppercase labels should use `tracking-widest` or `tracking-wider` to look premium.
- **Vertical rhythm**: Give content air to breathe. Ensure generous margins between sections (`my-12` or `my-16`).

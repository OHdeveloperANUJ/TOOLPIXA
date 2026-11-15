---
name: Recharts Visualization Standards
description: Guidelines for building responsive, premium, interactive charts with Recharts (custom tooltips, gradients, light/dark styling, and animations).
---

# Recharts Visualization Standards

This skill defines the visual and technical guidelines for rendering charts on ToolPixa. Charts must feel integrated, high-end, responsive, and provide clear data representation.

---

## 1. RESPONSIVENESS & THE CONTAINER

All charts must be wrapped in Recharts' `<ResponsiveContainer>` with percentage widths, and a fixed or min-height to prevent layout shifts.

- **Minimum height**: Use `300px` for mobile and `350px` for desktop grids.
- **Aspect Ratio**: Maintain aspect ratios where possible to keep circular elements (like pie/donut charts) looking correct.

```tsx
<div className="h-[300px] w-full md:h-[350px]">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      {/* Chart components */}
    </PieChart>
  </ResponsiveContainer>
</div>
```

---

## 2. PREMIUM THEMING & DYNAMIC COLORS

Do not use simple primaries (red, green, blue). Use coordinated gradients and color tokens that work in both light and dark modes:

- **Finance breakdowns**:
  - Principal Amount: `#10b981` (Emerald) or `#3b82f6` (Royal Blue)
  - Interest Component: `#f59e0b` (Amber) or `#8b5cf6` (Indigo)
- **Grid lines**: Use `#f1f5f9` (Slate-100) in light mode and `#334155` (Slate-700) or `#1e293b` (Slate-800) in dark mode.
- **Labels & Axes**: Text elements must use Slate colors and dynamic classes or hex values depending on light/dark mode.

---

## 3. CUSTOM TOOLTIPS

Recharts' default tooltip looks outdated. Always override the default tooltip with a custom CSS styled container:

```tsx
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-3.5 shadow-xl shadow-slate-200/50 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-none">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {payload[0].name}
        </p>
        <p className="mt-1 text-sm font-extrabold text-slate-800 dark:text-white">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};
```

---

## 4. GRADIENT FILLS FOR AREA/BAR CHARTS

To add depth to graphs, use linear gradients inside svg areas or bars.

```tsx
<defs>
  <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
  </linearGradient>
  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
  </linearGradient>
</defs>
```

---

## 5. PIE & DONUT CHART BEST PRACTICES

Donut charts (Pie with `innerRadius`) are preferred for simple composition summaries:

- **Sizing**: Use `innerRadius="60%"` and `outerRadius="80%"` to keep the ring thin and elegant.
- **Center Label**: Display the core metric inside the center hole (e.g., total repayment amount or score) using absolute positioning over the chart.
- **Hover Action**: Add a subtle hover interaction by enlarging the active slice.
- **Animations**: Keep animation durations between `500ms` and `1000ms` with ease-out physics.

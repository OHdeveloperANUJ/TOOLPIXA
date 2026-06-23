---
name: React State & Math Safety
description: Guidelines for managing React state, slider/input syncing, mounting calculations, and numeric formatting safety (preventing NaN/Infinity and zero-load bugs).
---

# React State & Math Safety Standards

This skill details how to manage state and math calculations inside interactive React calculators, specifically targeted at avoiding common bugs like the "0 value on load" error, text-slider unsyncing, and visual display anomalies (`NaN`, `Infinity`).

---

## 1. PREVENTING THE ZERO-VALUE ON PAGE LOAD BUG

Calculators must never initialize with zero or blank values that result in empty outputs on page load. They must calculate their default state instantly on mount.

- **Recommended Pattern**: Calculate values inside a `useMemo` block that depends on current states, OR run the calculation function immediately on state definition.
- **NEVER** use an asynchronous `useEffect` to trigger the initial calculation if it can be done synchronously using standard React rendering flow or `useMemo`.

```tsx
// PREFERRED: Pure Derived State with useMemo
const [loanAmount, setLoanAmount] = useState<number>(500000);
const [interestRate, setInterestRate] = useState<number>(8.5);
const [tenureYears, setTenureYears] = useState<number>(15);

// The calculation runs instantly on first render. No empty or zero states.
const emiDetails = useMemo(() => {
  const p = loanAmount;
  const r = (interestRate / 12) / 100;
  const n = tenureYears * 12;
  
  if (r === 0) return { emi: p / n, totalInterest: 0, totalPayment: p };
  
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;
  
  return { emi, totalInterest, totalPayment };
}, [loanAmount, interestRate, tenureYears]);
```

---

## 2. SYNCING TEXT INPUTS AND SLIDERS

When a slider and a number input control the same variable, they must remain perfectly synchronized.
- Typing in the input field must update the slider.
- Dragging the slider must update the input field.
- Limit state updates to reasonable bounds: if a user types a value out of bounds, clamp it on blur, not during typing (to allow typing digits).

```tsx
const handleInputChange = (valStr: string, min: number, max: number, setter: (v: number) => void) => {
  const numericVal = parseFloat(valStr);
  if (isNaN(numericVal)) {
    setter(0); // Temporary fallback to allow typing
    return;
  }
  setter(numericVal);
};

const handleInputBlur = (value: number, min: number, max: number, setter: (v: number) => void) => {
  // Clamp value to bounds when focus is lost
  if (value < min) setter(min);
  else if (value > max) setter(max);
};
```

---

## 3. NAN & INFINITY SAFEGUARDS

Always sanitize input variables before performing division or logarithmic calculations:
- Check for zero divisors: `if (divisor === 0) return fallback;`
- Safeguard logarithms: `if (x <= 0) return 0;`
- Provide fallbacks for empty inputs: `const rate = interestRate || 0.01;`
- Ensure formatting functions can handle `0` or null values without throwing errors.

---

## 4. CURRENCY & NUMBER FORMATTING

Never print raw floats like `125000.333333333` to the user.
- **Indian Rupees (INR)**: Use the `en-IN` locale to format currency correctly (e.g. ₹1,25,000 instead of ₹125,000).
- **US Dollars (USD)**: Use `en-US` (e.g. $125,000.00).
- Use `Math.round()` or `toFixed(2)` where appropriate before formatting.

```tsx
export const formatCurrency = (amount: number, locale = 'en-IN') => {
  if (isNaN(amount) || !isFinite(amount)) return '₹0';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'en-IN' ? 'INR' : 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};
```

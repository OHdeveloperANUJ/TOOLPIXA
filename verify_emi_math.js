// verify_emi_math.js
// Standard EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
// P = Principal
// r = monthly interest rate (annual rate / 12 / 100)
// n = tenure in months

function calculateEMI(principal, annualRate, tenureMonths) {
  if (annualRate === 0) return principal / tenureMonths;
  const r = annualRate / 12 / 100;
  const n = tenureMonths;
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(emi);
}

// Test Case 1: 1,000,000 (10 Lakh) at 10% for 5 years (60 months)
// Expected EMI: 21,247
const tc1 = calculateEMI(1000000, 10, 60);
console.log(`Test Case 1 (10L, 10%, 5Yr): Expected ~21247, Got: ${tc1}`);
if (tc1 !== 21247) throw new Error("Math verification failed!");

// Test Case 2: 50,000 at 12% for 2 years (24 months)
// Expected EMI: 2,354
const tc2 = calculateEMI(50000, 12, 24);
console.log(`Test Case 2 (50K, 12%, 2Yr): Expected ~2354, Got: ${tc2}`);
if (tc2 !== 2354) throw new Error("Math verification failed!");

console.log("All Math Verifications Passed! The formula is perfectly safe for production.");

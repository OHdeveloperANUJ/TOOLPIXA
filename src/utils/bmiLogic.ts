export type Gender = 'male' | 'female';
export type ActivityLevel = 1.2 | 1.375 | 1.55 | 1.725 | 1.9;

export interface BmiInputs {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
}

export interface BmiResult {
  bmi: number;
  bmiCategory: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  bmr: number;
  tdee: number;
}

export function calculateHealthMetrics({ heightCm, weightKg, age, gender, activityLevel }: BmiInputs): BmiResult | null {
  if (!heightCm || !weightKg || !age || heightCm <= 0 || weightKg <= 0 || age <= 0) {
    return null; // Invalid inputs
  }

  // 1. Calculate BMI
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  // 2. Determine BMI Category
  let bmiCategory: BmiResult['bmiCategory'] = 'Normal';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  // 3. Calculate BMR (Mifflin-St Jeor Equation)
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 4. Calculate TDEE
  const tdee = bmr * activityLevel;

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee)
  };
}

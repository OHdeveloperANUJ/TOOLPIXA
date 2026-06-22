export type UnitCategory = 'Length' | 'Weight' | 'Temperature' | 'Area' | 'Volume';

export interface Unit {
  id: string;
  name: string;
  symbol: string;
  factor: number; // Factor to a base unit (e.g., meters for length)
  offset?: number; // Used for Temperature (e.g., Fahrenheit offset)
}

export const CATEGORIES: Record<UnitCategory, Unit[]> = {
  Length: [
    { id: 'm', name: 'Meters', symbol: 'm', factor: 1 },
    { id: 'cm', name: 'Centimeters', symbol: 'cm', factor: 0.01 },
    { id: 'km', name: 'Kilometers', symbol: 'km', factor: 1000 },
    { id: 'in', name: 'Inches', symbol: 'in', factor: 0.0254 },
    { id: 'ft', name: 'Feet', symbol: 'ft', factor: 0.3048 },
    { id: 'yd', name: 'Yards', symbol: 'yd', factor: 0.9144 },
    { id: 'mi', name: 'Miles', symbol: 'mi', factor: 1609.344 },
  ],
  Weight: [
    { id: 'kg', name: 'Kilograms', symbol: 'kg', factor: 1 },
    { id: 'g', name: 'Grams', symbol: 'g', factor: 0.001 },
    { id: 'mg', name: 'Milligrams', symbol: 'mg', factor: 0.000001 },
    { id: 'lb', name: 'Pounds', symbol: 'lb', factor: 0.45359237 },
    { id: 'oz', name: 'Ounces', symbol: 'oz', factor: 0.0283495231 },
  ],
  Temperature: [
    { id: 'c', name: 'Celsius', symbol: '°C', factor: 1, offset: 0 }, // base
    { id: 'f', name: 'Fahrenheit', symbol: '°F', factor: 5 / 9, offset: 32 },
    { id: 'k', name: 'Kelvin', symbol: 'K', factor: 1, offset: 273.15 },
  ],
  Area: [
    { id: 'sqm', name: 'Square Meters', symbol: 'm²', factor: 1 },
    { id: 'sqkm', name: 'Square Kilometers', symbol: 'km²', factor: 1000000 },
    { id: 'sqft', name: 'Square Feet', symbol: 'sq ft', factor: 0.092903 },
    { id: 'ac', name: 'Acres', symbol: 'ac', factor: 4046.86 },
    { id: 'ha', name: 'Hectares', symbol: 'ha', factor: 10000 },
    { id: 'bigha', name: 'Bigha (India)', symbol: 'bigha', factor: 2529.28 }, // Approximate typical Bigha
  ],
  Volume: [
    { id: 'l', name: 'Liters', symbol: 'L', factor: 1 },
    { id: 'ml', name: 'Milliliters', symbol: 'mL', factor: 0.001 },
    { id: 'gal', name: 'Gallons (US)', symbol: 'gal', factor: 3.78541 },
    { id: 'qt', name: 'Quarts (US)', symbol: 'qt', factor: 0.946353 },
    { id: 'pt', name: 'Pints (US)', symbol: 'pt', factor: 0.473176 },
    { id: 'cup', name: 'Cups (US)', symbol: 'cup', factor: 0.236588 },
  ]
};

export const COUNTRY_DEFAULTS: Record<string, { [key in UnitCategory]?: { from: string, to: string } }> = {
  'US': {
    Length: { from: 'mi', to: 'km' },
    Weight: { from: 'lb', to: 'kg' },
    Temperature: { from: 'f', to: 'c' },
    Area: { from: 'sqft', to: 'sqm' },
    Volume: { from: 'gal', to: 'l' }
  },
  'IN': {
    Length: { from: 'km', to: 'mi' },
    Weight: { from: 'kg', to: 'lb' },
    Temperature: { from: 'c', to: 'f' },
    Area: { from: 'sqft', to: 'bigha' },
    Volume: { from: 'l', to: 'gal' }
  },
  'UK': {
    Length: { from: 'mi', to: 'km' },
    Weight: { from: 'kg', to: 'lb' },
    Temperature: { from: 'c', to: 'f' },
    Area: { from: 'sqm', to: 'sqft' },
    Volume: { from: 'l', to: 'pt' }
  },
  'Global': {
    Length: { from: 'km', to: 'mi' },
    Weight: { from: 'kg', to: 'lb' },
    Temperature: { from: 'c', to: 'f' },
    Area: { from: 'sqm', to: 'sqft' },
    Volume: { from: 'l', to: 'gal' }
  }
};

export function convertValue(value: number, fromUnit: Unit, toUnit: Unit, category: UnitCategory): number {
  if (category === 'Temperature') {
    // Temp has offsets
    const baseC = fromUnit.id === 'c' ? value :
                  fromUnit.id === 'f' ? (value - 32) * (5/9) :
                  fromUnit.id === 'k' ? value - 273.15 : value;
    
    if (toUnit.id === 'c') return baseC;
    if (toUnit.id === 'f') return (baseC * 9/5) + 32;
    if (toUnit.id === 'k') return baseC + 273.15;
    return baseC;
  } else {
    // Normal linear conversion
    const baseValue = value * fromUnit.factor;
    return baseValue / toUnit.factor;
  }
}

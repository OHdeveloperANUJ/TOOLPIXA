const fs = require('fs');
const path = require('path');

const tools = [
  {
    id: 'personal-loan-emi-calculator',
    slug: 'personal-loan-emi-calculator',
    title: 'Personal Loan EMI Calculator',
    description: 'Calculate your Personal Loan EMI, total interest payable, and view the complete amortization schedule.',
    componentFile: 'PersonalLoanEmi.tsx',
    componentName: 'PersonalLoanEmi',
    category: 'finance',
    icon: 'indian_rupee',
    faqText: 'Personal Loan'
  },
  {
    id: 'bike-loan-emi-calculator',
    slug: 'bike-loan-emi-calculator',
    title: 'Bike Loan EMI Calculator',
    description: 'Calculate your Two-Wheeler / Bike Loan EMI, total interest, and plan your payments effectively.',
    componentFile: 'BikeLoanEmi.tsx',
    componentName: 'BikeLoanEmi',
    category: 'finance',
    icon: 'two_wheeler',
    faqText: 'Bike Loan'
  },
  {
    id: 'education-loan-emi-calculator',
    slug: 'education-loan-emi-calculator',
    title: 'Education Loan EMI Calculator',
    description: 'Calculate your Education Loan EMI to plan your academic finances and repayment schedule.',
    componentFile: 'EducationLoanEmi.tsx',
    componentName: 'EducationLoanEmi',
    category: 'finance',
    icon: 'school',
    faqText: 'Education Loan'
  }
];

// 1. Create Component Files
const templatePath = path.join('src', 'components', 'tools', 'HomeLoanEmi.tsx');
let template = fs.readFileSync(templatePath, 'utf8');

for (const tool of tools) {
  let newComp = template
    .replace(/HomeLoanEmi/g, tool.componentName)
    .replace(/Home Loan/g, tool.faqText);
  
  const compPath = path.join('src', 'components', 'tools', tool.componentFile);
  fs.writeFileSync(compPath, newComp);
  console.log(`Created ${tool.componentFile}`);
}

// 2. Update toolsRegistry.ts
const registryPath = path.join('src', 'data', 'toolsRegistry.ts');
let registry = fs.readFileSync(registryPath, 'utf8');

for (const tool of tools) {
  if (registry.includes(`id: '${tool.id}'`)) {
    console.log(`${tool.id} already in registry.`);
    continue;
  }
  
  const block = `  '${tool.id}': {
    id: '${tool.id}',
    slug: '${tool.slug}',
    title: '${tool.title}',
    description: '${tool.description}',
    category: '${tool.category}',
    icon: '${tool.icon}',
    faqs: [
      { question: 'What is a ${tool.faqText} EMI?', answer: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay every month to repay your ${tool.faqText}.' },
      { question: 'How is ${tool.faqText} EMI calculated?', answer: 'It is calculated using the standard formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly rate, and n is tenure in months.' },
      { question: 'Are there hidden charges?', answer: 'Our calculator shows the pure mathematical EMI. Banks may charge additional processing fees or insurance which are not included in the basic EMI calculation.' }
    ]
  },
`;

  // Insert right after export const toolsRegistry: Record<string, ToolMetadata> = {
  registry = registry.replace(
    /export const toolsRegistry: Record<string, ToolMetadata> = \{/,
    `export const toolsRegistry: Record<string, ToolMetadata> = {\n${block}`
  );
}

fs.writeFileSync(registryPath, registry);
console.log('Updated toolsRegistry.ts');

// 3. Update page.tsx
const pagePath = path.join('src', 'app', 'tools', '[slug]', 'page.tsx');
let page = fs.readFileSync(pagePath, 'utf8');

let newImports = '';
for (const tool of tools) {
  if (!page.includes(`'${tool.id}':`)) {
    newImports += `  '${tool.id}': dynamic(() => import('@/components/tools/${tool.componentName}')),\n`;
  }
}

if (newImports) {
  // insert right before home-loan-emi-calculator
  page = page.replace(
    /(\s*'home-loan-emi-calculator': dynamic\(\(\) => import\('@\/components\/tools\/HomeLoanEmi'\)\),)/,
    `\n${newImports}$1`
  );
  fs.writeFileSync(pagePath, page);
  console.log('Updated page.tsx');
}

console.log('All 3 tools generated perfectly.');

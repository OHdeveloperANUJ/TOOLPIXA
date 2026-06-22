import os
import re

tools_dir = r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\components\tools"

replacements = {
    r'\bbg-slate-900/50\b': 'bg-slate-50 dark:bg-slate-900/50',
    r'\bbg-slate-800\b': 'bg-slate-100 dark:bg-slate-800',
    r'\bh-80 mt-4 relative bg-\[\#0A0A14\]\b': 'h-80 mt-4 relative bg-white dark:bg-[#0A0A14]',
    r'\bh-80 mt-8 hidden md:block relative bg-\[\#0A0A14\]\b': 'h-80 mt-8 hidden md:block relative bg-white dark:bg-[#0A0A14]',
    r'\bh-80 mt-8 relative bg-\[\#0A0A14\]\b': 'h-80 mt-8 relative bg-white dark:bg-[#0A0A14]',
    r'\btext-slate-100\b': 'text-slate-900 dark:text-slate-100',
    r'\btext-white\b': 'text-slate-900 dark:text-white',
    r'\bborder-slate-700\b': 'border-slate-300 dark:border-slate-700',
    r'\btext-slate-300\b': 'text-slate-700 dark:text-slate-300',
    r'\bbg-slate-800/50\b': 'bg-slate-100 dark:bg-slate-800/50',
    r'\bborder-slate-800\b': 'border-slate-200 dark:border-slate-800',
    r'\bh-64 mt-4 hidden md:block\b': 'h-64 mt-4 hidden md:block',
    r'\btext-slate-400\b': 'text-slate-500 dark:text-slate-400',
    r'\bbg-slate-800/30\b': 'bg-slate-50 dark:bg-slate-800/30',
    r'\bhover:bg-slate-700\b': 'hover:bg-slate-200 dark:hover:bg-slate-700',
    r'\btext-slate-200\b': 'text-slate-800 dark:text-slate-200',
    r'\bbg-slate-900\b': 'bg-slate-50 dark:bg-slate-900',
    r'\bborder-white/5\b': 'border-slate-200 dark:border-white/5',
    r'\btext-cyan-400\b': 'text-cyan-600 dark:text-cyan-400',
    r'\btext-purple-400\b': 'text-purple-600 dark:text-purple-400',
    r'\btext-green-400\b': 'text-green-600 dark:text-green-400',
    r'\btext-red-400\b': 'text-red-600 dark:text-red-400',
    r'\bbg-cyan-900/20\b': 'bg-cyan-50 dark:bg-cyan-900/20',
    r'\bborder-cyan-500/20\b': 'border-cyan-200 dark:border-cyan-500/20',
    r'\bbg-purple-900/20\b': 'bg-purple-50 dark:bg-purple-900/20',
    r'\bborder-purple-500/20\b': 'border-purple-200 dark:border-purple-500/20',
}

files_to_fix = [
    "HomeLoanEmi.tsx",
    "IncomeTaxCalculator.tsx",
    "SipCalculator.tsx",
    "CompoundInterestCalculator.tsx"
]

for filename in files_to_fix:
    filepath = os.path.join(tools_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    for old, new in replacements.items():
        content = re.sub(old, new, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Light mode styles applied to components.")

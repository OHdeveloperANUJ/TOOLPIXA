import os
import re

tools_dir = r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\components\tools"

replacements = {
    # Fix the duplicated script replaces
    r'bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50': 'bg-slate-50 dark:bg-slate-900/50',
    r'bg-slate-100 dark:bg-slate-100 dark:bg-slate-800': 'bg-slate-100 dark:bg-slate-800',
    r'bg-white dark:bg-white dark:bg-\[\#0A0A14\]': 'bg-white dark:bg-[#0A0A14]',
    r'text-slate-900 dark:text-slate-900 dark:text-slate-100': 'text-slate-900 dark:text-slate-100',
    r'text-slate-900 dark:text-slate-900 dark:text-white': 'text-slate-900 dark:text-white',
    r'border-slate-300 dark:border-slate-300 dark:border-slate-700': 'border-slate-300 dark:border-slate-700',
    r'text-slate-700 dark:text-slate-700 dark:text-slate-300': 'text-slate-700 dark:text-slate-300',
    r'text-slate-500 dark:text-slate-500 dark:text-slate-400': 'text-slate-500 dark:text-slate-400',
    r'border-slate-200 dark:border-slate-200 dark:border-white/5': 'border-slate-200 dark:border-white/5',
    r'text-cyan-600 dark:text-cyan-600 dark:text-cyan-400': 'text-cyan-600 dark:text-cyan-400',
    r'text-purple-600 dark:text-purple-600 dark:text-purple-400': 'text-purple-600 dark:text-purple-400',
    r'text-green-600 dark:text-green-600 dark:text-green-400': 'text-green-600 dark:text-green-400',
    
    # Fix Recharts Axis and Grid Colors for Light Mode compatibility
    r'stroke="#ffffff"': 'stroke="#64748b"',
    r'rgba\(255,255,255,0\.02\)': 'rgba(148, 163, 184, 0.1)',
    r'border: \'1px solid rgba\(255,255,255,0\.1\)\'': 'border: \'1px solid rgba(148, 163, 184, 0.2)\'',
    r'color: \'#f8fafc\'': 'color: \'#0f172a\'',
    r'color: \'#fff\'': 'color: \'#0f172a\'',
    r'boxShadow: \'0 10px 40px rgba\(0,0,0,0\.5\)\'': 'boxShadow: \'0 10px 40px rgba(0,0,0,0.1)\'',
    r'backgroundColor: \'rgba\(15, 23, 42, 0\.9\)\'': 'backgroundColor: \'rgba(255, 255, 255, 0.9)\'',
    
    # Fix inline text shadows that break light mode readability
    r' style=\{\{ textShadow: \'0 0 20px rgba\(34, 211, 238, 0\.4\)\' \}\}': '',
    r' style=\{\{ textShadow: \'0 0 20px rgba\(168, 85, 247, 0\.4\)\' \}\}': '',
    r' style=\{\{ textShadow: \'0 0 20px rgba\(16, 185, 129, 0\.4\)\' \}\}': '',
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

print("Light mode text/chart visibility fixed.")

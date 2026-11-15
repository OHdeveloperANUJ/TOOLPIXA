import os
import re

tools_dir = r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\components\tools"

# The new affiliate copy and link
new_paragraph = '<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Hey! Ready to start your investment journey? I use Groww for all my investing and trading needs. You can open a free demat account today using my referral code : <strong>K6827Z</strong> or simply click the link below:</p>'
new_link_url = 'https://app.groww.in/v3cO/edi2uad9'

replacements = {
    "CompoundInterestCalculator.tsx": [
        (r'<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Want higher returns than fixed deposits\? Groww offers direct mutual funds with zero commission to maximize your compounding.</p>', new_paragraph),
        (r'href="https://groww.in/mutual-funds"', f'href="{new_link_url}"'),
        (r'Explore Funds on Groww', 'Open Free Demat on Groww')
    ],
    "SipCalculator.tsx": [
        (r'<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Start your SIP today with zero commission and zero account opening fees\. Join 3 Crore\+ Indians on Groww\.</p>', new_paragraph),
        (r'href="https://groww.in/mutual-funds"', f'href="{new_link_url}"'),
        (r'Start Investing on Groww', 'Open Free Demat on Groww')
    ],
    "IncomeTaxCalculator.tsx": [
        (r'<p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Save up to ₹46,800 in taxes under Section 80C by investing in ELSS Mutual Funds.*</p>', new_paragraph),
        (r'href="https://groww.in/mutual-funds/category/elss-mutual-funds"', f'href="{new_link_url}"'),
        (r'Explore ELSS on Groww', 'Open Free Demat on Groww')
    ]
}

for filename, rules in replacements.items():
    filepath = os.path.join(tools_dir, filename)
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in rules:
        content = re.sub(old, new, content)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Groww links updated.")

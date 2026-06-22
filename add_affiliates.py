import os

tools_dir = r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\components\tools"

def get_affiliate_block(title, description, button_text, link, color_class, bg_color_class):
    return f"""
      {{/* Affiliate Placement */}}
      <div className="affiliate-cta-box bg-slate-50 dark:bg-[#0A0A14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-8">
        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full {bg_color_class} animate-pulse"></span>
          Sponsored Recommendation
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{description}</p>
        <a href="{link}" rel="sponsored noopener noreferrer" target="_blank" className="inline-block px-6 py-4 {color_class} text-white text-sm font-medium rounded-lg transition-colors">
          {button_text}
        </a>
      </div>
"""

affiliates = {
    "BmiCalculator.tsx": get_affiliate_block(
        "1mg",
        "Order your medicines, book lab tests, and get online doctor consultations from Tata 1mg.",
        "Visit Tata 1mg",
        "https://inr.deals/AUxdQI",
        "bg-orange-600 hover:bg-orange-700",
        "bg-orange-400"
    ),
    "CalorieDeficitCalculator.tsx": get_affiliate_block(
        "Healthkart",
        "Supercharge your fitness journey with premium whey protein, vitamins, and supplements from Healthkart.",
        "Shop on Healthkart",
        "https://inr.deals/UkcLT6",
        "bg-teal-600 hover:bg-teal-700",
        "bg-teal-400"
    ),
    "BmrCalculator.tsx": get_affiliate_block(
        "TrueBasics",
        "Support your metabolic health with clinically researched nutritional supplements from TrueBasics.",
        "Explore TrueBasics",
        "https://inr.deals/zE0j4A",
        "bg-indigo-600 hover:bg-indigo-700",
        "bg-indigo-400"
    ),
    "BodyFatCalculator.tsx": get_affiliate_block(
        "Dot & Key",
        "Take care of your skin and body with nature-forward, clinically proven skincare from Dot & Key.",
        "Shop Dot & Key",
        "https://inr.deals/pN2K3m",
        "bg-rose-500 hover:bg-rose-600",
        "bg-rose-400"
    ),
    "SalaryCalculator.tsx": get_affiliate_block(
        "Airtel Payment Bank",
        "Manage your salary securely and earn attractive interest rates with an Airtel Payments Bank savings account.",
        "Open Airtel Payments Bank Account",
        "https://inr.deals/ifPJIa",
        "bg-red-600 hover:bg-red-700",
        "bg-red-500"
    ),
    "PercentageCalculator.tsx": get_affiliate_block(
        "Ajio",
        "Calculate your shopping discounts and grab the best deals on top fashion brands at AJIO.",
        "Shop on AJIO",
        "https://inr.deals/S65z8Z",
        "bg-slate-800 hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
        "bg-slate-500"
    )
}

# Special replace for BMI since it already has one
for filename, block in affiliates.items():
    filepath = os.path.join(tools_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it's BMI, replace the old block
    if filename == "BmiCalculator.tsx":
        import re
        content = re.sub(r'\{/\* Affiliate Placement \*/\}.*?</div>', block.strip(), content, flags=re.DOTALL)
    else:
        # Check if we already injected
        if "Affiliate Placement" not in content:
            # Inject right before the last closing divs
            content = content.replace('    </div>\n  );\n}', block + '    </div>\n  );\n}')
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Affiliate links injected.")

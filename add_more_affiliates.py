import os
import re

tools_dir = r"C:\Users\Srijan\.gemini\antigravity\scratch\toolpixa-master\src\components\tools"

def get_affiliate_block(title, description, button_text, link, color_class, bg_color_class):
    return f"""
      {{/* Affiliate Placement */}}
      <div className="affiliate-cta-box bg-slate-50 dark:bg-[#0A0A14] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 mt-8 mb-4 max-w-4xl mx-auto w-full">
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
    "MutualFundLumpsumCalculator.tsx": get_affiliate_block(
        "StockEdge",
        "Take control of your investments. Analyze stocks and mutual funds like a pro with StockEdge.",
        "Analyze on StockEdge",
        "https://inr.deals/RfYK1E",
        "bg-blue-600 hover:bg-blue-700",
        "bg-blue-500"
    ),
    "RetirementCalculator.tsx": get_affiliate_block(
        "Bajaj Health Insurance",
        "Secure your retirement years and protect your savings from medical emergencies with comprehensive coverage from Bajaj Health Insurance.",
        "Get a Health Quote",
        "https://inr.deals/KMvdR5",
        "bg-red-600 hover:bg-red-700",
        "bg-red-500"
    ),
    "NetWorthCalculator.tsx": get_affiliate_block(
        "SBI Credit Card",
        "Boost your net worth with massive rewards and cashback on everyday online shopping using the SBI Simply Click Credit Card.",
        "Apply for SBI Simply Click",
        "https://inr.deals/tvceD4",
        "bg-indigo-600 hover:bg-indigo-700",
        "bg-indigo-500"
    ),
    "GstVatCalculator.tsx": get_affiliate_block(
        "Croma",
        "Calculating GST for your new tech or office equipment? Shop online and get the best deals on electronics at Croma.",
        "Shop Electronics on Croma",
        "https://inr.deals/OvGWAQ",
        "bg-teal-600 hover:bg-teal-700",
        "bg-teal-500"
    ),
    "StudyTimeEstimator.tsx": get_affiliate_block(
        "Nilkamal Sleep",
        "A good night's sleep is the secret to retaining what you study. Upgrade your rest with a premium mattress from Nilkamal Sleep.",
        "Explore Nilkamal Sleep",
        "https://inr.deals/fpBL96",
        "bg-purple-600 hover:bg-purple-700",
        "bg-purple-500"
    )
}

for filename, block in affiliates.items():
    filepath = os.path.join(tools_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Avoid injecting multiple times
    if "Affiliate Placement" not in content:
        # Find the last closing div before the export or the end of the file
        # Using a simple reverse find and replace
        parts = content.rsplit('</div>', 1)
        if len(parts) == 2:
            new_content = parts[0] + block + '</div>' + parts[1]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Injected into {filename}")
        else:
            print(f"Failed to find closing div in {filename}")

print("Affiliate links injection pass 2 completed.")

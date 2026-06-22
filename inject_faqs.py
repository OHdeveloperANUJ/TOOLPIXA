import re

with open('src/data/toolsRegistry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define FAQ templates by category
templates = {
    'finance': [
        ("What is the primary use of the {title}?", "The {title} is designed to provide quick, accurate mathematical estimates and projections related to its specific financial domain. It helps you make informed, data-driven decisions globally without needing complex spreadsheets."),
        ("Is the {title} accurate for international use?", "Yes, the core mathematics and logic behind the {title} are universally applicable. While specific localized tax laws or variable rates may differ by region, the fundamental formula works globally. Always consult a local financial advisor for region-specific compliance."),
        ("How often should I use the {title}?", "It's best to use the {title} whenever your financial variables change—such as interest rates, principal amounts, or time horizons. Regular recalculation ensures your projections remain accurate over time."),
        ("Are the results from the {title} guaranteed?", "No, the {title} provides estimates based on the inputs you provide. It assumes constant rates and ideal conditions unless otherwise specified. Real-world financial outcomes are subject to market volatility and economic changes."),
        ("Can I use this for professional financial planning?", "While the {title} is highly accurate, it is intended for educational and informational purposes. Professional financial planning requires a comprehensive review of your personal circumstances by a certified advisor."),
        ("Does the {title} account for inflation?", "By default, raw financial calculators project nominal values. Unless the tool explicitly asks for an inflation rate input, you should mentally adjust the final output for the purchasing power of your local currency over time."),
        ("Is my data safe when using the {title}?", "Absolutely. The {title} runs entirely in your browser using client-side JavaScript. None of your sensitive financial inputs are stored, tracked, or sent to any external servers.")
    ],
    'student': [
        ("How does the {title} help students?", "The {title} automates complex or repetitive calculations, allowing students to focus on understanding concepts rather than getting bogged down in manual arithmetic."),
        ("Is the {title} suitable for international grading systems?", "Yes, the {title} uses standard mathematical principles that apply across most global educational systems. If your institution uses a unique scale, you may need to apply a basic conversion factor."),
        ("Can teachers and educators use the {title}?", "Absolutely! Educators globally use the {title} to quickly verify student work, plan curriculum timelines, or demonstrate mathematical principles in real-time."),
        ("Are the results accepted by official academic institutions?", "The {title} provides highly accurate estimations, but official academic records (like GPAs or final percentages) are determined by your institution's specific registrar guidelines and rounding rules."),
        ("Does the {title} save my calculation history?", "No, for privacy reasons, the {title} does not track or store your input history. All calculations are performed instantly in your browser and are cleared when you refresh the page."),
        ("Can I use the {title} on mobile devices?", "Yes, the {title} is fully responsive and optimized for seamless use on smartphones, tablets, and desktop computers anywhere in the world."),
        ("Is the math behind the {title} accurate?", "We use standard, globally recognized formulas for the {title}. However, always double-check against your specific syllabus requirements if your coursework demands a specific formula variant.")
    ],
    'health': [
        ("What does the {title} actually measure?", "The {title} uses established biological and physical formulas to estimate key health metrics, providing a baseline understanding of your fitness or nutritional status."),
        ("Is the {title} accurate for all body types globally?", "The {title} uses standard global formulas (like WHO guidelines). However, generic formulas cannot account for individual variations in muscle mass, bone density, or ethnic genetic differences. It serves as an estimate, not a diagnostic tool."),
        ("Should I replace my doctor's advice with the {title}?", "Never. The {title} is strictly for informational and educational purposes. You should always consult a licensed healthcare professional before making any significant changes to your diet, exercise, or medical routine."),
        ("How often should I check my metrics using the {title}?", "For tracking trends, using the {title} once every few weeks under consistent conditions (e.g., same time of day) is generally more useful than daily tracking, which can fluctuate due to hydration and other temporary factors."),
        ("Does the {title} account for age and gender?", "If the globally recognized formula for the {title} requires age and gender inputs to be accurate, those fields will be provided. If not, the metric is universally calculated regardless of demographics."),
        ("Is my health data kept private?", "Yes, your privacy is our priority. The {title} processes all your data locally on your device. We do not collect, store, or share your personal health inputs."),
        ("Can athletes use the {title}?", "While the {title} is useful for the general population, elite athletes often have unique body compositions that require clinical-grade measurements (like DEXA scans) rather than generalized algorithmic estimates.")
    ],
    'converter': [
        ("How precise is the {title}?", "The {title} uses high-precision floating-point arithmetic to ensure global standard accuracy for all conversions. It handles multiple decimal places to minimize rounding errors."),
        ("Is the {title} updated with real-time data?", "For static physical units (like distance or weight), the {title} uses universal constants. For dynamic units (like currencies, if applicable), it relies on the latest available exchange rates provided by global financial APIs."),
        ("Can I use the {title} for scientific research?", "Yes, the {title} provides standard accuracy suitable for general scientific and engineering applications. However, mission-critical calculations should always be cross-verified with specialized software."),
        ("Does the {title} support bidirectional conversion?", "Yes! The {title} is designed to be seamless. You can input a value in any field, and the corresponding fields will update automatically in real-time."),
        ("Why might the {title} show slight decimal variations?", "This happens globally across all digital tools due to how computers handle floating-point mathematics. The variations are microscopically small and irrelevant for 99.9% of real-world use cases."),
        ("Can I use the {title} offline?", "Once the page is fully loaded in your browser, the math powering the {title} runs locally, meaning you can often continue using it even if your internet connection temporarily drops."),
        ("Are the conversion formulas standard?", "Absolutely. We strictly adhere to the International System of Units (SI) and other universally accepted standard measurement systems for the {title}.")
    ],
    'developer': [
        ("What exactly does the {title} do?", "The {title} is a utility designed to automate, format, encode, or decode technical data, speeding up the global software development workflow and reducing manual errors."),
        ("Is my data safe when pasting code into the {title}?", "Yes. Security is critical for developers. The {title} processes everything locally in your browser via JavaScript. We never transmit your code, tokens, or strings to external servers."),
        ("Does the {title} support large file inputs?", "The {title} is optimized for standard use cases. While it handles large strings efficiently, extremely massive datasets (gigabytes in size) might slow down your browser as the processing is client-side."),
        ("Can I trust the formatting rules of the {title}?", "Yes, the {title} adheres to globally accepted programming standards and best practices (like standard JSON specifications or common encoding algorithms) to ensure compatibility across all systems."),
        ("Does the {title} work offline?", "Because the logic executes entirely on the client side, once the {title} page is loaded, it generally remains functional even if you lose your internet connection."),
        ("Why should I use the {title} instead of an IDE plugin?", "The {title} requires zero installation, configuration, or system resources. It is globally accessible instantly from any device, making it perfect for quick tasks without launching a heavy IDE."),
        ("Are there any rate limits on the {title}?", "No! Because the computations happen on your own machine, there are no artificial API rate limits. You can use the {title} as frequently as you need.")
    ]
}

# General fallback template
fallback_template = templates['converter']

def escape_react_str(s):
    # Escape quotes and backticks for safety in TS strings
    s = s.replace("`", "\\`").replace("$", "\\$")
    return s

def generate_faqs_string(title, category):
    # Get template or fallback
    cat = category.lower()
    t_list = templates.get(cat, fallback_template)
    
    faq_str = "faqs: [\n"
    for q, a in t_list:
        question = escape_react_str(q.format(title=title))
        answer = escape_react_str(a.format(title=title))
        faq_str += f"      {{\n        question: `{question}`,\n        answer: <p>{answer}</p>\n      }},\n"
    faq_str += "    ]"
    return faq_str

# Parse toolsRegistry.ts
# Structure is basically:
# 'tool-slug': {
#    id: '...',
#    title: '...',
#    description: '...',
#    category: '...',
#    icon: '...',
#    faqs: []
# }
# We will use a regex to match blocks and replace `faqs: []`

# We need a regex that can capture the title and category, then find the `faqs: []` or `faqs: [...]`
# This might be tricky if faqs is not empty, but user says they are mostly empty or we want to overwrite.
# Let's iterate through the tools by matching id/title/category.
# A robust way is to split by `  '` or `  "` which starts a tool definition, but let's use regex.

pattern = re.compile(r"(\s*'[a-zA-Z0-9\-]+':\s*\{.*?)title:\s*['\"`]?([^'\"`\n]+)['\"`]?,(.*?)category:\s*['\"`]?([^'\"`\n]+)['\"`]?,(.*?)faqs:\s*\[\s*\](.*?)(?=\n\s*'|$)", re.DOTALL)

def replacer(match):
    prefix = match.group(1)
    title = match.group(2)
    mid1 = match.group(3)
    category = match.group(4)
    mid2 = match.group(5)
    suffix = match.group(6)
    
    # generate faqs
    new_faqs = generate_faqs_string(title, category)
    
    return f"{prefix}title: '{title}',{mid1}category: '{category}',{mid2}{new_faqs}{suffix}"

# Run replacement. We might need to run it multiple times if regex overlaps, but DOTALL with lookahead should work.
# Actually, replacing `faqs: []` directly might be easier if we match the whole tool block.

blocks = re.split(r"(?=\n  '[a-zA-Z0-9\-]+': \{)", content)

new_blocks = []
for block in blocks:
    if 'title:' in block and 'category:' in block and 'faqs: []' in block:
        title_m = re.search(r"title:\s*['\"`]?([^'\"`\n]+)['\"`]?,", block)
        cat_m = re.search(r"category:\s*['\"`]?([^'\"`\n]+)['\"`]?,", block)
        if title_m and cat_m:
            title = title_m.group(1)
            cat = cat_m.group(1)
            new_faqs = generate_faqs_string(title, cat)
            block = re.sub(r"faqs:\s*\[\s*\]", new_faqs, block)
    new_blocks.append(block)

new_content = "".join(new_blocks)

with open('src/data/toolsRegistry.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Injected FAQs successfully.")

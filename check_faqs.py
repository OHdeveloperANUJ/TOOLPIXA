import re
with open('src/data/toolsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# very rough extraction of FAQs
# tools are typically {} objects, we can look for "faqs:" arrays
# Actually let's just count total "slug:" vs total "faqs:" 
slugs = len(re.findall(r"slug:\s*['\"`]", content))
faqs_arrays = len(re.findall(r"faqs:\s*\[", content))

print(f"Total tools (slugs): {slugs}")
print(f"Total faqs arrays: {faqs_arrays}")

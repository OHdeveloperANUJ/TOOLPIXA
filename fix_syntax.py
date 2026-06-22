import re

with open('src/data/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace trailing commas that create empty elements
# e.g., `}, \n , \n {` -> `}, \n {`
fixed_content = re.sub(r'},\s*,\s*\{', '},\n  {', content)

with open('src/data/blogData.ts', 'w', encoding='utf-8') as f:
    f.write(fixed_content)
    
print("Fixed syntax issues.")

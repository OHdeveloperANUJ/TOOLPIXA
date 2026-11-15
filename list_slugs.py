import re

with open('src/data/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

slugs = re.findall(r"slug:\s*'([^']+)'", content)
print("Slugs found:", slugs)

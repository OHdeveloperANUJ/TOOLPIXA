import re
with open('src/data/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

slugs = re.findall(r"slug:\s*['\"`]([^'\"`]+)['\"`]", content)
titles = re.findall(r"title:\s*['\"`]([^'\"`]+)['\"`]", content)

for i in range(len(slugs)):
    print(f"Slug: {slugs[i]} | Title: {titles[i] if i < len(titles) else 'N/A'}")

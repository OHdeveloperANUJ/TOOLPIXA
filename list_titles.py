import re

with open('src/data/blogData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

posts = re.findall(r"slug:\s*'([^']+)',\s*title:\s*'([^']+)'", content)
for slug, title in posts:
    print(f"Slug: {slug} | Title: {title}")

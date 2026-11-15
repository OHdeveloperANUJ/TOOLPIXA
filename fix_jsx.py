import re

with open('src/data/toolsRegistry.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# I will just replace `<p>` and `</p>` with backticks, but wait, the content currently has:
# answer: <p>The Attendance ...</p>
# I will use a regex to replace `answer: <p>(.*?)</p>` with `answer: \`\1\``

new_content = re.sub(r"answer:\s*<p>(.*?)</p>", r"answer: `\1`", content)

with open('src/data/toolsRegistry.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed JSX error.")

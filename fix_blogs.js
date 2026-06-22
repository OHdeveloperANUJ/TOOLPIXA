const fs = require('fs');

const file = 'src/data/blogData.ts';
let content = fs.readFileSync(file, 'utf8');

// We will split the file by "  },\n  {" and filter out the ones we don't want.
// First, let's identify the start and end of the blogPosts array.
const startIdx = content.indexOf('export const blogPosts: BlogPost[] = [');
if (startIdx === -1) throw new Error("Could not find blogPosts array");

const arrayStart = content.indexOf('[', startIdx);
const arrayEnd = content.lastIndexOf('];');

if (arrayStart === -1 || arrayEnd === -1) throw new Error("Could not parse array bounds");

const beforeArray = content.substring(0, arrayStart + 1);
const afterArray = content.substring(arrayEnd);
let arrayContent = content.substring(arrayStart + 1, arrayEnd);

// Split by "  },\n  {" but be careful about the first and last objects.
// Let's use a regex to match individual blog post objects.
// A blog post object starts with "  {\n    slug:" and ends with "\n  }"
// Wait, `arrayContent` starts with "\n  {" and ends with "\n  }"
const objectRegex = /\{\s*slug:\s*['"`]([^'"`]+)['"`][\s\S]*?(?=\},\s*\{|\}\s*$)/g;

let match;
const posts = [];
let lastIndex = 0;

while ((match = objectRegex.exec(arrayContent)) !== null) {
  let fullMatch = match[0];
  const slug = match[1];
  
  // To include the closing brace correctly:
  // If it's not the end of the string, it ends right before `}, {`
  // so we need to add `}` back to fullMatch if it doesn't end with it.
  if (!fullMatch.trim().endsWith('}')) {
    fullMatch += '\n  }';
  }
  
  posts.push({ slug, text: fullMatch });
}

// Remove off-topic and duplicates
const offTopic = [
  'future-of-ai-in-modern-design',
  'optimizing-react-performance-in-2026',
  'youtube-thumbnail-strategy',
  'black-friday-math-fake-discounts',
  'mastering-pomodoro-technique'
];

const seenSlugs = new Set();
const filteredPosts = [];

for (const post of posts) {
  if (offTopic.includes(post.slug)) {
    console.log(`Removing off-topic: ${post.slug}`);
    continue;
  }
  
  if (seenSlugs.has(post.slug)) {
    console.log(`Removing duplicate: ${post.slug}`);
    continue;
  }
  
  seenSlugs.add(post.slug);
  
  let text = post.text;
  if (post.slug === 'mastering-financial-modeling-for-startups') {
     console.log('Fixing date for mastering-financial-modeling-for-startups');
     text = text.replace(/date:\s*['"`]2026-10-15['"`]/, "date: '2026-06-22'");
  }
  
  filteredPosts.push(text);
}

// Reconstruct the file
const newArrayContent = '\n  ' + filteredPosts.join(',\n  ') + '\n';
const newContent = beforeArray + newArrayContent + afterArray;

fs.writeFileSync(file, newContent);
console.log('Done!');

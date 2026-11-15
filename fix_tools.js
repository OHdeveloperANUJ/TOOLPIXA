const fs = require('fs');

const file = 'src/data/toolsRegistry.ts';
let content = fs.readFileSync(file, 'utf8');

const toolsToRemove = [
  'compress-pdf', 'compress-pdf-to-200kb', 'compress-pdf-to-500kb', 'compress-pdf-to-1mb',
  'jpg-to-pdf', 'pdf-to-jpg', 'merge-pdf', 'split-pdf', 'delete-pdf-pages', 'add-page-numbers-to-pdf',
  'rotate-pdf', 'word-to-pdf-converter', 'pdf-to-text-converter', 'pdf-to-word-converter',
  'bulk-image-compressor', 'compress-image-to-20kb', 'compress-image-to-50kb',
  'compress-image-to-100kb', 'compress-image-to-200kb', 'resize-image-to-300kb', 'image-size-reducer'
];

// Removing tools
for (const tool of toolsToRemove) {
  // Regex to match the tool block.
  // It starts with `'tool-name': {`
  // It ends right before the next `'next-tool-name': {` or `};`
  const regex = new RegExp(`\\n\\s*'${tool}':\\s*\\{[\\s\\S]*?(?=\\n\\s*'([\\w-]+)':\\s*\\{|\\n\\s*\\};)`, 'g');
  content = content.replace(regex, '');
}

// Renaming 'home-loan-emi'
content = content.replace(
  /\n\s*'home-loan-emi':\s*\{/g, 
  "\n  'home-loan-emi-calculator': {"
);
content = content.replace(
  /id:\s*'home-loan-emi',/g,
  "id: 'home-loan-emi-calculator',"
);

// Renaming 'compound-interest'
content = content.replace(
  /\n\s*'compound-interest':\s*\{/g, 
  "\n  'compound-interest-calculator': {"
);
content = content.replace(
  /id:\s*'compound-interest',/g,
  "id: 'compound-interest-calculator',"
);

// Splitting 'fd-rd-calculator'
// We will extract it, replace its ID/title to make 'fd-calculator' and 'rd-calculator'
const fdRdRegex = /\n\s*'fd-rd-calculator':\s*\{[\s\S]*?(?=\n\s*'([\w-]+)':\s*\{|\n\s*\};)/;
const fdRdMatch = content.match(fdRdRegex);
if (fdRdMatch) {
  const baseBlock = fdRdMatch[0];
  
  let fdBlock = baseBlock
    .replace("'fd-rd-calculator': {", "'fd-calculator': {")
    .replace("id: 'fd-rd-calculator',", "id: 'fd-calculator',")
    .replace("title: 'FD & RD Calculator',", "title: 'FD Calculator',");
    
  let rdBlock = baseBlock
    .replace("'fd-rd-calculator': {", "'rd-calculator': {")
    .replace("id: 'fd-rd-calculator',", "id: 'rd-calculator',")
    .replace("title: 'FD & RD Calculator',", "title: 'RD Calculator',");

  content = content.replace(fdRdRegex, fdBlock + rdBlock);
}

// Splitting 'gst-vat-calculator'
const gstVatRegex = /\n\s*'gst-vat-calculator':\s*\{[\s\S]*?(?=\n\s*'([\w-]+)':\s*\{|\n\s*\};)/;
const gstVatMatch = content.match(gstVatRegex);
if (gstVatMatch) {
  const baseBlock = gstVatMatch[0];
  
  let gstBlock = baseBlock
    .replace("'gst-vat-calculator': {", "'gst-calculator': {")
    .replace("id: 'gst-vat-calculator',", "id: 'gst-calculator',")
    .replace("title: 'GST & VAT Calculator',", "title: 'GST Calculator',");
    
  let vatBlock = baseBlock
    .replace("'gst-vat-calculator': {", "'vat-calculator': {")
    .replace("id: 'gst-vat-calculator',", "id: 'vat-calculator',")
    .replace("title: 'GST & VAT Calculator',", "title: 'VAT Calculator',");

  content = content.replace(gstVatRegex, gstBlock + vatBlock);
}

// Splitting 'bmr-tdee-calculator'
const bmrRegex = /\n\s*'bmr-tdee-calculator':\s*\{[\s\S]*?(?=\n\s*'([\w-]+)':\s*\{|\n\s*\};)/;
const bmrMatch = content.match(bmrRegex);
if (bmrMatch) {
  const baseBlock = bmrMatch[0];
  
  let bmrBlock = baseBlock
    .replace("'bmr-tdee-calculator': {", "'bmr-calculator': {")
    .replace("id: 'bmr-tdee-calculator',", "id: 'bmr-calculator',")
    .replace("title: 'BMR & TDEE Calculator',", "title: 'BMR Calculator',");
    
  let tdeeBlock = baseBlock
    .replace("'bmr-tdee-calculator': {", "'tdee-calculator': {")
    .replace("id: 'bmr-tdee-calculator',", "id: 'tdee-calculator',")
    .replace("title: 'BMR & TDEE Calculator',", "title: 'TDEE Calculator',");

  content = content.replace(bmrRegex, bmrBlock + tdeeBlock);
}

fs.writeFileSync(file, content);
console.log('Successfully updated tools registry!');

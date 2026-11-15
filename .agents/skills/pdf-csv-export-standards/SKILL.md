---
name: PDF & CSV Export Standards
description: Guidelines for generating high-quality, professional-grade PDF and CSV reports from calculator outputs (amortization tables, comparison sheets).
---

# PDF & CSV Export Standards

This skill defines the styling, formatting, and implementation rules for file downloads on ToolPixa, ensuring files generated for users look professional, clean, and print-ready.

---

## 1. CSV EXPORT IMPLEMENTATION

- **Data Encoding**: Always encode string data as UTF-8 with a Byte Order Mark (BOM) `\uFEFF` to ensure Microsoft Excel parses special currency characters (like ₹, $, €) and accents correctly.
- **Escape Fields**: Ensure all fields containing commas, double-quotes, or newlines are wrapped in double quotes, and any double quotes are escaped as `""`.
- **Blob Download Pattern**:
  ```typescript
  const csvContent = "\uFEFF" + rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `ToolPixa_Report_${date}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  ```

---

## 2. PDF LAYOUT & BRANDING

Never output a plain table on a blank white page. PDFs must look like branded, professional financial/health reports:

- **Branded Header**:
  - Include the company logo or "ToolPixa | Smart Financial Tools" header at the top left.
  - Right-aligned metadata: Report ID, date generated, and user input variables (e.g. Loan Amount: ₹50L, Interest: 8.5%, Tenure: 15Y).
- **Summary Cards Grid**:
  - Render a visual summary grid matching the UI's results dashboard before showing the large data table.
  - Draw subtle gray dividers between sections.
- **Color Accent**: Use the brand primary colors (e.g., emerald green or royal blue) for headers, total rows, and active highlights.

---

## 3. PRINT STYLING & COLUMN LAYOUTS

When rendering wide tables (like monthly amortization schedules with 180+ rows):

- **Column Widths**: Align columns precisely. Left-align strings/dates; right-align numeric amounts and currency figures.
- **Table Headers**: Repeat table header rows on every page using `thead { display: table-header-group; }`.
- **Page Breaks**: Use `page-break-inside: avoid` on table rows and section containers to prevent a single line of a card or row splitting across pages.
- **A4 Portrait Alignment**: Limit column count to fit within A4 margins (approx 800px width). Never allow horizontal text clipping.
- **Pagination**: Include "Page X of Y" footers centered at the bottom of each page.

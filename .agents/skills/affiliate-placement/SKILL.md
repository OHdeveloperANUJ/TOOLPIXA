---
name: Affiliate Placement
description: Rules for injecting affiliate CTAs into specific tool categories.
---

# Affiliate Placement Rules

You must inject specific affiliate calls-to-action (CTAs) based on the tool's category.

**Placement Mapping:**
- **EMI / Loan Tools**: BankBazaar
- **SIP / Investment Tools**: Groww
- **Health / Insurance Tools**: PolicyBazaar
- **Specific Physical Product Tools**: Amazon

**Exact HTML Template for CTA Box:**
Use the following structure for the affiliate box:
```html
<div class="affiliate-cta-box" style="margin-top: 24px; padding: 16px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #f8fafc;">
  <h4 style="margin-bottom: 8px; font-weight: 600;">Sponsored Recommendation</h4>
  <p style="margin-bottom: 16px;">[Engaging copy related to the affiliate partner]</p>
  <a href="[AFFILIATE_LINK]" rel="sponsored noopener noreferrer" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #2563eb; color: white; border-radius: 4px; text-decoration: none;">
    Explore on [Partner Name]
  </a>
</div>
```
Ensure `rel="sponsored"` is ALWAYS present.

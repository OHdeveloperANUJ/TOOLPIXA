---
name: HTML/CSS/JS Static Site
description: Enforces the vanilla tech stack, spacing scale, and UI rules for building tools.
---

# HTML/CSS/JS Static Site Rules

When generating code for tools or UI components, you MUST adhere to the following stack and design rules:

1. **Exact Stack**: 
   - No frameworks (No React, Vue, Svelte, etc.)
   - No backend (Must be purely static)
   - Vanilla JS only
   *(Note: If building within an existing Next.js wrapper, ensure the core logic is as framework-agnostic/vanilla as possible within the component).*
2. **Spacing Scale**: Strictly use an 8px spacing scale (e.g., 8px, 16px, 24px, 32px, 40px, 48px).
3. **Icons**: Use Lucide icons only.
4. **Language**: Only one language must be visible at a time on the UI.

---
name: Calculator Logic
description: Rules for calculator interactivity, results, and sharing features.
---

# Calculator Logic Rules

When building any interactive calculator, you must implement the following behaviors:

1. **Live Calculation**: Calculations must trigger automatically on input change (`input` or `change` events).
2. **No Submit Buttons**: Do not use a Submit or Calculate button unless absolutely necessary for external API calls. Everything should be reactive.
3. **Result Card Structure**: Results must be displayed in a clearly defined, visually prominent "Result Card" structure.
4. **Copy Button**: Include a button to copy the final results to the clipboard.
5. **WhatsApp Share**: Include a WhatsApp share feature. (See Result Sharing Skill for exact format).

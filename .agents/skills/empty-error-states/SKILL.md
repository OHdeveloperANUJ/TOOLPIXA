---
name: Empty State & Error State
description: Rules for handling empty inputs and calculation errors.
---

# Empty State & Error State Rules

What makes tools feel polished vs cheap:

1. **Pre-filled Defaults**: Before the user enters anything, show a helpful placeholder example pre-filled in the inputs.
2. **Invalid Input**: Show a friendly message. The words "NaN" or "undefined" must NEVER appear on screen.
3. **Zero Result**: If the result is 0, explain why (e.g., "Increase your deposit to see growth"), don't just show ₹0.
4. **Edge Cases**: All edge cases must be handled gracefully: empty fields, negative numbers, extremely large numbers.

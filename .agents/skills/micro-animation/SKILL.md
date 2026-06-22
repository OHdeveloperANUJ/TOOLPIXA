---
name: Micro-Animation
description: Rules for interactive moments and UI feedback.
---

# Micro-Animation Rules

Every interactive moment must feel responsive and polished:

1. **Number Counters**: Numbers must animate from 0 to the result over 800ms.
2. **Invalid Input**: Inputs must trigger a shake animation on invalid entry.
3. **Result Card**: Result cards must fade in smoothly, never popping instantly.
4. **Buttons**: Buttons must have a press-down scale effect (e.g., scale to 0.96 on active).
5. **Sliders**: Sliders must show a colored fill track that moves with the thumb.
6. **Copy Button**: Upon clicking, the copy button text must change to "Copied ✓" for exactly 2 seconds before reverting.

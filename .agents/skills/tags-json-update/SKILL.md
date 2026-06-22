---
name: Tags JSON Update
description: Mandatory rule to update tags.json when creating new tools.
---

# tags.json Update Rule

**CRITICAL MANDATORY STEP:**
Every single time a new tool is built or generated, you MUST automatically add the tool's details (name, slug) to the correct category arrays in `tags.json`.

**Enforcement:**
Do not skip this step. If you create a tool, your very next action must be modifying `tags.json` to include it.

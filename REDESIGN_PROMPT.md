# Preciado Tech Redesign Prompt

Use this prompt with a coding/design model to redesign the existing `business-page` React/Vite site in-place.

## Prompt

```text
You are redesigning an existing React/Vite landing page for Preciado Tech.

Repository context:
- This is a real production site, not a concept mockup
- Keep the project as a maintainable React/Vite codebase
- Work directly within the current structure unless a cleaner structure is clearly better
- Preserve deployability, readability, and maintainability

Brand context:
Preciado Tech is a small remote studio focused on practical AI workflows, automation systems, and polished digital tools.

The site should feel:
- premium
- modern
- memorable
- design-conscious
- technically capable
- calm but bold
- futuristic in a tasteful way

It should NOT feel like:
- a generic SaaS template
- AI hype slop
- a crypto landing page
- a default Vite starter
- a shallow dribbble shot with bad usability

Current project goals:
- dramatically improve the visual design
- keep the existing business direction intact
- improve hierarchy, spacing, composition, and polish
- make the site feel like a serious creative-technical studio someone would trust and want to hire

Keep these content sections, though you may redesign and restructure them heavily:
- top brand / navigation area
- hero section
- services
- how it works / process
- principles / credibility
- final CTA

Design direction:
- dark, cinematic, premium visual system
- stronger typography with better scale and rhythm
- more dramatic hero composition
- more intentional spacing and asymmetry
- ambient depth, subtle glow, grid, texture, or systems-inspired visual language
- elegant panels/cards, only if they feel premium
- better section transitions and stronger overall flow
- visually communicate precision, intelligence, and leverage without using cheesy AI tropes

Implementation requirements:
- edit the existing codebase directly
- prefer React + CSS using the current setup
- keep it responsive and accessible
- keep contrast readable
- keep performance reasonable
- remove any design elements that feel generic or weak
- do not add fake testimonials, fake stats, or fake client logos
- do not add unnecessary libraries unless they create clear value
- keep copy aligned to the current Preciado Tech positioning

Specific improvements to aim for:
1. Hero should feel dramatically stronger and more premium
2. Buttons and CTAs should feel refined and intentional
3. Services should look like high-value offerings, not simple feature cards
4. Principles / credibility area should feel designed, not boxed in by default
5. Background and layout should create atmosphere without clutter
6. Overall result should feel like a polished version 2, not just a reskin

Deliverables:
- updated React/CSS code
- production-ready implementation
- clean file structure
- brief summary of what changed and why

Before finalizing, self-critique the result against this question:
"Does this actually look like a serious, premium studio site that stands apart from generic AI startup templates?"

If not, push the design further.
```

## Recommended use

Run this against the `business-page` repo with a coding model that can edit files directly.

Suggested workflow:
1. Create a redesign branch
2. Apply the prompt
3. Review the result visually
4. Refine copy and layout if needed
5. Merge only after it feels meaningfully better than the current live version

# Apple Layout Rhythm, Negative Space & Asymmetric Balance

## 1. The 8pt Baseline Grid & Spacing Scale

Apple designs are strictly aligned to a spatial grid:

* `4px` / `8px`: Micro gaps (icon to text, internal pill padding).
* `16px` / `24px`: Compact component spacing (card interior element gaps).
* `32px` / `48px`: Module separation within a section.
* `64px` / `96px`: Primary content group separation.
* `120px` / `160px`: Section-to-section transitions.

## 2. Asymmetric Tension: The Pro Reveal Layout
Apple avoids monotonous centered blocks. Instead, they pair:
* **The Monolithic Anchor**: A massive, bold left-aligned headline with a concise 2-sentence value proposition.
* **The Floating Physical Subject**: An uncropped 3D render floating slightly offset to the right, creating dynamic diagonal visual movement.
* **The Precision Footnote**: Minimalist tech metrics stacked in clean horizontal compartments below the subject.

## 3. Visual Weight & Hierarchy Audit Checklist
Before shipping any Apple-grade interface, audit:
1. **Is the subject uncropped?** Does the viewer see the full physical form without clipped edges?
2. **Is negative space intentional?** Does the eye rest comfortably on the primary focal point without distractions?
3. **Are dividers whisper-quiet?** Never use harsh solid 1px borders. Use `border-white/[0.08]` or `border-black/[0.06]`.
4. **Is interaction immediate?** Does clicking an element deliver direct, fluid navigation with zero friction?

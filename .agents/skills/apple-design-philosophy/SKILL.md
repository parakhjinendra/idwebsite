---
name: apple-design-philosophy
description: >-
  Comprehensive guide and implementation framework for Apple's UI/UX design philosophy,
  Human Interface Guidelines (HIG), and industrial design principles. Use this skill when
  the user wants to build, redesign, or audit high-end websites, portfolio showcases, or apps
  with Apple's signature premium aesthetic, typography, fluid spring motion, materials,
  optical sizing, and spatial hierarchy.
---

# Apple Design Philosophy & Implementation Framework

A masterclass framework translating Apple's design philosophy into practical, high-impact web and interface development.

---

## 1. The Core Philosophy: "Intentionally Inevitable"

Apple design is not merely minimalism; it is **extreme intentionality**. Every element feels as if it could not possibly exist in any other form or position.

### The Four Pillars (Apple Human Interface Guidelines)
1. **Deference**: The interface never competes with the content. The hardware and UI recede into the background, letting the product, photography, and idea be the hero.
2. **Clarity**: Text is legible at every size, icons are precise and instantly recognizable, decorations are purposeful, and negative space directs the eye effortlessly.
3. **Depth & Vibrancy**: Layers, realistic translucency, and continuous physical lighting establish hierarchy, giving users an intuitive sense of orientation and spatial relationship.
4. **Physicality & Consequence**: Digital interactions behave like precision-engineered mechanical objects. Buttons possess mass, switches click with tactile feedback, and surfaces respond to touch with spring inertia.

---

## 2. Typography: The Science of San Francisco

Apple's typography communicates authority, refinement, and effortless readability.

### Optical Sizing & Hierarchy
* **Display / Hero (> 64px)**:
  * Tight tracking (`tracking-[-0.035em]` to `tracking-[-0.04em]`).
  * Tight line-height (`leading-[0.95]` to `leading-[1.05]`) so multiple lines read as a unified physical sculpture.
  * Often finished with Apple's iconic subtle vertical gradient: pure white `#ffffff` transitioning to light metallic grey `#a1a1a6` or `#86868b`.
* **Titles & Subheadings (24px – 48px)**:
  * Moderate negative tracking (`tracking-[-0.015em]` to `tracking-[-0.02em]`).
  * Leading: `leading-[1.15]` to `leading-[1.25]`.
* **Body Copy (16px – 19px)**:
  * Neutral tracking (`tracking-[-0.005em]` to `tracking-normal`).
  * Line-height: `leading-[1.5]` to `leading-[1.6]`.
  * Max-width: 580px – 640px. Never span body text across wide screens; narrow columns respect human eye span.
* **Eyebrows & Micro-Labels (10px – 12px)**:
  * Wide tracking (`tracking-[0.14em]` to `tracking-[0.2em]`).
  * Uppercase or small-caps, font-semibold / font-bold.
  * High-contrast neutral tint (`text-[#86868b]` or vivid accent like vermilion `#FF3B1D` / electric blue `#2997ff`).

### Apple Font Rendering Rule
Always ensure hardware font smoothing in CSS:
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

---

## 3. Materials, Translucency & Specular Highlights

Apple UI creates the illusion of tangible materials: frosted sapphire, anodized aluminum, space titanium, and smoked glass.

### Dark Mode: "Deep Space Titanium" Palette
* **Canvas / Void**: Pure pitch black `#000000` (OLED depth).
* **Base Surface (Plinths & Cards)**: `#121214` to `#161617`.
* **Elevated Surface (Controls & Modals)**: `#1d1d1f` to `#242426`.
* **Primary Text**: `#f5f5f7` (96% white, avoids harsh optical vibration).
* **Secondary Text**: `#86868b` (Apple's signature neutral slate).
* **Tertiary / Inactive**: `#6e6e73`.

### The Specular Highlight (The Secret to Apple's Premium Feel)
Physical glass and milled aluminum always catch light at the top edge. In CSS, never rely solely on flat border strokes. Use an inset highlight:
```css
/* Signature Apple Card Specular Finish */
.apple-card {
  background: rgba(22, 22, 23, 0.85);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.14),
    0 24px 48px -12px rgba(0, 0, 0, 0.5);
}
```

---

## 4. Continuous Curvature: The True Squircle

Standard CSS `border-radius` produces sharp curvature discontinuities where the straight edge meets the circle arc. Apple invented continuous G2 curvature (the "Squircle" or superellipse).
* On the web, simulate this using:
  * Extra-generous corner radii: `rounded-[28px]`, `rounded-[32px]`, `rounded-[40px]`.
  * Deep proportional inner padding (`p-8` to `p-12`), ensuring interior elements never breach the curve boundary.
  * Nested pills and tags inside the card echoing the squircle curvature (`rounded-full`).

---

## 5. Motion & Physics: The Apple Spring

Apple never uses linear or mechanical cubic-bezier eases. Every animation is governed by a **damped harmonic oscillator (spring physics)**.

### Standard Apple Spring Config (Framer Motion)
```javascript
// Responsive, zero-latency physical settle
export const appleSpring = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 1
};

// Subtle interactive micro-press
export const applePressAnimation = {
  whileHover: { scale: 1.015, transition: appleSpring },
  whileTap: { scale: 0.975, transition: appleSpring }
};
```

---

## 6. Spacing & The "Breath of Luxury"

Cheap websites crowd the viewport; Apple gives ideas monumental space to breathe.
* **Vertical Section Rhythm**: Minimum `py-24` (96px) to `py-36` (144px).
* **The "One Monumental Idea" Principle**: When introducing a major hardware inquiry or hero product, allocate the full 100vh height or generous 900px+ height.
* **Asymmetric Grid Balance**: Balance heavy display text on the left with a solitary, perfectly lit floating hardware subject on the right.

---

## 7. Product Presentation & CMF (Color, Material, Finish)

* **Zero-Cropping Standard**: Never crop product design imagery into arbitrary square boxes. The entire silhouette, radius, parting line, and chamfer must remain visible.
* **Atmospheric Lighting**: Subtle radial gradients placed behind the product (`radial-gradient(ellipse at center, rgba(255,59,29,0.18), transparent 70%)`) to create cinematic rim illumination.
* **Interactive Hotspots**: Subtle pulsing rings on the hardware that expand on hover/click to reveal micro-spec callouts (materials, switch detents, tolerances).
* **Tech Specs Table**: Crisp horizontal dividers (`border-white/10`), bold monolithic numbers, and muted descriptive keys.

---

## 8. Reference Guides in this Skill

* [Typography & Optical Sizing](./references/typography.md)
* [Materials, Glass & Specular Highlights](./references/materials-and-depth.md)
* [Motion, Springs & Micro-Interactions](./references/motion-and-physics.md)
* [Layout Rhythm & Asymmetric Balance](./references/layout-and-spacing.md)

# Apple Motion, Springs & Kinetic Micro-Interactions

## 1. Damped Harmonic Physics vs. Robotic Eases

Traditional cubic-bezier curves (e.g., `ease-in-out`) feel artificial because objects in the real world have mass, friction, and tension. Apple interactions use physics models:

$$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k x = 0$$

Where:
* $m$ is **mass** (typically 1.0)
* $c$ is **damping** (resistance to oscillation)
* $k$ is **stiffness** (how aggressively the object seeks its resting state)

### Framer Motion Spring Presets

```javascript
// 1. Apple Fluid Navigation / Page Shift
export const appleNavSpring = {
  type: "spring",
  stiffness: 280,
  damping: 30,
  mass: 1
};

// 2. Apple Card Hover & Expansion
export const appleCardSpring = {
  type: "spring",
  stiffness: 240,
  damping: 26,
  mass: 0.95
};

// 3. Apple Micro-Haptic Click / Press
export const applePressSpring = {
  type: "spring",
  stiffness: 450,
  damping: 32,
  mass: 0.6
};
```

## 2. Scroll-Linked Scrub Choreography
On Apple product pages, elements respond to the user's scroll position:
* As a user scrolls into a section, the headline fades in with a gentle upward drift (`y: 40 -> 0`, `opacity: 0 -> 1`).
* Hardware renders slowly expand (`scale: 0.95 -> 1.00`), simulating a camera lens dollying closer.
* Supporting metadata and callout pins stagger in sequence (100ms delay between items).

## 3. Cursor & Micro-Interactions
* Interactive pills and buttons gently compress on tap (`scale: 0.975`).
* Hover states trigger subtle luminance brightening (`hover:brightness-110`) rather than jarring color shifts.
* Expandable lightboxes scale out smoothly from the center of the clicked thumbnail using shared layout IDs or origin points.

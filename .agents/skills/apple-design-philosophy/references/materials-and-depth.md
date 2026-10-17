# Apple Materials, Vibrancy & Depth System

## 1. The Physics of Apple Glass (Liquid Glass & Frosted Sapphire)

Apple interfaces are physically grounded in optics. Light interacts with surfaces through:
1. **Transmission**: Background colors pass through with high-order Gaussian blur (20px to 40px radius).
2. **Diffusion**: The surface texture scatters light, eliminating high-frequency noise from underlying content.
3. **Specular Reflection**: The top boundary catches environmental light, producing a crisp, razor-sharp white rim reflection.
4. **Subsurface Scattering**: In deep dark modes, surfaces contain a faint tint of the accent color in the shadow penumbra.

### Practical CSS Recipe for Apple Pro Frosted Glass

```css
/* Signature Apple Pro Glass Container */
.apple-glass {
  background: rgba(20, 20, 22, 0.72);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    /* Specular Top Rim Highlight */
    inset 0 1px 0 0 rgba(255, 255, 255, 0.16),
    /* Soft Internal Glow */
    inset 0 0 16px 0 rgba(255, 255, 255, 0.02),
    /* Ambient Drop Occlusion */
    0 30px 60px -15px rgba(0, 0, 0, 0.65);
}
```

## 2. Layering Surfaces in Deep Space Black

To prevent the interface from looking like a flat black sheet, Apple uses 4 distinct depth elevations:

1. **Depth 0 (Canvas Void)**: `#000000` (Pure Black). Everything floats above this infinite void.
2. **Depth 1 (Base Plinth)**: `#121214` to `#161617`. Used for wide section blocks, showcase containers, and background pedestals.
3. **Depth 2 (Interactive Squircle Card)**: `#1c1c1e` to `#242426`. High-contrast interactive elements.
4. **Depth 3 (Floating Controls / Modals)**: `rgba(40, 40, 44, 0.85)` with `backdrop-blur-xl`.
5. **Depth 4 (Overlays / Tooltips)**: Pure white `#ffffff` or saturated accent `#FF3B1D` with dark text.

## 3. Atmospheric Illumination
Behind hero hardware renders, place radial gradients with large radii and soft falloffs:
```jsx
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,59,29,0.14),transparent_65%)] pointer-events-none" />
```
This gives the hardware render volumetric presence, making it look tangible rather than pasted on.

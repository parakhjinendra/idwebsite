# Apple Typography & Optical Sizing Reference

## 1. The San Francisco Family Hierarchy
Apple's custom typeface family (San Francisco) is built on dynamic optical sizing. As text grows larger, the letterforms condense slightly, tracking tightens, and ascenders/descenders adjust to prevent loose visual noise.

### Scale, Tracking & Leading Matrix

| Element | Size | Tracking | Leading | Weight | Color (Dark Theme) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Monolithic Hero** | 80px – 112px | `-0.035em` | `0.98` | 700 / 900 | `#ffffff` to `#86868b` gradient |
| **Section Display** | 48px – 64px | `-0.025em` | `1.05` | 600 / 700 | `#f5f5f7` |
| **Card / Project Title** | 24px – 32px | `-0.018em` | `1.20` | 600 / 700 | `#f5f5f7` |
| **Subhead Copy** | 20px – 24px | `-0.012em` | `1.40` | 400 / 500 | `#86868b` |
| **Body Editorial** | 15px – 17px | `-0.005em` | `1.55` | 400 | `#a1a1a6` |
| **Eyebrow / Badge** | 11px – 13px | `+0.16em` | `1.00` | 600 / 700 | `#FF3B1D` / `#86868b` (caps) |
| **Micro Tech Specs** | 10px – 12px | `+0.08em` | `1.30` | 500 (Mono) | `#6e6e73` |

## 2. The Apple Metallic Gradient Treatment
Large display headlines on Apple keynotes and launch pages use a vertical metallic sheen. In Tailwind / CSS:
```jsx
<h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-[-0.035em] leading-[0.96] uppercase bg-gradient-to-b from-white via-white/90 to-white/45 bg-clip-text text-transparent">
  Designed to be felt.
</h1>
```

## 3. Leading & Punctuation Nuance
* **Em-Dashes**: Preceded and followed by thin non-breaking space, or set as clean typographic dividers.
* **Quotes**: Styled using typographical smart quotes (`“` `”`), set in soft grey `#86868b` so they do not overpower the textual phrase.
* **Fractional Digits**: Always set in monospace or tabular figures when displaying numbers, specs, or timestamps.


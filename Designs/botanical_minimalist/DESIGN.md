---
name: Botanical Minimalist
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#414943'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#717973'
  outline-variant: '#c0c9c1'
  surface-tint: '#3a674f'
  primary: '#14422d'
  on-primary: '#ffffff'
  primary-container: '#2d5a43'
  on-primary-container: '#9fcfb2'
  inverse-primary: '#a1d1b4'
  secondary: '#5e5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdb'
  on-secondary-container: '#63635f'
  tertiary: '#3c3a33'
  on-tertiary: '#ffffff'
  tertiary-container: '#54514a'
  on-tertiary-container: '#c9c4ba'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bceecf'
  primary-fixed-dim: '#a1d1b4'
  on-primary-fixed: '#002112'
  on-primary-fixed-variant: '#224f39'
  secondary-fixed: '#e4e2dd'
  secondary-fixed-dim: '#c8c6c2'
  on-secondary-fixed: '#1b1c19'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#e7e2d8'
  tertiary-fixed-dim: '#cbc6bc'
  on-tertiary-fixed: '#1d1c16'
  on-tertiary-fixed-variant: '#49473f'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin-mobile: 24px
  container-margin-desktop: 80px
  gutter: 16px
  section-gap-lg: 120px
  section-gap-sm: 64px
---

## Brand & Style
The design system is rooted in the intersection of clinical purity and organic serenity. It serves a discerning audience that values transparency, luxury, and the calming influence of nature. The visual language is defined by **Minimalism** with an editorial flair—utilizing expansive white space to let high-quality product photography breathe.

The aesthetic response should be one of "quiet luxury." By removing unnecessary decorative elements and focusing on precise typography and a restrained palette, the UI evokes a sense of premium reliability. The interface acts as a high-end gallery for the products, prioritizing ease of navigation and a frictionless path to purchase.

## Colors
The palette is anchored by a deep **Botanical Green**, used intentionally for primary actions and brand-defining moments to ground the UI in its organic origins. 

The primary canvas is a crisp **White**, complemented by **Linen** (#F9F7F2) and **Stone** (#E3DED4) neutrals. These earthy secondary tones are used for section backgrounds and surface-level containers to provide depth without introducing visual clutter. Text is rendered in a deep **Charcoal** rather than pure black to maintain a softer, more sophisticated contrast ratio that is gentler on the eyes.

## Typography
The typographic system employs a high-contrast pairing to balance heritage with modernity. **Bodoni Moda** is reserved for headlines and editorial callouts; its dramatic serifs and variable stroke widths signal luxury and authority. 

For all functional UI elements, body copy, and navigation, **Plus Jakarta Sans** provides a clean, geometric counterpoint. Its open counters and friendly curves ensure high legibility on mobile screens. We use increased line-height (1.5x for body) and generous letter spacing for labels to reinforce the "airy" brand personality.

## Layout & Spacing
The layout follows a **fluid grid** model with strict max-widths to preserve the editorial feel on larger displays. A mobile-first approach dictates a single-column flow for content, expanding to a 12-column grid on desktop.

Spacing is aggressive; we prioritize whitespace as a design element to separate concerns rather than lines or borders. 
- **Margins:** 24px on mobile to ensure touch-safe zones; 80px on desktop for a "contained" luxury feel.
- **Rhythm:** All vertical spacing must be a multiple of 8px. Large gaps (64px+) between sections are encouraged to prevent the user from feeling overwhelmed.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layering** rather than traditional heavy shadows. 

We use the secondary Linen color (#F9F7F2) to pull surfaces forward against a White background. When elevation is required for interactivity (e.g., a floating "Add to Cart" button), we use **Ambient Shadows**: ultra-diffused, 5% opacity Botanical Green tints. This creates a soft "glow" rather than a harsh drop shadow, mimicking natural, soft-box photography lighting. High-end cards should use a subtle 1px border in #E3DED4 (Stone) to define boundaries on white backgrounds.

## Shapes
The shape language is organic yet structured. We avoid sharp, clinical corners in favor of **Soft Roundedness**. 

Standard components (inputs, buttons) utilize a 0.5rem (8px) radius. Larger containers, such as product cards or promotional banners, use a 1.5rem (24px) radius to echo the "Circle" in the brand identity. Circular elements (pills) are reserved exclusively for tags and status indicators to maintain a distinction from actionable buttons.

## Components
- **Buttons:** Primary buttons use a solid Botanical Green fill with white text. Secondary buttons are "ghost" style with a 1px Stone border. Labels are always `label-md` (uppercase) to maintain a clean, architectural look.
- **Input Fields:** Use a minimal approach—only a bottom border (Stone) that transitions to Botanical Green on focus. Placeholders use `body-md` in a light grey.
- **Product Cards:** Borderless with a Linen (#F9F7F2) background. Use the `headline-md` for product names and `body-md` for pricing. Images should have a consistent soft-focus background.
- **Chips/Filters:** Pill-shaped with a light Stone fill. Active states switch to a Botanical Green border with dark text.
- **Lists:** Clean, borderless entries with 16px vertical padding. Use chevron icons only when navigating to a new page.
- **Micro-interactions:** All hover and tap states should have a 200ms ease-in-out transition, emphasizing a smooth, "liquid" experience.
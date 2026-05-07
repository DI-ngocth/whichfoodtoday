---
name: Hungry Spirit
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#59413a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#8d7169'
  outline-variant: '#e0bfb6'
  surface-tint: '#ac3509'
  primary: '#ac3509'
  on-primary: '#ffffff'
  primary-container: '#ff7043'
  on-primary-container: '#641800'
  inverse-primary: '#ffb59f'
  secondary: '#765b00'
  on-secondary: '#ffffff'
  secondary-container: '#fdc825'
  on-secondary-container: '#6e5400'
  tertiary: '#126d27'
  on-tertiary: '#ffffff'
  tertiary-container: '#5aae5f'
  on-tertiary-container: '#003d0f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#852300'
  secondary-fixed: '#ffdf93'
  secondary-fixed-dim: '#f3c01a'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#594400'
  tertiary-fixed: '#9ff79f'
  tertiary-fixed-dim: '#83da85'
  on-tertiary-fixed: '#002105'
  on-tertiary-fixed-variant: '#005318'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.01em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 48px
---

## Brand & Style

This design system is built to solve the "analysis paralysis" of meal selection through a lens of joy and humor. The personality is that of a "foodie best friend"—encouraging, slightly cheeky, and always energetic. 

The aesthetic blends **Modern Minimalist** clarity with **Tactile** playfulness. It uses large surface areas, generous whitespace, and high-quality food photography to stimulate the appetite. The visual language avoids the sterile nature of utility apps, instead opting for a "bouncy" feel that rewards interaction with subtle animations and friendly micro-copy. The goal is to make the decision-making process feel like a game rather than a chore.

## Colors

The palette is rooted in color psychology associated with hunger and freshness. 
- **Primary (Warm Orange):** Used for main actions and highlights to stimulate appetite and energy.
- **Secondary (Sun Yellow):** Used for "fun" elements, rewards, and playful accents.
- **Tertiary (Fresh Green):** Specifically reserved for "Healthy Choice" badges, vegetarian options, and success states.
- **Backgrounds:** A crisp white (#FFFFFF) is the primary surface, with a very light grey (#F8F9FA) used for section layering to maintain a clean, modern look.
- **Text:** High-contrast charcoal (#2D3436) ensures legibility while feeling softer than pure black.

## Typography

This design system utilizes **Plus Jakarta Sans** for its modern, rounded terminals and optimistic character. 
- **Headlines:** Use heavy weights (700-800) with slight negative letter-spacing to create a "punchy" and impactful look for food names and calls to action.
- **Body Text:** Maintained at a medium weight (400-500) to ensure the friendly vibe persists even in longer descriptions.
- **Micro-copy:** Labels and badges use uppercase tracking to provide a structural contrast to the organic shapes of the UI.

## Layout & Spacing

The layout follows a **Fixed Grid** model for the desktop experience, centered at a max-width of 1280px to ensure food imagery remains high-impact without becoming pixelated. 
- **Grid:** A 12-column system with 24px gutters provides the foundation for the card-based layout.
- **Rhythm:** An 8px baseline grid is used to maintain vertical consistency. 
- **Negative Space:** Generous "breathability" (40px+) is prioritized between major sections to prevent the UI from feeling cluttered, keeping the focus entirely on the "What to eat?" decision.

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and **Tonal Layering**. 
- **Shadows:** Use extra-diffused shadows (Blur: 20px-40px) with a subtle tint of the primary orange or a neutral cool-grey. This makes cards appear to "float" softly above the background.
- **Interactive Depth:** On hover, cards should lift slightly (y-offset decrease, shadow spread increase) to provide tactile feedback.
- **Layers:** Use subtle background color shifts instead of heavy borders to define different functional areas of the app.

## Shapes

The shape language is defined by **Pill-shaped** and extremely rounded forms. 
- **Cards:** Use a minimum radius of 24px to create a soft, friendly container for content.
- **Buttons:** Fully pill-shaped (rounded-full) to encourage clicking and reinforce the casual, non-corporate vibe.
- **Icons:** Should feature rounded caps and corners, avoiding any sharp 90-degree angles to maintain visual harmony with the typography.

## Components

- **Buttons:** Primary buttons use the Warm Orange with white text. They should have a "squishy" feel, perhaps a subtle scale-down effect (0.98) on click.
- **Cards:** The core of the design system. Cards should feature high-quality imagery at the top, followed by a title in Headline-MD and a footer with "Quick Stats" (Time, Price, Health Score).
- **Chips/Badges:** Used for food categories (e.g., "Spicy," "Vegan"). These use low-saturation versions of the primary colors with high-saturation text to remain legible but secondary to the main content.
- **Input Fields:** Large, pill-shaped search bars with soft inset shadows to mimic a physical "well" on the page.
- **Playful Elements:** Incorporate a "Slot Machine" or "Wheel of Fortune" component for the "Decide for me!" feature, using the Sun Yellow to highlight the excitement of the random choice.
- **Empty States:** Use humorous illustrations of an empty fridge or a sad stomach with encouraging micro-copy.
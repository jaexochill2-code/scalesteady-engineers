# Ellevest — Full Design Intelligence Brief
*Extracted directly from live source code + case studies. No guessing.*

---

## 1. Color System

Ellevest's palette is a masterclass in emotional precision. Every color has a purpose — none are decorative accidents.

### Primary Palette (Exact Hex Values — pulled from CSS class names in live source)

| Token Name | Hex | Emotional Role |
|---|---|---|
| **Black / Charcoal** | `#2B2928` | Primary text, nav strokes — almost-black with warmth baked in |
| **Deep Burgundy** | `#441E1E` | High-impact accent — used for carousel "To Point B" cards. Dark, luxurious, feminine authority |
| **Deep Teal** | `#183642` | Secondary dark — alternative to burgundy. Serious, institutional |
| **Forest Green** | `#537A44` | Action/positive — third accent. Earthy, grounded authority |
| **Pistachio** | Used as `background-color-pistachio` in press/social proof section | Soft confidence. Used for trust-signal rows |
| **Cashmere** | Used as `background-color-cashmere` in value props section | The "neutral warm" — not white, not cream, something in between |
| **Sage Active** | `#C5D8BE` | Carousel pagination active dot. Muted sage — understated, precise |
| **Warm Neutral** | `var(--warm-neutral)` | FAQ hover state. The gentlest warm off-white |
| **Pure White** | `#FFFFFF` | Hero section background. Intentional — bold contrast against warm palette |
| **Granite** | Used as `text-color-granite` | Footnote/legal text. Neutral grey, not cold |

### Color Logic
This is NOT a monochromatic site. Ellevest uses **strategic palette rotation** — each section has its own background color pulled from the system:
- Hero: white
- Value Props: cashmere (warm off-white)
- Carousel cards: deep burgundy / teal / forest green / neutral
- Press/Social Proof: pistachio
- CTA block: `#2B2928` (near-black)

The effect: every section feels like a new "room" while staying cohesive. No section-to-section monotony.

---

## 2. Typography System

### Confirmed Font Stack (from live `<head>` WebFont.load call)

```
Google Fonts:
  - Merriweather: 300, 300i, 400, 400i, 700, 700i, 900, 900i
  - Lato: 100, 100i, 300, 300i, 400, 400i, 700, 700i, 900, 900i
  - Inter: 300, 400, 500, 600, 700

Adobe Typekit (dge8qqd):
  - GT Super (confirmed via class names: .gt-super)
  - Maison Neue (confirmed via class names: .maison-neue, .maison-neue-mono)
```

### Typography Hierarchy Decoded

| Role | Font | Weight | Application |
|---|---|---|---|
| **Hero Display H1** | GT Super | Light / Regular | Serif display — editorial, magazine-quality |
| **Section Headings H2** | GT Super | Regular | "Why Ellevest?", "Meet with an Ellevest Wealth Advisor" |
| **Eyebrows / Labels** | Maison Neue Mono | Regular, ALL CAPS, tracked | "GET FROM POINT A", "CLIENT REVIEWS" — the structural voice |
| **Subheadings H3** | Merriweather or Lato Bold | 700 | Card titles, FAQ headers |
| **Body Copy** | Lato or Maison Neue | 400 | `.bodysm`, `.bodytext`, `.is-maison-neue` |
| **Navigation Links** | Lato | 400–600 | Clean sans-serif, understated |
| **Legal / Footnotes** | Lato or Inter | 300 | Fine print, disclaimers |

### The Typographic Tension (The Core Move)
Ellevest's entire typographic personality is built on ONE contrast: **GT Super (humanist serif, editorial)** vs **Maison Neue Mono (geometric monospace, technical)**. This creates:
- Warmth (serif) + Precision (mono) in every section that has both
- The eyebrow labels in ALL CAPS mono feel like data labels — technical, trustworthy
- The headers in GT Super feel personal, warm, editorial

This is Pentagram-level thinking applied to financial services.

---

## 3. Layout Architecture

### Grid System
- **12-column grid** (confirmed from design system case study)
- Max content width: **1440px** (class: `maxwidth-1440`, `container-large`)
- Padding: `padding-global`, `padding-global-3` — systematic spacing tokens
- Sections use: `padding-section-xlarge`, `padding-section-medium`, `padding-section-small`

### Section Pattern (Repeating)
Every section follows a consistent rhythm:
```
[COLOR BLOCK BACKGROUND]
  [padding-global]
    [container-large maxwidth-1440]
      [content block]
```

### Core Layout Patterns Used

**1. Carousel Cards with 3-Panel Grid**
- Left card: "Get from Point A" — neutral/problem state
- Center: Full-bleed photography
- Right card: "To Point B" — colored accent/solution state
- This is a before/after storytelling engine, visually

**2. Sticky Scroll Layout (Two-Column)**
- Left: Full-height image that sticks as you scroll
- Right: Numbered text blocks that scroll past
- Used for "Why we're women-first" — 1. Different earnings / 2. Different lifespans / 3. Different motivators
- This is the highest-trust layout pattern on the page

**3. Inline Calendly Embed**
- Meeting scheduling built directly into the page — no modal, no redirect
- The CTA is not a button, it's a booking widget
- This is a high-conviction conversion mechanic

**4. Running Text with Embedded Circular Images**
- The "Ellevest was built specifically to account for women's different realities" section
- Key words have circular portrait photos embedded inline, like an animated editorial layout
- The images appear on scroll (`opacity:0` → `1` via intersection observer)

---

## 4. Motion & Interaction Language

- **Fade on scroll:** `opacity:0` as default, triggered by `data-w-id` scroll events (Webflow IX2)
- **Carousel auto-advance:** 3000ms delay, fade animation (not slide), 1000ms duration
- **Hamburger animation:** Lottie SVG animation (`lottieflow-menu-nav-04-2b2928`)
- **Accordion FAQ:** CSS `:has(.open)` selector — no JS for state, pure CSS cascade
- **Nav reveal:** Separate sticky nav with `nav-reveal` class — desktop nav appears from top
- **Caret chevron in nav:** `stroke="#2B2928"` — matches brand charcoal exactly

### Motion Principles (Inferred)
- Nothing is jarring. Everything fades.
- Hover states are subtle. Underlines, small opacity shifts.
- The carousel has no arrows — navigation is via dots only (minimal UI)
- Content reveals respect user attention — things appear, they don't bounce or slide aggressively

---

## 5. UI Component Language

### Buttons
- **Primary CTA:** Class `.button-2.is-primary` — this is the main action button. Used for "Book a call", "Meet the team", "Learn more"
- **Nav CTA:** `.button-2.is-navbar` — "Log in" — same base, navbar-specific styling
- **Arrow CTAs:** SVG arrow icons next to inline text links — `Arrow - Right.svg` from Webflow CDN
- Buttons are rectangular (no border-radius mentioned) — clean, confident, not bubbly

### Cards
- Value prop cards: icon + bold label + short body. Clean 3-column layout.
- Carousel cards: full-bleed color backgrounds with centered heading and eyebrow label
- Social proof / press: horizontal divider-separated logos with quote text above

### Navigation
- Desktop: Transparent/light top nav, reveals on scroll
- Mobile: Hamburger → full overlay menu with Lottie animation
- Mega menu: Image panel + text column layout (two-column mega dropdown)

### Social Proof Architecture
- Exact quote → attribution in ALL CAPS Maison Neue Mono
- Press logos: Business Insider, WSJ, InvestmentNews, Investopedia, Forbes
- Positioned in a pistachio-background horizontal band

---

## 6. Copy Voice & Tone

**Direct extraction from the live page:**

> *"The experts in your wealth's care"*
> *"You deserve a wealthcare team who approaches your wealth management and financial planning holistically, and without judgment."*
> *"Uncertain about your financial future → Building generational wealth"*
> *"Retiring on your own terms"*
> *"Investing with impact"*
> *"Gain clarity & confidence knowing your finances are aligned with your needs, goals, and values."*
> *"Why (& how) we're women-first"*
> *"Different earnings. Different lifespans. Different motivators."*

### Voice Principles
1. **You-first language.** Almost every statement starts with or centers the reader.
2. **The em-dash as texture.** "holistically, and without judgment" — the comma pause creates breath.
3. **Neologism as differentiation.** "Wealthcare" — coined word. Positions Ellevest as a category creator, not a competitor.
4. **Binary storytelling.** "Point A" (problem/fear state) → "Point B" (aspiration/achievement) — forces emotional contrast on every carousel slide.
5. **Small words, big meaning.** "Without judgment." Two words. The weight of decades of women being dismissed by financial advisors.

---

## 7. Photography & Visual Content Philosophy

- **AVIF format** for all hero images — modern, efficient, highest quality
- **Circular portrait crops** embedded inline in editorial text (the Ellevest face-in-text innovation)
- **Full-bleed section images** between colored card panels
- **Lifestyle photography** — not stock. Real women, real contexts, diverse representation
- Photography tone: **warm, natural light, genuine expression** — not aspirational/fake corporate

---

## 8. What This Means for ScaleSteady

Ellevest and ScaleSteady share a core structural similarity: **both are selling trust to an audience that has been let down by the dominant category players.** Ellevest's ICP has been dismissed by traditional finance. ScaleSteady's ICP (HVAC/MedSpa owners) has been burned by agencies promising leads and delivering nothing.

### Translatable Design Decisions

| Ellevest Pattern | ScaleSteady Application |
|---|---|
| Dark charcoal `#2B2928` as primary text | Use the deep slate from our logo as primary text |
| Cashmere warm neutral for content sections | Create a "charcoal matte" equivalent for content panels |
| Eyebrow labels in Maison Neue Mono ALL CAPS | Use a geometric mono font for "PIPELINE ENGINEERS" eyebrow labels throughout the site |
| GT Super for editorial headings | Use a premium serif for hero display headings |
| Carousel: Problem State → Solution State | Hero section: "No more chasing leads" → "You own the pipeline" |
| Sticky scroll with numbered sections | "How it works" section: 3 steps that stick as user scrolls |
| Inline Calendly booking (no modal) | Inline booking widget — no redirect for discovery calls |
| Binary copy framing (Point A → Point B) | "Most agencies promise leads. We build the machine that generates them." |
| `#441E1E` deep burgundy for power moments | Use deep navy/charcoal equivalents for premium section backgrounds |
| Wealthcare as coined category | "Pipeline Engineers" is already our coined category — double down on it structurally |

### What NOT to Copy
- The warmth/feminine softness of cashmere and pistachio — ScaleSteady's ICP responds to precision and authority, not warmth
- The soft fade-only animations — ScaleSteady can have more structural, architectural motion (subtle lines drawing, grid reveals)
- The circular portrait images — effective for Ellevest because the advisory team IS the product; for ScaleSteady, the infrastructure/systems ARE the product

*Compiled from live Ellevest.com source code + design case study research — 2026-05-25T00:53:00+08:00*

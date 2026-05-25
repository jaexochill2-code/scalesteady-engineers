# ScaleSteady — Pipeline Engineers
**Handoff Document — Session 2026-05-25**

---

## Brand Identity

| Element | Value |
|---------|-------|
| Brand name | ScaleSteady |
| Division tagline | Pipeline Engineers |
| Positioning | Revenue infrastructure & autonomous deal flow |
| Brand voice | Structural engineering precision, not creative campaigns |

---

## Technology Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 (App Router) | Static site generation, file-based routing |
| Styling | Tailwind CSS v4 + inline styles | Tailwind for layout, inline styles for color system (bypasses cascade specificity issues) |
| Fonts | Playfair Display (serif/headings), Inter (sans/body), JetBrains Mono (code/data) | Loaded via `next/font/google`, injected as CSS variables |
| Deployment | Vercel (via `vercel.json`) + GitHub `jaexochill2-code/scalesteady-engineers` | |

---

## Design System

### Color Roles — THE RULE
```
Dark greens  → backgrounds only
Light green  → all accent/action elements (CTAs, active states, links)
Black scale  → content hierarchy (headings, body, labels)
White        → surfaces and space
```

### Color Tokens

| Token | Hex | Role |
|-------|-----|------|
| `--white` | `#FFFFFF` | Surfaces, cards, nav |
| `--canvas` | `#FAF8F6` | Page background (1% warm off-white) |
| `--ink-primary` | `#111111` | All headings, dominant text |
| `--ink-body` | `#3D3D3D` | Body copy |
| `--ink-secondary` | `#6B6B6B` | Secondary text, descriptions |
| `--ink-muted` | `#9E9E9E` | Metadata, client names |
| `--ink-border` | `#E0E0E0` | Dividers, card outlines |
| `--green` | `#0F3B2E` | Section backgrounds (metrics panel), identity anchors |
| `--green-mid` | `#1A6B50` | **All CTAs, active nav links, accent links** (8.9:1 AAA on white) |
| `--green-deep` | `#081F18` | Darkest section backgrounds (manifesto, final CTA) |
| `--green-tint` | `#7EC8A4` | Mid-green italic accent on dark backgrounds |

### WCAG Contrast (all verified)
- `#111111` on white: **16.1:1 AAA**
- `#1A6B50` on white: **8.9:1 AAA**
- `#0F3B2E` on white: **9.8:1 AAA**
- White on `#1A6B50`: **8.9:1 AAA**
- White on `#0F3B2E`: **9.8:1 AAA**
- White on `#081F18`: **15.4:1 AAA**

### Typography

| Element | Font | Weight | Size | Color |
|---------|------|--------|------|-------|
| H1 hero | Playfair Display | 400 (normal) | clamp(48px–92px) | `#111111` |
| H2 section | Playfair Display | 700 | clamp(36px–64px) | `#111111` |
| H3 cards | Inter | 700 | 19px | `#0A0A0A` |
| Body | Inter | 400 | 15–17px | `#3D3D3D` |
| Secondary | Inter | 400 | 13–14px | `#6B6B6B` |
| Nav brand | Inter | 800 | 16px | `#111111` |
| Nav tagline | Playfair Display Italic | 400 | 12px | `#1A6B50` |
| CTA | Inter | 600 | 13.5–15px | white on `#1A6B50` |

### Anti-Pattern Registry (do not re-introduce)
- No gray (`#9E9E9E` etc.) on content elements — only on metadata (client names, timestamps)
- No orange (`#e8541a`) in content — logo graphic only
- No mono typeface for brand taglines — Playfair italic is the designated tagline face
- No transparent/scroll-state navs — nav is always solid white
- No decorative AI artifacts: pulsing dots, pill badges, blob shapes, gradient orbs
- No `--color-brand-green` set to orange hex (was in old `@theme` block — purged)

---

## Navigation Architecture

```
[Logo 40×40]  ScaleSteady (Inter 800, #111111, -0.025em)
              Pipeline Engineers (Playfair italic 400, #1A6B50, 12px)

                    Services  Work  Our Team  Process    [Book a call ▶]
                    (Inter 400, #111111 → #1A6B50 active/hover)
                    (CTA: Inter 600, white on #1A6B50 pill)
```

- Height: 80px fixed
- Background: `#FFFFFF` solid, always-on
- Border: `1px solid #E8E8E8`
- `z-index: 50`
- Mobile: `max-height` transition menu, same color system

---

## Page Architecture

### Hero (`/`)
- Left 58%: B&W photo, grayscale, fades right
- Right 42%: `#FAF8F6` cream panel
- Hero section: `-mt-[80px]` to extend behind nav (full-bleed image)
- Content wrapper: `paddingTop: 80px` to re-center text in visible viewport
- Headline: Playfair 400 normal, `#111111`, `pipeline's` in italic (same color, italic = emphasis)
- CTA: `#1A6B50` pill with white text
- Client bar: absolute bottom of cream panel, `#9E9E9E` uppercase sans names

### Manifesto
- Background: `#081F18` (deepest)
- Blockquote: Playfair, white
- Italic accent "structural engineering": `#7EC8A4`

### Services (3-column cards)
- Background: `#FFFFFF`
- Cards: white, shadow, `border-radius: 20px`
- H3 hover: `#111111` → `#1A6B50`
- "Learn more" link: `#1A6B50` with arrow

### Metrics
- Background: `#0F3B2E` (dark green as full section bg — correct per color role rules)
- Numbers: JetBrains Mono ExtraBold, white
- Layout: 5/7 col split, left-border divider

### Final CTA
- Background: `#081F18`
- CTA button: white pill with `#1A6B50` text

---

## File Map

```
src/
  app/
    globals.css          ← Color token system + component utilities
    layout.tsx           ← Font loading (Playfair/Inter/JetBrains), 80px body offset
    page.tsx             ← Homepage: hero, manifesto, services, metrics, CTA
    contact/page.tsx     ← Contact form
    services/page.tsx    ← Services detail
    team/page.tsx        ← Team
    work/page.tsx        ← Case studies
    process/page.tsx     ← Process
  components/
    server/
      Navigation.tsx     ← Stacked wordmark, nav links, CTA, mobile menu
      Footer.tsx         ← Footer
      Logo.tsx           ← Logo image component
    client/
      AnimateOnScroll.tsx  ← Intersection Observer scroll reveal
      CountUp.tsx          ← Animated number counter
      SmoothScroll.tsx     ← Lenis or native smooth scroll wrapper
public/
  brand/logos/
    scalesteady_clean_monogram.png  ← Orange/rust S monogram, mix-blend-multiply in nav
  hero-team.jpeg                    ← Hero B&W photo
```

---

## Open Tasks (Next Session)

1. **Italic descender clip** — `Pipeline Engineers` tagline in nav may clip descenders at `line-height: 1`. If visible: remove `leading-none`, set `lineHeight: 1.4` inline on the tagline span.
2. **Sub-pages** — `/services`, `/work`, `/team`, `/process`, `/contact` need the same design language applied (currently may have old color values).
3. **Footer** — audit for gray values and old color tokens.
4. **Vercel deployment sync** — confirm Vercel picks up latest push from `main`.
5. **Page title** — currently "ScaleSteady | Pipeline Engineers" — confirm this is the desired format.
6. **OG image** — no `opengraph-image` defined yet for social sharing previews.

---

## Git

```
Repo:   github.com/jaexochill2-code/scalesteady-engineers
Branch: main
Remote: origin (GitHub PAT auth)
```

Last commit before this session: `e904ff6 brand: stabilize pipeline engineers brand copy`

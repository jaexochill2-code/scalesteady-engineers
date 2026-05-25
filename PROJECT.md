# ScaleSteady — Pipeline Engineers
**Handoff & Restore Point — 2026-05-25 v2**

---

## Restore Point Tag
`git tag v0.2-nav-lockup-final`

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

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + inline styles |
| Fonts | Playfair Display (hero headline only), Inter (all nav/body/UI), JetBrains Mono (metrics) |
| Deployment | Vercel (auto-deploy from GitHub `main`) + `jaexochill2-code/scalesteady-engineers` |

---

## Design System

### Color Roles — THE LAW
```
Dark greens (#0F3B2E, #081F18)  → section backgrounds ONLY
Mid green   (#1A6B50)           → all CTAs, active nav links, action elements
Black       (#111111)           → primary content, "Scale" wordmark
Red/rust    (#C4431B)           → logo-derived accent: "Steady" wordmark, "PIPELINE" label
Gray        (#ABABAB)           → "ENGINEERS" label, purely subordinate metadata
White       (#FFFFFF)           → surfaces, nav, cards
Canvas      (#FAF8F6)           → page background, hero cream panel
```

### Full Color Token Reference

| Hex | Role |
|-----|------|
| `#FFFFFF` | Nav bg, card surfaces |
| `#FAF8F6` | Canvas, hero cream panel |
| `#111111` | Headlines, dominant text, "Scale" wordmark |
| `#3D3D3D` | Body copy |
| `#6B6B6B` | Secondary text, card descriptions |
| `#9E9E9E` | Metadata, risk-reversal micro-copy |
| `#ABABAB` | "ENGINEERS" label in nav descriptor |
| `#E8E8E8` | Borders, nav bottom rule, client bar rules |
| `#C4431B` | Logo-derived red: "Steady" + "PIPELINE" |
| `#1A6B50` | CTA buttons, active nav links |
| `#0F3B2E` | Metrics section background |
| `#081F18` | Manifesto + Final CTA section backgrounds |
| `#7EC8A4` | Italic accent text on dark green backgrounds |

---

## Navigation Lockup — LOCKED

```
[S monogram 48×48]   Scale Steady          ← Inter 800, 17px, -0.03em
                     PIPELINE ENGINEERS    ← Inter 500, 9.5px, 0.1em tracked, uppercase
                                             "PIPELINE" = #C4431B
                                             "ENGINEERS" = #ABABAB
```

**Rules:**
- S logo: 48px, `mix-blend-multiply`, do NOT resize or recolor
- One typeface only in lockup: Inter (no Playfair in nav)
- Split color on wordmark: "Scale" `#111111` / "Steady" `#C4431B`
- Split on descriptor: "PIPELINE" `#C4431B` / "ENGINEERS" `#ABABAB`
- Nav links: Inter 400, 14px, `#111111` at rest → `#1A6B50` active/hover
- CTA pill: Inter 600, 13.5px, white on `#1A6B50`, 10px 22px padding, rounded-full
- Nav height: 80px fixed, always solid white, `border-bottom: 1px solid #E8E8E8`

---

## Page Architecture — Homepage

### Hero (95svh — scroll provocation)
- `-mt-[80px]`: extends behind nav for full-bleed image
- `paddingTop: 80px` on content wrapper: re-centers text in visible viewport
- Left 58%: B&W photo (`/hero-team.jpeg`), grayscale, right-edge gradient fade
- Right 42%: `#FAF8F6` cream panel
- Headline: Playfair 400 normal, `#111111`, `pipeline's` italic (same color)
- Body: Inter 400, 17px, `#3D3D3D`
- **CTA visible above fold**: `padding: 18px 44px`, `#1A6B50` pill, 52px height
- Risk reversal anchor: "15 minutes. No commitment." `#9E9E9E` 12px below CTA
- No metric card overlay on photo (removed — was noise)

### Client Bar (own section, below hero)
- White bg, `border-top` + `border-bottom` `#E8E8E8` — visual proof-zone rule
- "TRUSTED BY" label + vertical divider + client names `#ABABAB`
- Desktop only (`hidden lg:block`)

### Manifesto
- Background: `#081F18`
- Blockquote: Playfair normal, white, "structural engineering" italic `#7EC8A4`

### Services
- 3-column cards, white bg, `border-radius: 20px`
- H3 hover: → `#1A6B50`; "Learn more" link: `#1A6B50`

### Metrics
- Background: `#0F3B2E` (dark green section — correct per color role rules)
- Numbers: JetBrains Mono ExtraBold, white, `clamp(56px–88px)`

### Final CTA
- Background: `#081F18`
- CTA: white pill, `#1A6B50` text

---

## Anti-Pattern Registry
- No gray on content — only on metadata/labels
- No orange anywhere — `#C4431B` is the logo-derived red, not decorative
- No Playfair in nav — hero headline only
- No metric cards overlaid on photos — noise
- No transparent/scroll-state nav — always solid white
- No `background: #0F3B2E` on buttons — dark green is backgrounds only
- No tagline in nav beyond current subordinate treatment

---

## File Map

```
src/
  app/
    globals.css          ← Color token system + component utilities
    layout.tsx           ← Font loading (Playfair/Inter/JetBrains), 80px body offset
    page.tsx             ← Homepage: hero, client bar, manifesto, services, metrics, final CTA
  components/
    server/
      Navigation.tsx     ← Lockup (S 48px + ScaleSteady split + PIPELINE ENGINEERS), nav, CTA
    client/
      AnimateOnScroll.tsx
      CountUp.tsx
public/
  brand/logos/scalesteady_clean_monogram.png
  hero-team.jpeg
```

---

## Open Tasks — Next Session

1. Sub-pages `/services` `/work` `/team` `/process` `/contact` — apply same design language
2. Footer — audit for old gray/color tokens
3. OG image — no `opengraph-image` defined yet
4. Hero headline widow — "care." alone on line 3; adjust `max-width` or line breaks
5. Mobile nav — verify lockup renders correctly at sm breakpoint

---

## Git

```
Repo:    github.com/jaexochill2-code/scalesteady-engineers
Branch:  main
Tag:     v0.2-nav-lockup-final  (restore point)
Vercel:  auto-deploys from main push
```

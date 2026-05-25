# DECISIONS LOG — Pipeline Engineers
> All locked design, copy, and technical decisions. One entry per decision.

---

## 2026-05-25

### D-001 · Brand Name
**Decision:** Pipeline Engineers (not ScaleSteady, not another alternative)
**Rationale:** "It creates structure and curiosity" — user's own words. Pipeline = infrastructure/flow/systems. Engineers = precision/expertise/accountability. The two-word compound communicates the brand thesis before a single line of copy.
**Status:** LOCKED

### D-002 · Primary Logo Style
**Decision:** Pentagram-level wordmark — clean, structured, geometric
**Reference:** `design/brand/logos/pipeline-engineers-logo-master.png`
**Status:** LOCKED (master file) — variants available for different contexts

### D-003 · Primary Accent Color
**Decision:** Arc Orange (`#e8541a`) as primary accent/CTA color
**Rationale:** Engineering/industrial context. Orange = energy, heat, flow, the color of physical pipelines, warning (attention-demanding). Differentiates from Ellevest's green. Not a startup orange — a dark, saturated, serious orange.
**Status:** LOCKED

### D-004 · Authority Background Color
**Decision:** Signal Blue (`#1a3a5c`) for dark authority sections and footer
**Rationale:** Deep navy-adjacent. Communicates: serious, established, trustworthy, not flashy. The "we've been doing this a long time" color.
**Status:** LOCKED

### D-005 · Primary Background
**Decision:** Warm off-white (`#f8f7f4`) not pure white
**Rationale:** Pure white (#ffffff) reads as sterile/clinical or cheap. The warm off-white reads as premium, considered, like quality paper or linen. Borrowed directly from Ellevest's background tone.
**Status:** LOCKED

### D-006 · Display Typography
**Decision:** Fraunces (variable font) for all headlines
**Rationale:** Variable font with optical axis — can be structural at low optical, warm at high optical. Bridges engineering precision and human warmth. Pairs with Inter/DM Sans body text for excellent readability hierarchy.
**Status:** LOCKED (pending final type pairing confirmation in build)

### D-007 · Technical Stack
**Decision:** Next.js 15 (App Router) + Tailwind v4 + GSAP + Lenis + Motion v12
**Rationale:** Best-in-class for this production level. PPR for performance. Tailwind v4 CSS-first for design token control. GSAP industry standard for complex scroll animation. Lenis for smooth scroll synced with GSAP.
**Status:** LOCKED

### D-008 · Primary CTA Language
**Decision:** `Book a discovery call` (everywhere, consistently)
**Rationale:** Mirrors Ellevest's "Book a call" restrained CTA. "Discovery" adds precision — this is a scoped, professional first meeting, not a sales call. No pressure implied.
**Status:** LOCKED

### D-009 · Navigation Structure
**Decision:** `Services · Work · Team · Process` + `[Book a discovery call →]`
**Rationale:** 4 links max. Expensive/confident brands don't need 12 menu items. Every link is a product/trust signal, not a utility link. CTA in nav = single point of action.
**Status:** LOCKED

### D-010 · Psychological Core Thesis
**Decision:** The site sells certainty, not services.
**Rationale:** Direct translation of Ellevest's model. Ellevest sells the feeling of being understood and safe (not financial products). Pipeline Engineers sells the certainty that systems won't fail (not consulting). Every element must prove this feeling, then back it with credential.
**Status:** LOCKED (foundational)

---

*Add new decisions below as they are made.*

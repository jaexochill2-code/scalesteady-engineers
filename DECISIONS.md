# DECISIONS LOG — Pipeline Engineers
> All locked design, copy, and technical decisions. One entry per decision.

---

## 2026-05-25

### D-001 · Brand Name
**Decision:** ScaleSteady (with "Pipeline Engineers" as the category descriptor / subtitle)
**Rationale:** The brand identity lockup features **ScaleSteady** as the premium Didone serif wordmark (the main name), and **Pipeline Engineers** as the tracked monospace sans-serif subtitle. This aligns with the provided high-resolution brand logo master files exactly and matches the Ellevest visual structure (EV circular badge + ELLEVEST).
**Status:** LOCKED


### D-002 · Primary Logo Style
**Decision:** Pentagram-level wordmark — clean, structured, geometric
**Reference:** `design/brand/logos/pipeline-engineers-logo-master.png`
**Status:** LOCKED (master file) — variants available for different contexts

### D-003 · Primary Accent Color (Updated)
**Decision:** Brand Green (`#537a44`) as primary accent/CTA color
**Rationale:** Overridden per user request to stick exactly to the color palette of the Ellevest source material. Forest green represents organic growth, trust, positive action, and absolute brand integrity.
**Status:** LOCKED

### D-004 · Authority Background Color (Updated)
**Decision:** Brand Burgundy (`#441e1e`) for dark authority sections and alternate dark blocks
**Rationale:** Overridden per user request to match the Ellevest source material. A rich, high-luxury burgundy that signals deep corporate status, prestige, and executive safety.
**Status:** LOCKED

### D-005 · Primary Background (Updated)
**Decision:** Brand Cashmere (`#f7f5f0`) warm neutral
**Rationale:** Match the exact warm off-white/linen tone from the Ellevest source material. Provides a tactile, premium editorial canvas that avoids sterile pure whites or cheap digital greys.
**Status:** LOCKED

### D-006 · Display Typography
**Decision:** Fraunces (variable font) for all headlines
**Rationale:** Variable font with optical axis — can be structural at low optical, warm at high optical. Bridges engineering precision and human warmth. Pairs with Inter/DM Sans body text for excellent readability hierarchy.
**Status:** LOCKED (pending final type pairing confirmation in build)

### D-007 · Technical Stack
**Decision:** Next.js 16 (App Router) + Tailwind v4 + GSAP + Lenis + Motion v12
**Rationale:** Best-in-class for this production level. PPR for performance. Tailwind v4 CSS-first for design token control. GSAP industry standard for complex scroll animation. Lenis for smooth scroll synced with GSAP.
**Status:** LOCKED

### D-008 · Primary CTA Language
**Decision:** `Book a discovery call` (everywhere, consistently)
**Rationale:** Mirrors Ellevest's "Book a call" restrained CTA. "Discovery" adds precision — this is a scoped, professional first meeting, not a sales call. No pressure implied.
**Status:** LOCKED

### D-009 · Navigation Structure
**Decision:** `Services · Work · Team · Process` + `[Book a call]`
**Rationale:** 4 links max. Expensive/confident brands don't need 12 menu items. Every link is a product/trust signal, not a utility link. CTA in nav = single point of action.
**Status:** LOCKED

### D-010 · Psychological Core Thesis
**Decision:** The site sells certainty, not services.
**Rationale:** Direct translation of Ellevest's model. Ellevest sells the feeling of being understood and safe (not financial products). Pipeline Engineers sells the certainty that systems won't fail (not consulting). Every element must prove this feeling, then back it with credential.
**Status:** LOCKED (foundational)

---

*Add new decisions below as they are made.*

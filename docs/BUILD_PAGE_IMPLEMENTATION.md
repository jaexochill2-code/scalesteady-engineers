# ScaleSteady — /build Page Implementation Plan
## Checkout + TOS Acceptance Page
### Version: 1.0 | Date: 2026-06-03 | Status: Approved, Ready to Build

---

## Overview

A standalone checkout and TOS acceptance page at `scalesteady.pro/build`. Users arrive already interested, read the offer + model, review the TOS, accept terms via clickwrap checkbox, and complete payment via PayPal hosted button.

**This page does not replace the marketing site. It is the final conversion step.**

---

## Research Basis (5 Sources)

| Source | Key Finding Applied |
|---|---|
| Unbounce/CXL 2026 | Remove nav. Single CTA. Social proof near action point. Message match. |
| B2B Trust Research 2026 | Specificity beats generic. Quantified outcomes. Integrated proof throughout — not one bottom block. |
| Hormozi Grand Slam Framework | 10x value framing. Performance guarantee as centerpiece. Risk reversal near CTA. |
| Service Business Psychology 2026 | Pratfall Effect (transparency about what you don't guarantee increases credibility). Mirror prospect language. One goal, one path. |
| B2B Contractor Landing Research | Hero: outcome → who it's for → how → CTA → trust signals adjacent. FAQ kills final objections. |

---

## Proposed Changes

---

### Root Override Layer

#### [NEW] `/src/app/build/layout.tsx`

Standalone layout that does **NOT** import root `<Navigation>` or `<Footer>`. Returns children directly with font class variables inherited from root html element. This prevents the site-wide nav from rendering on the conversion page.

```tsx
// Minimal — just passes children through
// Root <html> fonts still inherited via className cascade
export default function BuildLayout({ children }) {
  return <>{children}</>;
}
```

Metadata:
- Title: `"Start Your Campaign | ScaleSteady Pipeline Engineers"`
- Description: `"Review your campaign scope, terms, and complete your $500 infrastructure investment. ScaleSteady builds your outbound system and defers all labor fees until you close revenue."`

---

### Page File

#### [NEW] `/src/app/build/page.tsx`

`'use client'` — requires useState, useEffect, useRef for checkbox state, PayPal SDK init, AOS, counter.

**External script:** PayPal SDK loaded via `next/script` with `strategy="afterInteractive"`.

**Key constants at top of file:**
```tsx
const PHONE = '1-800-XXX-XXXX';          // Replace with live number
const PHONE_HREF = 'tel:1XXXXXXXXXX';    // Replace with live number
const PAYPAL_HOSTED_BUTTON_ID = '';      // ← INSERT PAYPAL HOSTED BUTTON ID HERE
```

**Sections (12 total):**

```
01  MINIMAL NAV
    Fixed, 70px, white, border-bottom
    Left: Logo lockup (Image + ScaleSteady wordmark + Pipeline Engineers sub-label)
    Right: Phone CTA button (--blue, rounded-full)
    No nav links — conversion mode

02  HERO
    Eyebrow pill: "Pass-through cost · $0 agency fees · Full asset ownership"
    H1: "Your outbound system. Built, deployed, and running in 60 days."
    Sub: "$500 infrastructure cost. $0 in agency fees until you close revenue."
    Risk anchor: "Maximum exposure: $500. Everything else is ours to earn."
    Background: --canvas with subtle grid overlay

03  TRUST BAR
    4 stat callouts: "$500 flat" / "$0 agency fees" / "20,000 touchpoints" / "You own everything"
    White bg, border-top + border-bottom

04  WHAT'S INCLUDED (6 cards)
    Grid, 3-col desktop / 2-col tablet / 1-col mobile
    Each card: icon + title + precise spec from TOS Section 1.3
    Background: --canvas

05  HOW THE MODEL WORKS
    Background: --blue-void (dark section)
    Timeline visual (horizontal desktop, vertical mobile):
    Day 0 → Onboarding Call → First Send → Day 30 → Second Send → Day 60 → Milestone Review → Scale or Walk
    3 statement blocks:
    "ScaleSteady absorbs all labor during the 60-day period."
    "You pay $500. We get paid when you close $5,000."
    "If milestone isn't hit: you keep everything. We invoice nothing more."

06  ASSET OWNERSHIP
    Background: --canvas
    "The domains. The inboxes. The lead list. The sequences. Yours from day one."
    Source citation: "Per Section 3.1 of the Terms of Service"
    Transfer timeline: "Credentials transferred within 10 business days of termination"

07  SCALE OR WALK
    Background: white
    Two cards side by side (auto-fit):
    [WALK card, lighter]: Keep everything. Owe nothing more.
    [SCALE card, dark --blue-deep]: Continue at $699/month. Active managed campaign.
    "You make this decision after $5,000 in revenue. Not before."

08  PLAIN-ENGLISH TOS SUMMARY
    Background: --canvas
    6 named clauses, one-sentence each, with TOS section reference:
    - What we deliver (§1.3)
    - What you pay (§2.1)
    - $0 labor fees (§2.3)
    - You own everything (§3.1)
    - Scale or Walk (§9)
    - Your maximum exposure (§7.3)

    Below: "View Full Terms of Service" toggle button
    Full TOS in collapsible — scrollable container, max-height 600px

09  ACCEPTANCE ZONE
    Background: white, bordered card
    Label: "REVIEW AND ACCEPT"

    Two-column partnership split table:
    ScaleSteady delivers | You commit to
    ✓ Outbound infrastructure build | ✓ Approve message copy
    ✓ 10,000+ verified leads | ✓ Respond to warm leads within 48hrs
    ✓ 20,000+ email touchpoints | ✓ Monthly campaign review
    ✓ Inbox management | ✓ Report milestone revenue within 5 days
    ✓ Meeting coordination | ✓ Close the deals

    Checkbox (UNCHECKED by default — required):
    "☐ I have read and agree to the Terms of Service. I understand ScaleSteady 
    builds my outbound system, sources my leads list, and deploys my campaign — 
    and that the deals I close from this pipeline depend on my offer and close rate."

    [Terms of Service] = linked text, opens full TOS section above (smooth scroll)

    PayPal button container:
    - When unchecked: wrapper div with pointer-events:none + opacity:0.4 overlay
    - When checked: overlay removes, button becomes interactive
    - Transition: 0.3s opacity

    Below button:
    "🔒 Secure checkout via PayPal · $500.00 USD · One-time payment"

10  WHAT HAPPENS NEXT
    Background: --blue-frost / --blue-glacier
    5-step timeline (numbered):
    1. PayPal receipt arrives within minutes
    2. ScaleSteady email within 24 hours — onboarding call scheduled
    3. Onboarding call: 20-30 min — offer, service area, ICP captured
    4. First campaign angle drafted within 5 business days — sent for approval
    5. First send deploys after your approval

11  FINAL SCROLL CTA
    Background: --blue-void
    Headline: "Ready to build your pipeline?"
    Sub: "$500. 60 days. You own everything we build."
    Link: smooth scroll to acceptance zone (#acceptance)

12  MINIMAL FOOTER
    Background: #050D1C
    Left: Logo + copyright
    Right: Privacy Policy · Terms · Contact
    No full site footer
```

---

## PayPal Integration Spec

```tsx
// Load via next/script
<Script
  src="https://www.paypal.com/sdk/js?client-id=BAAS2hDrmJeZ6vej0n_nyNRRjAczAVMDvRkgeMguvM3FF8aR5ONEd5BTqzDbVTz53qws2xYrgO7ZfoOeZg&components=hosted-buttons&disable-funding=venmo&currency=USD"
  strategy="afterInteractive"
  onLoad={() => {
    if (PAYPAL_HOSTED_BUTTON_ID && window.paypal) {
      window.paypal.HostedButtons({
        hostedButtonId: PAYPAL_HOSTED_BUTTON_ID,
      }).render(`#paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`);
    }
  }}
/>

// Container div
<div id={`paypal-container-${PAYPAL_HOSTED_BUTTON_ID}`} />
```

**Checkbox → button interaction:**
```tsx
const [accepted, setAccepted] = useState(false);

// Wrapper div style
style={{
  pointerEvents: accepted ? 'auto' : 'none',
  opacity: accepted ? 1 : 0.45,
  transition: 'opacity 0.3s ease',
  userSelect: accepted ? 'auto' : 'none',
}}
```

---

## Files Affected

| File | Action |
|---|---|
| `/src/app/book/` | **DELETE** — created in error, untracked, never committed |
| `/src/app/build/layout.tsx` | **CREATE** — standalone layout, no root nav/footer |
| `/src/app/build/page.tsx` | **CREATE** — full checkout page, ~500 lines |
| No other files modified | All existing pages untouched |

---

## Verification Plan

1. `npm run dev` in scalesteady-engineers directory
2. Navigate to `localhost:3000/build`
3. Verify: no site Navigation or Footer renders
4. Verify: checkbox starts unchecked, PayPal button is visually disabled
5. Verify: checking checkbox removes disabled state from PayPal container
6. Verify: TOS toggle expands and collapses correctly
7. Verify: all 6 deliverable tiles render correctly
8. Verify: Scale or Walk cards render side by side on desktop
9. Verify: mobile sticky consideration (phone CTA in nav is always accessible)
10. Verify: `scalesteady.pro` (production) is completely unaffected

---

## One Outstanding Code Blocker

**PayPal Hosted Button ID** — user is creating this in PayPal dashboard. Once provided, insert into:
```tsx
const PAYPAL_HOSTED_BUTTON_ID = 'INSERT_HERE';
```
Everything else is ready to build independently of this value. The button container renders a placeholder state when the ID is empty.

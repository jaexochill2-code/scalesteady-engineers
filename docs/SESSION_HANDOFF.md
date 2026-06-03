# ScaleSteady — Session Handoff Document
## Checkout Page Build: `/build` Route
### Session Date: 2026-06-03 | Status: Ready to Code

---

## WHAT WAS ACCOMPLISHED THIS SESSION

This session covered deep research, strategic iteration, and full specification of the `/build` checkout/acceptance page. **No production code was written.** All work is local-only until greenlit.

### Research Completed
- 5 expert web sources synthesized on 2026 highest-converting checkout/landing page elements
- Full read of `ScaleSteady_Terms_of_Service.md` (409 lines, 30,631 bytes)
- Full read of `scalesteady_master_intelligence.md` (561 lines, 24,606 bytes)
- Full read of `globals.css` for design tokens (Sapphire v3 palette)
- Full read of `layout.tsx` for font stack and root layout architecture

---

## THE PRODUCT (CORRECTED UNDERSTANDING)

Previous context had the product wrong. The actual model from the TOS:

| Element | Detail |
|---|---|
| Price | **$500 Infrastructure Fee** (pass-through, zero markup) |
| Agency/labor fee | **$0** during initial campaign phase |
| Campaign duration | **60-day Performance Period** |
| Revenue Milestone | **$5,000** in cleared, attributed revenue |
| Post-milestone choice | **Scale** ($699/month retainer) or **Walk** (keep all assets, owe nothing) |
| Max client exposure | **$500. Period.** |

### What ScaleSteady Actually Delivers (TOS Section 1.3)
1. Dedicated sending domains + warmed inboxes — minimum **20,000 emails** per campaign cycle
2. Minimum **10,000 verified + cleaned email addresses** from target market
3. **2 distinct marketing angles** tailored to client ICP
4. **3 follow-up email sequences** for non-responders
5. Lead list verification and cleaning (bounce reduction, email validation)
6. **Inbox management** — monitoring interested reply threads, initial response facilitation
7. **Meeting coordination** — follow-up on prospective meetings on client's behalf

### What Client Owns (TOS Section 3.1)
Everything. Domains, inboxes, lead lists, sequences — **client property from day of purchase**. Upon termination, ScaleSteady transfers all credentials within 10 business days.

---

## THE PAGE: `/build`

### Purpose
This is the **checkout and acceptance page** — not a marketing landing page. Users arrive already interested (from email, phone call, or existing site). They read the offer summary, understand the model, review the TOS, accept terms, and complete payment via PayPal.

### Route
`/src/app/build/page.tsx` + `/src/app/build/layout.tsx`

**IMPORTANT:** There is a `/src/app/book/` directory that was created in error. It should be **deleted** before building `/build`. It was never committed — it's untracked.

### Design Constraints (from PROJECT.md + globals.css)
- Background: `var(--canvas)` = `#FAF8F6` (never pure white)
- Primary action color: `var(--blue)` = `#1B4F8A` (Sapphire)
- Headlines: Playfair Display (serif)
- Body/UI: DM Sans (sans — maps to `var(--font-sans)`)
- Mono/numbers: JetBrains Mono (maps to `var(--font-mono)`)
- Orange `#C4431B` = **logo graphic only** — never in content
- **No navigation links** on this page — conversion mode
- Root layout injects `<Navigation>` and `<Footer>` — the build page layout must **override** this with its own minimal nav

### Critical Layout Note
The root `layout.tsx` renders `<Navigation />` and `<Footer />` around all children. The `/build` page needs its own layout that **does not inherit** these. The `/build/layout.tsx` should be a standalone layout that wraps the page without nav/footer — just the conversion-optimized minimal nav.

To override: create `/src/app/build/layout.tsx` that does NOT import the root Navigation/Footer components. Return children directly with minimal chrome.

---

## ALL LOCKED DECISIONS

### Checkbox Copy (FINAL — DO NOT CHANGE)
```
☐ I have read and agree to the [Terms of Service]. I understand ScaleSteady builds 
my outbound system, sources my leads list, and deploys my campaign — and that the 
deals I close from this pipeline depend on my offer and close rate.
```

**Rationale:** "Closer" language was rejected — sounds like a sales job title, not a contractor/business owner role. This version is non-threatening, legally accurate, and business-neutral.

### PayPal Button
- **SDK:** `https://www.paypal.com/sdk/js?client-id=BAAS2hDrmJeZ6vej0n_nyNRRjAczAVMDvRkgeMguvM3FF8aR5ONEd5BTqzDbVTz53qws2xYrgO7ZfoOeZg&components=hosted-buttons&disable-funding=venmo&currency=USD`
- **Component type:** `hosted-buttons`
- **Hosted Button ID:** ⏳ User is creating in PayPal dashboard — slot is ready in code, needs ID inserted
- **Button behavior:** Disabled (greyed, pointer-events: none) until checkbox is checked. Activates on check.
- **Price:** $500.00 USD

### PayPal Button Description (for PayPal dashboard)
**Item Name:**
> ScaleSteady Outbound Campaign Infrastructure Fee — 60-Day Engagement

**Description:**
> One-time pass-through infrastructure fee. Includes: dedicated sending domains, warmed inboxes, 10,000+ verified leads, 20,000+ email touchpoints across 2 campaign angles and 3 follow-up sequences, and 60-day managed deployment. ScaleSteady defers all labor fees. Client retains full ownership of all assets. Terms accepted at scalesteady.pro/build.

**Price:** $500.00 USD

### TOS Presentation Model
- **Method:** Clickwrap (legally enforceable) — checkbox unchecked by default
- **Layer 1:** Plain-English 6-clause summary on page (always visible)
- **Layer 2:** Full TOS in expandable/collapsible section below summary
- **Post-purchase:** Email receipt + copy of agreed terms + acceptance timestamp (to be set up separately)

### TOS Flags (Need Resolution Before Going Live)
1. Section 15.7: `[Jurisdiction]` and `[City, State]` — UNFILLED. Needs legal counsel.
2. Signature block designed for wet/digital signature — confirm clickwrap satisfies "execution" per Effective Date clause with legal counsel.

---

## PAGE ARCHITECTURE (12 Sections)

```
01  MINIMAL NAV
    - ScaleSteady logo lockup (left)
    - Phone number CTA button (right, --blue)
    - No navigation links
    - Fixed, 70px height, white bg, border-bottom

02  HERO — OFFER SUMMARY (above fold)
    Headline: "Your outbound system. Built, deployed, and running in 60 days."
    Sub: "$500 infrastructure cost. $0 in agency fees until you close revenue."
    Risk anchor: "Maximum exposure: $500. Everything else is ours to earn."
    NO CTA button in hero — scroll leads to PayPal below

03  WHAT'S INCLUDED
    6 deliverable tiles with exact specs from TOS Section 1.3:
    - 20,000 email touchpoints
    - 10,000 verified leads
    - 2 campaign angles
    - 3 follow-up sequences
    - Inbox management
    - Meeting coordination

04  HOW THE MODEL WORKS
    Visual timeline: Day 0 → (onboarding) → First Send → Day 30 (Send 2) → Day 60 (Milestone Review) → Scale or Walk
    Key lines:
    "ScaleSteady absorbs all labor, management, and platform costs during the 60-day period."
    "You pay $500. We get paid when you close $5,000 in new revenue."
    "If the milestone isn't hit: you keep everything. We invoice nothing more."

05  ASSET OWNERSHIP
    "The domains, the inboxes, the lead list, the sequences — yours from day one."
    Source: TOS Section 3.1
    On termination: credentials transferred within 10 business days

06  SCALE OR WALK
    Two cards side by side:
    [WALK] Keep all assets. Owe nothing more. No further fees.
    [SCALE] Continue at $699/month. Active managed campaign.
    "You make this decision AFTER $5,000 in revenue. Not before."

07  PLAIN-ENGLISH TOS SUMMARY (6 clauses)
    1. What we deliver (Sec 1.3)
    2. What you pay (Sec 2.1) — $500, zero markup
    3. $0 labor fees (Sec 2.3) — deferred until milestone
    4. You own everything (Sec 3.1)
    5. Scale or Walk (Sec 9)
    6. Max exposure (Sec 7.3) — $500

08  FULL TOS (Collapsible)
    "View full Terms of Service" toggle
    Full document renders inside expandable section
    Scrollable container, max-height with overflow-y: scroll

09  ACCEPTANCE ZONE
    Two-column "partnership split":
    ScaleSteady delivers | You commit to
    ✓ Infrastructure build | ✓ Approve message copy
    ✓ 10,000 verified leads | ✓ Respond to warm leads (48hr)
    ✓ 20,000 email touchpoints | ✓ Monthly campaign review
    ✓ Inbox management | ✓ Report milestone revenue
    ✓ Meeting coordination | ✓ Close the deals

    Checkbox (unchecked by default):
    "☐ I have read and agree to the [Terms of Service]. I understand ScaleSteady 
    builds my outbound system, sources my leads list, and deploys my campaign — 
    and that the deals I close from this pipeline depend on my offer and close rate."

    PayPal button (disabled overlay until checkbox checked)
    Below button: "🔒 Secure checkout via PayPal · $500.00 USD"

10  WHAT HAPPENS NEXT
    Post-acceptance confirmation flow (kills checkout anxiety):
    1. Receipt from PayPal within minutes
    2. ScaleSteady email within 24 hours — onboarding call scheduled
    3. Onboarding call: 20-30 minutes — offer, service area, ICP captured
    4. First angle drafted within 5 business days — sent for approval
    5. First send deploys after your approval

11  FINAL CTA BLOCK (for those who scrolled without accepting above)
    Repeat offer summary + PayPal scroll anchor link

12  MINIMAL FOOTER
    Copyright + Privacy Policy + Terms link + Contact
    No full site footer — conversion mode
```

---

## 5 CORE CONVERSION PROBLEMS + SOLUTIONS

### Problem 1: Trust Deficit (contractors burned by agencies)
**Evidence:** "I have tried 3 separate times to outsource marketing and I've never managed to make as much money as I've spent." (r/Roofing)
**Solution:** Acknowledge the burn explicitly. The $0 labor fee model is the trust signal — publish it prominently. Name-check HomeAdvisor, Google Ads, SEO retainers, and disqualify each.

### Problem 2: Value Perception ($500 looks like "another agency fee")
**Evidence:** Contractors anchor on total cost vs. per-contact cost math.
**Solution:** Reframe before revealing price. Lead with what $500 buys in concrete deliverables. Show the pass-through model — ScaleSteady earns nothing on the $500.

### Problem 3: Skepticism About Effectiveness ("email doesn't work")
**Evidence:** "No other ad dollar spent by my company has yielded even one single job." (r/arborists)
**Solution:** The Floor Argument — reframe success metric from calls received to name recognition built. Lead with the Scale or Walk guarantee structure — client wins even if milestone isn't hit.

### Problem 4: Fear of Commitment (retainer aversion)
**Evidence:** "I point blank refuse to talk to anyone who wants a retainer." (r/Roofing)
**Solution:** No retainer during initial phase. The Scale or Walk election is the proof — $699 retainer only if client chooses it after $5,000 in revenue. Publish max exposure ($500) with authority.

### Problem 5: Cognitive Friction (too much to read, too many decisions)
**Solution:** One CTA (PayPal button). Clear section progression. TOS behind a toggle — not blocking checkout. Checkbox is the only required action before payment.

---

## KEY COPY LINES (PRODUCTION-READY)

| Section | Line |
|---|---|
| Hero headline | "Your outbound system. Built, deployed, and running in 60 days." |
| Hero sub | "$500 infrastructure cost. $0 in agency fees until you close revenue." |
| Risk anchor | "Maximum exposure: $500. Everything else is ours to earn." |
| Model section | "You pay $500. We get paid when you close $5,000 in new revenue." |
| Milestone miss | "If the milestone isn't hit: you keep everything. We invoice nothing more." |
| Asset ownership | "The domains, the inboxes, the lead list, the sequences — yours from day one." |
| Scale or Walk | "You make this decision after $5,000 in revenue. Not before." |
| Floor stat | "$500 is your ceiling for risk. A new client is your floor for return." |

---

## OUTSTANDING ITEMS FOR NEXT SESSION

| Item | Status | Notes |
|---|---|---|
| PayPal Hosted Button ID | ⏳ Being created | Insert into `PAYPAL_HOSTED_BUTTON_ID` const |
| Jurisdiction (Section 15.7) | ⏳ Legal counsel needed | [Jurisdiction] + [City, State] unfilled |
| Clickwrap legal confirmation | ⏳ Legal counsel needed | Confirm satisfies TOS Effective Date clause |
| `/src/app/book/` directory | 🗑️ Delete before building | Created in error — untracked, never committed |
| Build `/src/app/build/` | ⏳ Ready to code | Full spec above, PayPal button ID is the only blocker |
| Root layout override | ⏳ Critical | `/build/layout.tsx` must NOT inherit root Navigation/Footer |
| Post-purchase email trigger | ⏳ Future | Receipt + TOS copy + timestamp — separate setup |

---

## DESIGN TOKENS REFERENCE (globals.css v3 Sapphire)

```css
--canvas:         #FAF8F6   /* page background */
--blue-void:      #050D1C   /* deepest dark — hero dark sections */
--blue-midnight:  #0A1E36   /* secondary dark */
--blue-deep:      #0D2B4A   /* section backgrounds */
--blue-prussian:  #1A3F6E   /* dark accents */
--blue:           #1B4F8A   /* PRIMARY ACTION — CTA buttons, links */
--blue-royal:     #2660A8   /* hover state */
--blue-cobalt:    #4A87CC   /* secondary accent */
--blue-powder:    #7EC4E0   /* light accent on dark */
--blue-glacier:   #BFD9F0   /* subtle tinted surfaces */
--blue-frost:     #E8F2FA   /* ultra-light tints */
--ink-primary:    #111111
--ink-body:       #3D3D3D
--ink-secondary:  #6B6B6B
--ink-muted:      #9E9E9E
--ink-border:     #E0E0E0
--white:          #FFFFFF
```

---

*Session: 2026-06-03 | Agent: Antigravity | Continuation device: pick up at "Build /build page"*

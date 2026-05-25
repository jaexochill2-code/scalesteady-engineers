# PIPELINE ENGINEERS — PROJECT DATABASE
> **Version:** 1.0 | **Created:** 2026-05-25 | **Status:** Pre-Build · Design Intelligence Complete

---

## WHAT THIS PROJECT IS

**Pipeline Engineers** is a premium B2B services website for a firm that brings engineering-grade rigor to business operations, automation, and infrastructure. The site must communicate **certainty** — that systems won't fail, that processes are bulletproof, that the team behind it is elite.

This is a high-production, production-level website build. Not an MVP. Not a template. A masterwork.

**The parallel:** Ellevest.com for financial services. Pipeline Engineers for operational infrastructure services. Same psychological architecture: *the product isn't the service — the product is the feeling of certainty that comes with working with us.*

---

## PROJECT DIRECTORY MAP

```
pipeline-engineers/
├── PROJECT.md                          ← YOU ARE HERE (master context)
├── DECISIONS.md                        ← All design/copy/tech decisions logged
├── CHANGELOG.md                        ← What changed and when
│
├── design/
│   ├── intelligence/                   ← Research & analysis documents
│   │   ├── ellevest_forensic_teardown.md     ← Full pixel-level Ellevest analysis
│   │   ├── ellevest_design_intelligence.md   ← Design tokens, color, type
│   │   ├── ellevest_vision_analysis.json     ← Machine vision analysis data
│   │   ├── brand-master-brief.md             ← Brand identity foundation
│   │   ├── apex_intelligence_brief.md        ← Strategic positioning
│   │   ├── anti_agency_positioning.md        ← Differentiation framework
│   │   ├── adversarial_review.md             ← Self-critique of prior plans
│   │   ├── implementation-plan-v1.md         ← First-pass implementation plan
│   │   └── walkthrough.md                    ← Session work log
│   │
│   ├── research/
│   │   ├── ellevest-screenshots/       ← Full-page Ellevest captures (5 pages)
│   │   └── ellevest-cropped/           ← Section-level closeup crops (21 images)
│   │
│   └── brand/
│       ├── logos/                      ← All logo variants (10 files)
│       └── references/                 ← Reference images (Ellevest, etc.)
│
├── docs/                               ← Living design spec, copy, sitemap
└── src/                                ← Website source code (Next.js project lives here)
```

---

## BRAND IDENTITY

### Name
**Pipeline Engineers**

### Core Positioning
> *Structure and curiosity in a single name.*

Pipeline evokes: infrastructure, flow, systems, engineering rigor, things that move efficiently without breaking.
Engineers evokes: precision, expertise, problem-solving, accountability.
Together: a firm that builds the operational backbone of serious businesses.

### The Thesis (equivalent to Ellevest's women's wealth thesis)
> **Most operations consultants and agencies treat your business like a project. Pipeline Engineers treats your business like infrastructure.**

The psychological purchase: not "we'll fix your problem" (every agency says this) — but "we will make your systems as reliable as the physical infrastructure you depend on without thinking." Water. Power. Internet. *That* level of reliability.

### Tagline Options (to be decided)
- `"Infrastructure for how businesses actually run."`
- `"Systems that hold. Always."`
- `"Your operations, engineered."`
- `"Built to last. Designed to scale."`

---

## TARGET AUDIENCE

**Primary:** Operations leaders, founders, and COOs of mid-market companies (50–500 employees) who have outgrown their ad-hoc systems and need an engineering-grade approach to their business infrastructure. They're not buying software — they're buying the certainty that someone who deeply understands systems will design theirs right.

**Secondary:** CFOs and CTOs who need to justify infrastructure investment and want a firm whose deliverables can be audited, documented, and handed off.

**The Emotional State of the Buyer:**
- They've been burned by an agency or consultant who delivered impressive-looking work that broke in production
- They've built workarounds on top of workarounds until the system is unmaintainable
- They feel anxiety every time a key person goes on vacation
- They want someone who will care about their systems as much as they do

---

## DESIGN SYSTEM

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Pipeline Black | `#1a1a1a` | Primary text, dark sections |
| Pipeline White | `#f8f7f4` | Primary background (warm white, not sterile) |
| Signal Blue | `#1a3a5c` | Authority, dark CTAs, footer |
| Arc Orange | `#e8541a` | Accent, CTAs, energy — the "pipeline" color |
| Cement Grey | `#6b7280` | Secondary text, fine print |
| Steel Blue-Grey | `#e8edf2` | Secondary backgrounds, alternating sections |
| Success Green | `#2d6a4f` | Confirmation, positive states |

*Note: Arc Orange is the primary differentiator from Ellevest's green. Orange in industrial/engineering contexts = energy, heat, flow, warning (in the good sense — attention). Pipeline orange = the color of the actual fluid moving through the pipe.*

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / H1 | **Fraunces** or **Freight Display** | 700 | 72–96px |
| Heading / H2 | **Fraunces** | 600 | 48–64px |
| Body | **Inter** or **DM Sans** | 400/500 | 16–18px |
| Mono / Data | **JetBrains Mono** | 400 | 14px |
| Label / Eyebrow | **Inter** | 700 | 11–12px, tracked |

*Note: Fraunces is a variable font with an optical weight axis — it can look playful at high weights and severe at low weights. This mirrors the brand's duality: technically rigorous + humanly accessible.*

*Mono for: process steps, code snippets, stats, technical specifications. This signals engineering credibility on sight.*

### Spacing System
- Base unit: 4px
- Section padding: 120px vertical (desktop), 80px (tablet), 56px (mobile)
- Container max-width: 1280px
- Content max-width: 760px (readable prose)
- Grid: 12-column, 24px gutter

### Animation Principles
- **Scroll-driven reveals:** Elements enter on scroll — not bouncing, not dramatic — they *arrive*. Like precision engineering clicking into place.
- **Timing:** 400–600ms, cubic-bezier ease-out. No spring physics on serious content.
- **GSAP ScrollTrigger:** For pinned sections, horizontal scrolls, and counter animations.
- **Lenis:** For smooth scroll, synchronized with GSAP via `autoRaf: false`.
- **No gratuitous animation.** Every animation must serve comprehension.

---

## TECHNICAL STACK

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | **Next.js 15** (App Router) | PPR, RSC, top-tier perf |
| Styling | **Tailwind v4** (CSS-first) | Native CSS variables, no config file |
| Animation | **GSAP 3** + ScrollTrigger + ScrollSmoother | Industry standard for this level of build |
| Smooth Scroll | **Lenis** | Synced with GSAP |
| Motion | **Motion (Framer) v12** | React-native micro-animations |
| Icons | **Lucide** + custom SVG | Clean, consistent |
| Fonts | Google Fonts / Variable fonts via next/font | Zero CLS |
| Images | **next/image** | Auto optimization, WebP |
| Deployment | **Vercel** | Zero-config Next.js |
| Analytics | **Vercel Analytics** | Privacy-safe, built-in |

---

## SITE ARCHITECTURE

### Pages

| Route | Name | Purpose |
|-------|------|---------|
| `/` | Homepage | Primary trust-building & conversion entry |
| `/services` | Services | What we build / The Pipeline |
| `/work` | Case Studies | Proof · "The work speaks" |
| `/team` | The Team | Humanize the engineers |
| `/process` | Our Process | De-risk the engagement |
| `/contact` | Contact | Book a discovery call |

### Navigation (top-level only)
```
[PIPELINE ENGINEERS logo]   Services · Work · Team · Process     [Book a call →]
```

---

## HOMEPAGE SECTION MAP

### Section 01 — Hero
- **Tone:** Commanding. No decoration. Just the statement.
- **Copy framework:** H1 = the thesis claim. Subhead = what that means for you. CTA = lowest-friction next step.
- **Visual:** Full-height. Text left. A dark, precision graphic or video loop on right (pipeline/infrastructure visual).
- **Key insight from Ellevest:** The hero is text-first, not image-first. Confidence doesn't need decoration.

### Section 02 — Authority Strip
- **Content:** Logos of companies served / press mentions / certifications
- **Tone:** Matter-of-fact. "You've seen our work. Here's who trusted us."
- **Key insight from Ellevest:** The sage-green press strip. Sage for us = steel blue. Neutral, not white, creates section rhythm.

### Section 03 — The Thesis / Manifesto
- **Copy:** A bold typographic statement about what's broken in how businesses run operations, and why Pipeline Engineers was built to fix it.
- **Visual:** Full-width, large serif type, warm off-white background, massive whitespace.
- **Key insight from Ellevest:** The "Ellevest women's | was built specifically..." split layout. We need the equivalent: the indictment of the status quo + the declaration of our difference.

### Section 04 — What We Do (Services Overview)
- **Layout:** 3-column cards. Each service = one card. Line-art icon + service name + one-sentence description + link.
- **Tone:** Precise. Each service described in the language of outcomes, not features.

### Section 05 — How We Work (The Process)
- **Layout:** Horizontal scroll OR pinned vertical progression. 4–6 stages.
- **Visual:** Numbered steps with connecting line/pipe graphic. The pipeline metaphor literalized.
- **Key insight from Ellevest:** The floating tag labels on the Financial Planning hero. We can use similar floating labels to show scope of each stage.

### Section 06 — Case Study Feature (Proof)
- **Layout:** Full-bleed feature — company name, problem statement, outcome metric, quote from client.
- **Visual:** Dark background (Signal Blue or Black). White text. Single stat in very large mono font.
- **Key insight from Ellevest:** The testimonial section with the warm gradient and highlighted words. We make the stat the hero, not the testimonial. Engineers trust data more than quotes.

### Section 07 — Team Preview
- **Layout:** 3–4 team cards. Photo + name + title + specialty sentence. Book directly.
- **Key insight from Ellevest:** The team cards with `SCHEDULE CALL`. Direct booking = friction eliminated. The team IS the product.

### Section 08 — Final CTA
- **Layout:** Dark (Signal Blue). Single centered CTA. No copy except the action.
- **Key insight from Ellevest:** The dark green CTA strip at the bottom. Color shift = psychological full-stop. High-contrast button for highest-intent visitor.

---

## COPY PRINCIPLES

1. **Say what others won't.** Name the failure mode of the status quo before claiming to fix it.
2. **Outcomes, not features.** "Your team knows what to do when something breaks" — not "We create runbooks."
3. **The word "engineered."** Use sparingly because overuse dilutes. Save it for the moments that matter.
4. **Specificity = trust.** "We reduced onboarding time from 6 weeks to 9 days" not "We improved efficiency."
5. **Technical language signals expertise.** A client who doesn't understand "idempotent deployments" trusts that you do. Don't dummy it down.
6. **Restraint is authority.** No urgency tactics. No "limited spots." No countdown timers. The absence of pressure IS the premium signal.
7. **One CTA type.** `Book a discovery call` everywhere. Consistent. Never wavers.

---

## PSYCHOLOGICAL ARCHITECTURE (from Ellevest analysis, adapted)

| Ellevest Mechanism | Pipeline Engineers Equivalent |
|-------------------|------------------------------|
| "without judgment" (names core fear) | Name: "systems that fail when you're not watching" |
| "Feel seen & heard" (emotional validation) | "A team that cares about your infrastructure as much as you do" |
| Fiduciary (legal trust) | Credentials / certifications / documented methodology |
| Same cast across pages (continuity) | Same 2-3 client scenarios referenced across multiple pages |
| Press strip (third-party validation) | Client logos + specific outcome stats |
| "Here's the truth:" (authority + revelation) | "Here's what actually breaks most operations at scale:" |
| Testimonial about freedom/independence | Testimonial about sleeping well at night / team confidence |
| CTA restraint (no urgency) | Single, low-friction CTA: `Book a discovery call` |

---

## LOGO ASSETS

Located in `design/brand/logos/`

| File | Description | Use Case |
|------|-------------|----------|
| `pipeline-engineers-logo-master.png` | Full color master | Primary use |
| `pipeline-engineers-logo-transparent.png` | Transparent background | On photos/gradients |
| `pipeline-engineers-logo-flat-white.png` | White flat version | On dark backgrounds |
| `pipeline-engineers-logo-reversed-dark.png` | Reversed on dark | Footer, dark sections |
| `pipeline-engineers-logo-reversed-navy.png` | Reversed on navy | Signal Blue sections |
| `pipeline-engineers-logo-wordmark.png` | Wordmark only variant | Horizontal layout |
| `pipeline-engineers-logo-infrastructure-variant.png` | Infrastructure-themed variant | B2B materials |
| `pipeline-engineers-logo-brutalist-variant.png` | Brutalist variant | Experimental |
| `pipeline-engineers-logo-abstract-variant.png` | Abstract variant | Pattern/texture |
| `pipeline-engineers-logo-iterated-v2.png` | Refined iteration v2 | Second candidate |

---

## REFERENCE RESEARCH ASSETS

Located in `design/research/`

### Ellevest Full-Page Screenshots (`ellevest-screenshots/`)
| File | Page |
|------|------|
| `homepage_fullpage.png` | Homepage |
| `wealth_management_fullpage.png` | Wealth Management |
| `financial_planning_fullpage.png` | Financial Planning |
| `our_team_fullpage.png` | Our Team |
| `magazine_fullpage.png` | Magazine/Resources |

### Ellevest Section Crops (`ellevest-cropped/`)
| File | Section |
|------|---------|
| `homepage_01_nav_hero.png` | Nav + Hero (text only) |
| `homepage_02_photo.png` | Hero photo + Why Ellevest? value props |
| `homepage_03_value_props.png` | Editorial manifesto + press strip |
| `homepage_04_editorial_text.png` | Editorial split text |
| `homepage_05_press_logos.png` | Press logos on sage |
| `homepage_06_testimonial.png` | Client testimonial |
| `homepage_07_booking.png` | Booking/CTA section |
| `homepage_08_faq.png` | FAQ section |
| `homepage_09_footer.png` | Footer |
| `wealth_management_hero_closeup.png` | WM hero |
| `wealth_management_midsection.png` | WM mid (services grid) |
| `financial_planning_hero_closeup.png` | FP hero + checklist |
| `financial_planning_midsection.png` | FP process section |
| `our_team_hero_closeup.png` | Team hero + dark green mission band |
| `our_team_midsection.png` | Team cards grid |
| `magazine_hero_closeup.png` | Magazine hero |
| `magazine_midsection.png` | Magazine content grid |

---

## INTELLIGENCE DOCUMENTS

Located in `design/intelligence/`

| File | Description |
|------|-------------|
| `ellevest_forensic_teardown.md` | **PRIMARY REFERENCE** — Full pixel-level teardown of every Ellevest page, section, word of copy, image description, and psychological mechanism |
| `ellevest_design_intelligence.md` | Design tokens: exact colors, typography, spacing measurements |
| `ellevest_vision_analysis.json` | Machine vision structured data from Ellevest page analysis |
| `brand-master-brief.md` | Pipeline Engineers brand identity foundation |
| `apex_intelligence_brief.md` | Strategic positioning & competitive intelligence |
| `anti_agency_positioning.md` | Why Pipeline Engineers is not an agency |
| `adversarial_review.md` | Self-critique / red-team of our own plans |
| `implementation-plan-v1.md` | First-pass implementation plan |
| `walkthrough.md` | Session work log |

---

## DECISIONS LOG

See `DECISIONS.md` for all design, copy, and technical decisions with rationale.

---

## CURRENT STATUS

| Phase | Status |
|-------|--------|
| Brand Identity | ✅ Complete |
| Ellevest Research | ✅ Complete (forensic teardown done) |
| Design Intelligence | ✅ Complete |
| Project Structure | ✅ Complete (this file) |
| Implementation Plan (full) | 🔄 Next |
| Design System (CSS tokens) | ⬜ Pending |
| Component Library | ⬜ Pending |
| Homepage Build | ⬜ Pending |
| Inner Pages Build | ⬜ Pending |
| Animation Layer | ⬜ Pending |
| Copy (final) | ⬜ Pending |
| QA + Performance | ⬜ Pending |
| Deployment | ⬜ Pending |

---

## SESSION PROTOCOL

When starting a new session on this project:

1. **Read `PROJECT.md` first** (this file) — full context in 5 minutes
2. **Check `DECISIONS.md`** — see what's been locked in
3. **Check `CHANGELOG.md`** — see what changed since last session
4. **Read `design/intelligence/ellevest_forensic_teardown.md`** if doing any design/copy work — it is the ground truth reference
5. **Current work lives in `src/`** — the Next.js project
6. **Open workspace in:** `/Users/flowstatework/.gemini/antigravity-ide/scratch/pipeline-engineers`

---

*This is a living document. Update it every session.*

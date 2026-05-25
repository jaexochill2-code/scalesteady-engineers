# Apex Session Intelligence Brief
*GEMINI.md Mental Model + Agentpedia.codes Tooling Deep Dive*

---

## Part 1: GEMINI.md — The Apex Mental Model

The active system directive from `GEMINI.md` establishes the following hard operational constraints for every session. These are not suggestions — they are non-negotiable execution rules.

### Identity
- Role: **Senior systems engineer**. Production-grade, not prototypes or drafts.
- No LLM-isms: No hedging, no filler, no apology on failure. Fix and move.
- No hallucinated packages. Verify against live docs before importing.

### Core Execution Loop (The Cognitive Architecture)
```
Observe → Think → Act → Verify
```
1. **Persistence:** Keep going until fully resolved. No stopping at uncertainty.
2. **Context Gathering:** Start broad → focus. No re-reading files already in context.
3. **Verification:** Run tests, check outputs, confirm behavior before handing back.
4. **Self-Reflection:** For complex tasks, build an internal quality rubric (5-7 criteria) before starting. Iterate against it.

### Adversarial Gate (Hard Gate Before Commits)
Before any multi-file change, destructive command, or irreversible action: **name 3 failure modes**. Patch each. If one cannot be patched, flag it.

### Execution Routing by Confidence
| Confidence | Mode | Behavior |
|---|---|---|
| High | `autonomous` | Execute, validate, commit. |
| Medium | `supervised` | Execute, present before committing. |
| Low | `interactive` | Ask clarifying questions first. |

### Error Handling Protocol
- Diagnose → Fix → Update rule. Max 3 retries.
- After 3 fails: (a) what failed, (b) what was tried, (c) root cause, (d) next steps.

### Key Operational Constraints
- All credentials live in `_vault` inside `mcp_config.json`. No `.env` files.
- Drift check: Every 5 user messages, re-read `GEMINI.md` and `agents.md`.
- Post-task: Append session learnings to `[EVO_LEARNING]` in `agents.md`.
- Full Google ecosystem authorized: Cloud, AI Studio, Vertex AI, all MCP servers.

---

## Part 2: Agentpedia.codes — Tooling, Design & Imaging Capabilities

**URL:** [agentpedia.codes](https://agentpedia.codes) (formerly antigravity.codes)

This is the canonical community hub for AI IDE tooling (Antigravity, Cursor, Windsurf). Here is a comprehensive breakdown of its resources for website building.

---

### 2.1 Core Resource Categories

| Category | Count | Use Case |
|---|---|---|
| **MCP Servers** | 1,500+ | Extend AI IDE capabilities with tools |
| **AI Rules** | 500+ | Enforce coding styles, frameworks, patterns |
| **Workflows** | Active catalog | Multi-step agent automation patterns |
| **Agent Skills** | 2,000+ | Specialized agentic behaviors |
| **Image Prompts** | 874+ | Tested prompts for visual generation |

---

### 2.2 MCP Servers for Website Building

These are the highest-value MCPs for web development and visual work:

#### Design & Visual
- **Figma MCP** — Design-to-code handoff, direct Figma API access
- **Blender MCP** — 3D rendering, asset creation

#### Development Infrastructure
- **Playwright MCP** — Browser automation, E2E testing, visual regression
- **Supabase MCP** — Real-time database, auth, storage for web apps
- **Docker MCP** — Containerized deployments
- **GitHub MCP** — Repository management, CI/CD
- **n8n MCP** — Workflow automation, webhooks, data pipelines
- **Stripe MCP** — Payment processing integration
- **PostgreSQL MCP** — Database queries and schema management
- **Linear MCP** — Project tracking, issue management
- **Slack MCP** — Team notifications, webhook alerts
- **Notion MCP** — Content management, documentation

---

### 2.3 AI Rules for Web Development (Proven Templates)

The `/rules` directory contains battle-tested coding style guides organized by framework. Critical ones for website building:

#### Frontend
- **React + Modern JS** — Component patterns, hooks, state management
- **TypeScript Strict Mode** — Type safety, null checks, strict configs
- **Tailwind CSS Expert** — Utility-first patterns, responsive design
- **Next.js App Router Best Practices** — Server components, routing, data fetching
- **Web Performance Optimization** — CWV (LCP/INP), lazy loading, bundle optimization

#### Agentic Patterns
- **Debugging Agent** — Systematic error diagnosis workflows
- **Security Audit Agent** — Vulnerability scanning patterns
- **API Design Agent** — REST/GraphQL design standards

---

### 2.4 Image Prompt Categories (874+ Tested Prompts)

Organized across 17 categories. The ones directly applicable to website and brand building:

| Category | Prompts | Website Use Case |
|---|---|---|
| **Logo Branding** | 14 | Brand identity, monograms, wordmarks |
| **Product Photography** | 61 | Hero images, feature showcases |
| **Minimalist Icons** | 7 | UI iconography, app icons |
| **Architecture Interiors** | 22 | Background environments, mood shots |
| **Urban Cityscapes** | 17 | Hero backgrounds, location shots |
| **Cinematic Posters** | 17 | Landing page hero artwork |
| **3D Miniatures** | 40 | Isometric UI mockups, product scenes |

**Compatible Models:** DALL-E 3, Midjourney v6, Google Imagen (Nano Banana), Flux Pro, ChatGPT Image, Stable Diffusion XL

#### Top Logo Branding Prompts Available
1. Brand Logo Wax Seals (ChatGPT, Playboy, Batman, Lacoste style)
2. 3D Metallic Brand Logos (DC, Under Armour treatment)
3. Pringles Monogram — Elegant Brand Design on Red
4. Elegant Script Logo Redesigns (Lacoste, Tesla, Ferrari style)
5. 3D Glass Logos — Modern Brand Icon Design & Rendering
6. Holographic Logo 3D Renders (LV-style treatment)

---

### 2.5 Website Building — Synthesis of Maximum Capabilities

Combining the GEMINI.md mental model with the Agentpedia tooling ecosystem, here is the full capability matrix for building the ScaleSteady website:

#### Visual Asset Generation
- **Logo iteration:** `generate_image` tool with Pentagram-aligned prompts (already deployed)
- **Hero images:** 874+ tested prompts across product, cinematic, architecture categories
- **3D assets:** Blender MCP or image prompts in the 3D Miniatures category
- **Brand system:** Consistent palette enforcement via AI Rules for design tokens

#### Website Architecture
- **Frontend:** Next.js App Router + TypeScript Strict Mode (AI Rules available)
- **Styling:** Tailwind CSS Expert rules + custom CSS via `modern-web-guidance` skill
- **Performance:** Web Performance Optimization rules (Core Web Vitals compliance)
- **Database:** Supabase MCP for any dynamic content (contact forms, lead capture)
- **Testing:** Playwright MCP for visual regression and E2E testing

#### Deployment
- **Firebase Hosting** (skill available) — Static and SPA deployment
- **Cloud Run** (MCP available) — Containerized web apps
- **Supabase** — Edge functions, API routes

---

### 2.6 Operating Framework for Next Steps

Based on the GEMINI.md directives and the full tooling picture, the recommended execution sequence for building the ScaleSteady website is:

1. **Brand System Lock** — Finalize logo and design tokens (colors, typography, spacing)
2. **Image Asset Generation** — Use `generate_image` with product photography and architecture prompts for hero sections
3. **Tech Stack Selection** — Next.js + Tailwind + Supabase (if lead capture needed)
4. **Rules Injection** — Apply Next.js App Router + Web Performance rules for production-grade output
5. **MCP Integration** — Playwright for QA, Stripe for any payment flows
6. **Deployment** — Firebase Hosting or Cloud Run via available MCPs

*Compiled from live reads of GEMINI.md and agentpedia.codes on 2026-05-25T00:24:00+08:00*

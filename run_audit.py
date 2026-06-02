"""
Re-run API call only -- screenshots already captured.
"""

import base64, json, os, httpx

API_KEY = "AIzaSyAuQp--6liNLm6NSotIS3rN_LwBki6i_Ak"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={API_KEY}"
OUT_DIR = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\14a9f0cc-685f-480e-9845-4b9ce9318bab"

SCREENSHOTS = [
    ("Hero - Desktop 1440px",      "audit_hero_desktop.png"),
    ("Offer Section - Desktop",    "audit_offer_desktop.png"),
    ("Lower Sections - Desktop",   "audit_lower_desktop.png"),
    ("Full Page - Desktop",        "audit_full_desktop.png"),
    ("Hero - Mobile 390px",        "audit_hero_mobile.png"),
    ("Full Page - Mobile",         "audit_full_mobile.png"),
]

CRITIQUE_PROMPT = """
You are a senior-level conversion rate optimization expert, visual design director, and direct-response copywriting strategist operating at the absolute top of your field in 2026.

You have deep expertise in:
- The specific visual and psychological principles used by the highest-converting B2B SaaS and service websites in 2026 (Linear, Vercel, Loom, Stripe, Superhuman, Figma, Notion, Clay, Apollo, Instantly)
- Direct-response copywriting: pattern interrupts, specificity, social proof laddering, NLP anchoring, loss aversion framing, certainty stacking
- Visual hierarchy: F-pattern and Z-pattern eye tracking, whitespace as a premium signal, contrast ratios, typographic emphasis
- Hero section optimization: above-the-fold message match, value prop clarity, CTA placement, friction reduction
- Offer architecture: how offers are framed, sequenced, and made irresistible without discount
- Grayscale/monochrome design systems: how to communicate premium status without color (as seen in Linear, Notion, and top-tier 2025-2026 agencies)
- Font psychology: weight contrast, size hierarchy, the specific emotional register of DM Sans at various weights
- Mobile-first conversion design: thumb zones, scroll depth, how mobile users read differently
- B2B cold outreach agency positioning: what objections exist, what social proof converts, what copy kills trust instantly

You are looking at MULTIPLE screenshots of scalesteady.pro -- a B2B cold outbound agency website that recently underwent a grayscale redesign. The site uses DM Sans exclusively, deep blacks and grays, no hue.

The site serves business owners who received a cold email and are now evaluating whether to trust ScaleSteady with their outbound infrastructure. These visitors are:
- Skeptical (they know agencies overpromise and underdeliver)
- Busy (they give 6-10 seconds before leaving)
- Sophisticated (they can detect generic copy and stock-photo marketing instantly)
- Motivated (something in the email resonated or they would not be here)

The unique offer: ScaleSteady builds the cold email system at cost ($500 infrastructure pass-through, zero agency markup), works for FREE until the client generates $5,000 in new revenue, then offers Scale ($699/mo ongoing management) or Walk (keep all infrastructure and 100% of profits, owe nothing). This is genuinely unusual and powerful -- the site must make this land viscerally and immediately.

YOUR TASK: provide a ruthlessly honest, apex-level critique structured EXACTLY as follows:

## 1. FIRST IMPRESSION AUDIT (0-3 seconds)
Score: X/10
What does the visitor's eye land on first? Is the value prop immediately clear? Does the hero headline earn attention or bleed it? What is the emotional register -- does it feel like a premium peer-to-peer pitch or a corporate vendor?

## 2. HEADLINE & COPY ANALYSIS
Score each major copy block X/10. Critique "If you're here, the email worked." Does it land? Is the offer section preamble paragraph punchy enough? Identify specific words or phrases that are killing momentum or creating doubt.

## 3. VISUAL HIERARCHY CRITIQUE
Score: X/10
Is whitespace being used as a luxury signal? Is font weight contrast creating a clear reading hierarchy? What visual elements are competing for attention instead of guiding the eye sequentially?

## 4. TRUST SIGNAL AUDIT
Score: X/10
What trust signals are present? What is categorically missing that a cold traffic visitor would need to convert? Where does doubt specifically creep in?

## 5. OFFER SECTION EFFECTIVENESS
Score: X/10
Does the "How We Align Our Interests" section make the $0 agency fee model feel believable and genuinely safe? Or does it feel like a trick? Is the numbered roadmap (01/02/03) readable and persuasive?

## 6. MOBILE EXPERIENCE CRITIQUE
Score: X/10
Brutally assess the mobile layout. What breaks? What is unreadable? What gets cut off? What would cause a mobile visitor to leave immediately?

## 7. GRAYSCALE DESIGN ASSESSMENT
Score: X/10
Is the monochrome palette reading as premium and intentional (Linear-tier) or unfinished and cold? What is missing from the visual language? How could selective typographic color (metallic, silver, warm white, charcoal gradients) improve the experience without breaking the grayscale aesthetic?

## 8. CONVERSION FRICTION INVENTORY
List every single moment where a visitor would hesitate, doubt, or leave. Be completely brutal. No sugarcoating.

## 9. TOP 10 HIGHEST-IMPACT IMPROVEMENTS
Numbered 1-10, ranked by expected conversion lift. Each must be:
- Specific to an element visible in the screenshots
- Actionable with a concrete implementation path
- Not generic advice -- reference the exact section/element

## 10. FINAL VERDICT
Overall score: X/10
One paragraph executive summary: what is this site's current conversion potential, what is its biggest strength, and what is the single change that would move the needle most dramatically.
"""

def encode(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

parts = []
for label, fname in SCREENSHOTS:
    fpath = os.path.join(OUT_DIR, fname)
    if not os.path.exists(fpath):
        print(f"MISSING: {fpath}")
        continue
    parts.append({"text": f"--- SCREENSHOT: {label} ---"})
    parts.append({"inline_data": {"mime_type": "image/png", "data": encode(fpath)}})
    print(f"Loaded: {label}")

parts.append({"text": CRITIQUE_PROMPT})

payload = {
    "contents": [{"parts": parts}],
    "generationConfig": {
        "temperature": 1.0,
        "maxOutputTokens": 16384,
        "thinkingConfig": {"thinkingBudget": 16384}
    }
}

print(f"\nSending {len(SCREENSHOTS)} screenshots to gemini-3.5-flash (high reasoning)...")
with httpx.Client(timeout=180) as client:
    resp = client.post(ENDPOINT, json=payload)

if resp.status_code != 200:
    print(f"API Error {resp.status_code}:")
    print(resp.text[:1000])
    raise SystemExit(1)

result = resp.json()
output_text = ""
for part in result.get("candidates", [{}])[0].get("content", {}).get("parts", []):
    if "text" in part:
        output_text += part["text"]

report_path = os.path.join(OUT_DIR, "site_audit_report.md")
with open(report_path, "w", encoding="utf-8") as f:
    f.write("# ScaleSteady.pro -- Apex Visual Audit (Gemini 3.5 Flash)\n\n")
    f.write(output_text)

print("\n=== AUDIT COMPLETE ===")
print(f"Report: {report_path}")
print("\n" + output_text.encode("ascii", errors="replace").decode("ascii"))

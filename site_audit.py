"""
Full site visual audit via Gemini 3.5 Flash.
Captures scalesteady.pro at multiple breakpoints + scroll positions,
then submits all images + apex critique prompt to Gemini vision API.
"""

import asyncio
import base64
import json
import urllib.request
import urllib.parse
import os
from playwright.async_api import async_playwright

API_KEY = "AIzaSyAuQp--6liNLm6NSotIS3rN_LwBki6i_Ak"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={API_KEY}"
OUT_DIR = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\14a9f0cc-685f-480e-9845-4b9ce9318bab"
URL = "https://scalesteady.pro"

# Apex-level critique prompt -- covers 2026 conversion design principles
CRITIQUE_PROMPT = """
You are a senior-level conversion rate optimization expert, visual design director, and direct-response copywriting strategist operating at the absolute top of your field in 2026.

You have deep expertise in:
- The specific visual and psychological principles used by the highest-converting B2B SaaS and service websites in 2026 (Linear, Vercel, Loom, Stripe, Superhuman, Figma, Notion, Clay, Apollo, Instantly)
- Direct-response copywriting: pattern interrupts, specificity, social proof laddering, NLP anchoring, loss aversion framing, certainty stacking
- Visual hierarchy: F-pattern and Z-pattern eye tracking, whitespace as a premium signal, contrast ratios, typographic emphasis
- Hero section optimization: above-the-fold message match, value prop clarity, CTA placement, friction reduction
- Offer architecture: how offers are framed, sequenced, and made irresistible without discount
- Grayscale/monochrome design systems: how to communicate premium status without color
- Font psychology: weight contrast, size hierarchy, the specific emotional register of DM Sans at various weights
- B2B cold outreach agency positioning: what objections exist, what social proof converts, what copy kills trust

You are looking at MULTIPLE screenshots of scalesteady.pro -- a B2B cold outbound agency website that recently underwent a grayscale redesign.

The site serves business owners who received a cold email and are now evaluating whether to trust ScaleSteady with their outbound infrastructure. These visitors are:
- Skeptical (they know agencies overpromise)
- Busy (they give 8 seconds before leaving)
- Sophisticated (they can detect generic copy instantly)
- Motivated (something in the email resonated or they wouldn't be here)

The unique offer: ScaleSteady builds the cold email system at cost ($500 infrastructure pass-through, zero markup), works for FREE until the client generates $5,000 in new revenue, then offers Scale ($699/mo) or Walk (keep everything, owe nothing). This is genuinely unusual and powerful -- the site must make this land immediately.

YOUR TASK -- provide a ruthlessly honest, apex-level critique structured EXACTLY as follows:

## FIRST IMPRESSION AUDIT (0-3 seconds)
Score the above-the-fold impact 1-10. What does the visitor's eye land on first? Is the value prop immediately clear? Does the headline earn attention or lose it?

## HEADLINE & COPY ANALYSIS
Score each major copy block 1-10. "If you're here, the email worked." -- does this land? Is the preamble paragraph in the offer section punchy enough? What specific words are killing momentum?

## VISUAL HIERARCHY CRITIQUE
Score 1-10. Is whitespace being used as a luxury signal? Is font weight contrast creating hierarchy? What visual elements are fighting for attention instead of guiding the eye?

## TRUST SIGNAL AUDIT
Score 1-10. What trust signals are present? What's missing that a cold traffic visitor would need to convert? Where does doubt creep in?

## OFFER SECTION EFFECTIVENESS
Score 1-10. Does the "How We Align Our Interests" section make the $0 agency fee model feel believable and safe? Or does it feel like a trick?

## CONVERSION FRICTION POINTS
List every specific moment where a visitor would hesitate, doubt, or leave. Be brutal.

## GRAYSCALE DESIGN CRITIQUE
Score 1-10. Is the monochrome palette reading as "premium and intentional" or "unfinished and boring"? What's missing?

## 10 SPECIFIC HIGH-IMPACT IMPROVEMENTS
Numbered list. Each must be actionable, specific, and ranked by expected conversion impact. No generic advice. Reference specific elements visible in the screenshots.

## FINAL SCORE & ONE SENTENCE VERDICT
Overall 1-10. One sentence that captures the site's current conversion potential.
"""

async def capture_screenshots():
    screenshots = []
    async with async_playwright() as p:
        # Desktop 1440px
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        print("Loading scalesteady.pro (desktop 1440)...")
        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        # Above the fold
        path = os.path.join(OUT_DIR, "audit_hero_desktop.png")
        await page.screenshot(path=path)
        screenshots.append(("Hero - Desktop 1440px", path))
        print(f"Captured: {path}")
        
        # Offer section
        await page.evaluate("window.scrollBy(0, window.innerHeight * 3)")
        await page.wait_for_timeout(1200)
        path = os.path.join(OUT_DIR, "audit_offer_desktop.png")
        await page.screenshot(path=path)
        screenshots.append(("Offer Section - Desktop", path))
        print(f"Captured: {path}")

        # Results + lower sections
        await page.evaluate("window.scrollBy(0, window.innerHeight * 3)")
        await page.wait_for_timeout(1000)
        path = os.path.join(OUT_DIR, "audit_lower_desktop.png")
        await page.screenshot(path=path)
        screenshots.append(("Lower Sections - Desktop", path))
        print(f"Captured: {path}")

        # Full page
        path = os.path.join(OUT_DIR, "audit_full_desktop.png")
        await page.screenshot(path=path, full_page=True)
        screenshots.append(("Full Page - Desktop", path))
        print(f"Captured: {path}")
        
        await browser.close()

        # Mobile 390px (iPhone 14 Pro)
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 390, "height": 844})
        print("Loading scalesteady.pro (mobile 390)...")
        await page.goto(URL, wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        path = os.path.join(OUT_DIR, "audit_hero_mobile.png")
        await page.screenshot(path=path)
        screenshots.append(("Hero - Mobile 390px", path))
        print(f"Captured: {path}")
        
        path = os.path.join(OUT_DIR, "audit_full_mobile.png")
        await page.screenshot(path=path, full_page=True)
        screenshots.append(("Full Page - Mobile", path))
        print(f"Captured: {path}")
        
        await browser.close()
    
    return screenshots

def encode_image(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def call_gemini(screenshots):
    import httpx

    parts = []
    for label, path in screenshots:
        parts.append({"text": f"--- SCREENSHOT: {label} ---"})
        parts.append({
            "inline_data": {
                "mime_type": "image/png",
                "data": encode_image(path)
            }
        })
    parts.append({"text": CRITIQUE_PROMPT})

    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": 1.0,
            "maxOutputTokens": 16384,
            "thinkingConfig": {"thinkingBudget": 16384}
        }
    }

    print("Calling Gemini 3.5 Flash (high reasoning)...")
    with httpx.Client(timeout=180) as client:
        resp = client.post(ENDPOINT, json=payload)

    if resp.status_code != 200:
        print(f"API Error {resp.status_code}: {resp.text[:500]}")
        raise SystemExit(1)

    result = resp.json()
    candidates = result.get("candidates", [])
    output_text = ""
    if candidates:
        for part in candidates[0].get("content", {}).get("parts", []):
            if "text" in part:
                output_text += part["text"]
    else:
        output_text = "No response.\n" + str(result)

    return output_text

async def main():
    print("=== ScaleSteady.pro Full Visual Audit ===")
    screenshots = await capture_screenshots()
    print(f"\nCaptured {len(screenshots)} screenshots. Submitting to Gemini 3.5 Flash...")
    critique = call_gemini(screenshots)
    
    # Save report
    report_path = os.path.join(OUT_DIR, "site_audit_report.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("# ScaleSteady.pro -- Apex Visual Audit\n\n")
        f.write(critique)
    
    print(f"\n=== AUDIT COMPLETE ===")
    print(f"Report saved to: {report_path}")
    print("\n" + "="*60)
    print(critique[:3000])  # Print first 3k chars to console

if __name__ == "__main__":
    asyncio.run(main())

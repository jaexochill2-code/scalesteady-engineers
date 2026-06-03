import asyncio
import os
import base64
import json
import httpx
import sys
from playwright.async_api import async_playwright

async def main():
    port = 3000
    cwd = r"C:\Users\Tax Filing\.gemini\antigravity\scratch\scalesteady-engineers"
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    os.makedirs(artifact_dir, exist_ok=True)

    # 1. Load VERCEL_TOKEN and GEMINI_API_KEY from mcp_config.json
    vault_path = r"C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"
    try:
        with open(vault_path, "r", encoding="utf-8") as f:
            vault_data = json.load(f)
            api_key = vault_data["_vault"]["GEMINI_API_KEY"]
    except Exception as e:
        print(f"Error loading API key from vault: {e}")
        sys.stdout.flush()
        return

    # 2. Capture fresh screenshots of the home page and /build page
    screenshots = {}
    print("Connecting to running dev server on port 3000 to capture screenshots...")
    sys.stdout.flush()

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_viewport_size({"width": 1440, "height": 900})

            # Home page top
            print("Capturing home page top...")
            await page.goto(f"http://localhost:{port}/", wait_until="networkidle", timeout=20000)
            await page.wait_for_timeout(2000)
            home_top_path = os.path.join(artifact_dir, "critique_home_top.png")
            await page.screenshot(path=home_top_path)
            screenshots["Home Page (Top)"] = home_top_path

            # Home page scrolled to services
            print("Capturing home page services...")
            services_selector = "#approach"
            if await page.query_selector(services_selector):
                await page.locator(services_selector).scroll_into_view_if_needed()
                await page.wait_for_timeout(1000)
            else:
                await page.evaluate("window.scrollTo(0, 1200)")
                await page.wait_for_timeout(1000)
            home_services_path = os.path.join(artifact_dir, "critique_home_services.png")
            await page.screenshot(path=home_services_path)
            screenshots["Home Page (Services)"] = home_services_path

            # Home page scrolled to pricing
            print("Capturing home page pricing...")
            pricing_selector = "#pricing"
            if await page.query_selector(pricing_selector):
                await page.locator(pricing_selector).scroll_into_view_if_needed()
                await page.wait_for_timeout(1000)
            else:
                await page.evaluate("window.scrollTo(0, 3200)")
                await page.wait_for_timeout(1000)
            home_pricing_path = os.path.join(artifact_dir, "critique_home_pricing.png")
            await page.screenshot(path=home_pricing_path)
            screenshots["Home Page (Pricing)"] = home_pricing_path

            # Build page top
            print("Capturing build page top...")
            await page.goto(f"http://localhost:{port}/build", wait_until="networkidle", timeout=20000)
            await page.wait_for_timeout(2000)
            build_top_path = os.path.join(artifact_dir, "critique_build_top.png")
            await page.screenshot(path=build_top_path)
            screenshots["Build Page (Top)"] = build_top_path

            # Build page timeline/offer
            print("Capturing build page offer...")
            await page.evaluate("window.scrollTo(0, 800)")
            await page.wait_for_timeout(1000)
            build_offer_path = os.path.join(artifact_dir, "critique_build_offer.png")
            await page.screenshot(path=build_offer_path)
            screenshots["Build Page (Offer)"] = build_offer_path

            await browser.close()
            print("All screenshots captured successfully.")
            sys.stdout.flush()
    except Exception as e:
        print(f"Error capturing screenshots: {e}")
        sys.stdout.flush()
        return

    # 3. Formulate the prestigious 2026 Visual Designer superprompt
    superprompt = """
You are the absolute leading Visual Design Director and Motion Architect for ultra-prestigious B2B, consumer tech, and luxury products in 2026 (drawing inspiration from Apple, Linear, Stripe, Vercel, Figma, and metal/glass minimalism).

You are reviewing screenshots of ScaleSteady (localhost:3000), a high-status Outbound Engineering agency.

The user's core brand constraint is to establish an "Apple-level aesthetic":
- A dominant color palette of White, Cream, Grayscale, and Black.
- Deep or vibrant blues MUST be used ONLY as background grids, section headers, or subtle context/accent containers to drive a point.
- Avoid flat gray backgrounds or elements as they look lifeless and cheap.
- Avoid dark-themed black backgrounds across entire pages (which feels gloomy, heavy, and screams "AI SaaS template"). Instead, use light backgrounds (White/Cream) with dark accents.
- Make extensive use of:
  - Bento grids and bento box layouts (rounded corners, subtle borders, background gradients).
  - Glassmorphism (acrylic blurs, thin semi-transparent white borders, subtle inner shadows, translucent backdrops).
  - Claymorphism / soft depths (soft multi-layered shadows, smooth volumetric borders).
  - Elegant typography, micro-animations, and interactive transition states.

Your task is to analyze these screenshots and provide:
1. A brief assessment of the current design's aesthetic status.
2. A numbered list of EXACTLY 20 concrete, high-impact visual, layout, and colorway improvements.
   - For each point, explain the visual rationale (e.g. why it creates premium status) and how to apply it.
   - Keep the existing text copy and page elements exactly the same (do not propose adding new text, links, sections, or CTAs). Focus 100% on styling, colors, gradients, layout, box designs, backgrounds, borders, shadows, and animations.

Structure your response as a publication-ready Markdown document.
"""

    # 4. Call Gemini 3.1 Flash Lite API
    parts = []
    for label, path in screenshots.items():
        with open(path, "rb") as img_f:
            img_data = base64.b64encode(img_f.read()).decode("utf-8")
        parts.append({"text": f"--- SCREENSHOT: {label} ---"})
        parts.append({
            "inline_data": {
                "mime_type": "image/png",
                "data": img_data
            }
        })
    parts.append({"text": superprompt})

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": 1.0,
            "maxOutputTokens": 8192
        }
    }

    print("Submitting screenshots to Gemini 3.1 Flash Lite...")
    sys.stdout.flush()

    try:
        async with httpx.AsyncClient(timeout=180.0) as client:
            resp = await client.post(endpoint, json=payload)
            if resp.status_code != 200:
                print(f"Gemini API Error {resp.status_code}: {resp.text}")
                sys.stdout.flush()
                return

            result = resp.json()
            candidates = result.get("candidates", [])
            output_text = ""
            if candidates:
                for part in candidates[0].get("content", {}).get("parts", []):
                    if "text" in part:
                        output_text += part["text"]
            else:
                output_text = "No candidate returned."

            critique_path = os.path.join(artifact_dir, "visual_design_critique.md")
            with open(critique_path, "w", encoding="utf-8") as out_f:
                out_f.write(output_text)

            print(f"Visual critique successfully generated and saved to: {critique_path}")
            sys.stdout.flush()

    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        sys.stdout.flush()

if __name__ == "__main__":
    asyncio.run(main())

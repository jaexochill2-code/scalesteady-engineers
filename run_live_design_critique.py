import asyncio
import os
import base64
import json
import httpx
import sys

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    vault_path = r"C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"
    
    try:
        with open(vault_path, "r", encoding="utf-8") as f:
            vault_data = json.load(f)
            api_key = vault_data["_vault"]["GEMINI_API_KEY"]
    except Exception as e:
        print(f"Error loading API key from vault: {e}")
        return

    # List of live screenshots we captured earlier
    screenshot_files = {
        "Home Page (Hero / Top)": os.path.join(artifact_dir, "live_home_top.png"),
        "Home Page (Pricing / Offer)": os.path.join(artifact_dir, "live_home_pricing.png"),
        "Build Page (Top / Navigation)": os.path.join(artifact_dir, "live_build_top.png"),
        "Build Page (Checkout Card & PayPal)": os.path.join(artifact_dir, "live_build_checkout.png"),
        "Build Page (Terms & Scrollable Footer)": os.path.join(artifact_dir, "live_build_footer.png")
    }

    parts = []
    for label, path in screenshot_files.items():
        if os.path.exists(path):
            with open(path, "rb") as img_f:
                img_data = base64.b64encode(img_f.read()).decode("utf-8")
            parts.append({"text": f"--- SCREENSHOT: {label} ---"})
            parts.append({
                "inline_data": {
                    "mime_type": "image/png",
                    "data": img_data
                }
            })
            print(f"Loaded: {label} ({path})")
        else:
            print(f"Warning: File not found: {path}")

    prompt = """
You are a Visual Design Director in 2026. Review these screenshots of the live production site https://scalesteady.pro.

Rate the site visually on a scale of 1-10 on three criteria:
1.) Energy (How dynamic, alive, and engaging the gradients, glows, and elements feel)
2.) Clarity (How clear the boundaries, sections, checkouts, and copy structure are)
3.) Styling, Aesthetic, Contrast (How premium, Apple-level, and polished the colors, borders, typography, and card designs look)

In your analysis, pay special attention to the recent improvements:
- The multi-shade blue variables and glowing background overlays on the home page.
- The compact PayPal checkout widget (standard buttons without redundant pre-rendered descriptions) in high-contrast solid gold/blue brand colors.
- The persistent scrollable Terms of Service box, smooth scroll link, and fully visible footer at the bottom of the checkout page.
- The shaded and highlighted "Offer" card (ScaleSteady Deal) with its distinct sapphire border, light blue tint, and high contrast.

Format your response as a beautiful Markdown document. Start directly with the ratings and audit.
"""
    parts.append({"text": prompt})

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": 1.0,
            "maxOutputTokens": 4096
        }
    }

    print("Submitting live screenshots to Gemini 3.1 Flash Lite...")
    try:
        async with httpx.AsyncClient(timeout=180.0) as client:
            resp = await client.post(endpoint, json=payload)
            if resp.status_code != 200:
                print(f"Gemini API Error {resp.status_code}: {resp.text}")
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

            critique_path = os.path.join(artifact_dir, "live_visual_design_critique.md")
            with open(critique_path, "w", encoding="utf-8") as out_f:
                out_f.write(output_text)

            print(f"Live visual critique successfully saved to: {critique_path}")

    except Exception as e:
        print(f"Error calling Gemini API: {e}")

if __name__ == "__main__":
    asyncio.run(main())

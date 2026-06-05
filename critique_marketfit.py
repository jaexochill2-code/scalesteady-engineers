import asyncio
import os
import base64
import json
import httpx
import sys

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\cb8b7338-d8c4-494e-a327-8964478d2e94"
    os.makedirs(artifact_dir, exist_ok=True)

    # 1. Load GEMINI_API_KEY from mcp_config.json
    vault_path = r"C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"
    try:
        with open(vault_path, "r", encoding="utf-8") as f:
            vault_data = json.load(f)
            api_key = vault_data["_vault"]["GEMINI_API_KEY"]
    except Exception as e:
        print(f"Error loading API key from vault: {e}")
        return

    # 2. Reference full page screenshot
    full_image_path = os.path.join(artifact_dir, "marketfit_full.png")
    if not os.path.exists(full_image_path):
        print(f"Error: Screenshot path not found: {full_image_path}")
        return

    # 3. Formulate the prestigious 2026 Visual Designer superprompt for the onboarding form
    superprompt = """
You are the absolute leading Visual Design Director and Motion Architect for ultra-prestigious B2B, consumer tech, and luxury products in 2026.
You are reviewing a full-page screenshot of the ScaleSteady Outbound Campaign Onboarding form at /marketfit-roofing.

The user's core brand identity is matched to scalesteady.pro:
- High-contrast premium dark theme: background linear-gradient(135deg, #071224 0%, #0C0D0E 60%, #161719 100%), with sapphire navy, sky blue, and cobalt accents.
- Modern typography, high readability, pristine contrast (WCAG-compliant), and micro-animations.
- Input boxes must look premium, sharp, and high-contrast (using 0px border-radius, clean thin borders, and solid cobalt or blue active glow states).
- No jargon, clear and punchy copy, highly targeted B2B commercial roofing questionnaire (TPO/EPDM, GAF Master Elite, property management targets, CRM integrations).

Analyze the provided full-page screenshot and perform a strict E2E visual and structural audit. Address:
1. Visual contrast & readability (ensure all labels and inputs have supreme contrast on the dark gradient).
2. Layout rhythm, vertical timeline rail connecting the step circles, and card container alignment (ensure consistent padding, spacing, and vertical alignment).
3. Copy excellence (no boilerplate, every question makes the prospect think and feel they are talking to commercial roofing experts).
4. Overall aesthetic prestige: does it feel like a $100K bespoke engineering setup form or a basic web form?

If there are any flaws, provide detailed recommendations. If the page is already 10/10, explain why.
Ensure your response uses clean, high-status, professional B2B engineering tone.
"""

    # 4. Call Gemini 3.5 Flash API (as VM-01)
    with open(full_image_path, "rb") as img_f:
        img_data = base64.b64encode(img_f.read()).decode("utf-8")
        
    parts = [
        {"text": "--- FULL PAGE SCREENSHOT ---"},
        {
            "inline_data": {
                "mime_type": "image/png",
                "data": img_data
            }
        },
        {"text": superprompt}
    ]

    model_name = "gemini-3.5-flash"
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "temperature": 1.0,
            "maxOutputTokens": 8192
        }
    }

    print(f"Submitting screenshot to {model_name}...")
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

            critique_path = os.path.join(artifact_dir, "marketfit_design_critique.md")
            with open(critique_path, "w", encoding="utf-8") as out_f:
                out_f.write(output_text)

            print(f"Visual critique successfully generated and saved to: {critique_path}")

    except Exception as e:
        print(f"Error calling Gemini API: {e}")

if __name__ == "__main__":
    asyncio.run(main())

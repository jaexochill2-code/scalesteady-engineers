import asyncio
import os
import base64
import json
import httpx
import sys

async def main():
    vault_path = r"C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\77b09d5c-219a-4058-8e55-9f42eff7e132"
    screenshot_path = os.path.join(artifact_dir, "marketfit_painmanagement.png")

    # 1. Load API Key
    try:
        with open(vault_path, "r", encoding="utf-8") as f:
            vault_data = json.load(f)
            api_key = vault_data["_vault"]["GEMINI_API_KEY"]
    except Exception as e:
        print(f"Error loading API key: {e}")
        return

    if not os.path.exists(screenshot_path):
        print(f"Screenshot not found at: {screenshot_path}")
        return

    # 2. Base64 Encode Screenshot
    with open(screenshot_path, "rb") as img_f:
        img_data = base64.b64encode(img_f.read()).decode("utf-8")

    # 3. Design prompt
    prompt = """
You are the world's leading visual designer and clinical branding architect.
Analyze the full-page screenshot of the onboarding form at /marketfit-painmanagement.

The form has been redesigned to use the "Clinical Sage Light Theme (Eucalyptus & Alabaster)" palette, which targets medical, chiropractic, and clinical bodywork practices (moving away from dark "SaaS den" aesthetics).

Perform a rigorous, objective visual and structural critique of the form. 
Provide:
1. A brief overview of the visual state (layout, typography, color harmony).
2. Exactly 5 concrete, detailed reasons why the current layout and UI details score a low rating (e.g. 2/10) from a world-class design perspective (focus on alignment, contrast, visual noise, margins/padding, component details, empty states, or spacing).
3. A detailed Design of Experiments (DOE) outlining variables we can modify to elevate this form to a 10/10 clinical sanctuary visual experience (including specific CSS values, sizing ratios, borders, custom checkmarks, input transitions, typography weights, and background accent treatments).

Present your output in a professional, publication-ready markdown format.
"""

    parts = [
        {"text": "Here is the full-page screenshot of the clinical onboarding form /marketfit-painmanagement:"},
        {
            "inline_data": {
                "mime_type": "image/png",
                "data": img_data
            }
        },
        {"text": prompt}
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

    print("Sending request to Gemini 3.5 Flash...")
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

            critique_file = os.path.join(artifact_dir, "marketfit_painmanagement_critique.md")
            with open(critique_file, "w", encoding="utf-8") as out_f:
                out_f.write(output_text)

            print(f"Successfully generated critique and saved to {critique_file}")
    except Exception as e:
        print(f"API Connection Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

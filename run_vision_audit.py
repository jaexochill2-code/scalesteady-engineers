import json
import google.generativeai as genai
import os

def run_audit():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\14a9f0cc-685f-480e-9845-4b9ce9318bab"
    
    # Load API Key
    with open(r'C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json', 'r') as f:
        config = json.load(f)
    api_key = config.get('_vault', {}).get('GEMINI_API_KEY')
    genai.configure(api_key=api_key)
    
    # Model
    model = genai.GenerativeModel('gemini-3.1-flash-lite')
    
    # ── HERO AUDIT ──
    hero_img_path = os.path.join(artifact_dir, "local_hero_audit.png")
    if os.path.exists(hero_img_path):
        print(f"Auditing Hero screenshot: {hero_img_path}")
        with open(hero_img_path, 'rb') as f:
            hero_data = f.read()
            
        hero_prompt = (
            "You are a senior UI/UX engineer doing a brutal production teardown. "
            "Analyze this hero section screenshot of our local site (http://localhost:3000) in detail. "
            "Report precisely on:\n"
            "1. Overall visual presentation: is it clean, professional, and agency-grade?\n"
            "2. Layout: is the 2-column grid balanced? Where is the text block and phone mockup positioned?\n"
            "3. The phone mockup: does it look correct? Is it clipped, cropped, pushed too high, or overlapping the header?\n"
            "4. Contrast, glows, colors: are they visually appealing and harmonious?\n"
            "Identify every styling bug and list concrete CSS rules to fix them."
        )
        
        response = model.generate_content([
            {'mime_type': 'image/png', 'data': hero_data},
            hero_prompt
        ])
        
        print("\n=== HERO SECTION AUDIT ===")
        print(response.text)
        print("=========================\n")
    else:
        print(f"Hero screenshot not found at {hero_img_path}")
        
    # ── OFFER AUDIT ──
    offer_img_path = os.path.join(artifact_dir, "local_offer_audit.png")
    if os.path.exists(offer_img_path):
        print(f"Auditing Offer screenshot: {offer_img_path}")
        with open(offer_img_path, 'rb') as f:
            offer_data = f.read()
            
        offer_prompt = (
            "You are a senior UI/UX engineer doing a brutal production teardown. "
            "Analyze this Offer ('How We Align Our Interests') section screenshot in detail. "
            "Report precisely on:\n"
            "1. Layout and alignment: is the section clean and easy to read? Does it feel premium?\n"
            "2. The text/copy presentation: how is the space and readability?\n"
            "3. The steps and cards: are they visually premium?\n"
            "Identify any visual defects, formatting issues, or alignment errors."
        )
        
        response = model.generate_content([
            {'mime_type': 'image/png', 'data': offer_data},
            offer_prompt
        ])
        
        print("\n=== OFFER SECTION AUDIT ===")
        print(response.text)
        print("==========================\n")
    else:
        print(f"Offer screenshot not found at {offer_img_path}")

if __name__ == "__main__":
    run_audit()

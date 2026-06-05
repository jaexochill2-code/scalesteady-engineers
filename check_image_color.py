import asyncio
import os
import base64
import json
import httpx

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\cb8b7338-d8c4-494e-a327-8964478d2e94"
    vault_path = r"C:\Users\Tax Filing\.gemini\antigravity\mcp_config.json"
    
    with open(vault_path, "r", encoding="utf-8") as f:
        vault_data = json.load(f)
        api_key = vault_data["_vault"]["GEMINI_API_KEY"]
        
    full_image_path = os.path.join(artifact_dir, "marketfit_full.png")
    if not os.path.exists(full_image_path):
        print("Error: marketfit_full.png not found")
        return
        
    with open(full_image_path, "rb") as img_f:
        img_data = base64.b64encode(img_f.read()).decode("utf-8")
        
    parts = [
        {
            "inline_data": {
                "mime_type": "image/png",
                "data": img_data
            }
        },
        {"text": "Look at the very bottom of this screenshot image. What color is it? Is there any solid white (#FFFFFF) block, footer, or background at the bottom? Yes or No, and describe what is visible at the very bottom."}
    ]
    
    model_name = "gemini-3.5-flash"
    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {"temperature": 0.0}
    }
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(endpoint, json=payload)
        result = resp.json()
        print(result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response"))

if __name__ == "__main__":
    asyncio.run(main())

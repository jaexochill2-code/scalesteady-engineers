import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\cb8b7338-d8c4-494e-a327-8964478d2e94"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        # Navigate to production URL
        print("Navigating to https://scalesteady.pro/marketfit-roofing...")
        await page.goto("https://scalesteady.pro/marketfit-roofing", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        
        # Capture full page screenshot to avoid scroll gaps
        full_img = os.path.join(artifact_dir, "marketfit_full.png")
        await page.screenshot(path=full_img, full_page=True)
        print(f"Captured full page: {full_img}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

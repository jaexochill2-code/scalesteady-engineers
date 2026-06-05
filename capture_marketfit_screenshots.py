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
        
        # Capture top section
        top_img = os.path.join(artifact_dir, "marketfit_top.png")
        await page.screenshot(path=top_img)
        print(f"Captured: {top_img}")
        
        # Scroll down and capture middle section
        await page.evaluate("window.scrollTo(0, 1000)")
        await page.wait_for_timeout(1000)
        mid_img = os.path.join(artifact_dir, "marketfit_middle.png")
        await page.screenshot(path=mid_img)
        print(f"Captured: {mid_img}")
        
        # Scroll down and capture bottom section
        await page.evaluate("window.scrollTo(0, 2000)")
        await page.wait_for_timeout(1000)
        bottom_img = os.path.join(artifact_dir, "marketfit_bottom.png")
        await page.screenshot(path=bottom_img)
        print(f"Captured: {bottom_img}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

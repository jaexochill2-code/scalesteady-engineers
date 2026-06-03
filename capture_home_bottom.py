import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    port = 3000
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        try:
            print("Navigating to homepage...")
            await page.goto(f"http://localhost:{port}/", wait_until="networkidle", timeout=15000)
            await page.wait_for_timeout(2000)
            
            # Scroll to the bottom
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(2000)
            
            await page.screenshot(path=os.path.join(artifact_dir, "audit_home_bottom.png"))
            print("Captured home bottom screenshot.")
        except Exception as e:
            print(f"Error: {e}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())

import asyncio
import os
import sys
from playwright.async_api import async_playwright

async def capture():
    port = 3000
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        # 1. Homepage
        try:
            print("Capturing homepage...")
            await page.goto(f"http://localhost:{port}/", wait_until="networkidle", timeout=15000)
            await page.wait_for_timeout(2000)
            
            await page.screenshot(path=os.path.join(artifact_dir, "audit_home_hero.png"))
            
            await page.evaluate("window.scrollTo(0, 1500)")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(artifact_dir, "audit_home_middle.png"))
            
            await page.evaluate("window.scrollTo(0, 3000)")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(artifact_dir, "audit_home_pricing.png"))
        except Exception as e:
            print(f"Error home: {e}")
            
        # 2. Checkout Page
        try:
            print("Capturing checkout page...")
            await page.goto(f"http://localhost:{port}/build", wait_until="networkidle", timeout=15000)
            await page.wait_for_timeout(2000)
            
            await page.screenshot(path=os.path.join(artifact_dir, "audit_build_top.png"))
            
            await page.evaluate("window.scrollTo(0, 1000)")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=os.path.join(artifact_dir, "audit_build_middle.png"))
        except Exception as e:
            print(f"Error build: {e}")
            
        await browser.close()
    print("Screenshots captured successfully.")

if __name__ == "__main__":
    asyncio.run(capture())

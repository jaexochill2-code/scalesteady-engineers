import asyncio
from playwright.async_api import async_playwright
import os

async def capture_screenshots():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\14a9f0cc-685f-480e-9845-4b9ce9318bab"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        # Go to local homepage
        print("Connecting to http://localhost:3000...")
        try:
            await page.goto("http://localhost:3000", wait_until="networkidle", timeout=10000)
            await page.wait_for_timeout(2000) # wait for animations to complete
            
            # Screenshot 1: Hero above the fold
            hero_path = os.path.join(artifact_dir, "local_hero_audit.png")
            await page.screenshot(path=hero_path)
            print(f"Hero screenshot captured: {hero_path}")
            
            # Screenshot 2: Scroll to offer section
            # Pricing/Offer section is usually id="pricing" or around y=3600
            pricing_selector = "#pricing"
            if await page.query_selector(pricing_selector):
                await page.locator(pricing_selector).scroll_into_view_if_needed()
                await page.wait_for_timeout(1000)
                offer_path = os.path.join(artifact_dir, "local_offer_audit.png")
                await page.screenshot(path=offer_path)
                print(f"Offer section screenshot captured: {offer_path}")
            else:
                # scroll down manually
                await page.evaluate("window.scrollTo(0, 3600)")
                await page.wait_for_timeout(1000)
                offer_path = os.path.join(artifact_dir, "local_offer_audit.png")
                await page.screenshot(path=offer_path)
                print(f"Offer section screenshot (manual scroll) captured: {offer_path}")
                
            # Screenshot 3: Full Page
            full_path = os.path.join(artifact_dir, "local_full_page.png")
            await page.screenshot(path=full_path, full_page=True)
            print(f"Full page screenshot captured: {full_path}")
            
        except Exception as e:
            print(f"Error capturing screenshots: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_screenshots())

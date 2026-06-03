import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        # Capture home page top
        print("Navigating to home page...")
        await page.goto("https://scalesteady.pro", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(2000)
        home_top = os.path.join(artifact_dir, "live_home_top.png")
        await page.screenshot(path=home_top)
        print(f"Captured: {home_top}")
        
        # Capture home page pricing
        pricing_selector = "#pricing"
        if await page.query_selector(pricing_selector):
            await page.locator(pricing_selector).scroll_into_view_if_needed()
            await page.wait_for_timeout(1000)
            home_pricing = os.path.join(artifact_dir, "live_home_pricing.png")
            await page.screenshot(path=home_pricing)
            print(f"Captured: {home_pricing}")
            
        # Capture build page top
        print("Navigating to build page...")
        await page.goto("https://scalesteady.pro/build", wait_until="networkidle", timeout=30000)
        await page.wait_for_timeout(3000)
        build_top = os.path.join(artifact_dir, "live_build_top.png")
        await page.screenshot(path=build_top)
        print(f"Captured: {build_top}")
        
        # Scroll to terms and checkout card on build page
        await page.evaluate("window.scrollTo(0, 400)")
        await page.wait_for_timeout(1000)
        build_checkout = os.path.join(artifact_dir, "live_build_checkout.png")
        await page.screenshot(path=build_checkout)
        print(f"Captured: {build_checkout}")
        
        # Capture build page full footer area
        await page.evaluate("window.scrollTo(0, 1500)")
        await page.wait_for_timeout(1000)
        build_footer = os.path.join(artifact_dir, "live_build_footer.png")
        await page.screenshot(path=build_footer)
        print(f"Captured: {build_footer}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

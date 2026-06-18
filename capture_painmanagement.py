import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\77b09d5c-219a-4058-8e55-9f42eff7e132"
    os.makedirs(artifact_dir, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})
        
        # Navigate to local dev URL
        print("Navigating to http://localhost:3000/marketfit-painmanagement...")
        await page.goto("http://localhost:3000/marketfit-painmanagement", wait_until="networkidle", timeout=30000)
        
        # Inject CSS to hide development overlays and speed insight badges
        await page.evaluate("""() => {
            const style = document.createElement('style');
            style.innerHTML = `
                #nextjs-portal, 
                .nextjs-portal, 
                #__next-prerender-indicator, 
                [data-nextjs-dialog-overlay],
                [id*="vercel-speed-insights"] { 
                    display: none !important; 
                }
            `;
            document.head.appendChild(style);
        }""")
        
        # Scroll to bottom and back to top to trigger IntersectionObserver animations
        print("Triggering scroll animations...")
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        await page.wait_for_timeout(1000)
        await page.evaluate("window.scrollTo(0, 0)")
        await page.wait_for_timeout(1500)
        
        # Capture full page screenshot to avoid scroll gaps
        full_img = os.path.join(artifact_dir, "marketfit_painmanagement.png")
        await page.screenshot(path=full_img, full_page=True)
        print(f"Captured full page: {full_img}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

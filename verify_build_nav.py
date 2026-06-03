import asyncio
import os
import httpx
import sys
from playwright.async_api import async_playwright

async def run_verification():
    port = 3000
    url = f"http://localhost:{port}/build"
    artifact_dir = r"C:\Users\Tax Filing\.gemini\antigravity-ide\brain\a55e687a-91fe-4fc0-8665-e6cdd080f7fd"
    os.makedirs(artifact_dir, exist_ok=True)

    print(f"Connecting to already running dev server on port {port}...")
    sys.stdout.flush()

    # Check if the server is responding
    try:
        resp = httpx.get(f"http://localhost:{port}/", timeout=5.0)
        print(f"Dev server responded with status: {resp.status_code}")
    except Exception as e:
        print(f"Error: Dev server on port {port} is not responding. {e}")
        sys.stdout.flush()
        return

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_viewport_size({"width": 1440, "height": 900})
            
            print(f"Navigating to {url}...")
            sys.stdout.flush()
            # Navigate to build checkout page
            await page.goto(url, wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(3000) # wait for compilation/styles
            
            # Screenshot 1: Top (Unscrolled)
            top_path = os.path.join(artifact_dir, "verify_build_nav_top.png")
            await page.screenshot(path=top_path)
            print(f"Captured top screenshot: {top_path}")
            sys.stdout.flush()
            
            # Scroll down
            await page.evaluate("window.scrollTo(0, 300)")
            await page.wait_for_timeout(1000)
            
            # Screenshot 2: Scrolled
            scrolled_path = os.path.join(artifact_dir, "verify_build_nav_scrolled.png")
            await page.screenshot(path=scrolled_path)
            print(f"Captured scrolled screenshot: {scrolled_path}")
            sys.stdout.flush()
            
            await browser.close()
            print("Screenshots captured successfully.")
    except Exception as e:
        print(f"An error occurred during Playwright run: {e}")
        sys.stdout.flush()
    print("Done.")
    sys.stdout.flush()

if __name__ == "__main__":
    asyncio.run(run_verification())

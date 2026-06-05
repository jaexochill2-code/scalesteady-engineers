import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://scalesteady.pro/marketfit-roofing", wait_until="networkidle")
        
        # Check title
        title = await page.title()
        print(f"Page Title: {title}")
        
        # Check rendered labels
        labels = await page.locator(".fl").all_inner_texts()
        print(f"Rendered Labels Count: {len(labels)}")
        for idx, label in enumerate(labels):
            print(f"Label {idx+1}: {label}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

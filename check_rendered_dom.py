import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://scalesteady.pro/marketfit-roofing", wait_until="networkidle")
        
        # Check all tags
        tags = await page.locator(".sec-tag").all_inner_texts()
        print("Section Tags:")
        for idx, tag in enumerate(tags):
            print(f"Tag {idx+1}: {tag}")
            
        # Check all headings
        headings = await page.locator(".sec-heading").all_inner_texts()
        print("\nSection Headings:")
        for idx, heading in enumerate(headings):
            print(f"Heading {idx+1}: {heading}")
            
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

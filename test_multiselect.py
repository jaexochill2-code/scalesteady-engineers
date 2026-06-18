import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        
        # Listen to console errors
        page.on("pageerror", lambda err: print(f"Page Error: {err.message}"))
        page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
        
        print("Navigating to page...")
        await page.goto("http://localhost:3000/marketfit-painmanagement", wait_until="networkidle")
        
        print("Initial state of Q4 buttons:")
        q4_buttons = await page.query_selector_all("text=Select B2B target channels >> xpath=.. >> .icp-card-btn")
        for i, btn in enumerate(q4_buttons):
            sel = await btn.get_attribute("data-selected")
            text = await btn.inner_text()
            print(f"  Q4 Button {i}: {text.strip().replace(chr(10), ' ')} | data-selected={sel}")
            
        print("Initial state of Q5 buttons:")
        q5_buttons = await page.query_selector_all("text=Clinical target segments & patient demographics >> xpath=.. >> .icp-card-btn")
        for i, btn in enumerate(q5_buttons):
            sel = await btn.get_attribute("data-selected")
            text = await btn.inner_text()
            print(f"  Q5 Button {i}: {text.strip().replace(chr(10), ' ')} | data-selected={sel}")

        if q4_buttons:
            print("Clicking Q4 Button 0...")
            await q4_buttons[0].click()
            await page.wait_for_timeout(500)
            sel = await q4_buttons[0].get_attribute("data-selected")
            print(f"After click: Q4 Button 0 data-selected={sel}")
            
        if q5_buttons:
            print("Clicking Q5 Button 0...")
            await q5_buttons[0].click()
            await page.wait_for_timeout(500)
            sel = await q5_buttons[0].get_attribute("data-selected")
            print(f"After click: Q5 Button 0 data-selected={sel}")

        # Let's save a screenshot to check visual representation
        await page.screenshot(path="test_click_result.png")
        print("Saved screenshot to test_click_result.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())

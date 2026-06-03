import asyncio
import os
import sys
from playwright.async_api import async_playwright

async def run_e2e():
    port = 3000
    base_url = f"http://localhost:{port}"
    print(f"Starting E2E verification against {base_url}...")
    sys.stdout.flush()

    async with async_playwright() as p:
        # Launch headless browser
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # ----------------------------------------------------
        # 1. Desktop Tests
        # ----------------------------------------------------
        print("TEST: Desktop navigation layout...")
        await page.set_viewport_size({"width": 1440, "height": 900})
        await page.goto(base_url, wait_until="networkidle", timeout=30000)
        
        # Verify "Build" link exists on homepage
        build_link = page.locator("header nav a:has-text('Build')")
        if await build_link.count() == 0:
            print("[FAIL] 'Build' link not found on desktop homepage nav bar.")
            sys.exit(1)
        print("[PASS] 'Build' link found on desktop homepage nav bar.")

        # Click the "Build" link and check page transition
        await build_link.click()
        await page.wait_for_timeout(2000)
        
        if page.url != f"{base_url}/build":
            print(f"[FAIL] Expected URL to be {base_url}/build, got {page.url}")
            sys.exit(1)
        print("[PASS] Successfully navigated to /build via nav link.")

        # Verify nav links exist on build page
        how_work_link = page.locator("header nav a:has-text('How We Work')")
        if await how_work_link.count() == 0:
            print("[FAIL] 'How We Work' link not found on /build page nav bar.")
            sys.exit(1)
        print("[PASS] Navigation links visible on /build page.")

        # Verify CTA on build page is the phone number (desktop only, inside .hidden.md:flex container)
        phone_cta = page.locator("header .hidden.md\\:flex a:has-text('224.487.7847')")
        if await phone_cta.count() == 0 or not await phone_cta.is_visible():
            print("[FAIL] Phone number CTA not visible on desktop /build page.")
            sys.exit(1)
        print("[PASS] Phone number CTA visible on desktop /build page.")

        # Navigate back to homepage using "How We Work" link
        await how_work_link.click()
        await page.wait_for_timeout(2000)
        if not page.url.endswith("/#approach"):
            print(f"[FAIL] Expected page to navigate back to /#approach, got {page.url}")
            sys.exit(1)
        print("[PASS] Successfully navigated back to home section from /build.")

        # Verify CTA on home page is "Book a call" (desktop only, inside .hidden.md:flex container)
        book_cta = page.locator("header .hidden.md\\:flex a:has-text('Book a call')")
        if await book_cta.count() == 0 or not await book_cta.is_visible():
            print("[FAIL] 'Book a call' CTA not visible on desktop homepage.")
            sys.exit(1)
        print("[PASS] 'Book a call' CTA visible on desktop homepage.")

        # ----------------------------------------------------
        # 2. Mobile Tests
        # ----------------------------------------------------
        print("\nTEST: Mobile hamburger menu & CTAs...")
        mobile_context = await browser.new_context(
            viewport={"width": 375, "height": 812},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        )
        mobile_page = await mobile_context.new_page()

        # Check mobile homepage hamburger and CTA
        await mobile_page.goto(base_url, wait_until="networkidle", timeout=30000)
        hamburger = mobile_page.locator("header button[aria-label='Toggle menu']")
        if await hamburger.count() == 0:
            print("[FAIL] Hamburger menu button not found on mobile homepage.")
            sys.exit(1)
        
        await hamburger.click()
        await mobile_page.wait_for_timeout(1000)
        
        # In mobile menu (div.md:hidden container), find "Build" link
        mobile_build_link = mobile_page.locator("header div.md\\:hidden a:has-text('Build')")
        if await mobile_build_link.count() == 0 or not await mobile_build_link.is_visible():
            print("[FAIL] 'Build' link not visible in mobile menu on homepage.")
            sys.exit(1)
        print("[PASS] Mobile menu displays 'Build' link on homepage.")

        mobile_book_cta = mobile_page.locator("header div.md\\:hidden a:has-text('Book a call')")
        if await mobile_book_cta.count() == 0 or not await mobile_book_cta.is_visible():
            print("[FAIL] 'Book a call' button not visible in mobile menu on homepage.")
            sys.exit(1)
        print("[PASS] 'Book a call' button visible in mobile menu on homepage.")

        # Check mobile build page hamburger and CTA
        await mobile_page.goto(f"{base_url}/build", wait_until="networkidle", timeout=30000)
        hamburger_build = mobile_page.locator("header button[aria-label='Toggle menu']")
        if await hamburger_build.count() == 0:
            print("[FAIL] Hamburger menu button not found on mobile /build page.")
            sys.exit(1)
        
        await hamburger_build.click()
        await mobile_page.wait_for_timeout(1000)

        mobile_how_work_link = mobile_page.locator("header div.md\\:hidden a:has-text('How We Work')")
        if await mobile_how_work_link.count() == 0 or not await mobile_how_work_link.is_visible():
            print("[FAIL] Navigation links not visible in mobile menu on /build page.")
            sys.exit(1)
        print("[PASS] Navigation links visible in mobile menu on /build page.")

        mobile_phone_cta = mobile_page.locator("header div.md\\:hidden a:has-text('Call 224.487.7847')")
        if await mobile_phone_cta.count() == 0 or not await mobile_phone_cta.is_visible():
            print("[FAIL] 'Call 224.487.7847' CTA not visible in mobile menu on /build page.")
            sys.exit(1)
        print("[PASS] 'Call 224.487.7847' CTA visible in mobile menu on /build page.")

        await browser.close()
        print("\nALL E2E NAVIGATION TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(run_e2e())

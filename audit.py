import asyncio
from playwright.async_api import async_playwright
import os

async def audit():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1440, "height": 900})

        # ── HOME PAGE full-page ──
        await page.goto("https://scalesteady-engineers.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(1500)
        await page.screenshot(path="audit_home_full.png", full_page=True)
        print("audit_home_full.png -- DONE")

        # ── HOME: viewport sections ──
        sections = [
            ("hero",      0),
            ("outbound",  900),
            ("how",       1800),
            ("results",   2700),
            ("pricing",   3600),
            ("team",      4500),
        ]
        for name, scroll_y in sections:
            await page.evaluate(f"window.scrollTo(0, {scroll_y})")
            await page.wait_for_timeout(400)
            await page.screenshot(path=f"audit_home_{name}.png")
            print(f"audit_home_{name}.png -- DONE")

        # ── CONTACT PAGE full-page ──
        await page.goto("https://scalesteady-engineers.vercel.app/contact", wait_until="networkidle")
        await page.wait_for_timeout(1500)
        await page.screenshot(path="audit_contact_full.png", full_page=True)
        print("audit_contact_full.png -- DONE")

        # Check font loaded on contact page
        fonts = await page.evaluate("""
            () => {
                const h1 = document.querySelector('h1');
                const body_el = document.querySelector('p');
                const computed_h1 = h1 ? window.getComputedStyle(h1).fontFamily : 'no h1';
                const computed_body = body_el ? window.getComputedStyle(body_el).fontFamily : 'no p';
                return { h1_font: computed_h1, body_font: computed_body };
            }
        """)
        print(f"Contact page fonts -> H1: {fonts['h1_font']} | Body: {fonts['body_font']}")

        # Check font on home page hero
        await page.goto("https://scalesteady-engineers.vercel.app", wait_until="networkidle")
        await page.wait_for_timeout(800)
        hero_fonts = await page.evaluate("""
            () => {
                const h1 = document.querySelector('h1');
                const body_el = document.querySelector('p');
                const computed_h1 = h1 ? window.getComputedStyle(h1).fontFamily : 'no h1';
                const computed_body = body_el ? window.getComputedStyle(body_el).fontFamily : 'no p';
                return { h1_font: computed_h1, body_font: computed_body };
            }
        """)
        print(f"Home page fonts -> H1: {hero_fonts['h1_font']} | Body: {hero_fonts['body_font']}")

        await browser.close()
        print("Audit complete.")

asyncio.run(audit())

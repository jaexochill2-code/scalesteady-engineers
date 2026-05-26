const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch();
  const results = { passed: [], failed: [], warnings: [] };
  
  // Routes to test
  const routes = ['/', '/contact', '/process', '/services', '/team', '/work'];
  const BASE = 'https://scalesteady-engineers.vercel.app';
  
  // Desktop viewport
  const desktopPage = await b.newPage();
  await desktopPage.setViewportSize({ width: 1440, height: 900 });
  
  // Mobile viewport
  const mobilePage = await b.newPage();
  await mobilePage.setViewportSize({ width: 393, height: 852 });

  // Collect console errors
  const consoleErrors = [];
  desktopPage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[desktop] ${msg.text()}`);
  });
  mobilePage.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(`[mobile] ${msg.text()}`);
  });

  // Track failed requests (404s, etc.)
  const failedRequests = [];
  desktopPage.on('requestfailed', req => {
    failedRequests.push(`[desktop] ${req.url()} - ${req.failure().errorText}`);
  });
  
  // 1. Route Screenshots + Response Codes
  console.log('=== PHASE 1: Route Loading ===');
  for (const route of routes) {
    const url = BASE + route;
    try {
      const resp = await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      const status = resp.status();
      await desktopPage.waitForTimeout(800);
      await desktopPage.screenshot({ path: `e2e_desktop${route.replace(/\//g, '_') || '_home'}.png` });
      
      const mResp = await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await mobilePage.waitForTimeout(800);
      await mobilePage.screenshot({ path: `e2e_mobile${route.replace(/\//g, '_') || '_home'}.png` });
      
      if (status === 200) {
        results.passed.push(`Route ${route}: HTTP ${status}`);
      } else {
        results.failed.push(`Route ${route}: HTTP ${status}`);
      }
    } catch (e) {
      results.failed.push(`Route ${route}: FAILED - ${e.message}`);
    }
  }
  
  // 2. Link & Button Audit on homepage
  console.log('=== PHASE 2: Link Audit ===');
  await desktopPage.goto(BASE, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);
  
  const links = await desktopPage.$$eval('a[href]', els => 
    els.map(el => ({ href: el.href, text: el.textContent.trim().substring(0, 50), target: el.target }))
  );
  
  console.log(`Found ${links.length} links on homepage`);
  
  for (const link of links) {
    if (link.href.includes('paypal.com')) {
      // Verify PayPal links are valid
      if (link.href.includes('paypal.com/ncp/payment/')) {
        results.passed.push(`PayPal link OK: ${link.text} -> ${link.href}`);
      } else {
        results.failed.push(`PayPal link MALFORMED: ${link.text} -> ${link.href}`);
      }
    } else if (link.href.startsWith(BASE) || link.href.startsWith('/')) {
      // Internal link - verify it resolves
      try {
        const r = await desktopPage.goto(link.href, { waitUntil: 'domcontentloaded', timeout: 10000 });
        if (r.status() === 200) {
          results.passed.push(`Internal link OK: ${link.text} -> ${link.href}`);
        } else {
          results.failed.push(`Internal link ${r.status()}: ${link.text} -> ${link.href}`);
        }
      } catch (e) {
        results.failed.push(`Internal link FAILED: ${link.text} -> ${link.href}`);
      }
    }
  }
  
  // 3. Meta/SEO check on all routes
  console.log('=== PHASE 3: SEO Audit ===');
  for (const route of routes) {
    await desktopPage.goto(BASE + route, { waitUntil: 'networkidle' });
    const title = await desktopPage.title();
    const desc = await desktopPage.$eval('meta[name="description"]', el => el.content).catch(() => 'MISSING');
    
    if (title && title.length > 5) {
      results.passed.push(`SEO ${route}: title="${title}"`);
    } else {
      results.failed.push(`SEO ${route}: title missing or too short`);
    }
    
    if (desc !== 'MISSING') {
      results.passed.push(`SEO ${route}: description present`);
    } else {
      results.warnings.push(`SEO ${route}: meta description missing`);
    }
  }
  
  // 4. Image loading check
  console.log('=== PHASE 4: Asset Loading ===');
  await desktopPage.goto(BASE, { waitUntil: 'networkidle' });
  const images = await desktopPage.$$eval('img', imgs => 
    imgs.map(img => ({ src: img.src, complete: img.complete, naturalWidth: img.naturalWidth }))
  );
  
  for (const img of images) {
    if (img.complete && img.naturalWidth > 0) {
      results.passed.push(`Image loaded: ${img.src.substring(img.src.lastIndexOf('/'))}`);
    } else {
      results.failed.push(`Image BROKEN: ${img.src}`);
    }
  }
  
  // 5. Font loading
  const fonts = await desktopPage.evaluate(() => {
    return document.fonts.ready.then(() => {
      const loaded = [];
      document.fonts.forEach(f => { if (f.status === 'loaded') loaded.push(f.family); });
      return [...new Set(loaded)];
    });
  });
  results.passed.push(`Fonts loaded: ${fonts.join(', ')}`);
  
  // 6. Contact page form check
  console.log('=== PHASE 5: Contact Form ===');
  await desktopPage.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  const formExists = await desktopPage.$('form, input, textarea').catch(() => null);
  if (formExists) {
    results.passed.push('Contact form elements found');
  } else {
    results.warnings.push('No form elements found on /contact');
  }
  
  // Print results
  console.log('\n========= E2E AUDIT RESULTS =========');
  console.log(`PASSED: ${results.passed.length}`);
  console.log(`FAILED: ${results.failed.length}`);
  console.log(`WARNINGS: ${results.warnings.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n--- FAILURES ---');
    results.failed.forEach(f => console.log('  FAIL: ' + f));
  }
  if (results.warnings.length > 0) {
    console.log('\n--- WARNINGS ---');
    results.warnings.forEach(w => console.log('  WARN: ' + w));
  }
  console.log('\n--- PASSED ---');
  results.passed.forEach(p => console.log('  OK: ' + p));
  
  if (consoleErrors.length > 0) {
    console.log('\n--- CONSOLE ERRORS ---');
    consoleErrors.forEach(e => console.log('  ' + e));
  }
  if (failedRequests.length > 0) {
    console.log('\n--- FAILED REQUESTS ---');
    failedRequests.forEach(r => console.log('  ' + r));
  }
  
  console.log('\n--- SUMMARY ---');
  console.log(`Total checks: ${results.passed.length + results.failed.length + results.warnings.length}`);
  console.log(`Pass rate: ${Math.round(results.passed.length / (results.passed.length + results.failed.length) * 100)}%`);
  console.log(results.failed.length === 0 ? 'STATUS: ALL CLEAR - READY FOR MIGRATION' : 'STATUS: FAILURES DETECTED - FIX BEFORE MIGRATION');
  
  await b.close();
})();

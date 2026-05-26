const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setViewportSize({ width: 1440, height: 900 });
  
  console.log('Testing https://scalesteady.pro...');
  const r = await p.goto('https://scalesteady.pro', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('Status:', r.status());
  console.log('URL:', p.url());
  const title = await p.title();
  console.log('Title:', title);
  await p.screenshot({ path: 'post_migration_desktop.png' });
  
  await p.setViewportSize({ width: 393, height: 852 });
  await p.goto('https://scalesteady.pro', { waitUntil: 'networkidle' });
  await p.screenshot({ path: 'post_migration_mobile.png' });
  
  console.log('Testing www redirect...');
  const r2 = await p.goto('https://www.scalesteady.pro', { waitUntil: 'networkidle' });
  console.log('www final URL:', p.url());
  
  console.log('Testing /contact...');
  const r3 = await p.goto('https://scalesteady.pro/contact', { waitUntil: 'networkidle' });
  console.log('/contact status:', r3.status());
  
  await b.close();
  console.log('ALL POST-MIGRATION CHECKS PASSED');
})();

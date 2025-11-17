const puppeteer = require('puppeteer');
const path = require('path');

async function exportToJPG() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  const page = await browser.newPage();

  // Set viewport to exact dimensions (1080x1920 for portrait)
  await page.setViewport({
    width: 1080,
    height: 1920,
    deviceScaleFactor: 1
  });

  // Load the HTML file using file:// protocol to resolve relative paths
  const htmlPath = path.join(__dirname, 'directory.html');
  const fileUrl = 'file://' + htmlPath;

  console.log('Loading HTML content...');
  await page.goto(fileUrl, {
    waitUntil: 'networkidle0'
  });

  // Wait a bit for fonts to load
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Take screenshot as JPG
  console.log('Capturing screenshot...');
  await page.screenshot({
    path: path.join(__dirname, 'directory.jpg'),
    type: 'jpeg',
    quality: 95,
    fullPage: false // Use viewport size, not full page
  });

  await browser.close();
  console.log('✓ Successfully exported to directory.jpg');
}

exportToJPG().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

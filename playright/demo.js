// playwright.js
const { webkit } = require('playwright');
const { expect } = require('@playwright/test');


(async function () {
  clipboard = await (await import('clipboardy')).default;
  console.log("clipboard: ", clipboard);
})();

// Set the env variable.

process.env.DEBUG = 'pw:api,pw:browser*';
exports.playwright = async function playwright() {
  const browser = await webkit.launch({headless: false});
  //const context = await browser.newContext();

  const context = await browser.newContext({ ignoreHTTPSErrors: true });

  const page = await context.newPage();

  
  const baseUrl = "https://dashboard.kyc.idfystaging.com/?client_id=QA-vkyc-testing_72c53aa1642b";

  await page.goto(baseUrl);
  await page.fill('#username', `hritika.narvekar@idfy.com`);
  await page.fill('#password',`Hritika@123`);

  await page.click('#kc-login');

  // await page.waitForTimeout(5000);

  await page.locator("div.alert-error").not.toBeVisible();

  await page.locator(':nth-child(1) > :nth-child(8) > .jss31 > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root');
  
  await page.click(':nth-child(1) > :nth-child(8) > .jss31 > :nth-child(1) > .MuiIconButton-label > .MuiSvgIcon-root');

  const snackbar = await page.locator("#client-snackbar");
  await expect(snackbar).toBeVisible();  //cy.get('#client-snackbar').should('be.visible');

  url = await clipboard.read();
  console.log("========================");
  console.log('From clipboard URL: ' + url);

  await browser.close();
  return url;
}
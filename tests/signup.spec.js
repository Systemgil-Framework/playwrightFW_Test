import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import SignupPage from '../pages/SignupPage.js';
import DocReporter from '../utils/DocReporter.js';

// Load normalized Excel data
const tempTestData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'tempTestData.json'), 'utf-8')
);

test.describe('Signup users with full step report', () => {
  tempTestData.forEach((user, index) => {
    test(`Signup test for user #${index + 1}`, async ({ page }) => {
      const reporter = new DocReporter();
      const signupPage = new SignupPage(page);

      // Step 1: Go to login page
      await signupPage.goto();
      await reporter.addInitialScreenshot(page, 'Login Page Loaded');

      // Step 2: Fill Name and Email
      await signupPage.nameInput.fill(String(user.name));
      await reporter.addStep(page, `Filled Name: ${user.name}`);

      await signupPage.emailInput.fill(String(user.email));
      await reporter.addStep(page, `Filled Email: ${user.email}`);

      // Step 3: Click Signup button and wait for next page
      await Promise.all([
        signupPage.signupButton.click(),
        page.waitForFunction(() => document.title.includes("Signup"), { timeout: 7000 }),
      ]);
      await reporter.addStep(page, 'Clicked Signup button');

      // Step 4: Fill password and DOB
      await signupPage.passwordInput.fill(String(user.password));
      await reporter.addStep(page, `Filled Password`);

      await signupPage.daySelect.selectOption(String(user.day));
      await signupPage.monthSelect.selectOption(String(user.month));
      await signupPage.yearSelect.selectOption(String(user.year));
      await reporter.addStep(page, `Selected DOB: ${user.day}-${user.month}-${user.year}`);

      // Step 5: Check newsletter and offers
      await signupPage.newsletterCheckbox.check();
      await signupPage.offersCheckbox.check();
      await reporter.addStep(page, 'Checked Newsletter and Offers');

      // Step 6: Fill personal and address info
      await signupPage.firstNameInput.fill(String(user.firstName));
      await reporter.addStep(page, `Filled First Name: ${user.firstName}`);

      await signupPage.lastNameInput.fill(String(user.lastName));
      await reporter.addStep(page, `Filled Last Name: ${user.lastName}`);

      await signupPage.companyInput.fill(String(user.company));
      await reporter.addStep(page, `Filled Company: ${user.company}`);

      await signupPage.addressInput.fill(String(user.address));
      await reporter.addStep(page, `Filled Address: ${user.address}`);

      await signupPage.countrySelect.selectOption(String(user.country));
      await reporter.addStep(page, `Selected Country: ${user.country}`);

      await signupPage.stateInput.fill(String(user.state));
      await reporter.addStep(page, `Filled State: ${user.state}`);

      await signupPage.cityInput.fill(String(user.city));
      await reporter.addStep(page, `Filled City: ${user.city}`);

      await signupPage.zipcodeInput.fill(String(user.zipcode));
      await reporter.addStep(page, `Filled Zipcode: ${user.zipcode}`);

      await signupPage.mobileInput.fill(String(user.mobile));
      await reporter.addStep(page, `Filled Mobile: ${user.mobile}`);

      // Step 7: Click Create Account
      await signupPage.createAccountButton.click();
      await reporter.addStep(page, 'Clicked Create Account');

      // Step 8: Optional: wait for confirmation page
      await page.waitForSelector('text=Congratulations! Your new');
      await reporter.addStep(page, 'Signup successful, confirmation displayed');

      // Save report
      await reporter.saveReport();
    });
  });
});

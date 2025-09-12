// pages/SignupPage.js
const { expect } = require('@playwright/test');
class SignupPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.daySelect = page.locator('#days');
    this.monthSelect = page.locator('#months');
    this.yearSelect = page.locator('#years');
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.countrySelect = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async signup(user) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
     // 🚀 Click submit and wait for the new page title
    await Promise.all([
      this.signupButton.click(),
      this.page.waitForFunction(() => document.title === "Automation Exercise - Signup", { timeout: 7000 }),
    ]);
        // Assert correct title
        await expect(this.page).toHaveTitle(/Automation Exercise - Signup/, { timeout: 8000 });

        // Assert password field is visible
        await expect(this.passwordInput).toBeVisible({ timeout: 8000 });
    await this.passwordInput.fill(String(user.password));
    await this.daySelect.selectOption(String(user.day));
    await this.monthSelect.selectOption(String(user.month));
    await this.yearSelect.selectOption(String(user.year));
    await this.newsletterCheckbox.check();
    await this.offersCheckbox.check();
    await this.firstNameInput.fill(String(user.firstName));
    await this.lastNameInput.fill(String(user.lastName));
    await this.companyInput.fill(String(user.company));
    await this.addressInput.fill(String(user.address));
    await this.countrySelect.selectOption(String(user.country));
    await this.stateInput.fill(String(user.state));
    await this.cityInput.fill(String(user.city));
    await this.zipcodeInput.fill(String(user.zipcode));
    await this.mobileInput.fill(String(user.mobile));
    await this.createAccountButton.click();
  }
}

module.exports = SignupPage;

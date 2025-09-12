# Playwright Signup Tests

Automated tests using [Playwright](https://playwright.dev/) for the **Automation Exercise** website.  

## Features

- Data-driven tests using **Excel** (`.xlsx`) files.
- Page Object Model (POM) structure for clean, maintainable code.
- Generates **Word reports** with step descriptions and screenshots using `DocReporter`.
- Supports multiple users in one test run.
- Screenshots captured for every step for detailed reporting.

## Project Structure
playwrightProject/
├─ pages/ # Page Object Models
├─ tests/ # Playwright test files
├─ utils/ # Helper utilities (ExcelUtils, DocReporter, global setup)
├─ testData/ # Excel input files
├─ reports/ # Generated Word reports
├─ package.json
├─ playwright.config.js
## How to Run

1. Install dependencies:


npm install
Prepare test data (testData/data.xlsx).

Run global setup:
node utils/global-setup.js

Run Playwright tests:
npx playwright test --headed --reporter=html
Check the Word report in reports/.

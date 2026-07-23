# Enterprise Cypress E2E Automation Framework POC

A production-grade, enterprise-scale End-to-End (E2E) automation testing framework built with **Cypress 15**, **TypeScript 6**, **Page Object Model (POM)** design pattern, **Allure Reporting**, **BrowserStack Cloud Integration**, **Faker.js Test Data Generation**, and **GitHub Actions CI/CD Pipeline**.

---

## 🛠️ Technology Stack & Key Dependencies

- **Core Engine**: Cypress v15.16.0
- **Language**: TypeScript v6.0.3 (Strict Mode)
- **Architecture**: Page Object Model (POM) with `BasePage` inheritance
- **Reporting**: Allure Cypress v3.9.0
- **Cloud Execution**: BrowserStack Cypress CLI v1.31.5
- **Data Generation**: @faker-js/faker v10.5.0
- **Binary Data Parsing**: `xlsx` (Excel `.xlsm`), `pdf-parse` (PDF content), `pngjs` (Pixel visual diff)
- **QR Code Engine**: `jsqr`
- **CI/CD Pipeline**: GitHub Actions

---

## 📁 Repository Architecture & Project Structure

```
Cypress-POC-New/
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md      # PR review checklist template
│   └── workflows/
│       └── main.yml                  # GitHub Actions CI pipeline
├── cypress/
│   ├── e2e/
│   │   ├── pages/                    # Page Object Model (POM) classes
│   │   │   ├── BasePage.ts           # Core BasePage wrapper
│   │   │   ├── ActionsPage.ts        # Drag & drop, double click, hover
│   │   │   ├── AlertPage.ts          # Window alerts, prompts, confirms
│   │   │   ├── ApiPage.ts            # cy.request backend API wrapper
│   │   │   ├── ContactUsPage.ts      # Contact Us form page object
│   │   │   ├── CookiesPage.ts        # Cookie storage management
│   │   │   ├── FlipkartPage.ts       # Flipkart real site search page
│   │   │   ├── QrCodePage.ts         # QR Code image decoding page
│   │   │   ├── WindowPage.ts         # Multi-window & target=_blank handler
│   │   │   ├── VisualPage.ts         # Baseline image comparison page
│   │   │   ├── SeedingPage.ts        # Database state seeding page
│   │   │   └── BrowserStackPage.ts   # BrowserStack cloud session reporter
│   │   └── specs/                    # 40 E2E Spec Files (kebab-case.cy.ts)
│   │       ├── actions.cy.ts
│   │       ├── alerts.cy.ts
│   │       ├── api-intercepting.cy.ts
│   │       ├── api-testing.cy.ts
│   │       ├── baseline-image-verification.cy.ts
│   │       ├── browserstack-integration.cy.ts
│   │       ├── checkboxes.cy.ts
│   │       ├── contact-us-form.cy.ts
│   │       ├── cookies.cy.ts
│   │       ├── credentials-encryption.cy.ts
│   │       ├── cross-origin-testing.cy.ts
│   │       ├── custom-commands-demo.cy.ts
│   │       ├── custom-slider-drag.cy.ts
│   │       ├── data-tables.cy.ts
│   │       ├── download-file.cy.ts
│   │       ├── dropdowns.cy.ts
│   │       ├── dynamic-dropdown.cy.ts
│   │       ├── environment-config.cy.ts
│   │       ├── faker-api-data-generation.cy.ts
│   │       ├── file-upload.cy.ts
│   │       ├── flipkart-mobile-search.cy.ts
│   │       ├── gmail-auth-verification.cy.ts
│   │       ├── iframe.cy.ts
│   │       ├── keyboard-events.cy.ts
│   │       ├── login.cy.ts
│   │       ├── multi-window-handling.cy.ts
│   │       ├── navigation.cy.ts
│   │       ├── otp-verification.cy.ts
│   │       ├── qr-code-verification.cy.ts
│   │       ├── radio-buttons.cy.ts
│   │       ├── read-csv.cy.ts
│   │       ├── read-pdf.cy.ts
│   │       ├── read-xlsm.cy.ts
│   │       ├── screenshot-video.cy.ts
│   │       ├── session-local-storage.cy.ts
│   │       ├── slider-range.cy.ts
│   │       ├── slow-down-execution.cy.ts
│   │       ├── tagged-test-suite.cy.ts
│   │       └── test-data-seeding.cy.ts
│   ├── fixtures/                     # Test data & binary fixtures
│   │   ├── testData.json             # Centralized JSON test data
│   │   ├── mockApiData.json          # Mock API payload responses
│   │   ├── encryptedCredentials.json # AES encrypted payloads
│   │   ├── sampleData.csv            # CSV fixture
│   │   ├── sampleData.xlsm           # Excel fixture
│   │   └── sampleDocument.pdf        # PDF document fixture
│   └── support/
│       ├── commands.ts               # Custom Cypress commands
│       ├── e2e.ts                    # Global hooks & tag filter hook
│       ├── constants/                # Strongly-typed constants & URLs
│       │   ├── urls.ts
│       │   ├── testData.ts
│       │   └── index.ts
│       └── utils/                    # Helper utilities
│           ├── EnvConfigUtils.ts     # Multi-environment switcher
│           ├── FakerUtils.ts         # Faker data generator
│           ├── TagUtils.ts           # Tag-based filtering utility
│           └── CryptoUtils.ts        # Client-side decryption helper
├── browserstack.json                 # BrowserStack cross-browser cloud config
├── cypress.config.ts                 # Cypress configuration & Node tasks
├── package.json                      # Dependency & script definitions
└── tsconfig.json                     # TypeScript strict compiler options
```

---

## ⚡ Prerequisites & Setup Guide

### 1. Requirements
- **Node.js**: `v18.0.0` or `v20.0.0+`
- **npm**: `v9.0.0+`

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone <repository-url>
cd Cypress-POC-New
npm install
```

---

## 🚀 Execution Commands Cookbook

### 1. TypeScript Strict Verification
Run TypeScript type-check before raising PRs:
```bash
npm run typecheck
```

### 2. Standard Cypress Execution
```bash
# Open Cypress Interactive Test Runner GUI
npm run cy:open

# Run all E2E specs headlessly with Allure reporting
npm run cy:run
```

### 3. Tag-Based Test Suite Execution
Filter test execution dynamically using enterprise tags (`@smoke`, `@regression`, `@sanity`):
```bash
# Run Smoke Test Suite
npm run cy:run:smoke

# Run Regression Test Suite
npm run cy:run:regression
```

### 4. Cross-Browser Target Runs
```bash
# Run specs in Google Chrome
npm run cy:run:chrome

# Run specs in Mozilla Firefox
npm run cy:run:firefox
```

### 5. BrowserStack Cloud Execution
Execute specs across cloud browser matrices defined in `browserstack.json`:
```bash
# Configure auth credentials
export BROWSERSTACK_USERNAME="your_username"
export BROWSERSTACK_ACCESS_KEY="your_access_key"

# Run specs on BrowserStack Cloud
npm run browserstack:run
```

### 6. Allure Reporting Commands
```bash
# Clear previous Allure results
npm run allure:clear

# Generate Allure HTML Report
npm run allure:generate

# Open Allure Report in browser
npm run allure:open
```

---

## 🌟 Key Enterprise Framework Capabilities

### 1. Page Object Model (POM) Architecture
- Reusable `BasePage` class encapsulating common Cypress commands (`open`, `click`, `type`, `getText`, `getElement`).
- Spec files consume clean Page Objects (`ContactUsPage`, `FlipkartPage`, `WindowPage`, `SeedingPage`).

### 2. Dynamic Tag-Based Suite Filtering
- Support for `@smoke`, `@regression`, `@sanity`, `@api`, `@visual`, `@qr`, `@cross-origin`, `@browserstack`, `@seeding`, `@env` tags.
- Global `beforeEach` hook in [e2e.ts](file:///Users/hanumantbhojane/Desktop/Cypress-POC-New/cypress/support/e2e.ts) automatically filters test execution matching `CYPRESS_tags` environment variable.

### 3. Binary & Complex Data Parsing
- **Excel `.xlsm`**: Node-level task `parseXlsmWorkbook` reads binary Excel worksheets using `xlsx`.
- **PDF Extraction**: Node-level task `parsePdfDocument` extracts text content from binary PDF files via `pdf-parse`.
- **CSV Parsing**: Client-side CSV text parsing and row data assertions.

### 4. Advanced Security & QR Code Engine
- **QR Code Decoding**: Node-level task `parseQrCodeImage` decodes PNG QR codes into text using `pngjs` and `jsqr`.
- **AES Credentials Encryption**: Decrypts client-side AES-encrypted credentials via `CryptoUtils`.

### 5. Visual Baseline Verification & Artifacts
- **Baseline Image Diff**: Node task `compareBaselineImage` compares screenshots against baseline PNGs (`cypress/snapshots/base/`) with pixel mismatch reporting.
- **Snapshot File Verification**: Node task `verifySnapshotFileExists` validates artifact creation in `cypress/screenshots/`.

### 6. API Testing & Route Interception
- **Backend API Testing**: Direct `cy.request()` wrapper supporting `GET`, `POST`, `PUT`, `DELETE` operations ([ApiPage.ts](file:///Users/hanumantbhojane/Desktop/Cypress-POC-New/cypress/e2e/pages/ApiPage.ts)).
- **Network Interception**: `cy.intercept()` stubbing with fixture data ([api-intercepting.cy.ts](file:///Users/hanumantbhojane/Desktop/Cypress-POC-New/cypress/e2e/specs/api-intercepting.cy.ts)).

### 7. Data Seeding & Teardown Node Tasks
- `seedDatabaseState`: Pre-test database entity preparation task.
- `cleanupDatabaseState`: Post-test environment teardown task.

### 8. Multi-Environment & Secret Management
- `EnvConfigUtils`: Dynamic environment switcher supporting `staging`, `dev`, `prod` configurations with secret masking for safe test logs.

### 9. Multi-Tab & Window Popup Automation
- Removes `target="_blank"` attributes to force opening links within current tab context.
- Stubs `window.open` calls to capture popup URLs without browser context detachment.

### 10. BrowserStack Cloud & Reporting Integration
- Live session status reporting (`setSessionStatus('passed', reason)`) and timeline log annotations (`annotateSession`) sent directly to BrowserStack Automate cloud dashboard.

---

## ⚙️ CI/CD Integration (GitHub Actions)

The repository includes a pre-configured GitHub Actions workflow located at [.github/workflows/main.yml](file:///Users/hanumantbhojane/Desktop/Cypress-POC-New/.github/workflows/main.yml):
- Executes automated test runs on push/pull request to `main`.
- Runs TypeScript type checking (`npm run typecheck`).
- Generates and uploads Allure report artifacts.

---

## 📄 License
ISC License. Enterprise Test Automation Framework POC.

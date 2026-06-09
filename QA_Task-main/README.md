# Wallet Recharge App - Test Automation Summary

* **Candidate Name:** Ashish Chandra Bhatt
* **Automation Tool:** Playwright
* **Application Under Test:** Wallet Recharge App

## Modules Covered
1. Login
2. Dashboard Navigation
3. Mobile Recharge

---

## Test Scenarios Automated

### Login Module
* Verify successful login with valid credentials
* Verify Dashboard heading is displayed after login

### Recharge Module
* Verify navigation to Recharge page
* Verify Recharge page heading
* Verify all recharge form fields are displayed
* Verify successful recharge with valid data
* Verify mobile number accepts only numeric values
* Verify mobile number does not accept special characters
* Verify mobile number length validation
* Verify mandatory field validations
* Verify negative amount validation
* Verify zero amount validation
* Verify recharge amount does not exceed wallet balance

---

## Defects Identified

### Defect 1: Mobile Number field accepts alphabets
* **Expected:** Mobile number field should accept only numeric values.
* **Actual:** Alphabets are accepted and recharge can proceed.
* **Severity:** High

### Defect 2: Mobile Number field accepts special characters
* **Expected:** Mobile number field should accept only numeric values.
* **Actual:** Special characters are accepted and recharge can proceed.
* **Severity:** High

### Defect 3: Mobile Number field accepts more than 10 digits
* **Expected:** Mobile number should be restricted to exactly 10 digits.
* **Actual:** More than 10 digits are accepted.
* **Severity:** High

### Defect 4: Mobile Number field accepts less than 10 digits
* **Expected:** Mobile number should be exactly 10 digits.
* **Actual:** Recharge can proceed with fewer than 10 digits.
* **Severity:** High

### Defect 5: Recharge allowed with ₹0 amount
* **Expected:** System should display validation error such as "Amount must be greater than 0".
* **Actual:** Recharge is processed successfully and displays: "Recharge of ₹0 successful!"
* **Severity:** Medium

### Defect 6: Recharge allowed with amount greater than available wallet balance
* **Expected:** Recharge should be blocked and an "Insufficient wallet balance" message should be displayed.
* **Actual:** Recharge is processed successfully even when recharge amount exceeds the available wallet balance.
* **Severity:** Critical

### Defect 7: Wallet balance becomes negative after recharge
* **Expected:** Wallet balance should never become negative. Recharge should be prevented when balance is insufficient.
* **Actual:** Recharge is allowed beyond available balance, causing wallet balance to become negative.
* **Severity:** Critical

---

## Execution Result
Automated test suite executed using Playwright. Several validation tests intentionally fail due to defects identified in the application.

## Remarks
The application core flow is functional; however, critical validation and business rule issues were identified in the Recharge module.

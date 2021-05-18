# QRPT3 Target Automation Testing Group Project

- [Summary](#summary)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [What Do We Test](#what-do-we-test)
- [How Do We Test](#how-do-we-test)
  - [Page Objects](#page-objects)
  - [Data Files](#data-files)

## Summary

This project was put together to showcase our collaborative automation efforts to test target.com. 
It uses Jest as a test runner, and Selenium Webdriver to hook into the browser.

## Setup

This is how to set up the project.
1. clone it!
1. `npm i`

## Running Tests

To run all the tests, use the command: `npm test`
To run a specific test, use the command: `npx jest test_name`

## What Do We Test

The functionality we tes:
1. Open the main page by navigating to target.com
1. Open the main page by clicking on the logo from the Header
1. Open cart page from the Header (validate, empty or not)
1. Search for an item
1. Filter by brand
1. Open selected item page from the results page
1. Adding to cart from the results page
1. No results for specific search terms
1. Logging in * 
1. Logging out *
1. New user registration *

## How Do We Test

We organized our tests using this structure:
Tests
-data
--newUsers.json
--noResults.json
--users.json
-pageObjects
--AuthPage.ts
--BasePage.ts
--Cart.ts
--ItemPage.ts
--ResultsPage.ts
tests.tests.ts
authTests.tests.ts

### Page Objects

We made page objects for these pages to represent: a BASE PAGE that we use for working with base page elements ONLY and COMMON methods that can be used on ANY page, and other pages which we use for working with specific pages and methods that can be used ONLY on these pages.

### Data Files

Iteration is key to test some specific functionality, so we created files for new user registration, registered users and search terms.

## Authors
- Tatiana
- Tiana

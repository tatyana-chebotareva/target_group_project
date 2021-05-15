import { BasePage } from "../__tests__/pageObjects/BasePage";
import { ResultsPage } from "../__tests__/pageObjects/ResultsPage";
import { ItemPage } from "../__tests__/pageObjects/ItemPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";
import { Cart } from "./pageObjects/Cart";
import { AuthPage } from "./pageObjects/AuthPage";
import * as badSearchTerms from "../__tests__/data/badSearchTerms.json";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const resultsPage = new ResultsPage(driver);
const itemPage = new ItemPage(driver);
const cart = new Cart(driver);
const authPage = new AuthPage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); //filters are displayed differently if width is less than 995
    await driver.get(basePage.url); // open main page
});

describe("My test suite", () => {

    test("Open cart page from header", async () => {
        await basePage.click(basePage.cart); // click on a cart in header
        await cart.checkLoadedPage(); // checking that main page has some elements
        await driver.sleep(1000);
    })

    test("Open the main page by clicking on logo from Header", async () => {
        await basePage.click(basePage.logo); // click on a logo in header
        await basePage.checkLoadedPage(); // checking that main page has some elements
        await driver.sleep(1000);
    })

    // https://dmutah.atlassian.net/browse/QG4-3
    test("Open the main page", async () => {
        await basePage.checkLoadedPage(); // checking that main page has some elements
    })

    // https://dmutah.atlassian.net/browse/QG4-4
    test("Search for an item", async () => {
        const searchTerm: string = "umbrella"; // we're going to search for
        await basePage.search(searchTerm); // search itself
        await resultsPage.checkLoadedResults(); // checking that results page has some elements
        await resultsPage.checkResults(searchTerm); // validating results
    })

    // https://dmutah.atlassian.net/browse/QG4-5
    test("Filter by brand", async () => {
        const searchTerm: string = "candle"; // we're going to search for
        const criteria = "brand"; // we're going to filter by
        const brandName = "Yankee Candle" 
        await basePage.search(searchTerm); // search itself
        await resultsPage.filterBy(criteria, brandName); // filter itself
        await resultsPage.checkResults(brandName); // validating updated results
    })

    // https://dmutah.atlassian.net/browse/QG4-7
    test("Open item page from results page", async () => {
        const searchTerm: string = "cooler"; // we're going to search for
        var selectedItemText: string;
        await basePage.search(searchTerm);  // search itself
        await resultsPage.checkResults(searchTerm); // validating results
        selectedItemText = await resultsPage.openItemPage(["90qt"]); // opening a page of the item from our results: first item that contain in its name listed strings
        await driver.sleep(3000)
        await itemPage.checkLoadedPage(); // checking that item page has some elements
        var productTitles = await driver.findElements(By.css('[data-test="product-title"]')); // getting product title elements
        expect(await productTitles[0].getText()).toEqual(selectedItemText); // validating product title matches name of previously selected item on results page
    })

    for(var term of badSearchTerms) {
        test("No results for bad search terms", async () => {
            await basePage.search(term.term); // search itself
            await resultsPage.checkNoResults();
        })
    }

   test("Adding to cart from results page", async() => {
    const searchTerm: string = "umbrella"; // we're going to search for
    await basePage.search(searchTerm); // search itself
    await resultsPage.checkLoadedResults(); // checking that results page has some elements
    await resultsPage.addToCartShipping();
    await cart.checkLoadedPage();
   })

})

afterAll(async () => {
    await driver.quit();
});
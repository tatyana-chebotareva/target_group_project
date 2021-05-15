import { BasePage } from "../__tests__/pageObjects/BasePage";
import { ResultsPage } from "../__tests__/pageObjects/ResultsPage";
import { ItemPage } from "../__tests__/pageObjects/ItemPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";
import { isJSDocTemplateTag } from "typescript";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const resultsPage = new ResultsPage(driver);
const itemPage = new ItemPage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); //filters are displayed differently if width is less than 995
    await driver.get(basePage.url); // open main page
});

describe("My test suite", () => {

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
})

afterAll(async () => {
    await driver.quit();
});
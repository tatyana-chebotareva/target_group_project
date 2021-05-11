import { BasePage } from "../__tests__/pageObjects/BasePage";
import { ResultsPage } from "../__tests__/pageObjects/ResultsPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const resultsPage = new ResultsPage(driver);
const searchTerm: string = "suitcase";

beforeAll(async () => {
    //await driver.manage().window().maximize(); //optional
    await driver.get(basePage.url);
});

describe("My test suite", () => {

    // https://dmutah.atlassian.net/browse/QG4-3
    test("Open the main page", async () => {
        await basePage.checkLoadedPage();
    })

    // https://dmutah.atlassian.net/browse/QG4-4
    test("Search for an item", async () => {
        await basePage.checkLoadedPage();
        await basePage.search(searchTerm);
        await resultsPage.checkLoadedResults();
        await resultsPage.checkResults(searchTerm);
    })
})

afterAll(async () => {
    await driver.quit();
});
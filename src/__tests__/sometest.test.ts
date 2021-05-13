import { BasePage } from "../__tests__/pageObjects/BasePage";
import { ResultsPage } from "../__tests__/pageObjects/ResultsPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

const basePage = new BasePage(driver);
const resultsPage = new ResultsPage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize(); //filters are displayed differently if width is less than 995
    await driver.get(basePage.url);
});

describe("My test suite", () => {

    // https://dmutah.atlassian.net/browse/QG4-3
    test("Open the main page", async () => {
        await basePage.checkLoadedPage();
    })

    // https://dmutah.atlassian.net/browse/QG4-4
    test("Search for an item", async () => {
        const searchTerm: string = "umbrella";
        await basePage.search(searchTerm);
        await resultsPage.checkLoadedResults();
        await resultsPage.checkResults(searchTerm);
    })

    // https://dmutah.atlassian.net/browse/QG4-5
    test("Filter by brand", async () => {
        const searchTerm: string = "candle";
        const criteria = "brand";
        const brandName = "Yankee Candle"
        await basePage.search(searchTerm);
        await resultsPage.filterBy(criteria, brandName);
        await resultsPage.checkResults(brandName);
    })
})

afterAll(async () => {
    await driver.quit();
});
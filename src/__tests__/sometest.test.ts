import { BasePage } from "../__tests__/pageObjects/basePage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new BasePage(driver);

beforeAll(async () => {
    await driver.manage().window().maximize();
    await driver.get(page.url);
});

describe("My test suite", ()=> {
    test("First test", async () => {
        //test
    })
})

afterAll(async () => {
    await driver.quit();
});
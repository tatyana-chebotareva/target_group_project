import { BasePage } from "../__tests__/pageObjects/BasePage";
import { ResultsPage } from "../__tests__/pageObjects/ResultsPage";
import { ItemPage } from "../__tests__/pageObjects/ItemPage";
import { WebDriver, Builder, Capabilities, By } from "selenium-webdriver";
import { isJSDocTemplateTag, isLabeledStatement } from "typescript";
import { Cart } from "./pageObjects/Cart";
import { AuthPage } from "./pageObjects/AuthPage";
import * as newUsers from "../__tests__/data/newUsers.json";
import * as users from "../__tests__/data/users.json";


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

   // So far target refuses to log in using valid account via automated tests showing error message "Sorry, something went wrong. Please try again"
    test("Logging in", async () => {
        const user = users[0];
        await basePage.goToAuthPage();
        let userFirstName: string = await authPage.signUserIn(user.email,user.password); 
        await basePage.checkLoadedPage(); // checking that main page has some elements
        expect(userFirstName).toBe(user.firstName);
    })

    test("Logging out", async () => {
        await basePage.signUserOut();
        await driver.sleep(1000);
        expect(await (await basePage.driver.findElement(basePage.userName)).getText()).toBe('Sign in');
    })

    // So far target refuses to register new valid account via automated tests showing error message "Sorry, something went wrong. Please try again"
    test("New user registration", async () => {
        const user = newUsers[0];
        await basePage.goToAuthPage();
        await driver.sleep(1000);
        await authPage.createAccount(user.email,user.firstName,user.lastName,user.password);       
    })
})

afterAll(async () => {
    await driver.quit();
});
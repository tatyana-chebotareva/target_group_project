import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class we use for working with item page elements and methods that can be used on this page
 */

export class ItemPage extends BasePage{
    price: By = By.css('[data-test="product-price"]');
    title: By = By.css('[data-test="product-title"]');
    about: By = By.css('[data-test="tabListHeading"]');
    ship: By = By.css('[data-test="shipItButton"]');

    /**
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    async checkLoadedPage() {        
        await this.driver.wait(until.elementLocated(this.price));
        await this.driver.wait(until.elementLocated(this.title));
        await this.driver.wait(until.elementLocated(this.about));
        await this.driver.wait(until.elementLocated(this.ship));
    }
}
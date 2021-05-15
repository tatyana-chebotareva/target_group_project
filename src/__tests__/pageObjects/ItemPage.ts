import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class representing Item Page, 
 * which we use for working with item page elements and methods that can be used ONLY on this page
 * @extends BasePage
 */
export class ItemPage extends BasePage{

    /** @prop {By} price - locator for the product price */
    price: By = By.css('[data-test="product-price"]');
    /** @prop {By} title - locator for the title(name) of the product */
    title: By = By.css('[data-test="product-title"]');
    /** @prop {By} about - locator for the details block */
    about: By = By.css('[data-test="tabListHeading"]');
    /** @prop {By} ship - locator for the Ship it button */
    ship: By = By.css('[data-test="shipItButton"]');

    /**
     * Create an item page
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    /**
     * Check that product price, title, details block and Ship it button are displayed on product page
     * @async @function checkLoadedPage
     */
    async checkLoadedPage() {     
        await this.driver.sleep(2000);   
        await this.driver.wait(until.elementLocated(this.price));
        await this.driver.wait(until.elementLocated(this.title));
        await this.driver.wait(until.elementLocated(this.about));
        await this.driver.wait(until.elementLocated(this.ship));
    }

    async shipIt() {
        await this.driver.sleep(1000);   
        await this.click(this.ship);        
        await this.driver.sleep(1000);
        await this.click(this.viewCart);
        await this.driver.sleep(1000);
    }
}
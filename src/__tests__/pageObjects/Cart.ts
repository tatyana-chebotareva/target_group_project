import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class representing Cart Page, 
 * which we use for working with search results page elements and methods that can be used ONLY on this page
 * @extends BasePage
 */
export class Cart extends BasePage{

    /**@prop {By} cartSum - locator for cart summary */
    cartSum: By = By.xpath('//h1[text()[contains(.,"Your cart")]]');
    itemsBlock: By = By.css('[data-test="cart-item-groups"]');
    item: By = By.css('[aria-label="cart item ready to fulfill"]');
    itemTitle: By = By.css('[data-test="cartItem-title"]');

    /**
     * Create cart page
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    /**
     * Check that cart page has ... displayed.
     * @async @function checkLoadedPage
     */
    async checkLoadedPage() {
        await this.driver.sleep(3000);
        await this.driver.wait(until.elementLocated(this.cartSum));
        let summary: string = await this.driver.findElement(this.cartSum).getText();
        if (summary.includes("item")) {
            console.log("cart has item(s) in it")
            await this.driver.wait(until.elementLocated(this.itemsBlock));
            await this.driver.wait(until.elementLocated(this.item));
            await this.driver.wait(until.elementLocated(this.itemTitle));
        } else {console.log("cart is empty")}
    }    
}

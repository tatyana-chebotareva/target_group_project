import { By, until, WebDriver, WebElement } from "selenium-webdriver";

/**
 * This is a class we use for working with search results page elements and methods that can be used on this page
 */

export class ResultsPage {
    driver: WebDriver;
    url: string = "https://www.target.com/";
    filters: By = By.css('[data-test="facetContainer-filters"]');
    results: By = By.css('[data-test="product-list-container"]');
    numberOfResults: By = By.css('[data-test="numberOfSearchResults"]');
    item: By = By.css('[data-test="product-title"]');

    /**
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    async checkResults(searchTerm: string) {
        await this.driver.sleep(3000)
        await this.driver.wait(until.elementLocated(this.numberOfResults));
        expect(await (await this.driver.findElement(this.numberOfResults)).getText()).toContain("result");
        await this.driver.findElements(this.item).then((items: Array<WebElement>) => {
            items.forEach(async item => {
                    await item.getText().then(async text=>{
                        expect(text.toLowerCase()).toContain(searchTerm.toLowerCase());
                })
            })
        })
    }

    async checkLoadedResults() {
        await this.driver.sleep(5000)
        await this.driver.wait(until.elementLocated(this.filters));
        await this.driver.wait(until.elementLocated(this.results));
        await this.driver.wait(until.elementLocated(this.numberOfResults));
    }
        
    

}
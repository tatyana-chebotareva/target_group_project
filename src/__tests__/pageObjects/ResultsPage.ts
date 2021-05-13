import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class we use for working with search results page elements and methods that can be used on this page
 */

export class ResultsPage extends BasePage{

    driver: WebDriver;
    url: string = "https://www.target.com/";
    filters: By = By.css('[data-test="facetContainer-filters"]');
    results: By = By.css('[data-test="product-list-container"]');
    numberOfResults: By = By.css('[data-test="numberOfSearchResults"]');
    item: By = By.css('[data-test="product-title"]');
    brandBy = By.css('[href="#Brand"]');


    /**
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    async filterBy(criteria: string, term: string) {
        switch (criteria) {
            case "brand" : {
                await this.click(this.brandBy);
                await this.sendKeys(By.id("facetSearch-Brand"),term);
                var brandToSelectBy = By.xpath(`//*/label/div/div/div/b[text()="${term}"]`)
                await this.click(brandToSelectBy);
                break; 
            }
            case "" : {
            }
            default : {
            }
        }
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

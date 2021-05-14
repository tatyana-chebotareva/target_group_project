import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class we use for working with search results page elements and methods that can be used on this page
 */

export class ResultsPage extends BasePage{

    filters: By = By.css('[data-test="facetContainer-filters"]');
    results: By = By.css('[data-test="product-list-container"]');
    numberOfResults: By = By.css('[data-test="numberOfSearchResults"]');
    item: By = By.css('[data-test="product-title"]');
    brandBy: By = By.css('[href="#Brand"]');


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

    async openItemPage(itemNameText: Array<string>) : Promise<string> {
        var itemsArr=await this.driver.findElements(By.css('[data-test="product-title"]'));
        // console.log(`Total number of items: ${itemsArr.length}`);
        // getting all the elements, waiting for all promises, mapping items' text:
        var text: Promise<string>;
        var itemsMatching = await Promise.all(itemsArr.map(async (item)=> {
                return await item.getText();
            })).then((results) => {
                console.log(results)
                return itemsArr.filter((element, index) => {
                    var result: boolean = true;
                    for (let i=0;i<itemNameText.length;i++) {
                        result = result&&results[index].toLowerCase().includes(itemNameText[i].toLowerCase());
                    }             
                    return result;       
                })// ^ filtering all elements: getting ones which mapped text matches ours
            }); 
            text = itemsMatching[0].getText();   
            await this.scrollIntoView(itemsMatching[0]); // had to use scrolling since there's an ad getting over our element
            await itemsMatching[0].click();
        return text;
    }

    async checkResults(searchTerm: string) {
        await this.driver.sleep(3000);
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
        await this.driver.sleep(3000);
        await this.driver.wait(until.elementLocated(this.filters));
        await this.driver.wait(until.elementLocated(this.results));
        await this.driver.wait(until.elementLocated(this.numberOfResults));
    }    

}

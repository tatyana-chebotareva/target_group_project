import { By, until, WebDriver, WebElement } from "selenium-webdriver";
import { BasePage } from "./BasePage";

/**
 * This is a class representing Search Resultsd Page, 
 * which we use for working with search results page elements and methods that can be used ONLY on this page
 * @extends BasePage
 */
export class ResultsPage extends BasePage{

    /** @prop {By} filters - locator for filters block */
    filters: By = By.css('[data-test="facetContainer-filters"]');
    /** @prop {By} results - locator for results (items/products) */
    results: By = By.css('[data-test="product-list-container"]');
    /** @prop {By} numberOfResults - locator for first story block on main page */
    numberOfResults: By = By.css('[data-test="numberOfSearchResults"]');
    /** @prop {By} item - locator for first story block on main page */
    item: By = By.css('[data-test="product-title"]');
    /** @prop {By} brandBy - locator for first story block on main page */
    brandBy: By = By.css('[href="#Brand"]');
    noResultsMessage: By = By.css('[data-test="NLRTransparentMessage"]');
    addForShipping: By = By.xpath('//*[text()="Add for shipping"]');

    /**
     * Create results page
     * @param {WebDriver} driver - the driver object the page object should interact with
     */
    constructor(driver: WebDriver) {
        super(driver);
    }

    /**
     * Filter search results using one of the filters (brand, etc):
     * - Find the filter in a filters block and unfold it (if necessary), 
     * - find that filter search field and enter your search term, 
     * - select your term by clicking on it (checkbox should be checked)
     * @todo only filter by brand was implemented!
     * @async @function filterBy
     * @param {string} criteria - filter type (i.e.brand)
     * @param {string} term - the value of the filter (i.e.specific brand name)
     */
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

    /**
     * Choose an item from results page and open its page: 
     * - Locate all the products on results page, 
     * - Narrow the list down to the products which text/title/name contains all of our search terms,
     * - Click on the first product that match to open its page. 
     * @todo so far it's hardcoded to select the first matching product.
     * @async @function openItemPage
     * @param {Array<string>} itemNameText[] - array of our search terms (i.e. "igloo" "cooler")
     * @returns {string} name/title of the product we've just clicked on
     */
    async openItemPage(itemNameText: Array<string>) : Promise<string> {
        await this.driver.sleep(3000);
        var itemsArr=await this.driver.findElements(this.item);
        // console.log(`Total number of items: ${itemsArr.length}`);
        // getting all the elements, waiting for all promises, mapping items' text:
        var text: Promise<string>;
        var itemsMatching = await Promise.all(itemsArr.map(async (item)=> {
                return await item.getText();
            })).then((results) => {
                //console.log("results: "+results.length)
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
            await this.driver.sleep(2000);
        return text;
    }

    /**
     * Check that all the products on search results page contain our search term in its name/title
     * @todo since target adds in other related items to the search results
     * (i.e. name/title might not include search term),
     * criteria that is now used to check for correct results needs to be reconsidered.
     * @async @function checkResults
     * @param {string} searchTerm - your search term
     */
    async checkResults(searchTerm: string) {
        await this.driver.sleep(3000);
        await this.driver.wait(until.elementLocated(this.numberOfResults));
        expect(await (await this.driver.findElement(this.numberOfResults)).getText()).toContain("result");
        await this.driver.findElements(this.item).then((items: Array<WebElement>) => {
            //console.log("items: "+items.length)
            items.forEach(async item => {
                await item.getText().then(async text=>{
                    expect(text.toLowerCase()).toContain(searchTerm.toLowerCase());
                })
            })
        })
    }

    /**
     * Check that search results page has filters block, results (products/items) block and number of results displayed.
     * @async @function checkLoadedResults
     */
    async checkLoadedResults() {
        await this.driver.sleep(3000);
        await this.driver.wait(until.elementLocated(this.filters));
        await this.driver.wait(until.elementLocated(this.results));
        await this.driver.wait(until.elementLocated(this.numberOfResults));
    }    

    async checkNoResults() {
        await this.driver.sleep(1000);
        await this.driver.wait(until.elementLocated(this.noResultsMessage)).then(()=>{console.log("No matching results")});
    }

    async addToCartShipping() {
        await this.driver.sleep(1000);
        let itemsForShipping: Array<WebElement> = await this.driver.findElements(this.addForShipping);
        await this.scrollIntoView(itemsForShipping[0]);
        await itemsForShipping[0].click();
        await this.driver.sleep(1000);
        await this.click(this.viewCart);
        await this.driver.sleep(1000);
    }
}

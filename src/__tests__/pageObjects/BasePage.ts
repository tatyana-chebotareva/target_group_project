import { By, Key, until, WebDriver } from "selenium-webdriver";

/**
 * This is a class we use for working with base page elements and common methods that can be used on any page
 */

export class BasePage {
  driver: WebDriver;
  url: string = "https://www.target.com/";
  header: By = By.id("header");
  storyBlock: By = By.css("[data-component-type='Story Block']");
  featuredCategories: By = By.css("[data-component-type='Browse - Manual']");
  footer: By = By.className("Footer__MenuItemsWrapper-sc-1an41vb-1");

  /**
   * @param {WebDriver} driver - the driver object the page object should interact with
   */
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  searchInput: By = By.id("search");

  async search(searchTerm: string) {
    await this.sendKeys(this.searchInput,searchTerm);
    await this.driver.findElement(this.searchInput).sendKeys(Key.ENTER);
  }

  async checkLoadedPage() {
    await this.driver.wait(until.elementLocated(this.header));
    await this.driver.wait(until.elementLocated(this.storyBlock));
    await this.driver.wait(until.elementLocated(this.featuredCategories));
    await this.driver.wait(until.elementLocated(this.footer));
  }

  async sendKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    await (await this.driver.findElement(elementBy)).clear();
    return this.driver.findElement(elementBy).sendKeys(keys);
  };

  async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
  };
}
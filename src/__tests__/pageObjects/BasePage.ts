import { Actions, By, Key, until, WebDriver, WebElement } from "selenium-webdriver";

/**
 * This is a class representing a BASE PAGE, 
 * which we use for working with base page elements and common methods that can be used on ANY page
 */
export class BasePage {

  driver: WebDriver;
  /** @prop {string} url - base url */
  url: string = "https://www.target.com/";
  /** @prop {By} header - locator for Header */
  header: By = By.id("header");
  /** @prop {By} storyBlock - locator for first story block on main page */
  storyBlock: By = By.css("[data-component-type='Story Block']");
  /** @prop {By} featuredCategories - locator for featured categories block on main page */
  featuredCategories: By = By.css("[data-component-type='Browse - Manual']");
  /** @prop {By} footer - locator for Footer */
  footer: By = By.className("Footer__MenuItemsWrapper-sc-1an41vb-1");
  /** @prop {By} searchInput - locator for search field in a header */
  searchInput: By = By.id("search");
  /** @prop {By} logo - locator for logo in header */
  logo: By = By.id("home");
  /** @prop {By} cart - locator for cart in header */
  cart: By = By.id("cart");
  /** @prop {By} accountMenu - locator for account menu */
  accountMenu: By = By.id("account");
  /** @prop {By} userName - locator for username (if logged in) or Sign in prompt */
  userName: By = By.css('[sdata-test="accountUserName"]');
  /** @prop {By} signIn - locator for sign in submenu (if logged out) */
  signIn: By = By.xpath('//div[text()="Sign in"]');
  /** @prop {By} signOut - locator for sign out submenu (if logged in)*/
  signOut: By = By.xpath('//div[text()="Sign out"]');
  /** @prop {By} viewCart - locator for cart in Add to cart window*/
  viewCart: By = By.css('[data-test="addToCartModalViewCartCheckout"]');

  /**
   * Create a basepage
   * @param {WebDriver} driver - the driver object the page object should interact with
   */
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  /**
   * Search for the product by submitting a search term in the search field in the header and hitting Enter
   * @async @function search
   * @param {string} searchTerm - your search term
   */
  async search(searchTerm: string) {
    await this.sendKeys(this.searchInput,searchTerm);
    await this.driver.findElement(this.searchInput).sendKeys(Key.ENTER);
    await this.scrollDown();
    //await this.driver.sleep(2000)
  }

  /**
   * Check that main page has header, footer, featured categories and a story block displayed
   * @async @function checkLoadedPage
   */
  async checkLoadedPage() {
    await this.driver.sleep(2000);
    await this.driver.wait(until.elementLocated(this.header));
    await this.driver.wait(until.elementLocated(this.storyBlock));
    await this.driver.wait(until.elementLocated(this.featuredCategories));
    await this.driver.wait(until.elementLocated(this.footer));
  }

  /**
   * Clear input field and type in your input text
   * @async @function sendKeys
   * @param {By} elementBy - input field locator
   * @param {string} keys - your text
   */
  async sendKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    //await (await this.driver.findElement(elementBy)).clear(); // won't always work here
    await this.driver.findElement(elementBy).sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE));
    await this.driver.findElement(elementBy).sendKeys(keys);
  };

  async addKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    await this.driver.findElement(elementBy).sendKeys(keys);
  };

  /**
   * Locate an element and click on it
   * @async @function 
   * @param {By} elementBy - locator of your element
   * @returns a promise that will be resolved when the click command has completed
   */
  async click(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return (await this.driver.findElement(elementBy)).click();
  };

  /**
   * Locate an element and scroll to get it into view (on top of visible part)
   * @async @function scrollIntoViewBy
   * @param {By} elementBy - locator of your element
   */
  async scrollIntoViewBy (elementBy: By) {
    var element: WebElement = await this.driver.findElement(elementBy);
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }

  /**
   * Scroll to get an element into view (on top of visible part)
   * @async @function scrollIntoView
   * @param {WebElement} element - your element
   */
  async scrollIntoView (element: WebElement) {
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
  }

  /**
   * Scroll all the way down to the footer so target will load for us all the search results
   * @async @function scrollDown
   */
  async scrollDown() {
    var element: WebElement = await this.driver.findElement(this.footer);
    await this.driver.executeScript("arguments[0].scrollIntoView();", element);
    await this.driver.sleep(2000);
  }

  /**
   * From Header menu select Account - Log in - and proceed to login page
   * @async @function gotoAuthPage
   */
  async goToAuthPage() {
    await this.click(this.accountMenu).then(async ()=> {
      await this.driver.sleep(1000);
      await this.click(this.signIn);
      await this.driver.sleep(1000)
    });
  }

  /**
   * From Header menu select Account - Log out - and proceed to logout
   * @async @function signUserOut
   */
  async signUserOut() {
    await this.click(this.accountMenu).then(async ()=> {
      await this.driver.sleep(1000);
      await this.click(this.signOut);
      await this.driver.sleep(1000)
    });
  }
}
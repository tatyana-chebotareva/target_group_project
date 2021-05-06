import { By, until, WebDriver } from "selenium-webdriver";

/**
 * This is a class we use for working with base page elements and common methods that can be used on any page
 */

export class BasePage {
  driver: WebDriver;
  url: string = "https://www.target.com/";

  /**
   * @param {WebDriver} driver - the driver object the page object should interact with
   */
  constructor(driver: WebDriver) {
    this.driver = driver;
  }

  sendKeys = async function (driver, elementBy: By, keys) {
    await driver.wait(until.elementLocated(elementBy));
    return driver.findElement(elementBy).sendKeys(keys);
  };
  
  click = async function (driver, elementBy: By) {
    await driver.wait(until.elementLocated(elementBy));
    return (await driver.findElement(elementBy)).click();
  };
}
import { By, Key, WebDriver } from "selenium-webdriver";
import { BasePage } from "./BasePage";

export class AuthPage extends BasePage{

    constructor(driver: WebDriver) {
        super(driver);
    }

    register: By = By.xpath('//button[text()="Create your Target account"]');
    signInBtn: By = By.xpath('//button[text()="Sign in"]');
    email: By = By.id("username");
    firstName: By = By.id("firstname");
    lastName: By = By.id("lastname");
    password: By = By.id("password");
    createAcc: By = By.id("createAccount");
    skipCircle: By = By.id("circle-skip");
    skipAddMobile: By = By.xpath('//*[text()="Skip"]');

    async signUserIn(email: string, password: string) : Promise<string> {
        await this.sendKeys(this.email,email);
        await this.sendKeys(this.password,password);
        await this.click(this.signInBtn);
        await this.driver.sleep(500);
        await this.click(this.skipAddMobile);
        await this.driver.sleep(500);
        await this.click(this.skipCircle);
        await this.driver.sleep(2000);
        await super.checkLoadedPage();
        return (await this.driver.findElement(this.userName)).getText();
    }

    async createAccount(email: string, firstName: string, lastName: string, password: string) {
        await this.click(this.register);
        await this.driver.sleep(500);
        await this.sendKeys(this.email,email);
        await this.sendKeys(this.firstName,firstName);
        await this.sendKeys(this.lastName,lastName);
        await this.sendKeys(this.password,password);
        await this.click(this.createAcc);
        await this.driver.sleep(500);
        await this.click(this.skipCircle);
        await this.driver.sleep(2000);
        await super.checkLoadedPage();
        var updatedName: string = await (await this.driver.findElement(this.userName)).getText();
        expect(updatedName).toBe(firstName);
    }
}
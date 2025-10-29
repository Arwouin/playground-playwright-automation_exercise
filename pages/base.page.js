class BasePage {
    constructor(page) {
        this.page = page;
        this.baseUrl = "https://automationexercise.com/";
        this.acceptAllCookies = page.locator('button:has-text("Consent")');
    };

    async navigate() {
        await this.page.goto(this.baseUrl);
    };

    async acceptCookies() {
        if(await this.acceptAllCookies.isVisible()) {
            await this.acceptAllCookies.click();
        };
    };
};
module.exports = { BasePage }
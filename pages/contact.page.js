const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class ContactPage extends BasePage {
    constructor(page) {
        super(page);
        this.clickLogo = page.getByRole('link', { name: "Contact us" });

        this.name = page.locator('[data-qa="name"]');
        this.email = page.locator('[data-qa="email"]');
        this.subject = page.locator('[data-qa="subject"]');
        this.message = page.locator('[data-qa="message"]');
        this.file = page.locator('[name="upload_file"]')

        this.button = page.getByRole('button', { name: "Submit" });

        this.success = page.locator('.status');
    };

    async goToContact() {
        await this.clickLogo.click();
    };

    async submitContact(name, email, subject, message, filePath = null) {
        await this.name.fill(name);
        await this.email.fill(email);
        await this.subject.fill(subject);
        await this.message.fill(message);
        if (filePath) {
            await this.file.setInputFiles(filePath);
        }
        await this.button.click();
        await expect(this.success).toBeVisible();
    };
};
module.exports = { ContactPage }
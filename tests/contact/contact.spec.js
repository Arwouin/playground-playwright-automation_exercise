const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/contact.page');
const contactJSON = require('../../JSON/contact.json');

test.describe("Envoi et test du formulaire de contact", () => {
    let contactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        await contactPage.navigate();
    });

    test("Remplissage du formulaire classiquement", async ({ page }) => {
        await contactPage.acceptCookies();
        await contactPage.goToContact();
        page.once('dialog', async d => {
            expect(d.type()).toBe('confirm');
            await d.accept();
        });
        await contactPage.submitContact(
            contactJSON.messageContact.name,
            contactJSON.messageContact.email,
            contactJSON.messageContact.subject,
            contactJSON.messageContact.message,
            'utils/messageContact.txt'
        );
    });
});
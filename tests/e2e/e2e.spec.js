const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../pages/dashboard.page');
const { RegisterLogin } = require('../../pages/registerLogin.page');
const { PurchaseCard } = require('../../utils/cardHelp');
const { ContactPage } = require('../../pages/contact.page');
const { CartPage } = require('../../pages/cart.page');
const contact = require('../../JSON/contact.json');
const users = require('../../JSON/signup.json');

test.describe('Test E2E - Automation Exercise', () => {
    let registerLogin;
    let dashboardPage;
    let contactPage;
    let cartPage;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.setTimeout(120000);
        dashboardPage = new DashboardPage(page);
        registerLogin = new RegisterLogin(page);
        contactPage = new ContactPage(page);
        cartPage = new CartPage(page);

        await dashboardPage.navigate();
        await dashboardPage.acceptCookies();
    });

    test("E2E", async ({ page }) => {
        test.setTimeout(10000000);
        await test.step("Connexion", async () => {
            await registerLogin.clickOnLink();
            await registerLogin.login(
                users.Login_User.email,
                users.Login_User.password
            );
        });

        await test.step("Recherche et ajout d'un produit au panier", async () => {
            await dashboardPage.verifyNumberPolo();
            await cartPage.addProductCart(30);
        });

        await test.step("Vérification du produit", async () => {
            await cartPage.goToCart();
            await cartPage.verifyCount(1);
            await cartPage.clickOnCheckout();
            await cartPage.verifyProduct(
                "Premium Polo T-Shirts",
                "1500",
                "1500",
                "0"
            );
        });

        await test.step("Paiement", async () => {
            await PurchaseCard(page);
        });

        await test.step("Message au contact", async() => {
            await dashboardPage.goHome();
            await contactPage.goToContact();
            page.once('dialog', async d => {
                expect(d.type()).toBe('confirm');
                await d.accept();
            });
            await contactPage.submitContact(
                contact.messageContact.name,
                contact.messageContact.email,
                contact.messageContact.subject,
                contact.messageContact.message,
                "utils/messageContact.txt"
            );
        });
    });
});
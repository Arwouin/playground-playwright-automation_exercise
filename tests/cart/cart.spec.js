const { CartPage } = require('../../pages/cart.page');
const purchaseJson = require('../../JSON/purchaseCard.json');
const { test, expect } = require('@playwright/test');
const { createLog } = require('../../utils/authHelp');

test.describe("Tests fonctionnels - Panier, achats", () => {
    let cartPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        await createLog(page);
        cartPage = new CartPage(page);
    });

    test('E2E achat produit', async ({ page }) => {
        test.setTimeout(100000);
        await cartPage.addProductCart(1);
        await cartPage.goToCart();
        await cartPage.verifyCount(1);
        await cartPage.clickOnCheckout();
        await cartPage.verifyProduct("Blue Top", "500", "500");
        await cartPage.payment(
            purchaseJson.Valid_Card.name,
            purchaseJson.Valid_Card.numberCard,
            purchaseJson.Valid_Card.CVC,
            purchaseJson.Valid_Card.ExpirationMonth,
            purchaseJson.Valid_Card.ExpirationYear
        );
    });
});

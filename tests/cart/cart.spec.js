const { CartPage } = require('../../pages/cart.page');
const { PurchaseCard } = require('../../utils/cardHelp');
const { test, expect } = require('@playwright/test');
const { createLog } = require('../../utils/authHelp');

test.describe("Tests fonctionnels - Panier, achats", () => {
    let cartPage;

    test.beforeEach(async ({ page }) => {
        test.setTimeout(120000);
        await createLog(page);
        cartPage = new CartPage(page);
    });

    test('E2E achat produit', async () => {
        test.setTimeout(100000);
        await cartPage.addProductCart(1);
        await cartPage.goToCart();
        await cartPage.verifyCount(1);
        await cartPage.clickOnCheckout();
        await cartPage.verifyProduct("Blue Top", "500", "500", "0");
        await PurchaseCard(page);
    });

    test('Achat de deux produits et vérifications', async ({ page }) => {
        await cartPage.addProductCart(1);
        await cartPage.shopContinue();
        await cartPage.addProductCart(2);
        await cartPage.goToCart();
        await cartPage.verifyCount(2);
        await cartPage.clickOnCheckout();
        await cartPage.verifyProduct("Blue Top", "500", "500", "0");
        await cartPage.verifyProduct("Men Tshirt", "400", "400", "1");
        await PurchaseCard(page);
    });

    test("Ajout de deux produits au panier, suppression et vérifications", async ({ page }) => {
        await cartPage.addProductCart(1);
        await cartPage.shopContinue();
        await cartPage.addProductCart(3);
        await cartPage.goToCart();
        await cartPage.verifyCount(2);
        await cartPage.deleteItem(0);
        await cartPage.verifyCount(1);
    });
});
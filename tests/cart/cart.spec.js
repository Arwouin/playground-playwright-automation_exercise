const { CartPage } = require('../../pages/cart.page');
const { RegisterLogin } = require('../../pages/registerLogin.page');
const users = require('../../JSON/signup.json');
const { generateUser } = require('../../utils/generate');
const purchaseJson = require('../../JSON/purchaseCard.json');
const { test, expect } = require('@playwright/test');

test.describe("Tests fonctionnels - Panier, achats", () => {
    let cartPage;
    let registerLogin;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        registerLogin = new RegisterLogin(page);
        await cartPage.navigate();
        await cartPage.acceptCookies();
    });

    test('E2E achat produit', async ({ page }) => {
        test.setTimeout(100000);
        await registerLogin.clickOnLink();
        const GenerateUser = generateUser();
        await registerLogin.PreSignUp(GenerateUser.name, GenerateUser.email);
         await registerLogin.FirstPartSignUp(
            users.Valid_SignUp.password
        );
        await registerLogin.SecondPartSignUp("11", "November", "2004");
        await registerLogin.ThirdPartSignUp(
            users.Valid_SignUp.first_name,
            users.Valid_SignUp.last_name,
            users.Valid_SignUp.company,
            users.Valid_SignUp.adress,
            "Canada",
            users.Valid_SignUp.state,
            users.Valid_SignUp.city,
            users.Valid_SignUp.zipcode,
            users.Valid_SignUp.mobile_number
        );
        await page.getByRole('link', { name: "Continue" }).click();

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
})
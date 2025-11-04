const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
    constructor(page) {
        super(page);
        this.cart = page.getByRole('link', { name: " Cart" });
        this.products = page.locator('.cart_product');
        this.viewCart = page.getByRole('link', { name: "View Cart" }); 
        this.continueShop = page.getByRole('button', { name: "Continue Shopping" });
        this.checkout = page.locator('a.check_out');
        this.nameVerify = page.locator('.cart_description a');
        this.priceVerify = page.locator('.cart_price p');
        this.TotalAmount = page.locator('.cart_total_price');

        this.placeOrder = page.getByRole('link', { name: "Place Order" });

        this.nameCard = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvc = page.locator('[data-qa="cvc"]');
        this.expMonth = page.locator('[data-qa="expiry-month"]');
        this.expYear = page.locator('[data-qa="expiry-year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
        this.confirmation = page.locator('[data-qa="order-placed"]');

        this.deleteProduct = page.locator('.cart_quantity_delete');
    };

    async addProductCart(index) {
        await this.page.hover(`.product-image-wrapper:has(a[data-product-id="${index}"])`);
        await this.page.click(`a[data-product-id="${index}"]`);
    };

    async goToCart(target = 'viewCart') {
        if (target === "cart") {
            await this.cart.click();
        } else {
            await this.viewCart.click();
        };
    };

    async shopContinue() {
        await this.continueShop.click();
    };

    async verifyCount(expectCount) {
        await expect(this.products).toHaveCount(expectCount);
    };

    async clickOnCheckout() {
        await this.checkout.scrollIntoViewIfNeeded();
        await this.checkout.waitFor({ state: 'visible', timeout: 5000 });
        await this.checkout.click();
    };

    async deleteItem(index) {
        await this.deleteProduct.nth(index).click();;
    };

    async verifyProduct(name, price, totalamount, index) {
        await expect(this.nameVerify.nth(index)).toContainText(name);
        await expect(this.priceVerify.nth(index)).toContainText(price);
        await expect(this.TotalAmount.nth(index)).toContainText(totalamount);
    };

    async payment(cardName, cardNumber, cvc, expMonth, expYear) {
        await this.placeOrder.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/payment');

        await this.nameCard.fill(cardName);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expMonth.fill(expMonth);
        await this.expYear.fill(expYear);
        await this.payButton.click();
        await expect(this.confirmation).toContainText("Order Placed!");
    };
};
module.exports = { CartPage } 
const { CartPage } = require('../pages/cart.page');
const purchaseJson = require('../JSON/purchaseCard.json');

async function PurchaseCard(page) {
    const cartPage = new CartPage(page);

    await cartPage.payment(
        purchaseJson.Valid_Card.name,
        purchaseJson.Valid_Card.numberCard,
        purchaseJson.Valid_Card.CVC,
        purchaseJson.Valid_Card.ExpirationMonth,
        purchaseJson.Valid_Card.ExpirationYear
    );
}
module.exports = { PurchaseCard }
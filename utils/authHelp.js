const { RegisterLogin } = require('../pages/registerLogin.page');
const { CartPage } = require('../pages/cart.page');
const users = require('../JSON/signup.json');
const { generateUser } = require('./generate');

async function createLog(page) {
    const cartPage = new CartPage(page);
    const registerLogin = new RegisterLogin(page);
    const newUser = generateUser();

    await cartPage.navigate();
    await cartPage.acceptCookies();

    await registerLogin.clickOnLink();
    await registerLogin.PreSignUp(newUser.name, newUser.email);
    await registerLogin.FirstPartSignUp(users.Valid_SignUp.password);
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

    const continueButton = page.getByRole('link', { name: "Continue" });

    if (await continueButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await continueButton.click();
    }

    return newUser;
}

module.exports = { createLog }
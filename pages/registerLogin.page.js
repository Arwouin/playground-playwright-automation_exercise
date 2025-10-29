const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class RegisterLogin extends BasePage {
    constructor(page) {
        super(page);

        this.linkRL = page.getByRole('link', { name: " Signup / Login" });

        // SignUp
        this.name = page.locator('[data-qa="signup-name"]');
        this.emailSignUp = page.locator('[data-qa="signup-email"]');
        this.buttonSignUp = page.getByRole('button', { name: "Signup" });

        this.maleButton = page.locator('#uniform-id_gender1')
        this.womanButton = page.locator('#uniform-id_gender2')

        this.password = page.locator('#password');

        this.day = page.locator('#days');
        this.month = page.locator('#months');
        this.year = page.locator('#years')

        this.newsletter = page.locator('[for="newsletter"]');
        this.specialOffer = page.locator('[for="optin"]');

        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.adress = page.locator('#address1');
        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipCode = page.locator('#zipcode');
        this.number = page.locator('#mobile_number');

        this.createAccount = page.getByRole('button', { name: "Create Account" });

        this.continue = page.locator('[data-qa="continue-button"]');

        // Login
        this.emailLogin = page.locator('[data-qa="login-email"]');
        this.passwordLogin = page.locator('[data-qa="login-password"]');
        this.buttonLogin = page.getByRole('button', { name: "Login" });

        this.logoutButton = page.getByRole('link', { name: " Logout" });
    };

    async clickOnLink() {
        await this.linkRL.click();
    };

    // Inscription
    async PreSignUp(name, email) {
        await this.name.fill(name);
        await this.emailSignUp.fill(email);
        await this.buttonSignUp.click();
    };

    async FirstPartSignUp(password) { // And gender
        await this.maleButton.waitFor({ state: "visible" });
        await this.maleButton.click();
        await this.password.fill(password);
    };

    async SecondPartSignUp(day, month, year) {
        await this.day.selectOption(day);
        await this.month.selectOption(month);
        await this.year.selectOption(year);

        await this.newsletter.check();
        await this.specialOffer.check();
    }

    async ThirdPartSignUp(first_name, last_name, company, adress, country, state, city, zipcode, mobile_number) { 
        await this.firstName.fill(first_name);
        await this.lastName.fill(last_name);
        await this.company.fill(company);
        await this.adress.fill(adress);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipCode.fill(zipcode);
        await this.number.fill(mobile_number);

        this.createAccount.click();
        this.continue.click();
    };

    // Connexion
    async login(email, password) {
        await this.emailLogin.fill(email);
        await this.passwordLogin.fill(password);
        await this.buttonLogin.click();
    };

    async logout() {
        await this.logoutButton.click();
    };
};
module.exports = { RegisterLogin } 
const { BasePage } = require('./base.page');
const { expect } = require('@playwright/test');

class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        // Base
        this.home = page.getByRole('link', { name: "Home" });
        this.productPage = page.getByRole('link', { name: " Products" });
        this.cart = page.getByRole('link', { name: " Cart" });
        this.signLog = page.getByRole('link', { name: " Signup / Login" });
        this.testCase = page.getByRole('link', { name: " Test Cases", exact: true });
        this.apiTesting = page.getByRole('link', { name: " API Testing" });
        this.videoTuto = page.getByRole('link', { name: " Video Tutorials" });
        this.contact = page.getByRole('link', { name: " Contact us" });

        // PRODUCTS
        this.products = page.locator('.choose');
        this.filterProducts = page.locator('.productinfo p');

        // CATEGORY
        this.woman = page.getByRole('link', { name: "WOMEN" });
        this.dressW = page.getByRole('link', { name: "DRESS" });
        this.tops = page.getByRole('link', { name: "TOP" });
        this.saree = page.getByRole('link', { name: "SAREE" });

        this.men = page.getByRole('link', { name: "MEN" }).nth(1);
        this.tshirt = page.getByRole('link', { name: "TSHIRTS" });
        this.jeans = page.getByRole('link', { name: "JEANS" });

        this.kids = page.getByRole('link', { name: "KIDS" }).nth(0);
        this.dressK = page.getByRole('link', { name: "DRESS" });
        this.topsShirt = page.getByRole('link', { name: "TOPS & SHIRTS" });

        // BRANDS
        this.polo = page.getByRole('link', { name: "Polo" });
        this.hm = page.getByRole('link', { name: "H&M" });
        this.madame = page.getByRole('link', { name: "Madame" });
        this.mastHarbout = page.getByRole('link', { name: "Mast & Harbour" });
        this.babyHug = page.getByRole('link', { name: "Babyhug" });
        this.allenSollyJunior = page.getByRole('link', { name: "Allen Solly Junior" });
        this.kookieKids = page.getByRole('link', { name: "Kookie Kids" });
        this.biba = page.getByRole('link', { name: "Biba" });

        // Search
        this.search = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
    };

    // Go To Logo
    async goHome() {
        await this.home.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/');
    };

    async goProducts() {
        await this.productPage.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/products');
    };

    async goCart() {
        await this.cart.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/view_cart');
    };

    async SignLogin() {
        await this.signLog.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/login');
    };

    async goTestCase() {
        await this.testCase.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/test_cases');
    };

    async goToAPI() {
        await this.apiTesting.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/api_list');
    };

    async goTutorial() {
        await this.videoTuto.click();
    };

    async goToContact() {
        await this.contact.click();
        await expect(this.page).toHaveURL('https://automationexercise.com/contact_us');
    }

    // Verify Item's numbers
    async verifyNumberPolo() {
        await this.polo.click();
        await expect(this.products).toHaveCount(6);
    };

    async verifyNumberHM() {
        await this.hm.click();
        await expect(this.products).toHaveCount(5);
    };

    async verifyNumberWoman() { 
        await this.madame.click();
        await expect(this.products).toHaveCount(5);
    };

    async verifyNumberMastHarbour() {
        await this.mastHarbout.click();
        await expect(this.products).toHaveCount(3);
    };

    async verifyNumberBabyHug() {
        await this.babyHug.click();
        await expect(this.products).toHaveCount(4);
    };

    async verifyNumberASJ() {
        await this.allenSollyJunior.click();
        await expect(this.products).toHaveCount(3);
    };

    async verifyNumberKookieKids() {
        await this.kookieKids.click();
        await expect(this.products).toHaveCount(3);
    };

    async verifyNumberOfBiba() {
        await this.biba.click();
        await expect(this.products).toHaveCount(5);
    };

    // Filters
    async filterWoman() {
        await this.woman.click();
        await this.dressW.click();
        await expect(this.products).toHaveCount(3);
    };

    async filterMen() {
        await this.men.click();
    };

    async filterKids() {
        await this.kids.click();
    };

    async verifyDress() {
        await this.woman.click();
        await this.dressW.click();
        await expect(this.filterProducts).toContainText(["Dress"]);
    };

    async verifyTop() {
        await this.woman.click();
        await this.tops.click();
        await expect(this.filterProducts).toContainText(["Top"]);
    };

    async verifySaree() {
        await this.woman.click();
        await this.saree.click();
        await expect(this.filterProducts).toContainText(['Saree']);
    };

    async verifyTshirts() {
        await this.men.click();
        await this.tshirt.click();
        await expect(this.filterProducts).toContainText([/Tshirt|T-Shirt/]);
    };

    async verifyJeans() {
        await this.men.click();
        await this.jeans.click();
        await expect(this.filterProducts).toContainText(["Jeans"]);
    };

    async verifyDressKids() {
        await this.kids.click();
        await this.dressK.click();
        await expect(this.filterProducts).toContainText([/Dress|Top|Unicorn/]);
    };

    async verifyTopsShirtKids() {
        await this.kids.click();
        await this.topsShirt.click();
        await expect(this.filterProducts).toContainText([/Top|Tops|Shirt/]);
    };

    async verifySearch(name) {
        await this.productPage.click();
        await this.search.fill(name);
        await this.searchButton.click();
        await expect(this.filterProducts.first()).toContainText(name);
    };
};
module.exports = { DashboardPage }
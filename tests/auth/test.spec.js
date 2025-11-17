const { test, expect } = require('@playwright/test');
const { RegisterLogin } = require('../../pages/registerLogin.page');
const { generateUser } = require('../../utils/generate');
const users = require('../../JSON/signup.json');


const invalidUserSign = [
    { name: "", email: ""},
    { name: "thatsatest", email: ""},
    { name: "", email: "thatsaemail@exemple.com"}
];

const invalidUserLog = [
    { email: "", password: ""},
    { email: "test@exemple.com", password: ""},
    { email: "", password: "thisisapassword"}
];

test.describe("Test d'inscription et de connexion", () => {
    let registerLogin;

    test.beforeEach(async ({ page }, testInfo) => {
        testInfo.setTimeout(120000);
        registerLogin = new RegisterLogin(page);
        await registerLogin.navigate();
    });

    test('Inscription', async ({ page }) => {
        test.setTimeout(100000);
        await registerLogin.acceptCookies();

        await test.step("Inscription classique", async () => {
            await registerLogin.clickOnLink();
            const GenerateUser = generateUser();
            // Première page d'inscription
            await registerLogin.PreSignUp(GenerateUser.name, GenerateUser.email);
            await expect(page).toHaveURL('https://automationexercise.com/signup');
            // Page complète d'inscription
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
        });

        await test.step("Tentative d'inscription avec un email déjà pris", async () => {
            await registerLogin.logout();
            await registerLogin.PreSignUp("test", "test@test.com");
            await expect(page.getByText('Email Address already exist!')).toBeVisible();
        });

        await test.step("Tentative de préinscription avec un/plusieurs champ(s) vide(s)", async () => {
            await registerLogin.navigate();
            await registerLogin.clickOnLink();
            for (const { name, email } of invalidUserSign) {
                await page.reload();
                await test.step(`Tentative avec ${name}`, async () => {
                    await registerLogin.PreSignUp(name, email);
                });
                await expect(page).toHaveURL('https://automationexercise.com/login');
            };
        });
    });
    
    test('Connexion', async ({ page }) => {
        test.setTimeout(100000);
        await test.step("Connexion avec un utilisateur valide", async () => {
            await registerLogin.acceptCookies();
            await registerLogin.clickOnLink();
            await registerLogin.login(
                users.Login_User.email,
                users.Login_User.password
            );
            await expect(page.getByText('Arwouin', { exact: true })).toBeVisible();
        });

        await test.step("Connexion avec champs invalides", async () => {
            await registerLogin.logout();
            await page.reload();
            for (const { email, password } of invalidUserLog) {
                await test.step(`Connexion avec cet email : ${email}`, async () => {
                    await registerLogin.login(email, password);
                });
                await expect(page).toHaveURL('https://automationexercise.com/login');
            };
        });
    });
});
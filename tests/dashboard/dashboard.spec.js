const { test, expect } = require('@playwright/test');
const { DashboardPage } = require('../../pages/dashboard.page');

test.describe("test en vif", () => {
    let dashboardPage;

    test.beforeEach(async ({ page }) => {
        dashboardPage = new DashboardPage(page);
        await dashboardPage.navigate();
        await dashboardPage.acceptCookies();
    });

    // Tests fonctionnels des différents éléments
    test("Navigation vers la product page", async () => {
        await dashboardPage.goProducts();
    });

    test("Navigation vers la page du panier", async () => {
        await dashboardPage.goCart();
    });

    test("Navigation sur la page de login", async () => {
        await dashboardPage.SignLogin();
    });

    test("Navigation sur la page tests cases", async () => {
        await dashboardPage.goTestCase();
    });

    test("Navigation dans la page API", async () => {
        await dashboardPage.goToAPI();
    });

    test("Navigation sur la page contact", async () => {
        await dashboardPage.goToContact();
    });

    test("Retour à la page principale", async () => {
        await dashboardPage.goHome();
    });

    test("Navigation vers la page tutoriels youtube", async () => {
        await dashboardPage.goTutorial();
        await dashboardPage.navigate();
    });


    // Vérifications des catégories BRANDS
    test("Vérification de la catégorie POLO", async () => {
        await dashboardPage.verifyNumberPolo();
    });

    test("Vérification de la catégorie H&M", async () => {
        await dashboardPage.verifyNumberHM();
    });

    test("Vérification de la catégorie MADAME", async () => {
        await dashboardPage.verifyNumberWoman();
    });

    test("Vérification de la catégorie MAST & HARBOUR", async () => {
        await dashboardPage.verifyNumberMastHarbour();
    });

    test("Vérification de la catégorie BabyHub", async () => {
        await dashboardPage.verifyNumberBabyHug();
    });

    test("Vérification de la catégorie ALLEN SOLLY JUNIOR", async () => {
        await dashboardPage.verifyNumberASJ();
    });

    test("Vérification de la catégorie KOOKIE KIDS", async () => {
        await dashboardPage.verifyNumberKookieKids();
    });

    test("Vérification de la catégorie BIBA", async () => {
        await dashboardPage.verifyNumberOfBiba();
    });


    // Vérifications des catégories WOMAN, MEN & kids
    test("Vérification de la catégorie Woman", async () => {
        await test.step("Vérification de la partie 'Dress'", async () => {
            await dashboardPage.verifyDress();
        });

        await test.step("Vérification de la partie 'Top'", async () => {
            await dashboardPage.verifyTop();
        });

        await test.step("Vérification de la partie 'Saree'", async () => {
            await dashboardPage.verifySaree();        
        });
    });


    test("Vérification de la catégorie 'MEN'", async () => {
        await test.step("Vérification de la partie 'TSHIRTS'", async () => {
            await dashboardPage.verifyTshirts();
        });

        await test.step("Vérification de la partie 'JEANS'", async () => {
            await dashboardPage.verifyJeans();
        });
    });

    test("Vérification de la catégorie 'KIDS'", async () => {
        await test.step("Vérification de la partie 'DRESS' pour kids", async () => {
            await dashboardPage.verifyDressKids();
        });

        await test.step("Vérification de la partie 'TOPS & SHIRTS'", async () => {
            await dashboardPage.verifyTopsShirtKids();
        });
    });

    // Vérification des champs de recherche
    test("Vérification des produits avec 'Top' comme recherche", async () => {
        test.setTimeout(60000);
        await dashboardPage.verifySearch("Top");
    });
});

// A continuer
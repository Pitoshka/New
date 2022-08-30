require('mocha');
const expectChai = require('chai').expect;
const { ENVIRONMENT } = require('../../environment/envConfig');
const env = require(`../../environment/${ENVIRONMENT}Environment`);
const { unionUser } = require('../../environment/credentials');
const { startUrl } = require('../../environment/testEnvironment');
const mainPage = require('../../pages/mainPage');
const authorizationPage = require('../../pages/authorizationPage');
const catalogForm = require('../../pages/catalogForm');
const testData = require('../../testData/testData');

describe('Onliner neccesery logic features', async () => {
  it('Verify neccesery flow of application', async () => {
    //Step#1
    //Зайти на страницу http://onliner.by/
    await browser.url(startUrl);
    //Expected result: 	
    //Главная страница onliner открылась
    expectChai(await mainPage.isFormOpened(), 'Main Page not opened').to.be.true;

    //Step#2
    //Выполнить процесс авторизации
    await mainPage.clickLoginButton();
    expectChai(await authorizationPage.isFormOpened(), 'Authorization Page not open').to.be.true;
    await authorizationPage.typeUsername(unionUser.login);
    await authorizationPage.typePassword(unionUser.password);
    await authorizationPage.clickSubmitButton();
    //Expected result:
    //Вход успешно выполнен. Пользователь авторизован
    expectChai(await mainPage.isLoginBtnDisplayed(), 'Something wrong with autorization!').to.be.false;

    //Step#3
    //Перейти в раздел каталога и получить список популярных категорий товаров
    await mainPage.clickGeneralHeaderLink(testData.headerLink);
    //Expected result:
    //Открыта страница типа товаров
    expectChai(await catalogForm.isCategoriesListDisplayed(), 'Category list not displayed').to.be.true;
    
    //Step#4
    //Перейти на случайную категорию из списка
    await catalogForm.clickGeneralCategoryLink(testData.category)
    //Expected result:
    //Открыта корректная категория
    expectChai(await catalogForm.isTitleNameCategoryDisplayed(testData.category), 'Not the same title name in application!').to.be.true;

    //Step#5
    //Выполнить логаут
    await mainPage.clickProfileDropdownArrow();
    await mainPage.clickProfileLogoutLink();
    //Expected result:
    //Пользователь успешно разлогинился.
    expectChai(await mainPage.isLoginBtnDisplayed(), 'Something wrong with logout logic!').to.be.true;
    
  });
});

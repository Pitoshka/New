const BaseForm = require('../framework/baseForm');
const Element = require('../framework/element');

class CatalogForm extends BaseForm {
  constructor() {
    super('.catalog-content', 'Catalog form');
  }

  get _categoriesList() {
    return new Element(`.catalog-bar__list`, 'Categories list');
  }
  //можно ли так?
  _generalCategoriesLink = (nameCategoryLink) => {
    return new Element(`//*[@class='catalog-bar__list']//a[contains(text(),'` + nameCategoryLink + `')]`, nameCategoryLink + 'link at categories list');
  }

  _nameTitleOfChoisenCategory(nameTitle) {
    return new Element(`.schema-header__title=`+ nameTitle, nameTitle + 'title name of category');
  }

  async isCategoriesListDisplayed() {
    return this._categoriesList.state().assertIsDisplayed();
  }

  async clickGeneralCategoryLink(nameLink) {
    return this._generalCategoriesLink(nameLink).click();
  }

  async isTitleNameCategoryDisplayed(nameTitle) {
    return this._nameTitleOfChoisenCategory(nameTitle).state().assertIsDisplayed();
  }

}

module.exports = new CatalogForm();

const BaseForm = require('../framework/baseForm');
const Element = require('../framework/element');

class MainPage extends BaseForm {
  constructor() {
    super('.b-news-layer', 'Main Page');
  }

  get _loginButton() {
    return new Element(`.auth-bar__item--text`, 'Login button');
  }

  _generalHeaderLink = (nameLink) => {
    return new Element(`//*[@class='b-main-navigation']//span[text()='`+ nameLink +`']`, nameLink+ ' link at header');
  }

  get _profileDropdownArrow() {
    return new Element(`.b-top-profile__item_arrow`, 'Profile dropdown arrow');
  }

  get _profileLogoutLink() {
    return new Element(`.b-top-profile__logout a`, 'Profile logout link');
  }

  async clickLoginButton() {
    return this._loginButton.click();
  }

  async isLoginBtnDisplayed() {
    return this._loginButton.state().isDisplayed();
  }

  async clickGeneralHeaderLink(nameLink) {
    return this._generalHeaderLink(nameLink).click();
  }

  async clickProfileDropdownArrow() {
    return this._profileDropdownArrow.click();
  }

  async clickProfileLogoutLink() {
    return this._profileLogoutLink.click();
  }

}

module.exports = new MainPage();

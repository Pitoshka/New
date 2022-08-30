const BaseForm = require('../framework/baseForm');
const Element = require('../framework/element');

class AuthorizationPage extends BaseForm {
  constructor() {
    super('.auth-form', 'Authorization Page');
  }

  get _usernameInput() {
    return new Element(`.auth-input__wrapper input[type="text"]`, 'Username input field');
  }

  get _passwordInput() {
    return new Element(`.auth-input__wrapper input[type="password"]`, 'Password input field');
  }

  get _sumbitAuthorizationButton() {
    return new Element(`.auth-form__control button[type="submit"]`, 'Submit authorization button');
  }

  async typeUsername(str) {
    return this._usernameInput.type(str);
  }

  async typePassword(str) {
    return this._passwordInput.type(str);
  }

  async clickSubmitButton() {
    return this._sumbitAuthorizationButton.click();
  }
}

module.exports = new AuthorizationPage();

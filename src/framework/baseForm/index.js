const timeouts = require('../../environment/timeouts');
const Element = require('../element');
const { Logger } = require('../utils');

module.exports = class BaseForm {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
    this._form = new Element(this._locator, this._name);
  }

  getFormName = () => this._name;

  async isFormOpened() {
    const isOpened = await this._form.state().isExisting();
    Logger.info(`Form "${this._name}" is opened - "${isOpened}"`);
    return isOpened;
  }

  async isFormNotDisplayed() {
    const isNotOpened = !(await this._form.state().isDisplayed());
    Logger.info(`Form "${this._name}" is not opened - "${isNotOpened}"`);
    return isNotOpened;
  }

  async waitForFormIsOpened() {
    Logger.info(`Waiting for form "${this._name}" to load`);
    const isOpened = await this._form.state().waitForExist(timeouts.pageLoadTime);
    Logger.info(`Form "${this._name}" is opened - "${isOpened}"`);
    return isOpened;
  }
};

const { Logger } = require('../utils');
const ElementStateProvider = require('./elementStateProvider');

const maskedValue = '********';

module.exports = class Element {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  state = () => new ElementStateProvider(this._locator, this._name);

  async click() {
    Logger.info(`Click at "${this._name}"`);
    await this.state().assertIsClickable();
    await (await $(this._locator)).click();
  }

  async clickByOffset(x, y) {
    Logger.info(`Click by offset {x: ${x}, y:${y}} at "${this._name}"`);
    await this.state().assertIsClickable();
    await (await $(this._locator)).click({ x, y });
  }

  async getText() {
    Logger.info(`Get text from element "${this._name}"`);
    await this.state().assertIsExist();
    const text = await (await $(this._locator)).getText();
    Logger.info(`Received text "${text}"`);
    return text;
  }

  async getTextFromElements() {
    Logger.info(`Get text from elements "${this._name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this._locator);
    return Promise.all(elements.map(async (el) => el.getText()));
  }

  async getAttributeFromElements(attribute) {
    Logger.info(`Get attribute "${attribute}" from elements "${this._name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this._locator);
    return Promise.all(elements.map(async (el) => el.getAttribute(attribute)));
  }

  async type(value) {
    await this._setText(value, false);
  }

  async typeSecret(value) {
    await this._setText(value, true);
  }

  async clearAndType(value) {
    await this._clearAndSetText(value, false);
  }

  async clearAndTypeSecret(value) {
    await this._clearAndSetText(value, true);
  }

  async _setText(value, maskValueInLog) {
    Logger.info(`Type text "${maskValueInLog ? maskedValue : value}" into element "${this._name}"`);
    await this.state().assertIsExist();
    await (await $(this._locator)).setValue(value);
  }

  async _clearAndSetText(value, maskValueInLog) {
    Logger.info(`Clear and type text "${maskValueInLog ? maskedValue : value}" into element "${this._name}"`);
    await this.state().assertIsExist();
    const elem = await $(this._locator);
    await elem.clearValue();
    await elem.setValue(value);
  }

  async getPlaceholder() {
    Logger.info(`Get placeholder from element "${this._name}"`);
    await this.state().assertIsExist();
    const text = await (await $(this._locator)).getAttribute('placeholder');
    Logger.info(`Received placeholder "${text}"`);
    return text;
  }

  async getElementsCount() {
    Logger.info(`Get count of elements "${this._name}"`);
    await this.state().assertIsExist();
    const elements = await $$(this._locator);
    return elements.length;
  }

  async scrollIntoView() {
    Logger.info(`Scroll element "${this._name}" into viewport`);
    await this.state().assertIsExist();
    const elem = await $(this._locator);
    return elem.scrollIntoView();
  }
};

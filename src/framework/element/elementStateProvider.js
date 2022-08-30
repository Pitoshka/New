const timeouts = require('../../environment/timeouts');
const { Logger } = require('../utils');

const elementState = {
  exist: 'exist',
  enabled: 'enabled',
  clickable: 'clickable',
  displayed: 'displayed',
};

module.exports = class ElementStateProvider {
  constructor(locator, name) {
    this._locator = locator;
    this._name = name;
  }

  async isExisting() {
    Logger.info(`Is element "${this._name}" existing`);
    return (await $(this._locator)).isExisting();
  }

  async isClickable() {
    Logger.info(`Is element "${this._name}" clickable`);
    return (await $(this._locator)).isClickable();
  }

  async isDisplayed() {
    Logger.info(`Is element "${this._name}" displayed`);
    return (await $(this._locator)).isDisplayed();
  }

  async isEnabled() {
    Logger.info(`Is element "${this._name}" enabled`);
    return (await $(this._locator)).isEnabled();
  }

  async waitForExist(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForExist(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.exist);
  }

  async waitForEnabled(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForEnabled(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.enabled);
  }

  async waitForDisplayed(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForDisplayed(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async waitForDisappiar(timeout = timeouts.disappear, interval = timeouts.polling, reverse = true) {
    const func = async (options) => await (await $(this._locator)).waitForDisplayed(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async waitForClickable(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForClickable(options);
    return this._waitFor(func, { timeout, interval, reverse }, elementState.clickable);
  }

  async assertIsExist(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForExist(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.exist);
  }

  async assertIsEnabled(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForEnabled(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.enabled);
  }

  async assertIsDisplayed(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForDisplayed(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.displayed);
  }

  async assertIsClickable(timeout = timeouts.explicit, interval = timeouts.polling, reverse = false) {
    const func = async (options) => await (await $(this._locator)).waitForClickable(options);
    return this._assertIs(func, { timeout, interval, reverse }, elementState.clickable);
  }

  async _waitFor(func, options, state) {
    state = options.reverse === false ? state : `not ${state}`;
    Logger.info(`Waiting (${options.timeout} ms) for element "${this._name}" is ${state}`);
    try {
      await func(options);
      return true;
    } catch {
      return false;
    }
  }

  async _assertIs(func, options, state) {
    state = options.reverse === false ? state : `not ${state}`;
    Logger.info(`Assertion that element "${this._name}" is ${state}`);
    options.timeoutMsg = `Element "${this._name}" was not in state "${state}". Locator: ${this._locator}`;
    return func(options);
  }
};

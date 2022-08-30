const timeouts = require('../../environment/timeouts');
const { StringUtils, Logger } = require('../utils');

module.exports = async function () {
  await browser.overwriteCommand('url', async (origFunction, url) => {
    Logger.info(`Open url "${url}"`);
    await origFunction(url);
  });

  await browser.overwriteCommand('reloadSession', async (origFunction) => {
    Logger.info('Reload browser session');
    await origFunction();
  });

  await browser.overwriteCommand('refresh', async (origFunction) => {
    Logger.info('Refresh the current page');
    await origFunction();
  });

  await browser.overwriteCommand('back', async (origFunction) => {
    Logger.info('Switch current tab back');
    await origFunction();
  });

  await browser.overwriteCommand('addCookie', async (origFunction, object) => {
    Logger.info('Add cookie');
    await origFunction(object);
  });

  await browser.overwriteCommand('switchWindow', async (origFunction, string) => {
    Logger.info('Switch window');
    await origFunction(string);
  });

  await browser.overwriteCommand('closeWindow', async (origFunction) => {
    Logger.info('Close current window');
    await origFunction();
  });

  await browser.overwriteCommand('saveScreenshot', async (origFunction, path) => {
    Logger.info('Save screenshot of current page');
    await origFunction(path);
  });

  await browser.addCommand('getCurrentUrl', function () {
    Logger.info('Get current url');
    return this.getUrl();
  });

  await browser.addCommand('swithToLastWindow', async function () {
    Logger.info('Switch to last window');
    const windows = await this.getWindowHandles();
    return this.switchToWindow(windows.pop());
  });

  await browser.addCommand('waitCompletePageLoad', async function () {
    Logger.info('Wait for document.readyState = complete');
    this.waitUntil(() => this.execute(() => document.readyState === 'complete'), {
      timeout: timeouts.explicit,
      timeoutMsg: 'Page not finished loading in timeout',
    });
  });

  await browser.addCommand('httpAuthUrl', async function (url, login, password) {
    Logger.info('Get http auth url');
    const authUrl = StringUtils.replaceSymbols(url, '://', `://${login}:${password}@`);
    return this.url(authUrl);
  });
};

const BaseForm = require('../framework/baseForm');
const Element = require('../framework/element');

class AddProjectPage extends BaseForm {
  constructor() {
    super('#addProjectForm', 'Project list page');
  }

  get _projectNameInput() {
    return new Element(`#projectName`, 'Project name input');
  }

  get _saveProjectButton() {
    return new Element(`//button[contains(@class, "btn-primary")]`, 'Save project button');
  }

  get _successSaveMessage() {
    return new Element(`//div[contains(@class, "alert-success")]`, 'Success save message');
  }

  /**
   * Type project name in input
   * @param {number} str string to type
   * @returns {Promise<*>} result
   */
  async typeProjectName(str) {
    return this._projectNameInput.type(str);
  }

  /**
   * Click save project button
   * @returns {Promise<*>} result
   */
  async cliclSaveProjectButton() {
    return this._saveProjectButton.click();
  }

  /**
   * Check that success save message is displayed
   * @returns {Promise<boolean>} result
   */
  async isSuccessSaveMessageDisplayed() {
    return this._successSaveMessage.state().assertIsDisplayed();
  }
}

module.exports = new AddProjectPage();

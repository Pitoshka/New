const addProjectPage = require('./addProjectPage');
const mainPage = require('./mainPage');
//если импортить всё сюда, то так уже дальше в тест кейсах делать не нужно?
// const addProjectPage = require('../../pages/addProjectPage');

module.exports = {
  addProjectPage,
  mainPage
};

//файл бесполезен в моем случае, всё импортируется в любом случае нормально, тогда в каких случаях он полезен

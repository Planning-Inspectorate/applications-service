const { screenSizes, openModalButtonId } = require('./config');

const getOpenModalButton = (modalId) => document.querySelector(`#${openModalButtonId(modalId)}`);

const getScreenSizeWidth = (screenSize) => screenSizes[screenSize];

module.exports = {
	getOpenModalButton,
	getScreenSizeWidth
};

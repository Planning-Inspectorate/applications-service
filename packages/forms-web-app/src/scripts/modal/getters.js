const { screenSizes, openModalButtonId } = require('./config');

const getModal = (modalId) => document.querySelector(modalId);

const getOpenModalButton = (modalId) => document.querySelector(`#${openModalButtonId(modalId)}`);

const getCloseModalButton = (closeModalButtonId) => document.querySelector(closeModalButtonId);

const getOpenModalButtonNextToElement = (insertOpenModalButtonNextToId) =>
	document.querySelector(insertOpenModalButtonNextToId);

const getScreenSizeWidth = (screenSize) => screenSizes[screenSize];

module.exports = {
	getModal,
	getOpenModalButton,
	getCloseModalButton,
	getOpenModalButtonNextToElement,
	getScreenSizeWidth
};

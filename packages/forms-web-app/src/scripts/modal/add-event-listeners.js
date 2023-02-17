const { isScreenSizeActiveModalSize } = require('./helpers');
const { closeModal, openModal } = require('./state');

const addClickEventToOpenModalButton = (modal, openModalButton, screenSizeModalIsActive) => {
	openModalButton.addEventListener('click', () => {
		if (isScreenSizeActiveModalSize(screenSizeModalIsActive)) openModal(modal);
	});
};

const addClickEventToCloseModalButton = (modal, closeModalButton) => {
	closeModalButton.addEventListener('click', () => {
		closeModal(modal);
	});
};

module.exports = {
	addClickEventToOpenModalButton,
	addClickEventToCloseModalButton
};

const { openModal, closeModal, focusElement } = require('./state');

const openModalActions = (modal, closeModalButton) => {
	openModal(modal);
	focusElement(closeModalButton);
};

const closeModalActions = (modal, openModalButton) => {
	closeModal(modal);
	focusElement(openModalButton);
};

module.exports = { openModalActions, closeModalActions };

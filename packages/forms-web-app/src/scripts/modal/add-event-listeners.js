const { openModalActions, closeModalActions } = require('./actions');
const { isScreenSizeActiveModalSize } = require('./helpers');
const { focusElement } = require('./state');

const addFocusoutEventToModal = (modalId, modal, closeModalButton, screenSizeModalIsActive) =>
	modal.addEventListener('focusout', (event) => {
		if (
			isScreenSizeActiveModalSize(screenSizeModalIsActive) &&
			event.relatedTarget &&
			!event.relatedTarget.closest(modalId)
		)
			focusElement(closeModalButton);
	});

const addClickEventToOpenModalButton = (
	modal,
	openModalButton,
	closeModalButton,
	screenSizeModalIsActive
) =>
	openModalButton.addEventListener('click', () => {
		if (isScreenSizeActiveModalSize(screenSizeModalIsActive))
			openModalActions(modal, closeModalButton);
	});

const addClickEventToCloseModalButton = (modal, closeModalButton, openModalButton) => {
	closeModalButton.addEventListener('click', () => closeModalActions(modal, openModalButton));
};

module.exports = {
	addFocusoutEventToModal,
	addClickEventToOpenModalButton,
	addClickEventToCloseModalButton
};

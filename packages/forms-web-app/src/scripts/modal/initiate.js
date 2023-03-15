const {
	addClickEventToOpenModalButton,
	addClickEventToCloseModalButton,
	addFocusoutEventToModal
} = require('./add-event-listeners');
const { insertOpenModalButton, buildOpenModalButton } = require('./builders');
const { setModalInitiatedAttribute, setModalActiveAttribute } = require('./setters');

const initiateModal = (
	modalId,
	closeModalButtonId,
	insertOpenModalButtonNextToId,
	openModalButtonText,
	screenSizeModalIsActive
) => {
	const modal = document.querySelector(modalId);
	const openModalButton = buildOpenModalButton(modalId, openModalButtonText);
	const closeModalButton = modal.querySelector(closeModalButtonId);
	const insertOpenModalButtonNextToElement = document.querySelector(insertOpenModalButtonNextToId);

	insertOpenModalButton(openModalButton, insertOpenModalButtonNextToElement);
	addFocusoutEventToModal(modalId, modal, closeModalButton, screenSizeModalIsActive);
	addClickEventToOpenModalButton(modal, openModalButton, closeModalButton, screenSizeModalIsActive);
	addClickEventToCloseModalButton(modal, closeModalButton, openModalButton);
	setModalInitiatedAttribute(modal);
	setModalActiveAttribute(modal, true);
};

module.exports = { initiateModal };

const {
	addClickEventToOpenModalButton,
	addClickEventToCloseModalButton
} = require('./add-event-listeners');
const { insertOpenModalButton, buildOpenModalButton } = require('./builders');
const { getModal, getCloseModalButton, getOpenModalButtonNextToElement } = require('./getters');
const { setModalInitiatedAttribute, setModalActiveAttribute } = require('./setters');

const initiateModal = (
	modalId,
	closeModalButtonId,
	insertOpenModalButtonNextToId,
	openModalButtonText,
	screenSizeModalIsActive
) => {
	const modal = getModal(modalId);
	const openModalButton = buildOpenModalButton(modalId, openModalButtonText);
	const closeModalButton = getCloseModalButton(closeModalButtonId);
	const insertOpenModalButtonNextToElement = getOpenModalButtonNextToElement(
		insertOpenModalButtonNextToId
	);

	insertOpenModalButton(openModalButton, insertOpenModalButtonNextToElement);
	addClickEventToOpenModalButton(modal, openModalButton, screenSizeModalIsActive);
	addClickEventToCloseModalButton(modal, closeModalButton);
	setModalInitiatedAttribute(modal);
	setModalActiveAttribute(modal, true);
};

module.exports = { initiateModal };

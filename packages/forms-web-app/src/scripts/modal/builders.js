const { openModalButtonId } = require('./config');

const buildOpenModalButton = (modalId, openModalButtonText) => {
	const openModalButton = document.createElement('button');
	openModalButton.type = 'button';
	openModalButton.innerHTML = openModalButtonText;
	openModalButton.id = openModalButtonId(modalId);
	openModalButton.classList = 'govuk-button govuk-button--secondary';

	return openModalButton;
};

const insertOpenModalButton = (openModalButton, insertOpenModalButtonNextToElement) => {
	insertOpenModalButtonNextToElement.parentNode.insertBefore(
		openModalButton,
		insertOpenModalButtonNextToElement.nextSibling
	);
};

module.exports = { buildOpenModalButton, insertOpenModalButton };

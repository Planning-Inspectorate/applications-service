const modalInitiatedAttributeId = 'data-modal-initiated';

const modalActiveAttributeId = 'data-modal-active';

const openModalButtonId = (modalId) => `${modalId}-open-modal-button`.replace(/#|\./g, '');

const screenSizes = {
	mobile: 320,
	tablet: 641,
	desktop: 769
};

module.exports = {
	modalInitiatedAttributeId,
	modalActiveAttributeId,
	openModalButtonId,
	screenSizes
};

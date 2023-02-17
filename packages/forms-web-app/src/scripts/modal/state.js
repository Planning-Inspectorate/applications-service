const { setModalActiveAttribute } = require('./setters');

const openModal = (modal) => {
	modal.style.display = 'block';
	document.documentElement.style.overflow = 'hidden';
};

const closeModal = (modal) => {
	modal.style.display = 'none';
	document.documentElement.style.overflow = '';
};

const resetModalState = (modal, openModalButton) => {
	modal.style.display = '';
	openModalButton.style.display = 'none';
	document.documentElement.style.overflow = '';
	setModalActiveAttribute(modal, false);
};

const restoreModalState = (modal, openModalButton) => {
	openModalButton.style.display = 'block';
	setModalActiveAttribute(modal, true);
};

module.exports = { openModal, closeModal, resetModalState, restoreModalState };

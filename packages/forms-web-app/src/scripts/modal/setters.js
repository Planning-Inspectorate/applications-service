const { modalInitiatedAttributeId, modalActiveAttributeId } = require('./config');

const setModalInitiatedAttribute = (modal) => {
	modal.setAttribute(modalInitiatedAttributeId, true);
};

const setModalActiveAttribute = (modal, isActive) => {
	modal.setAttribute(modalActiveAttributeId, isActive);
};

module.exports = { setModalInitiatedAttribute, setModalActiveAttribute };

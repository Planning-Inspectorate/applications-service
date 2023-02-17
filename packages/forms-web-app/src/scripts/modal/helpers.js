const { getScreenSizeWidth } = require('./getters');
const { modalInitiatedAttributeId, modalActiveAttributeId } = require('./config');

const isscreenSizeModalIsActiveSet = (screenSizeModalIsActive) =>
	!!getScreenSizeWidth(screenSizeModalIsActive);

const isScreenSizeActiveModalSize = (screenSizeModalIsActive) =>
	isscreenSizeModalIsActiveSet(screenSizeModalIsActive)
		? window.innerWidth < getScreenSizeWidth(screenSizeModalIsActive)
		: true;

const isModalInitiated = (modal) => modal.getAttribute(modalInitiatedAttributeId) === 'true';

const isModalActive = (modal) => modal.getAttribute(modalActiveAttributeId) === 'true';

const restoreModal = (modal, screenSizeModalIsActive) =>
	isScreenSizeActiveModalSize(screenSizeModalIsActive) &&
	isModalActive(modal) !== isScreenSizeActiveModalSize(screenSizeModalIsActive);

const resetModal = (modal, screenSizeModalIsActive) =>
	!isScreenSizeActiveModalSize(screenSizeModalIsActive) &&
	isModalActive(modal) !== isScreenSizeActiveModalSize(screenSizeModalIsActive);

module.exports = {
	isscreenSizeModalIsActiveSet,
	isScreenSizeActiveModalSize,
	isModalInitiated,
	restoreModal,
	resetModal
};

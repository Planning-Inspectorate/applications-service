const debounce = require('lodash/debounce');
const { getOpenModalButton } = require('./getters');
const {
	isScreenSizeActiveModalSize,
	isModalInitiated,
	restoreModal,
	resetModal
} = require('./helpers');
const { initiateModal } = require('./initiate');
const { restoreModalState, resetModalState } = require('./state');

const handleModalOnResize = (
	modalId,
	closeModalButtonId,
	insertOpenModalButtonNextToId,
	openModalButtonText,
	screenSizeModalIsActive
) => {
	const modal = document.querySelector(modalId);
	let openModalButton = getOpenModalButton(modalId);

	const debounceInitiateModalWhenScreenSizeIsActive = debounce(() => {
		initiateModalWhenScreenSizeIsActive();
	}, 50);

	const debounceRestoreOrResetModal = debounce(() => {
		restoreOrResetModal();
	}, 50);

	const handleEventListeners = () => {
		window.removeEventListener('resize', debounceInitiateModalWhenScreenSizeIsActive);
		window.addEventListener('resize', debounceRestoreOrResetModal);
	};

	const initiateModalWhenScreenSizeIsActive = () => {
		if (isScreenSizeActiveModalSize(screenSizeModalIsActive)) {
			initiateModal(
				modalId,
				closeModalButtonId,
				insertOpenModalButtonNextToId,
				openModalButtonText,
				screenSizeModalIsActive
			);
			openModalButton = getOpenModalButton(modalId);
			handleEventListeners();
		}
	};

	const restoreOrResetModal = () => {
		if (restoreModal(modal, screenSizeModalIsActive)) restoreModalState(modal, openModalButton);
		else if (resetModal(modal, screenSizeModalIsActive)) resetModalState(modal, openModalButton);
	};

	if (isModalInitiated(modal)) window.addEventListener('resize', debounceRestoreOrResetModal);
	else window.addEventListener('resize', debounceInitiateModalWhenScreenSizeIsActive);
};

module.exports = { handleModalOnResize };

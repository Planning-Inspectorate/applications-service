const { handleModalOnResize } = require('./handle-modal-on-resize');
const { isScreenSizeActiveModalSize, isscreenSizeModalIsActiveSet } = require('./helpers');
const { initiateModal } = require('./initiate');

function modal() {
	this.initiate = (
		modalId,
		closeModalButtonId,
		insertOpenModalButtonNextToId,
		openModalButtonText,
		screenSizeModalIsActive
	) => {
		if (isScreenSizeActiveModalSize(screenSizeModalIsActive))
			initiateModal(
				modalId,
				closeModalButtonId,
				insertOpenModalButtonNextToId,
				openModalButtonText,
				screenSizeModalIsActive
			);

		if (isscreenSizeModalIsActiveSet(screenSizeModalIsActive))
			handleModalOnResize(
				modalId,
				closeModalButtonId,
				insertOpenModalButtonNextToId,
				openModalButtonText,
				screenSizeModalIsActive
			);
	};
}

module.exports = modal;

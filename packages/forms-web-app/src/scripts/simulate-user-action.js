function simulateUserAction() {
	this.click = (elementToClickId) => {
		document.querySelector(elementToClickId).click();
	};
}

module.exports = simulateUserAction;

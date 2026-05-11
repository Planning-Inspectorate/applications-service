module.exports = (link) => {
	cy.get('a[href*="' + link + '"]:not(.locale-selector a)')
		.first()
		.click();
	cy.waitForDemoDelay();
};

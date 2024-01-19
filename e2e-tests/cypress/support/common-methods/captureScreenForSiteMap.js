module.exports = () => {
	if (Cypress.env('captureSiteMap')) {
		cy.screenshot({ capture: 'fullPage' });
	}
};

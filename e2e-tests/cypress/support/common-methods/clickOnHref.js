module.exports = (link) => {
	cy.get('a[href*="' + link + '"]')
		.first()
		.click();
	cy.wait(Cypress.env('demoDelay'));
};

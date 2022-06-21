module.exports = (link) => {
	cy.get('a[href*="' + link + '"]').click();
	cy.wait(Cypress.env('demoDelay'));
};

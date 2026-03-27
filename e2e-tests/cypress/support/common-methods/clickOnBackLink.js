module.exports = () => {
	cy.get('[data-cy="back"]').first().click();
	// Wait for page to be ready after navigation
	cy.get('h1').should('exist');
};

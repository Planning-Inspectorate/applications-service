Cypress.Commands.add('navigateAndSearch', (searchTerm) => {
	cy.visit(Cypress.env('baseUrl'));
	cy.get('.ui-search-bar__input').type(searchTerm);
	cy.get('[data-cy="search-button"]').click();
	cy.contains(searchTerm).click();
	cy.get('.govuk-caption-l').contains(searchTerm);
});

Cypress.Commands.add('saveAndContinue', () => {
	cy.get('[data-cy="button-save-and-continue"]').click();
});

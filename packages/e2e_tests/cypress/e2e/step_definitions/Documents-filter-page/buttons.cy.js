import { And } from 'cypress-cucumber-preprocessor/steps';

And('the user click the apply filter button', () => {
	cy.get('[data-cy="apply-filter-button"]').click();
});

And('the user expands all the filters', () => {
	cy.get('#show-hide-all-filters').click();
});

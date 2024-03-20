import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

Then('the page includes a link to the project', () => {
	cy.get('#project-link').should('have.attr', 'href', '/projects/EN010116');
});

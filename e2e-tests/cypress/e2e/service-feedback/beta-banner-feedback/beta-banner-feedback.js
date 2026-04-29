import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given('I open the local homepage for feedback', () => {
	cy.visit('/');
	cy.contains('h1', 'Welcome').should('be.visible');
});

Then('the beta banner feedback link points to the service feedback form', () => {
	cy.get(".govuk-link[data-cy='Feedback']")
		.should('have.attr', 'href')
		.and('include', 'forms.office.com/Pages/ResponsePage.aspx');
});

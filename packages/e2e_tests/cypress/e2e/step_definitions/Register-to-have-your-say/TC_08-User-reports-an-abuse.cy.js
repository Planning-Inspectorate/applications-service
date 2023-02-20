///<reference types ="cypress"/>
import { Then, And } from 'cypress-cucumber-preprocessor/steps';

And('The user selects feedback link', () => {
	cy.get(".govuk-link[data-cy='Feedback']").click();
	cy.get('.office-form-notice-report').click();
});

Then('User reports an abuse', () => {
	cy.get('#Phishing').click();
	cy.get('.office-form-reportabuse-input').type(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
	);
	cy.get('.button-content').click();
	cy.get('.thank-you-page-container').should('have.text', 'Your report was submitted.');
});

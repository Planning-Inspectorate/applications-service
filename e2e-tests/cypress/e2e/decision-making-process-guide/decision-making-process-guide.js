import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to Decision making process guide page', () => {
	cy.visit('/decision-making-process-guide', { failOnStatusCode: false });
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on show all link', () => {
	cy.get(
		'*[class^="ui-step-nav__button ui-step-nav__button--controls js-step-controls-button"]'
	).click();
});

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to Having your say about a national infrastructure project page', () => {
	cy.visit('/having-your-say-guide');
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on {string} link', (pageName) => {
	cy.get(
		'button.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button'
	).click();
	cy.clickLinkTonavigateToPage(pageName);
});

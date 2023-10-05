import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('I navigate to Decision making process guide page', () => {
	cy.visit('/decision-making-process-guide');
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on show all link', () => {
	cy.get(
		'*[class^="app-step-nav__button-text app-step-nav__button-text--all js-step-controls-button-text"]'
	).click();
});

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

Then('I verify below links present on Review of the application page', function (table) {
	cy.assertLinksPresentOnPage(table);
});

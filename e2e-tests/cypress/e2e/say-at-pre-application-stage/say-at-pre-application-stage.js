import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_SayAtPreApplication from './PageObjects/PO_SayAtPreApplication';
const sayAtPreApplication = new PO_SayAtPreApplication();

Given('I navigate to Having your say at the pre-application stage page', () => {
	cy.visit('/having-your-say-guide');
	cy.get('.js-step-controls-button-text').click();
	cy.clickLinkTonavigateToPage('Taking part in the pre-application stage');
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

Then(
	'I verify below links present on Having your say at the pre-application stage',
	function (table) {
		sayAtPreApplication.assertLinksPresentOnPage(table);
	}
);

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	cy.clickLinkTonavigateToPage(
		'registering to have your say about a national infrastructure project'
	);
});

And('I click on get involved in the preliminary meeting link', () => {
	cy.clickLinkTonavigateToPage('get involved in the preliminary meeting');
});

And('I click on Next link', () => {
	cy.get('.ui-next-step a').click();
});

And('I click on Having your say during the examination of the project link', () => {
	cy.clickLinkTonavigateToPage('have your say during the examination of the project');
});

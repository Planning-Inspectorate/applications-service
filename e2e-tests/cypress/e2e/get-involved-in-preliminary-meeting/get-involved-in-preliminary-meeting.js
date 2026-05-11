import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_GetInvolvedInPreliminaryMeeting from './PageObjects/PO_GetInvolvedInPreliminaryMeeting';
const getInvolvedInPreliminaryMeeting = new PO_GetInvolvedInPreliminaryMeeting();

Given('I navigate to Get involved in the preliminary meeting page', () => {
	cy.visit('/having-your-say-guide');
	cy.get('.js-step-controls-button-text').click();
	cy.clickLinkTonavigateToPage('get involved in the preliminary meeting');
});

Then('I verify below links present on Get involved in the preliminary meeting', function (table) {
	getInvolvedInPreliminaryMeeting.assertLinksPresentOnPage(table);
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

And('I click on Next link', () => {
	cy.get('.ui-next-step a').click();
});

And('I click on Having your say during the examination of the project link', () => {
	cy.clickLinkTonavigateToPage('have your say during the examination of the project');
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	cy.clickLinkTonavigateToPage(
		'registering to have your say about a national infrastructure project'
	);
});

And('I click on get involved in the preliminary meeting link', () => {
	cy.clickLinkTonavigateToPage('get involved in the preliminary meeting');
});

And('I click on Have your say during the examination of the project link', () => {
	cy.clickLinkTonavigateToPage('have your say during the examination of the project');
});

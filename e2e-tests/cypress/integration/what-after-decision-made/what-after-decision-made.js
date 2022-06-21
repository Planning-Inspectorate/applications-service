import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_WhatAfterDecisionMade from './PageObjects/PO_WhatAfterDecisionMade';
const afterDecisionMade = new PO_WhatAfterDecisionMade();

Given('I navigate to What you can do after the decision has been made page', () => {
	cy.visit('/having-your-say-guide');
	cy.get(
		'button.app-step-nav__button.app-step-nav__button--controls.js-step-controls-button'
	).click();
	cy.clickLinkTonavigateToPage('What you can do after the decision has been made');
});

Then(
	'I verify below links present on What you can do after the decision has been made',
	function (table) {
		afterDecisionMade.assertLinksPresentOnPage(table);
	}
);

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

And('I click on Next link', () => {
	cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > strong').click();
});

And('I click on Find a project link', () => {
	cy.get('#main-content > div > div.govuk-grid-column-two-thirds > div > div > a > span').click();
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	cy.get('#step-panel-registering-to-have-your-say-1').click();
});

And('I click on get involved in the preliminary meeting link', () => {
	cy.get('#step-panel-get-involved-in-the-preliminary-meeting-1 > p:nth-child(2) > a').click();
});

And('I click on what you can do after the decision has been made link', () => {
	cy.get('#step-panel-what-you-can-do-after-decision-1 > p > a').click();
});

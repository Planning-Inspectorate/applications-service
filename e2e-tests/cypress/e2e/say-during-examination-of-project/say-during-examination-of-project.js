import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_SayDuringExaminationOfProject from './PageObjects/PO_SayDuringExaminationOfProject';
const sayDuringExaminationOfProject = new PO_SayDuringExaminationOfProject();

Given('I navigate to Have your say during the examination of the project page', () => {
	cy.visit('/having-your-say-guide');
	cy.get(
		'*[class^="app-step-nav__button-text app-step-nav__button-text--all js-step-controls-button-text"]'
	).click();
	cy.clickLinkTonavigateToPage('Have your say during the examination of the project');
});

Then(
	'I verify below links present on Have your say during the examination of the project',
	function (table) {
		sayDuringExaminationOfProject.assertLinksPresentOnPage(table);
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

And('I click on What you can do after the decision has been made link', () => {
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

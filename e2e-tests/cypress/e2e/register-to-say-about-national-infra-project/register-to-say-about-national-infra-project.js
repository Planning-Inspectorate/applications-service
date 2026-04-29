import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_RegisterToSayAboutNationalInfraProject from './PageObjects/PO_RegisterToSayAboutNationalInfraProject';
const registerToSayAboutNationalInfraProject = new PO_RegisterToSayAboutNationalInfraProject();

Given('I have navigated to the "Have your say" guide', () => {
	cy.visit('/having-your-say-guide');
});

Given('I have selected the "Have your say" link from the related guides section', () => {
	cy.clickOnHref('/having-your-say-guide');
});

Given('I have viewed the overview page for a project', () => {
	cy.visit('/project-search');
	cy.clickProjectLink('North Lincolnshire Green Energy Park');
});

And('I click on show all link', () => {
	cy.get('.js-step-controls-button-text').click();
});
When('I select the "How to register link"', () => {
	cy.clickOnHref('/having-your-say-guide/registering-have-your-say');
});

Then(
	'I verify below links present on Registering to have your say about a national infrastructure project',
	function (table) {
		registerToSayAboutNationalInfraProject.assertLinksPresentOnPage(table);
	}
);

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on {string} link', (pageName) => {
	cy.clickLinkTonavigateToPage(pageName);
});

And('I click on Next link', () => {
	cy.contains('a', 'Get involved in the preliminary meeting').click();
});

And('I click on Get involved in the preliminary meeting link', () => {
	cy.contains('a', 'Get involved in the preliminary meeting').click();
});

And('I click on registering to have your say about a national infrastructure project link', () => {
	cy.contains('a', 'Registering to have your say about a national infrastructure project').click();
});

And('I click on get involved in the preliminary meeting link', () => {
	cy.contains('a', 'Get involved in the preliminary meeting').click();
});

And('the page does not include a link to a project', () => {
	cy.get('#project-link').should('not.exist');
});

Then('I click on feedback link', () => {
	cy.get('[data-cy="Feedback"]').first().click();
});

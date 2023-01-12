import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_OverviewPage from './PageObjects/PO_OverviewPage';
const overviewPage = new PO_OverviewPage();

Given('I navigate to {string} project Overview page', (projectName) => {
	cy.visit('/project-search', { failOnStatusCode: false });
	cy.clickProjectLink(projectName);
});

Then('I am on the {string} page', (pageName) => {
	cy.assertUserOnThePage(pageName);
});

And('I click on register to have your say about national infrastructure project link', () => {
	cy.clickOnHref('/register-have-your-say');
});

And('I click on {string} link', (pageName) => {
	cy.clickContentsLink(pageName);
});

And('I click on Apply filters', () => {
	overviewPage.clickOnApplyFilters();
});

And('I click on Find out more about registering to have your say', () => {
	cy.get('a[href*="/having-your-say-guide"]').last().click();
});

And('I click on required {string} link', (requiredLink) => {
	cy.get('p > a').each(($e1, index) => {
		const text = $e1.text();
		if (text.includes(requiredLink)) {
			cy.get('p > a').eq(index).click();
		}
	});
});

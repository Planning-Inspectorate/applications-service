import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BasePage } from '../../shared/PageObjects/BasePage';
import { LOCAL_CASES } from '../../shared/localCases';

const basePage = new BasePage();
const { northLincolnshire } = LOCAL_CASES;

Given('I open the local project information page', () => {
	cy.visit(`/projects/${northLincolnshire.id}`);
});

Then('I am on the local project information page', () => {
	cy.url().should('include', `/projects/${northLincolnshire.id}`);
	basePage.locateH1ByText('Project information');
});

Then('the project information page shows these sections', (dataTable) => {
	dataTable.hashes().forEach(({ Section }) => {
		basePage.locateH2ByText(Section);
	});
});

Then('the project information page shows these details', (dataTable) => {
	dataTable.hashes().forEach(({ Detail }) => {
		basePage.visibleGovBody(Detail);
	});
});

Then('the project location map is displayed', () => {
	basePage.visibleGovMap();
});

When('I open the register to have your say journey from the project information page', () => {
	basePage.clickProjectInformationMenuLink('register-to-have-your-say');
});

Then('I am on the register to have your say page', () => {
	cy.url().should('include', '/register-have-your-say');
	cy.contains('h1', 'Register to have your say').should('be.visible');
});

When('I return to the local project information page from project navigation', () => {
	basePage.clickProjectInformationMenuLink('projects');
});

When('I open the get updates journey from the project information page', () => {
	basePage.clickProjectInformationMenuLink('get-updates');
});

Then('I am on the get updates start page', () => {
	cy.url().should('include', `/projects/${northLincolnshire.id}/get-updates/start`);
	cy.contains('h1', 'Get updates').should('be.visible');
});

Then('the get updates privacy notice link is displayed', () => {
	basePage.clickGovInset(
		'Read the privacy notice to see how we handle your information',
		'/customer-privacy-notice'
	);
});

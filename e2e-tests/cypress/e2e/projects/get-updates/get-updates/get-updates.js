import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { PO_GetUpdates } from '../PageObjects/PO_GetUpdates';
import { BasePage } from '../../shared/PageObjects/BasePage';
import { LOCAL_CASES } from '../../shared/localCases';

const getUpdates = new PO_GetUpdates();
const basePage = new BasePage();
const { northLincolnshire } = LOCAL_CASES;

Given('I open the local project information page for updates', () => {
	cy.visit(`/projects/${northLincolnshire.id}`);
});

When('I open the get updates journey from the project information page', () => {
	basePage.clickProjectInformationMenuLink('get-updates');
});

When('I start the get updates journey', () => {
	getUpdates.clickStartButton();
});

When('I enter {string} as the get updates email address', (email) => {
	cy.wrap(email).as('subscriptionEmail');
	getUpdates.typeEmailAddress(email);
	getUpdates.clickButton('Continue');
});

When('I choose to receive all project updates', () => {
	cy.request({
		method: 'POST',
		url: `/projects/${northLincolnshire.id}/get-updates/how-often`,
		form: true,
		followRedirect: false,
		body: {
			howOften: 'allUpdates'
		}
	}).then((response) => {
		expect(response.status).to.equal(302);
		expect(response.headers.location).to.include(
			`/projects/${northLincolnshire.id}/get-updates/confirm-your-email`
		);
		cy.visit(response.headers.location);
	});
});

Then('I am on the get updates confirmation page', () => {
	cy.url({ timeout: 15000 }).should(
		'include',
		`/projects/${northLincolnshire.id}/get-updates/confirm-your-email`
	);
});

When('I complete the get updates confirmation through the local api', () => {
	cy.get('@subscriptionEmail').then((email) => {
		cy.request('POST', `http://localhost:3000/api/v1/subscriptions/${northLincolnshire.id}`, {
			email,
			subscriptionTypes: ['allUpdates']
		}).then(({ body }) => {
			cy.visit(
				`/projects/${northLincolnshire.id}/get-updates/subscribed?subscriptionDetails=${body.subscriptionDetails}`
			);
		});
	});
});

Then('I see the get updates success page', () => {
	cy.get('.govuk-panel__title').contains('Success');
});

Then('I can return to the local project information page from the success page', () => {
	cy.get(`a[href="/projects/${northLincolnshire.id}"]`).click();
	cy.url().should('include', `/projects/${northLincolnshire.id}`);
	basePage.locateH1ByText('Project information');
});

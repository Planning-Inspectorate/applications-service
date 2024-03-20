import { PO_GetUpdates } from '../pageObject/Get-updates/PO_GetUpdates';

const getUpdates = new PO_GetUpdates();

describe('when user subscribes to get updates about a project', () => {
	it('should navigate to the Get Updates start page', () => {
		cy.clearCookies();
		cy.visit('/projects/EN010120/get-updates/start');
		getUpdates.clickStartButton();
	});

	it('when user enters a valid email address', () => {
		getUpdates.typeEmailAddress('test@test.com');
		getUpdates.clickButton('Continue');
	});

	it('should check update frequency and navigate to confirm your email page', () => {
		getUpdates.checkUpdateFrequency('allUpdates');
		getUpdates.clickButton('Continue');
		cy.url().should('include', '/projects/EN010120/get-updates/confirm-your-email');
	});

	it('should navigate to the success page via the url from the confirmation email', () => {
		cy.visit(
			'/projects/BC0110003/get-updates/subscribed?subscriptionDetails=61dc31c554537e2f8f710228c93f897dc01a9c76cf735da29ccbcd4acb8219a1198a74ba67ebb9ba897d7888a3ef0b6390eeb41c5c1de903e1604188f8c592917faaed4243d726dbc15706f997c980e27373bf33501f25105aa69029981c8245e0'
		);
		cy.get('.govuk-panel__title').contains('Success');
	});

	it('then user clicks link and returns to Project Page', () => {
		cy.get('a[href*="BC0110003"]').click();
		cy.url().should('include', '/projects/BC0110003');
		cy.get('.govuk-heading-xl').contains('Project information');
	});
});

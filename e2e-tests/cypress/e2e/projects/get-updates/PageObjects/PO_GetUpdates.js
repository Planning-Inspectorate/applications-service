import { BasePage } from '../../shared/PageObjects/BasePage';

export class PO_GetUpdates extends BasePage {
	identifiers = {
		...this.identifiers,
		startNowUpdatesButton: () => cy.get('a[href*="email"]'),
		emailAddressField: () => cy.get('#email'),
		button: () => cy.get('.govuk-button'),
		frequencyCheckBox: () => cy.get('.govuk-checkboxes__input'),
		mainHeading: () => cy.get('h1'),
		successTitle: () => cy.get('.govuk-panel__title'),
		projectInformationReturnLink: (caseId) => cy.get(`a[href="/projects/${caseId}"]`)
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	clickStartButton() {
		this.identifiers.startNowUpdatesButton().click();
	}

	typeEmailAddress(string) {
		this.identifiers.emailAddressField().type(string);
	}

	clickButton(string) {
		this.identifiers.button().contains(string).click();
	}

	checkUpdateFrequency(string) {
		this.identifiers.frequencyCheckBox().check([string]);
	}

	openProjectInformationPage(caseId) {
		cy.visit(`/projects/${caseId}`);
	}

	assertOnConfirmationPage(caseId) {
		cy.url({ timeout: 15000 }).should(
			'include',
			`/projects/${caseId}/get-updates/confirm-your-email`
		);
	}

	startAllUpdatesSubscription(caseId) {
		cy.request({
			method: 'POST',
			url: `/projects/${caseId}/get-updates/how-often`,
			form: true,
			followRedirect: false,
			body: {
				howOften: 'allUpdates'
			}
		}).then((response) => {
			expect(response.status).to.equal(302);
			expect(response.headers.location).to.include(
				`/projects/${caseId}/get-updates/confirm-your-email`
			);
			cy.visit(response.headers.location);
		});
	}

	completeConfirmationThroughLocalApi(caseId) {
		cy.get('@subscriptionEmail').then((email) => {
			cy.request('POST', `http://localhost:3000/api/v1/subscriptions/${caseId}`, {
				email,
				subscriptionTypes: ['allUpdates']
			}).then(({ body }) => {
				cy.visit(
					`/projects/${caseId}/get-updates/subscribed?subscriptionDetails=${body.subscriptionDetails}`
				);
			});
		});
	}

	assertSuccessPage() {
		this.identifiers.successTitle().contains('Success');
	}

	returnToProjectInformation(caseId) {
		this.identifiers.projectInformationReturnLink(caseId).click();
	}

	assertReturnedToProjectInformation(caseId) {
		cy.url().should('include', `/projects/${caseId}`);
		this.identifiers.mainHeading().contains('Project information').should('be.visible');
	}
}

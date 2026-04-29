export class PO_GetUpdates {
	identifiers = {
		startNowUpdatesButton: () => cy.get('a[href*="email"]'),
		emailAddressField: () => cy.get('#email'),
		button: () => cy.get('.govuk-button'),
		frequencyCheckBox: () => cy.get('.govuk-checkboxes__input')
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
}

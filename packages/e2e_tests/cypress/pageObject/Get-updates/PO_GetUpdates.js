export class PO_GetUpdates {
	elements = {
		startNowUpdatesButton: () => cy.get('a[href*="email"]'),
		emailAddressField: () => cy.get('#email'),
		button: () => cy.get('.govuk-button'),
		frequencyCheckBox: () => cy.get('.govuk-checkboxes__input')
	};

	clickStartButton() {
		this.elements.startNowUpdatesButton().click();
	}

	typeEmailAddress(string) {
		this.elements.emailAddressField().type(string);
	}

	clickButton(string) {
		this.elements.button().contains(string).click();
	}

	checkUpdateFrequency(string) {
		this.elements.frequencyCheckBox().check([string]);
	}
}

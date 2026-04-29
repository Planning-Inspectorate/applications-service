class PO_WhoYouRepresenting {
	identifiers = {
		personRadio: () => cy.get('[data-cy="answer-person"]'),
		organisationRadio: () => cy.get('[data-cy="answer-organisation"]'),
		householdRadio: () => cy.get('[data-cy="answer-family"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	selectRadioOption(radioOption) {
		switch (radioOption) {
			case 'A person':
				this.identifiers.personRadio().click();
				break;
			case 'An organisation or charity':
				this.identifiers.organisationRadio().click();
				break;
			case 'A household':
				this.identifiers.householdRadio().click();
				break;
		}
	}
}
export default PO_WhoYouRepresenting;

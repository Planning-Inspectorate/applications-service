import PageObject from '../../../../PageObject';

class PO_WhoYouRepresenting extends PageObject {
	identifiers = {
		...this.identifiers,
		personRadio: () => cy.get('[data-cy="answer-person"]'),
		organisationRadio: () => cy.get('[data-cy="answer-organisation"]'),
		householdRadio: () => cy.get('[data-cy="answer-family"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => {
					const value = this[prop];
					if (typeof value !== 'function') {
						throw new Error(`Function "${String(prop)}" was not found on ${this.constructor.name}`);
					}
					return value.bind(this);
				}
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

import PageObject from '../../../../PageObject';

class PO_CyaBeforeReg extends PageObject {
	identifiers = {
		...this.identifiers,
		summaryListKeys: () => cy.get('.govuk-summary-list__key'),
		summaryListValues: () => cy.get('.govuk-summary-list__value'),
		summaryListActions: () => cy.get('.govuk-summary-list__actions'),
		registeringForChangeLink: () => cy.get('[data-cy="registering-for"]').first(),
		fullNameChangeLink: () => cy.get('[data-cy="full-name"]').last(),
		organisationNameChangeLink: () => cy.get('[data-cy="organisation-name"]').last(),
		representingChangeLink: () => cy.get('[data-cy="representing"]').last(),
		acceptAndRegisterButton: () => cy.get('[data-cy="button-accept-and-register"]')
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

	assertDataOnPage(table) {
		const data = table.hashes();
		for (let index = 0; index < data.length; index++) {
			this.identifiers
				.summaryListKeys()
				.eq(index)
				.should(($div) => {
					const text = $div.text().replace('kr', '').replace('\xa0', '').trim();
					expect(text).to.include(data[index].Column1);
				});
		}
		for (let index = 0; index < data.length; index++) {
			this.identifiers
				.summaryListValues()
				.eq(index)
				.should(($div) => {
					const text = $div.text().replace(/\s\s+/g, ' ').trim();
					expect(text).to.include(data[index].Column2);
				});
		}
		for (let index = 0; index < data.length; index++) {
			this.identifiers
				.summaryListActions()
				.eq(index)
				.should(($div) => {
					const text = $div.text().replace('kr', '').replace('\xa0', '').trim();
					expect(text).to.include(data[index].Column3);
				});
		}
	}

	clickOnChangeLink(linkType) {
		switch (linkType) {
			case 'Who are you registering for?':
				this.identifiers.registeringForChangeLink().click();
				break;
			case 'Full name':
				this.identifiers.fullNameChangeLink().click();
				break;
			case 'Organisation name':
				this.identifiers.organisationNameChangeLink().click();
				break;
			case 'Who are you representing':
				this.identifiers.representingChangeLink().click();
				break;
		}
	}

	clickDeclarationLink(linkType) {
		switch (linkType) {
			case 'myself':
				this.clickLinkByHref('/register/myself/declaration');
				break;
			case 'organisation':
				this.clickLinkByHref('/register/organisation/declaration');
				break;
			case 'on behalf':
				this.clickLinkByHref('/register/agent/declaration');
				break;
			default:
				throw new Error(`No declaration link found for ${linkType}`);
		}
	}

	clickAcceptAndRegister() {
		this.identifiers.acceptAndRegisterButton().click();
	}
}

export default PO_CyaBeforeReg;

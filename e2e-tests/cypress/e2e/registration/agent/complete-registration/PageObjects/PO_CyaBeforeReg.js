class PO_CyaBeforeReg {
	identifiers = {
		summaryListKeys: () => cy.get('.govuk-summary-list__key'),
		summaryListValues: () => cy.get('.govuk-summary-list__value'),
		summaryListActions: () => cy.get('.govuk-summary-list__actions'),
		registeringForChangeLink: () => cy.get('[data-cy="registering-for"]').first(),
		fullNameChangeLink: () => cy.get('[data-cy="full-name"]').last(),
		organisationNameChangeLink: () => cy.get('[data-cy="organisation-name"]').last(),
		representingChangeLink: () => cy.get('[data-cy="representing"]').last()
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
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
}

export default PO_CyaBeforeReg;

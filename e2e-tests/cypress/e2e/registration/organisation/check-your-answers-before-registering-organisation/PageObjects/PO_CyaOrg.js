class PO_CyaOrg {
	identifiers = {
		summaryListKeys: () => cy.get('.govuk-summary-list__key'),
		summaryListValues: () => cy.get('.govuk-summary-list__value'),
		summaryListActions: () => cy.get('.govuk-summary-list__actions'),
		whoAreYouChangeLink: () => cy.get('[data-cy="who-are-you"]').first(),
		fullNameChangeLink: () => cy.get('[data-cy="full-name"]').last(),
		over18ChangeLink: () => cy.get('[data-cy="over-18"]').last(),
		organisationNameChangeLink: () => cy.get('[data-cy="organisation-name"]').last(),
		volunteerRoleChangeLink: () => cy.get('[data-cy="volunteer-role"]').last(),
		addressChangeLink: () => cy.get('[data-cy="address"]').last(),
		emailChangeLink: () => cy.get('[data-cy="email"]').last(),
		telephoneChangeLink: () => cy.get('[data-cy="telephone"]').last(),
		commentChangeLink: () => cy.get('[data-cy="comment"]').last()
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
				this.identifiers.whoAreYouChangeLink().click();
				break;
			case 'Full name':
				this.identifiers.fullNameChangeLink().click();
				break;
			case 'Are you 18 or over?':
				this.identifiers.over18ChangeLink().click();
				break;
			case 'What is the name of your organisation or charity?':
				this.identifiers.organisationNameChangeLink().click();
				break;
			case 'What is your job title or volunteer role?':
				this.identifiers.volunteerRoleChangeLink().click();
				break;
			case 'Address':
				this.identifiers.addressChangeLink().click();
				break;
			case 'Email address':
				this.identifiers.emailChangeLink().click();
				break;
			case 'Telephone number':
				this.identifiers.telephoneChangeLink().click();
				break;
			case 'Your comments change':
				this.identifiers.commentChangeLink().click();
				break;
			default:
				throw new Error('Cannot find change link type');
		}
	}
}

export default PO_CyaOrg;

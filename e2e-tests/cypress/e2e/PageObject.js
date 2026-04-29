class PageObject {
	identifiers = {
		headerLogo: () => cy.get('.govuk-header__logo'),
		headerContentLink: () => cy.get('a.govuk-header__link'),
		planningInspectorateLogo: () => cy.get('#pins-header__logotype-crest').first(),
		crownCopyrightLink: () => cy.get('a.govuk-footer__link.govuk-footer__copyright-logo').first(),
		feedbackLink: () => cy.get('[data-cy="Feedback"]').first(),
		field: (fieldSelector) => cy.get(fieldSelector)
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

	validateHeaderLogo() {
		this.identifiers.headerLogo().should('exist');
	}

	validateHeaderContent() {
		this.identifiers.headerContentLink().should('have.attr', 'href').and('eq', '/');
	}

	clickOnPlanningInspectorateLogo() {
		this.identifiers.planningInspectorateLogo().click();
		cy.waitForDemoDelay();
	}

	clickOnCrownCopyRight() {
		this.identifiers.crownCopyrightLink().click();
		cy.waitForDemoDelay();
	}

	clickOnProvideFeedbackLink() {
		this.identifiers.feedbackLink().click();
		cy.waitForDemoDelay();
	}

	enterTextIntoField(dataInput, fieldSelector) {
		if (dataInput.length > 0) this.identifiers.field(fieldSelector).type(dataInput);
	}

	enterTextIntoFieldDirectly(dataInput, fieldSelector) {
		if (dataInput.length > 0) this.identifiers.field(fieldSelector).invoke('val', dataInput);
	}

	enterAddressIntoFields(addressObject, addressIdentifiers) {
		if (addressObject.AddressLine1) {
			addressIdentifiers.line1().type(addressObject.AddressLine1);
		}
		if (addressObject.AddressLine2) {
			addressIdentifiers.line2().type(addressObject.AddressLine2);
		}
		if (addressObject.AddressLine3) {
			addressIdentifiers.line3().type(addressObject.AddressLine3);
		}
		if (addressObject.PostCode) {
			addressIdentifiers.postcode().type(addressObject.PostCode);
		}
		if (addressObject.Country) {
			addressIdentifiers.country().type(addressObject.Country);
		}
	}
}
export default PageObject;

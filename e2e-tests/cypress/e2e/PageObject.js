const pageExpectations = require('../support/common-methods/page-expectations');

class PageObject {
	identifiers = {
		headerLogo: () => cy.get('.govuk-header__logo'),
		headerContentLink: () => cy.get('a.govuk-header__link'),
		planningInspectorateLogo: () => cy.get('#pins-header__logotype-crest').first(),
		crownCopyrightLink: () => cy.get('a.govuk-footer__link.govuk-footer__copyright-logo').first(),
		feedbackLink: () => cy.get('[data-cy="Feedback"]').first(),
		field: (fieldSelector) => cy.get(fieldSelector),
		backLink: () => cy.get('[data-cy="back"]').first(),
		saveAndContinueButton: () => cy.get('[data-cy="button-save-and-continue"]').first(),
		saveAndReturnButton: () => cy.get('[data-cy="button-save-and-return"]').first(),
		radioYes: () => cy.get('[data-cy="answer-yes"]'),
		radioNo: () => cy.get('[data-cy="answer-no"]'),
		pageHeading: () => cy.get('h1'),
		contentLinks: () => cy.get('ul > li > a'),
		body: () => cy.get('body'),
		linkByHref: (link) => cy.get(`a[href*="${link}"]:not(.locale-selector a)`).first(),
		projectLink: (projectName) => cy.get('td:nth-child(1)').contains(projectName)
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

	clickLinkByHref(link) {
		this.identifiers.linkByHref(link).click();
		cy.waitForDemoDelay();
	}

	clickProjectLink(projectName) {
		this.identifiers.projectLink(projectName).click();
	}

	clickSaveAndContinue() {
		this.identifiers.saveAndContinueButton().click();
		cy.waitForDemoDelay();
	}

	clickSaveAndReturn() {
		this.identifiers.saveAndReturnButton().click();
		cy.waitForDemoDelay();
	}

	clickBackLink() {
		this.identifiers.backLink().click();
		cy.waitForDemoDelay();
	}

	selectRadioYesOrNo(radioChoice) {
		switch (radioChoice) {
			case 'Yes':
				this.identifiers.radioYes().click();
				break;
			case 'No':
				this.identifiers.radioNo().click();
				break;
			default:
				throw new Error(`unable to find specified radio option: ${radioChoice}`);
		}

		cy.waitForDemoDelay();
	}

	assertErrorMessages(table) {
		cy.title().should('include', 'Error: ');
		table.hashes().forEach(({ ErrorMsg }) => {
			this.identifiers.body().contains(ErrorMsg).should('be.visible');
		});
	}

	assertOnPage(pageName) {
		const expectation = pageExpectations[pageName.toLowerCase()];

		if (!expectation) {
			throw new Error(`unable to find specified page name: ${pageName}`);
		}

		if (expectation.title) {
			cy.title().should(expectation.title.match, expectation.title.value);
		}

		if (expectation.heading) {
			this.identifiers
				.pageHeading()
				.invoke('text')
				.then((text) => {
					expect(text).to.contain(expectation.heading.value);
				});
		}

		if (expectation.url) {
			cy.url().should('include', expectation.url);
		}

		cy.waitForDemoDelay();
	}

	assertLinksPresentOnPage(table) {
		table.hashes().forEach(({ Links }) => {
			this.identifiers.body().contains(Links).should('be.visible');
		});
	}

	assertTextPresent(text) {
		this.identifiers.body().contains(text).should('be.visible');
	}

	clickContentsLink(contentLink) {
		this.identifiers.contentLinks().each(($link, index) => {
			if ($link.text().includes(contentLink)) {
				this.identifiers.contentLinks().eq(index).click();
			}
		});
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

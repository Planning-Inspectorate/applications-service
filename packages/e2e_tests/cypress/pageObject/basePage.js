export class BasePage {
	elements = {
		homeLink: () => cy.get('a[href*="/"]'),
		allProjectsLink: () => cy.get('a[href*="/project-search"]'),
		detailedInformationLink: () => cy.get('a[href*="/detailed-information"]'),
		h1: () => cy.get('h1'),
		h2: () => cy.get('h2'),
		h3: () => cy.get('h3'),
		termsAndConditionsLink: () => cy.get('[data-cy="Terms and conditions"]'),
		accessibliltyLink: () => cy.get('[data-cy="Accessibility statement"]'),
		privacyNoticeLink: () => cy.get('[data-cy="Privacy"]'),
		cookiesLink: () => cy.get('[data-cy="Cookies"]'),
		saveAndContinueBtn: () => cy.get('[data-cy="button-accept-and-regoster"]'),
		contiuneBtn: () => cy.get('[data-cy="button-submit-and-continue"]'),
		checkBox: () => cy.get('[type="checkbox"]'),
		govLink: () => cy.get('.govuk-link'),
		govInput: () => cy.get('.govuk-input'),
		projectInformationMenu: () => cy.get('nav[aria-label="Project navigation"]'),
		govRadioBtn: () => cy.get('[type="radio"]'),
		govBody: () => cy.get('.govuk-body'),
		govBtn: () => cy.get('.govuk-button'),
		govMap: () => cy.get('.pins-map'),
		govInset: () => cy.get('.govuk-inset-text'),
		govDetails: () => cy.get('.govuk-details__summary-text'),
		govSearchTerm: () => cy.get('#searchTerm'),
		govSearchBtn: () => cy.get('[data-cy="search-button"]'),
		govBodyCy: () => cy.get('[data-cy="no-docs-text"]')
	};

	clickSaveAndContinueBtn() {
		this.elements.saveAndContinueBtn().click();
	}

	clickHomeLink() {
		this.elements.homeLink().click();
	}

	clickAllProjectsLink() {
		this.elements.allProjectsLink().click();
	}

	clickDetailedInformationLink() {
		this.elements.detailedInformationLink().click();
	}

	locateH1ByText(pageTitle) {
		this.elements.h1().contains(pageTitle);
	}

	locateH2ByText(string) {
		this.elements.h2().contains(string);
	}

	clickFooterLink(linkType) {
		switch (linkType) {
			case 'Privacy':
				cy.get('[data-cy="Privacy"]').click();
				break;
			case 'Terms and conditions':
				cy.get('[data-cy="Terms and conditions"]').click();
				break;
			case 'Accessibility':
				cy.get('[data-cy="Accessibility statement"]').click();
				break;
			case 'Privacy Notice':
				cy.get('[data-cy="Privacy"]').click();
				break;
			case 'Cookies':
				cy.get('[data-cy="Cookies"]').click();
				break;
			case 'Contact':
				cy.get('[data-cy="Contact"]').click();
		}
	}

	localeSwitcher(language) {
		switch (language) {
			case 'en':
				return cy.get('a[href*="?lang=en"]');
			case 'cy':
				return cy.get('a[href*="?lang=cy"]');
			default:
				throw new Error('Language not supported');
		}
	}

	selectLanguage(language) {
		this.localeSwitcher(language).click();
	}

	languageVisible(language) {
		this.localeSwitcher(language).should('be.visible');
	}

	selectCheckBox(string) {
		this.elements.checkBox().check(string);
	}

	clickGovLink(string) {
		this.elements.govLink().contains(string).click();
	}

	assertGovLink(string) {
		this.elements.govLink().contains(string).should('be.visible');
	}

	govInputType(string) {
		this.elements.govInput().type(string);
	}

	govSearchTermType(string) {
		this.elements.govSearchTerm().type(string);
	}

	clickContiuneBtn() {
		this.elements.contiuneBtn().click();
	}

	clickGovSearchBtn() {
		this.elements.govSearchBtn().click();
	}

	checkGovRadioBtn(string) {
		this.elements.govRadioBtn().check(string);
	}

	clickDetailsBtn() {
		this.elements.govDetails().click();
	}

	clickProjectInformationMenuLink(link) {
		this.elements.projectInformationMenu().within(() => {
			switch (link) {
				case 'documents':
					cy.get('a[href*="/documents"]').click();
					break;
				case 'representations':
					cy.get('a[href*="/representations"]').click();
					break;
				case 'examination-timetable':
					cy.get('a[href*="/examination-timetable"]').click();
					break;
				case 'register-to-have-your-say':
					cy.get('a[href*="/register-have-your-say"]').click();
					break;
				case 'get-updates':
					cy.get('a[href*="/start"]').click();
					break;
				case 's51':
					cy.get('a[href*="/s51advice"]').click();
					break;
				case 'projects':
					cy.get('a[href*="/projects/"]').contains('Project information').click();
					break;
				default:
					throw new Error(`No matching case found for ${urlEnding}`);
			}
		});
	}

	visibleGovBody(string) {
		this.elements.govBody().contains(string).should('be.visible');
	}

	clickGovBtn(string) {
		this.elements.govBtn().contains(string).click();
	}

	visibleGovMap() {
		this.elements.govMap().should('be.visible');
	}

	clickGovInset(expectedText, expectedHref) {
		this.elements
			.govInset()
			.contains(expectedText)
			.find('a')
			.should('have.attr', 'href')
			.and('include', expectedHref);
	}

	locateH3ByText(string) {
		this.elements.h3().contains(string);
	}

	typeInputField(inputFieldId, text) {
		cy.get(`#${inputFieldId}`).clear().type(text);
	}

	assertDropDownDetails(firstH2Text, secondH2Text) {
		this.clickDetailsBtn();
		cy.get('.govuk-details__summary-text').should('be.visible');
		cy.contains('h2', firstH2Text).should('be.visible');
		cy.contains('h2', secondH2Text).should('be.visible');
	}

	checkConfirmationMessage(expectedH1Text, expectedReferenceNumberLength) {
		// Assert the confirmation message container is visible
		cy.get('.govuk-panel').should('be.visible');

		// Assert the H1 text inside the confirmation message
		this.locateH1ByText(expectedH1Text);

		// Assert the body message contains the reference number and validate its length
		cy.get('.govuk-panel__body')
			.invoke('text')
			.then((bodyText) => {
				// Check that the body contains the expected message
				expect(bodyText).to.contain('Your reference number');

				// Extract the reference number
				const referenceNumber = bodyText.replace('Your reference number', '').trim();

				// Assert the reference number has the correct length
				expect(referenceNumber.length).to.equal(expectedReferenceNumberLength);
			});
	}

	visibleGovBodyCy(string) {
		this.elements.govBodyCy().contains(string).should('be.visible');
	}

	selectFilterOptions(option) {
		this.elements.govLink().contains(option).click();
	}
}

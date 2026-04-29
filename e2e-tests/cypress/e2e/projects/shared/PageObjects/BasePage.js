const footerLinkSelectors = {
	Privacy: '[data-cy="Privacy"]',
	'Privacy Notice': '[data-cy="Privacy"]',
	'Terms and conditions': '[data-cy="Terms and conditions"]',
	Accessibility: '[data-cy="Accessibility statement"]',
	Cookies: '[data-cy="Cookies"]',
	Contact: '[data-cy="Contact"]'
};

const projectNavigationSelectors = {
	documents: 'a[href*="/documents"]',
	representations: 'a[href*="/representations"]',
	'examination-timetable': 'a[href*="/examination-timetable"]',
	'have-your-say': 'a[href*="/examination/have-your-say-during-examination"]',
	'register-to-have-your-say': 'a[href*="/register-have-your-say"]',
	'get-updates': 'a[href*="/start"]',
	s51: 'a[href*="/s51advice"]',
	projects: 'a[href*="/projects/"]'
};

export class BasePage {
	identifiers = {
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
		govBodyCy: () => cy.get('[data-cy="no-docs-text"]'),
		footerLink: (linkType) => cy.get(footerLinkSelectors[linkType]),
		localeLink: (language) => cy.get(`a[href*="?lang=${language}"]`),
		projectInformationNavLink: (link) => cy.get(projectNavigationSelectors[link]),
		inputField: (inputFieldId) => cy.get(`#${inputFieldId}`),
		confirmationPanel: () => cy.get('.govuk-panel'),
		confirmationPanelBody: () => cy.get('.govuk-panel__body')
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

	clickSaveAndContinueBtn() {
		this.identifiers.saveAndContinueBtn().click();
	}

	clickHomeLink() {
		this.identifiers.homeLink().click();
	}

	clickAllProjectsLink() {
		this.identifiers.allProjectsLink().click();
	}

	clickDetailedInformationLink() {
		this.identifiers.detailedInformationLink().click();
	}

	locateH1ByText(pageTitle) {
		this.identifiers.h1().contains(pageTitle);
	}

	locateH2ByText(string) {
		this.identifiers.h2().contains(string);
	}

	clickFooterLink(linkType) {
		if (!footerLinkSelectors[linkType]) {
			throw new Error(`No matching footer link found for ${linkType}`);
		}

		this.identifiers.footerLink(linkType).click();
	}

	localeSwitcher(language) {
		if (!['en', 'cy'].includes(language)) {
			throw new Error('Language not supported');
		}

		return this.identifiers.localeLink(language);
	}

	selectLanguage(language) {
		this.localeSwitcher(language).click();
	}

	languageVisible(language) {
		this.localeSwitcher(language).should('be.visible');
	}

	selectCheckBox(string) {
		this.identifiers.checkBox().check(string);
	}

	clickGovLink(string) {
		this.identifiers.govLink().contains(string).click();
	}

	assertGovLink(string) {
		this.identifiers.govLink().contains(string).should('be.visible');
	}

	govInputType(string) {
		this.identifiers.govInput().type(string);
	}

	govSearchTermType(string) {
		this.identifiers.govSearchTerm().type(string);
	}

	clickContiuneBtn() {
		this.identifiers.contiuneBtn().click();
	}

	clickGovSearchBtn() {
		this.identifiers.govSearchBtn().click();
	}

	checkGovRadioBtn(string) {
		this.identifiers.govRadioBtn().check(string);
	}

	clickDetailsBtn() {
		this.identifiers.govDetails().click();
	}

	clickProjectInformationMenuLink(link) {
		if (!projectNavigationSelectors[link]) {
			throw new Error(`No matching case found for ${link}`);
		}

		this.identifiers.projectInformationMenu().within(() => {
			const target = this.identifiers.projectInformationNavLink(link);

			if (link === 'projects') {
				target.contains('Project information').click();
				return;
			}

			target.first().click();
		});
	}

	visibleGovBody(string) {
		this.identifiers.govBody().contains(string).should('be.visible');
	}

	clickGovBtn(string) {
		this.identifiers.govBtn().contains(string).click();
	}

	visibleGovMap() {
		this.identifiers.govMap().should('be.visible');
	}

	clickGovInset(expectedText, expectedHref) {
		this.identifiers
			.govInset()
			.contains(expectedText)
			.find('a')
			.should('have.attr', 'href')
			.and('include', expectedHref);
	}

	locateH3ByText(string) {
		this.identifiers.h3().contains(string);
	}

	typeInputField(inputFieldId, text) {
		this.identifiers.inputField(inputFieldId).clear().type(text);
	}

	assertDropDownDetails(firstH2Text, secondH2Text) {
		this.clickDetailsBtn();
		cy.get('.govuk-details__summary-text').should('be.visible');
		cy.contains('h2', firstH2Text).should('be.visible');
		cy.contains('h2', secondH2Text).should('be.visible');
	}

	checkConfirmationMessage(expectedH1Text, expectedReferenceNumberLength) {
		this.identifiers.confirmationPanel().should('be.visible');
		this.locateH1ByText(expectedH1Text);

		this.identifiers
			.confirmationPanelBody()
			.invoke('text')
			.then((bodyText) => {
				expect(bodyText).to.contain('Your reference number');
				const referenceNumber = bodyText.replace('Your reference number', '').trim();
				expect(referenceNumber.length).to.equal(expectedReferenceNumberLength);
			});
	}

	visibleGovBodyCy(string) {
		this.identifiers.govBodyCy().contains(string).should('be.visible');
	}

	selectFilterOptions(option) {
		this.identifiers.govLink().contains(option).click();
	}
}

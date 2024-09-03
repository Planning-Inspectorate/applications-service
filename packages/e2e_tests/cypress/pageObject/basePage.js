export class BasePage {
	elements = {
		homeLink: () => cy.get('a[href*="/"]'),
		allProjectsLink: () => cy.get('a[href*="/project-search"]'),
		detailedInformationLink: () => cy.get('a[href*="/detailed-information"]'),
		h1: () => cy.get('h1'),
		h2: () => cy.get('h2'),
		termsAndConditionsLink: () => cy.get('[data-cy="Terms and conditions"]'),
		accessibliltyLink: () => cy.get('[data-cy="Accessibility statement"]'),
		privacyNoticeLink: () => cy.get('[data-cy="Privacy"]'),
		cookiesLink: () => cy.get('[data-cy="Cookies"]'),
		saveAndContinueBtn: () => cy.get('[data-cy="button-accept-and-regoster"]'),
		checkBox: () => cy.get('[type="checkbox"]'),
		govLink: () => cy.get('.govuk-link'),
		govInput: () => cy.get('.govuk-input')
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

	locateH2ByText(text) {
		this.elements.h2().contains(text);
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

	govInputType(string) {
		this.elements.govInput().type(string);
	}
}

export class BasePage {
	elements = {
		homeLink: () => cy.get('a[href*="/"]'),
		allProjectsLink: () => cy.get('a[href*="/project-search"]'),
		detailedInformationLink: () => cy.get('a[href*="/detailed-information"]'),
		h1: () => cy.get('h1'),
		termsAndConditionsLink: () => cy.get('[data-cy="Terms and conditions"]'),
		accessibliltyLink: () => cy.get('[data-cy="Accessibility statement"]'),
		privacyNoticeLink: () => cy.get('[data-cy="Privacy"]'),
		cookiesLink: () => cy.get('[data-cy="Cookies"]')
	};

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
}

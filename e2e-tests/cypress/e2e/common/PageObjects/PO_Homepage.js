import PageObject from '../../PageObject';

class PO_Homepage extends PageObject {
	identifiers = {
		...this.identifiers,
		mainHeading: () => cy.get('h1')
	};

	openHomepage() {
		cy.visit('/');
	}

	assertWelcomeHeading(text = 'Welcome') {
		this.identifiers.mainHeading().contains(text).should('be.visible');
	}

	assertLanguageInUrl(language) {
		cy.url().should('include', `lang=${language}`);
	}

	assertFeedbackLinkTargetIncludes(expectedHrefFragment) {
		this.identifiers
			.feedbackLink()
			.should('have.attr', 'href')
			.and('include', expectedHrefFragment);
	}
}

export default PO_Homepage;

class PO_CookiePage {
	clickOnCookieChoice(cookieChoice) {
		switch (cookieChoice) {
			case 'accept':
				cy.get('[data-cy="cookie-banner-accept-analytics-cookies"]').click();
				break;
			case 'reject':
				cy.get('[data-cy="cookie-banner-reject-analytics-cookies"]').click();
				break;
			case 'view':
				cy.get('[data-cy="cookie-banner-view-cookies"]').click();
				break;
			case 'rejected message hide':
				cy.get('[data-cy="cookie-banner-rejected-hide-message"]').click();
				break;
			case 'accepted message hide':
				cy.get('[data-cy="cookie-banner-accepted-hide-message"]').click();
				break;
			default:
				throw new Error('Cannot find button type');
		}
	}

	selectRadioChoice(radioChoice) {
		switch (radioChoice) {
			case 'yes':
				cy.get('[data-cy="usage-cookies-yes"]').click();
				break;
			case 'no':
				cy.get('[data-cy="usage-cookies-no"]').click();
				break;
			default:
				throw new Error('Cannot find radio choice type');
		}
	}

	clickSaveChangesButton() {
		cy.get('[data-cy="button-save-changes"]').click();
	}

	clickGoBackToThePageLink() {
		cy.get('[data-cy="cookies-updated-go-back-link"]').click();
	}
}
export default PO_CookiePage;

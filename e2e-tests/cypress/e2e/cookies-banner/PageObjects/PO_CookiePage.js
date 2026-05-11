class PO_CookiePage {
	identifiers = {
		cookieBannerAcceptButton: () => cy.get('[data-cy="cookie-banner-accept-analytics-cookies"]'),
		cookieBannerRejectButton: () => cy.get('[data-cy="cookie-banner-reject-analytics-cookies"]'),
		cookieBannerViewLink: () => cy.get('[data-cy="cookie-banner-view-cookies"]'),
		cookieBannerRejectedHideButton: () => cy.get('[data-cy="cookie-banner-rejected-hide-message"]'),
		cookieBannerAcceptedHideButton: () => cy.get('[data-cy="cookie-banner-accepted-hide-message"]'),
		usageCookiesYesRadio: () => cy.get('[data-cy="usage-cookies-yes"]'),
		usageCookiesNoRadio: () => cy.get('[data-cy="usage-cookies-no"]'),
		saveChangesButton: () => cy.get('[data-cy="button-save-changes"]'),
		goBackToThePageLink: () => cy.get('[data-cy="cookies-updated-go-back-link"]')
	};

	get functions() {
		return new Proxy(
			{},
			{
				get: (_, prop) => this[prop].bind(this)
			}
		);
	}

	clickOnCookieChoice(cookieChoice) {
		switch (cookieChoice) {
			case 'accept':
				this.identifiers.cookieBannerAcceptButton().click();
				break;
			case 'reject':
				this.identifiers.cookieBannerRejectButton().click();
				break;
			case 'view':
				this.identifiers.cookieBannerViewLink().click();
				break;
			case 'rejected message hide':
				this.identifiers.cookieBannerRejectedHideButton().click();
				break;
			case 'accepted message hide':
				this.identifiers.cookieBannerAcceptedHideButton().click();
				break;
			default:
				throw new Error('Cannot find button type');
		}
	}

	selectRadioChoice(radioChoice) {
		switch (radioChoice) {
			case 'yes':
				this.identifiers.usageCookiesYesRadio().click();
				break;
			case 'no':
				this.identifiers.usageCookiesNoRadio().click();
				break;
			default:
				throw new Error('Cannot find radio choice type');
		}
	}

	clickSaveChangesButton() {
		this.identifiers.saveChangesButton().click();
	}

	clickGoBackToThePageLink() {
		this.identifiers.goBackToThePageLink().click();
	}
}
export default PO_CookiePage;

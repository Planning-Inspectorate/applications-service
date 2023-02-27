module.exports = {
	clickFooterLink: (linkText) => {
		cy.contains('.govuk-footer__inline-list-item', linkText, { matchCase: false }).click();
	},

	pageVerification: (pageName) => {
		cy.contains('h1', pageName, { matchCase: false }).should('be.visible');
		cy.go('back');
	},

	errorMessages: (errorText) => {
		cy.contains('.govuk-error-summary__body', errorText, { matchCase: false }).should('be.visible');
	},

	clickGovLinks: (govLink) => {
		cy.contains('.govuk-link', govLink, { matchCase: false });
	}
};

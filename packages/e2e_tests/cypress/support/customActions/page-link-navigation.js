module.exports = {
	pageVerification: (pages) => {
		switch (pages) {
			case 'Sitemap':
				cy.get('[data-cy="Privacy"]').click();
				break;
			case 'Terms and conditions':
				cy.get('.entry-title').should('contain', 'Terms and conditions');
				break;
			case 'Accessibility':
				cy.get('.govuk-heading-xl').should('contain', 'Accessibility statement');
				break;
			case 'Privacy Notice':
				cy.get('.gem-c-title__text').should('contain', 'Customer Privacy Notice');
				break;
			case 'Cookies':
				cy.get('[data-cy="cookies-with-js-heading"]').should('contain', 'Cookies');
				break;
		}
	}
};

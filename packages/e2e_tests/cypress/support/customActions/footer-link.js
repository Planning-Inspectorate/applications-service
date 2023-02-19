module.exports = {
	clickFooterLink: (linkType) => {
		switch (linkType) {
			case 'Sitemap':
				cy.get('[data-cy="Privacy"]').click();
				break;
			case 'Terms and conditions':
				cy.get('[data-cy="Terms and conditions"]').click();
				break;
			case 'Accessibility':
				cy.get('[data-cy="Accessibility"]').click();
				break;
			case 'Privacy Notice':
				cy.get('[data-cy="Privacy Notice (on GOV.UK)"]').click();
				break;
			case 'Cookies':
				cy.get('[data-cy="Cookies"]').click();
				break;
		}
	}
};

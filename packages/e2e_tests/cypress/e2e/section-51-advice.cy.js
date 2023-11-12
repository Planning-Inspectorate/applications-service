import { PO_Section51 } from '../pageObject/section-51-advice/PO_Section51';

const section51 = new PO_Section51();

describe('User can review and search Section 51 advice', () => {
	it('Can navigate to the Section 51 page', () => {
		cy.clearCookies();
		cy.visit('/projects/EN010120/');
		section51.clickSection51Link();
		cy.url().should('include', '/s51advice');
		section51.checkMainH1Visible();
	});

	it('Can change the number of results displays to 50', () => {
		section51.changeNumberOfResults('50');
		cy.url().should('include', 'itemsPerPage=50');
	});

	it('Can perform a search', () => {
		section51.enterSearchTerm('meeting');
		cy.get('#search-button').click();
	});

	it('Can click to view one of the results', () => {
		section51.clickFirstResult();
		cy.get('.govuk-heading-m').contains('Enquiry').should('be.visible');
	});

	it('Can navigate back to the results page', () => {
		cy.get('a').contains('Back to list').click();
		section51.checkMainH1Visible();
	});
});

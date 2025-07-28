import { BasePage } from '../pageObject/basePage';

const basepage = new BasePage();

describe('Visit footer links and verify they redirect to the correct page', () => {
	before(() => {
		cy.clearCookies();
		cy.visit(Cypress.env('baseUrl'));
	});

	it('Should click Terms and Conditions link', () => {
		basepage.clickFooterLink('Terms and conditions');
		basepage.locateH1ByText('Terms and conditions');
		cy.url().should('include', '/terms-and-conditions');
	});

	it('Should click Accessiblilty Link', () => {
		basepage.clickFooterLink('Accessibility');
		basepage.locateH1ByText('Accessibility statement for national infrastructure projects');
		cy.url().should('include', '/accessibility-statement');
	});

	it('Should click Cookies Link', () => {
		basepage.clickFooterLink('Cookies');
		basepage.locateH1ByText('Cookies on the Find a National Infrastructure Project service');
		cy.url().should('include', '/cookies');
	});

	it('Should click Contact Link', () => {
		basepage.clickFooterLink('Contact');
		basepage.locateH1ByText('Contact us');
		cy.url().should('include', '/contact');
	});

	it('Should click Privacy Notice Link', () => {
		basepage.clickFooterLink('Privacy Notice');
		basepage.locateH1ByText('Customer Privacy Notice');
		cy.url().should('include', '/customer-privacy-notice');
	});
});

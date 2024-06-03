import { BasePage } from '../pageObject/basePage';

const basepage = new BasePage();

beforeEach(() => {
	cy.visit('/');
});

describe('Visit footer links and verify they redirect to the correct page', () => {
	it('should click Terms and Conditions link', () => {
		basepage.clickFooterLink('Terms and conditions');
		basepage.locateH1ByText('Terms and conditions');
		cy.url().should('include', '/terms-and-conditions');
	});

	it('should click Accessiblilty Link', () => {
		basepage.clickFooterLink('Accessibility');
		basepage.locateH1ByText('Accessibility statement for national infrastructure projects');
		cy.url().should('include', '/accessibility-statement');
	});

	it('should click Privacy Notice Link', () => {
		basepage.clickFooterLink('Privacy Notice');
		basepage.locateH1ByText('Customer Privacy Notice');
		cy.url().should('include', '/customer-privacy-notice');
	});

	it('should click Cookies Link', () => {
		basepage.clickFooterLink('Cookies');
		basepage.locateH1ByText('Cookies on application service');
		cy.url().should('include', '/cookies');
	});

	it('should click Contact Link', () => {
		basepage.clickFooterLink('Contact');
		basepage.locateH1ByText('Contact us');
		cy.url().should('include', '/contact');
	});
});

import { PO_Cookies } from '../pageObject/Cookies/PO_Cookies';
import { BasePage } from '../pageObject/basePage';

const cookies = new PO_Cookies();
const basepage = new BasePage();

beforeEach(() => {
	cy.clearAllCookies();
	cy.visit(Cypress.env('baseUrl'));
	basepage.clickAllProjectsLink();
});

describe('Accept and Decline cookie settings on view cookies page', () => {
	it('Should navigate to the view cookies page and accept cookies', () => {
		cookies.clickOnCookieChoice('view');
		cy.url().should('include', '/cookies');
		basepage.locateH1ByText('Cookies on the Find a National Infrastructure Project service');
		cookies.selectRadioChoice('yes');
		cookies.clickSaveChangesButton();
		cookies.cookiesUpdatedText();
		cookies.clickGoBackToThePageLink();
		basepage.locateH1ByText('Projects');
		cy.url().should('include', '/project-search');
	});

	it('Should navigate to the view cookies page and decline cookies', () => {
		cookies.clickOnCookieChoice('view');
		cy.url().should('include', '/cookies');
		basepage.locateH1ByText('Cookies on the Find a National Infrastructure Project service');
		cookies.selectRadioChoice('no');
		cookies.clickSaveChangesButton();
		cookies.cookiesUpdatedText();
		cookies.clickGoBackToThePageLink();
		basepage.locateH1ByText('Projects');
		cy.url().should('include', '/project-search');
	});
});

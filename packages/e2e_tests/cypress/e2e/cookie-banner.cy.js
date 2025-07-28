import { PO_Cookies } from '../pageObject/Cookies/PO_Cookies';
const cookies = new PO_Cookies();

beforeEach(() => {
	cy.clearCookies();
	cy.visit(Cypress.env('baseUrl'));
});

describe('Accept and Decline cookie settings from banner ', () => {
	it('Should accept cookie settings from banner and dissmis acceptance message', () => {
		cookies.clickOnCookieChoice('accept');
		cookies.cookieSettingsSetBanner('accepted');
		cookies.clickOnCookieChoice('accepted message hide');
		cookies.cookieBannerNotVisible();
	});

	it('Should reject cookie settings from banner and dissmis rejection message ', () => {
		cookies.clickOnCookieChoice('reject');
		cookies.cookieSettingsSetBanner('rejected');
		cookies.clickOnCookieChoice('rejected message hide');
		cookies.cookieBannerNotVisible();
	});
});

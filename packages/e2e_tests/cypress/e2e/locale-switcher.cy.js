import { BasePage } from '../pageObject/basePage';
const basePage = new BasePage();

describe('Checks Language Switcher Functionality', () => {
	before(() => {
		cy.clearCookies();
		cy.visit(Cypress.env('baseUrl'));
	});

	it('should switch to Welsh when the Welsh link is clicked', () => {
		let language = 'cy';

		// Assert that the Welsh link is visible
		basePage.localeSwitcher('cy').should('be.visible');

		// Click on the Welsh link
		basePage.selectLanguage(language);

		// Verify the URL contains 'lang=cy'
		cy.url().should('include', `lang=${language}`);

		// Verify H1 contains 'Welcome' text in Welsh
		basePage.locateH1ByText('Croeso');
	});

	it('should switch back to English when the English link is clicked ', () => {
		let language = 'en';

		// Assert that the English link is visible
		basePage.localeSwitcher('en').should('be.visible');

		// Click on the English link
		basePage.selectLanguage(language);

		// Verify the URL contains 'lang=en'
		cy.url().should('include', `lang=${language}`);

		// Verify H1 contains 'Welcome' text in English
		basePage.locateH1ByText('Welcome');
	});
});

import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';
import { PO_ProjectSearch } from '../pageObject/Search-and-project-pages/PO_ProjectSearch';
import { BasePage } from '../pageObject/basePage';

const haveYourSay = new PO_HaveYourSay();
const projectPage = new PO_ProjectPage();
const projectSearch = new PO_ProjectSearch();
const basePage = new BasePage();

before(() => {
	cy.clearAllCookies();
});

describe('Register as an organisation to have your say', () => {
	it('Navigating to project search', () => {
		cy.visit('/projects/BC0110005');
	});

	it('It should click on register to have your say link', () => {
		projectPage.findAndClickSidebarLinkLeft('Register to have your say');
	});

	it('It should click start now button', () => {
		projectPage.findAndClickButton('Start now');
	});

	it('It should check An organisation I work or volunteer for', () => {
		haveYourSay.findAndSelectRadioButton('organisation');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their full name and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('full-name', 'John Tester');
		projectPage.findAndClickButton('Continue');
	});

	it('Confirms they are over 18 and clicks continue', () => {
		haveYourSay.findAndSelectRadioButton('yes');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters organisation name and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('organisation-name', 'Test Organisation');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters job title or volunteer role', () => {
		haveYourSay.findFieldAndEnterText('role', 'Test Manager');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their email address and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('email', 'pinsemail@examplePINS.com');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their address details and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('line1', 'TQH');
		haveYourSay.findFieldAndEnterText('line2', '2 The Square');
		haveYourSay.findFieldAndEnterText('line3', 'Bristol');
		haveYourSay.findFieldAndEnterText('postcode', 'BS1 6PN');
		haveYourSay.findFieldAndEnterText('country', 'United Kingdomw');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their telephone number and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('telephone', '03034445325');
		projectPage.findAndClickButton('Continue');
	});

	it('Adds a comment against a project and clicks continue', () => {
		haveYourSay.findFieldAndEnterText(
			'comment',
			'This is a test comment against the this specific project for automation testing purposes.'
		);
		cy.get('.govuk-details__summary-text').click();
		basePage.locateH2ByText('Use of language, hyperlinks and sensitive information');
		projectPage.findAndClickButton('Continue');
	});

	it('Should navigate to check answers page', () => {
		basePage.locateH1ByText('Check your answers before registering');
		basePage.locateH2ByText('Personal details');
		projectPage.findAndClickButton('Continue to declaration');
	});

	it('Should accept Declaration', () => {
		basePage.locateH1ByText('Declaration');
		basePage.clickSaveAndContinueBtn();
	});

	it('Should verify application complete page', () => {
		basePage.locateH1ByText('Registration complete');
		// TODO:add test for reference number
		cy.get('#project-link').click();
	});

	it('Should verify taken back to project page', () => {
		cy.url().should('include', '/BC0110005');
	});
});

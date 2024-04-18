import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';
import { PO_ProjectSearch } from '../pageObject/Search-and-project-pages/PO_ProjectSearch';

const haveYourSay = new PO_HaveYourSay();
const projectPage = new PO_ProjectPage();
const projectSearch = new PO_ProjectSearch();

describe('agent registers to have your say and submits on behalf of householder', () => {
	it('should navigate to the project page', () => {
		cy.clearCookies();
		cy.visit('/projects/BC0110005');
	});

	it('it should click on register to have your say link', () => {
		projectPage.findAndClickSidebarLinkLeft('Register to have your say');
	});

	it('it should click start now button', () => {
		projectPage.findAndClickButton('Start now');
	});

	it('it should check on behalf of another person ', () => {
		haveYourSay.checkRadioOption();
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their full name and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('full-name', 'John Tester');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters organisation name and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('organisation-name', 'Test Organisation');
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

	it('Chooses to represent as A Person and clicks continue', () => {
		haveYourSay.findAndSelectRadioButton('person');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their full name and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('full-name', 'Fred Tester');
		projectPage.findAndClickButton('Continue');
	});

	it('Confirms they are over 18 and clicks continue', () => {
		haveYourSay.findAndSelectRadioButton('yes');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their email address and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('email', 'pinsemail12@examplePINS.com');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their address details and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('line1', 'TQH');
		haveYourSay.findFieldAndEnterText('line2', '21 The Square');
		haveYourSay.findFieldAndEnterText('line3', 'Bristol');
		haveYourSay.findFieldAndEnterText('postcode', 'BS1 6PN');
		haveYourSay.findFieldAndEnterText('country', 'United Kingdomw');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their telephone number and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('telephone', '03334445325');
		projectPage.findAndClickButton('Continue');
	});

	it('Adds a comment against a project and clicks continue', () => {
		haveYourSay.findFieldAndEnterText(
			'comment',
			'This is a test comment against the this specific project for automation testing purposes.'
		);
		projectPage.findAndClickButton('Continue');
	});

	it('Declaration', () => {
		cy.get('a[href*="/agent/declaration"]').click();
	});

	it('Accept and continue', () => {
		cy.get('[data-cy="button-accept-and-regoster"]').click();
	});

	it('User sees the registration complete message', () => {
		haveYourSay.registrationCompleteText('Registration complete');
	});
});

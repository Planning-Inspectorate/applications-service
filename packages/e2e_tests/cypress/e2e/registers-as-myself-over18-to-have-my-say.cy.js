import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { PO_ProjectSearch } from '../pageObject/Search-and-project-pages/PO_ProjectSearch';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';

const haveYourSay = new PO_HaveYourSay();
const projectSearch = new PO_ProjectSearch();
const projectPage = new PO_ProjectPage();

before(() => {
	cy.clearCookies();
});

describe('User registers to have their say and submits a comment against a project', () => {
	it('Navigate to projects search page', () => {
		cy.visit('/projects/BC0910150/register/register-have-your-say');
	});

	it('Clicks to start the registration journey', () => {
		projectPage.findAndClickButton('Start now');
	});

	it('Chooses to register as myself and clicks continue', () => {
		haveYourSay.findAndSelectRadioButton('myself');
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

	it('Enters their email address and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('email', 'pinsemail@examplePINS.com');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their address details and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('line1', '149 Testing Flats');
		haveYourSay.findFieldAndEnterText('line2', 'Testing Street');
		haveYourSay.findFieldAndEnterText('line3', 'London');
		haveYourSay.findFieldAndEnterText('postcode', 'SW1P 4DF');
		haveYourSay.findFieldAndEnterText('country', 'United Kingdomw');
		projectPage.findAndClickButton('Continue');
	});

	it('Enters their telephone number and clicks continue', () => {
		haveYourSay.findFieldAndEnterText('telephone', '07743646926');
		projectPage.findAndClickButton('Continue');
	});

	it('Adds a comment against a project and clicks continue', () => {
		haveYourSay.findFieldAndEnterText(
			'comment',
			'This is a test comment against the North Lincolnshire project.'
		);
		projectPage.findAndClickButton('Continue');
	});

	it('Register their answers and comment against a project', () => {
		projectPage.findAndClickButton('Accept and continue');
	});

	it('Agrees to the the declarations', () => {
		projectPage.findAndClickButton('Accept and continue');
	});

	it('User sees the registration complete message', () => {
		haveYourSay.registrationCompleteText('Registration complete');
	});
});

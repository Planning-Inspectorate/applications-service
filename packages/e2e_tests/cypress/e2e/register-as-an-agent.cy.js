import { PO_HaveYourSay } from '../pageObject/Register-to-have-your-say/PO_HaveYourSay';
import { PO_ProjectPage } from '../pageObject/Search-and-project-pages/PO_ProjectPage';
import { PO_ProjectSearch } from '../pageObject/Search-and-project-pages/PO_ProjectSearch';

const haveYourSay = new PO_HaveYourSay();
const projectPage = new PO_ProjectPage();
const projectSearch = new PO_ProjectSearch();

describe('agent registers to have your say and submits on behalf of householder', () => {
	it('should navigate to the project page', () => {
		cy.clearCookies();
		cy.visit('/projects/EN010120');
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
});

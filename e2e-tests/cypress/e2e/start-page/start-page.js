import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import PO_StartPage from './PageObjects/PO_StartPage';

const startPage = new PO_StartPage();

Given('I navigate to Register to have your say page', () => {
	startPage.openRegisterToHaveYourSayPage('North Lincolnshire Green Energy Park');
});

When('I click on start now button', () => {
	startPage.clickStartNow();
});

Then('I am on the {string} page', (pageName) => {
	startPage.assertOnPage(pageName);
});

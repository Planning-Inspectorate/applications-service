import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { BasePage } from '../projects/shared/PageObjects/BasePage';
import PO_WhoYouRegisterFor from '../registration/who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';

const basePage = new BasePage();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to the who are you registering for page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
});

And('I click on {string} footer link', (linkType) => {
	basePage.clickFooterLink(linkType);
});

Then('I am on the {string} page', (pageName) => {
	whoYouRegisterForPage.assertOnPage(pageName);
});

import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_WhoYouRegisterFor from '../registration/who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';

const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I am registering as an {string}', (radioChoice) => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectParty(radioChoice);
	whoYouRegisterForPage.clickSaveAndContinue();
});

When('I click on the continue button', () => {
	whoYouRegisterForPage.clickSaveAndContinue();
});

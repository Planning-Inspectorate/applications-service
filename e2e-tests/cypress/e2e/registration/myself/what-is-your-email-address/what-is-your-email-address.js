import { Given, When } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
const fullNamePage = new PO_FullName();
const emailAddressPage = new PO_EmailAddress();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to email address page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	emailAddressPage.selectRadioYesOrNo('Yes');
	emailAddressPage.clickSaveAndContinue();
});

When('I continue with the value {string} in the email field', (text) => {
	emailAddressPage.enterTextIntoEmailField(text);
	emailAddressPage.clickSaveAndContinue();
});

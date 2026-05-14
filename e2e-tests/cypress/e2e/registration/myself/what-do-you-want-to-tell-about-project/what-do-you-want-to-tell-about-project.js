import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_TellAboutProject from '../what-do-you-want-to-tell-about-project/PageObjects/PO_TellAboutProject';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
import { registerCommentPageSteps } from '../../shared/registerCommentPageSteps';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const telephoneNumberPage = new PO_TeleNumber();
const tellAboutProject = new PO_TellAboutProject();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	emailAddressPage.selectRadioYesOrNo('Yes');
	emailAddressPage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('testpins2@gmail.com');
	emailAddressPage.clickSaveAndContinue();
});

When('I continue with the following values in the address fields', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
	addressDetails.clickSaveAndContinue();
});

When('I continue with the value {string} in the telephone number field', (text) => {
	telephoneNumberPage.enterTextIntoTelephoneNumberField(text);
	telephoneNumberPage.clickSaveAndContinue();
});

registerCommentPageSteps({ And, Then, When }, tellAboutProject, 'testpins2@gmail.com');

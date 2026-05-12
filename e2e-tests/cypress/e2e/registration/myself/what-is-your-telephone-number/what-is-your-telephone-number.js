import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import PO_FullName from '../full-name/PageObjects/PO_FullName';
import PO_AddressDetails from '../uk-address-details/PageObjects/PO_AddressDetails';
import PO_EmailAddress from '../what-is-your-email-address/PageObjects/PO_EmailAddress';
import PO_TeleNumber from '../what-is-your-telephone-number/PageObjects/PO_TeleNumber';
import PO_WhoYouRegisterFor from '../../who-are-you-registering-for/PageObjects/PO_WhoYouRegisterFor';
const fullNamePage = new PO_FullName();
const addressDetails = new PO_AddressDetails();
const emailAddressPage = new PO_EmailAddress();
const teleNumberPage = new PO_TeleNumber();
const whoYouRegisterForPage = new PO_WhoYouRegisterFor();

Given('I navigate to UK address details page', () => {
	whoYouRegisterForPage.navigatetoTypeOfPartyPage();
	whoYouRegisterForPage.selectPartyAndContinue('Myself');
	fullNamePage.enterTextIntoFullNameField('TestFirstName TestMiddleName TestLastName');
	fullNamePage.clickSaveAndContinue();
	emailAddressPage.selectRadioYesOrNo('Yes');
	emailAddressPage.clickSaveAndContinue();
	emailAddressPage.enterTextIntoEmailField('test@gmail.com');
	emailAddressPage.clickSaveAndContinue();
});

And('I enter below data into address details page', function (table) {
	addressDetails.enterTextIntoAddressFields(table);
});

And('User clicks on continue button', () => {
	addressDetails.clickSaveAndContinue();
});

Then(
	'below error message should be presented on What is your telephone number page',
	function (table) {
		teleNumberPage.assertErrorMessages(table);
	}
);

When('I continue with the value {string} in the telephone number field', (text) => {
	teleNumberPage.enterTextIntoTelephoneNumberField(text);
	teleNumberPage.clickSaveAndContinue();
});
